import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import AddButton from '../../../components/ui/AddButton'
import DataTable from '../../../components/ui/DataTable'
import RightSideModal from '../../../components/ui/RightSideModal'
import Modal from '../../../components/ui/Modal'
import Badge from '../../../components/ui/Badge'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import { clientsAPI, invoicesAPI, paymentsAPI, projectsAPI, employeesAPI } from '../../../api'
import { useAuth } from '../../../context/AuthContext'
import {
  IoEye,
  IoCreate,
  IoTrash,
  IoMail,
  IoPersonAdd,
  IoClose,
  IoCheckmarkCircle,
  IoGrid,
  IoSearch,
  IoPrint,
  IoDownload,
  IoPricetag,
  IoPerson,
  IoChevronUp,
  IoChevronDown,
  IoGlobe,
  IoCall,
  IoLocation,
  IoDocumentText,
  IoCash,
  IoCard,
  IoStatsChart,
  IoTrendingUp,
  IoTrendingDown,
  IoArrowForward,
  IoTime,
  IoCalendar,
  IoCloseCircle
} from 'react-icons/io5'
import BarChart from '../../../components/charts/BarChart'
import DonutChart from '../../../components/charts/DonutChart'
import LineChart from '../../../components/charts/LineChart'

const Clients = () => {
  const { user } = useAuth()
  // Ensure companyId is always a number - recalculate when user changes
  const companyId = useMemo(() => {
    const id = user?.company_id || localStorage.getItem('companyId') || '1'
    const parsed = parseInt(id, 10)
    if (isNaN(parsed) || parsed <= 0) {
      console.warn('Invalid companyId, using default 1. User:', user, 'localStorage:', localStorage.getItem('companyId'))
      return 1
    }
    return parsed
  }, [user])

  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview') // 'overview', 'clients', 'contacts'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isBulkEmailModalOpen, setIsBulkEmailModalOpen] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false)
  const [isManageLabelsModalOpen, setIsManageLabelsModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [createdClientData, setCreatedClientData] = useState(null)
  const [selectedClients, setSelectedClients] = useState([])
  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedContact, setSelectedContact] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortColumn, setSortColumn] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')

  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    email: '',
    password: '',
    // Address Details
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    // Contact Details
    phoneCountryCode: '+1',
    phoneNumber: '',
    website: '',
    // Tax & Registration
    vatNumber: '',
    gstNumber: '',
    // Billing Preferences
    currencySymbol: '',
    disableOnlinePayment: false,
    label: '',
  })

  const [contactFormData, setContactFormData] = useState({
    name: '',
    clientName: '',
    clientId: '',
    jobTitle: '',
    email: '',
    phone: '',
    isPrimary: false,
  })

  const [emailFormData, setEmailFormData] = useState({
    to: [],
    cc: '',
    bcc: '',
    subject: '',
    body: '',
    attachments: [],
  })

  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [clientContacts, setClientContacts] = useState({}) // Store contacts separately
  const [showPassword, setShowPassword] = useState(false)
  const [overviewData, setOverviewData] = useState(null) // For overview tab
  const [overviewLoading, setOverviewLoading] = useState(false)
  const [dateRange, setDateRange] = useState('all') // For overview date filter
  const [statusFilter, setStatusFilter] = useState('') // For overview status filter
  const [ownerFilter, setOwnerFilter] = useState('') // For overview owner filter
  const [employees, setEmployees] = useState([]) // For owner dropdown
  const [allContactsList, setAllContactsList] = useState([])
  const [contactsLoading, setContactsLoading] = useState(false)
  const [labels, setLabels] = useState([])
  const [newLabel, setNewLabel] = useState('')
  const [newLabelColor, setNewLabelColor] = useState('#22c55e')

  // Fetch clients on component mount
  useEffect(() => {
    console.log('useEffect triggered - companyId:', companyId, 'user:', user)
    // Only fetch if companyId is valid
    if (companyId && !isNaN(companyId) && companyId > 0) {
      console.log('Fetching clients with companyId:', companyId)
      fetchClients()
      fetchEmployees()
      fetchAllContacts()
      fetchLabels()
      if (activeTab === 'overview') {
        fetchOverview()
      }
    } else {
      console.error('Invalid companyId in useEffect:', companyId)
      console.error('User:', user)
      console.error('User company_id:', user?.company_id)
      console.error('LocalStorage companyId:', localStorage.getItem('companyId'))
      console.error('Parsed companyId:', parseInt(user?.company_id || localStorage.getItem('companyId') || 1, 10))
    }
  }, [companyId, activeTab, dateRange, statusFilter, ownerFilter, user])

  // Fetch employees for owner dropdown
  const fetchEmployees = async () => {
    try {
      if (companyId && !isNaN(companyId) && companyId > 0) {
        const response = await employeesAPI.getAll({ company_id: companyId })
        if (response.data.success) {
          setEmployees(response.data.data || [])
        }
      }
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  // Fetch labels
  const fetchLabels = async () => {
    try {
      if (companyId && !isNaN(companyId) && companyId > 0) {
        const response = await clientsAPI.getAllLabels({ company_id: companyId })
        if (response.data.success) {
          // Flatten/normalize labels if needed (assuming backend returns array of objects with label property)
          // Based on leadController, it returns distinct { label, id, created_at }
          const fetchedLabels = response.data.data.map(l => ({
            name: l.label,
            color: l.color || '#22c55e', // Use backend color if available, or default
            id: l.id
          }))
          // Deduplicate if needed (though DISTINCT query handles it)
          // For now, let's assume unique names
          setLabels(fetchedLabels)
        }
      }
    } catch (error) {
      console.error('Error fetching labels:', error)
    }
  }

  const handleAddLabel = async () => {
    if (!newLabel.trim()) return

    try {
      const response = await clientsAPI.createLabel({
        label: newLabel.trim(),
        color: newLabelColor, // Pass color if backend supports it
        company_id: companyId
      })

      if (response.data.success) {
        setNewLabel('')
        setNewLabelColor('#22c55e')
        fetchLabels() // Refresh labels
      }
    } catch (error) {
      console.error('Error creating label:', error)
      alert(error.response?.data?.error || 'Failed to create label')
    }
  }

  const handleDeleteLabel = async (labelName) => {
    if (!confirm(`Are you sure you want to delete the label "${labelName}"?`)) return

    try {
      const response = await clientsAPI.deleteLabel(labelName, { company_id: companyId })
      if (response.data.success) {
        fetchLabels() // Refresh labels
      }
    } catch (error) {
      console.error('Error deleting label:', error)
      alert(error.response?.data?.error || 'Failed to delete label')
    }
  }

  // Fetch overview data
  const fetchOverview = async () => {
    try {
      if (!companyId || isNaN(companyId) || companyId <= 0) {
        console.error('Invalid companyId for fetchOverview:', companyId)
        setOverviewLoading(false)
        return
      }

      setOverviewLoading(true)
      const params = {
        company_id: companyId,
        date_range: dateRange,
        status: statusFilter || undefined,
        owner_id: ownerFilter || undefined,
      }
      const response = await clientsAPI.getOverview(params)
      if (response.data.success) {
        setOverviewData(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching overview:', error)
    } finally {
      setOverviewLoading(false)
    }
  }

  const fetchAllContacts = async () => {
    try {
      if (companyId && !isNaN(companyId) && companyId > 0) {
        setContactsLoading(true)
        const response = await clientsAPI.getAllContacts({ company_id: companyId })
        if (response.data.success) {
          setAllContactsList(response.data.data || [])
        }
      }
    } catch (error) {
      console.error('Error fetching all contacts:', error)
    } finally {
      setContactsLoading(false)
    }
  }

  const fetchClients = async () => {
    try {
      // Use companyId directly (already validated in useMemo)
      if (!companyId || isNaN(companyId) || companyId <= 0) {
        console.error('Invalid companyId for fetchClients:', companyId)
        console.error('User:', user)
        console.error('LocalStorage:', localStorage.getItem('companyId'))
        setLoading(false)
        return
      }

      setLoading(true)
      console.log('Fetching clients with company_id:', companyId)
      const response = await clientsAPI.getAll({ company_id: companyId })
      console.log('Clients API response:', response.data)
      if (response.data.success) {
        const fetchedClients = response.data.data || []
        // Transform clients to map API snake_case fields to camelCase for display
        const transformedClients = await Promise.all(fetchedClients.map(async (client) => {
          // Fetch invoices for this client to calculate totals
          let totalInvoiced = 0
          let paymentReceived = 0
          let due = 0

          try {
            const invoicesRes = await invoicesAPI.getAll({ client_id: client.id, company_id: companyId })
            if (invoicesRes.data.success) {
              const invoices = invoicesRes.data.data || []
              totalInvoiced = invoices.reduce((sum, inv) => sum + parseFloat(inv.total || 0), 0)
              paymentReceived = invoices.reduce((sum, inv) => sum + parseFloat(inv.paid || 0), 0)
              due = invoices.reduce((sum, inv) => sum + parseFloat(inv.unpaid || 0), 0)
            }
          } catch (error) {
            console.error(`Error fetching invoices for client ${client.id}:`, error)
          }

          return {
            ...client,
            // Use backend response fields directly
            client_name: client.client_name || client.company_name || '',
            email: client.email || '',
            phone: client.phone || client.phone_number || '',
            // Map for legacy compatibility
            companyName: client.client_name || client.company_name || '',
            name: client.client_name || client.company_name || '',
            phoneNumber: client.phone_number || client.phoneNumber || '',
            phoneCountryCode: client.phone_country_code || client.phoneCountryCode || '+1',
            owner: client.owner_name || client.owner || 'Unknown',
            owner_id: client.owner_id,
            ownerId: client.owner_id,
            vatNumber: client.vat_number || client.vatNumber || '',
            gstNumber: client.gst_number || client.gstNumber || '',
            currencySymbol: client.currency_symbol || client.currencySymbol || '$',
            disableOnlinePayment: client.disable_online_payment !== undefined ? client.disable_online_payment : (client.disableOnlinePayment || false),
            // Financial data from backend
            totalProjects: client.total_projects || 0,
            totalInvoiced: client.total_invoiced || 0,
            paymentReceived: client.payment_received || 0,
            due: client.due || 0,
          }
        }))
        setClients(transformedClients)
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const contactsToDisplay = allContactsList.map(contact => ({
    ...contact,
    clientId: contact.client_id,
    clientName: contact.client_name,
    jobTitle: contact.job_title,
    // Add other fields as needed for DataTable mapping
  }))

  // These can remain as static options for dropdowns (not data)
  const clientGroups = ['Enterprise', 'Small Business', 'Startup', 'Non-Profit']
  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'India', 'Germany', 'France']
  const countryCodes = ['+1', '+44', '+91', '+61', '+49', '+33']
  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD']

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedContacts = [...contactsToDisplay].sort((a, b) => {
    const aValue = a[sortColumn] || ''
    const bValue = b[sortColumn] || ''
    if (sortDirection === 'asc') {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })

  const filteredContacts = sortedContacts.filter(contact => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.clientName.toLowerCase().includes(query) ||
      contact.jobTitle?.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.phone?.toLowerCase().includes(query)
    )
  })

  const columns = [
    {
      key: 'checkbox',
      label: '',
      render: (value, row) => (
        <input
          type="checkbox"
          checked={selectedClients.includes(row.id)}
          onChange={() => handleSelectClient(row.id)}
          className="w-4 h-4 text-primary-accent rounded focus:ring-primary-accent"
        />
      ),
    },
    {
      key: 'logo',
      label: '',
      render: (value, row) => (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <IoPerson className="text-gray-500" size={18} />
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Name',
      render: (value, row) => (
        <a href="#" className="text-blue-600 hover:underline" onClick={(e) => { e.preventDefault(); handleViewClient(row.clientId || row.id) }}>
          {value}
        </a>
      ),
    },
    {
      key: 'company',
      label: 'Client name',
      render: (value, row) => (
        <a href="#" className="text-blue-600 hover:underline" onClick={(e) => { e.preventDefault(); handleViewClient(row.clientId || row.id) }}>
          {row.clientName || row.companyName || value}
        </a>
      ),
    },
    { key: 'jobTitle', label: 'Job Title' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'actions',
      label: '',
      render: (value, row) => (
        <button
          onClick={() => handleDeleteContact(row)}
          className="p-1 text-gray-400 hover:text-danger transition-colors"
        >
          <IoClose size={18} />
        </button>
      ),
    },
  ]

  const clientColumns = [
    {
      key: 'checkbox',
      label: '',
      render: (value, row) => (
        <input
          type="checkbox"
          checked={selectedClients.includes(row.id)}
          onChange={() => handleSelectClient(row.id)}
          className="w-4 h-4 text-primary-accent rounded focus:ring-primary-accent"
        />
      ),
    },
    {
      key: 'id',
      label: 'ID',
      render: (value, row) => (
        <div className="flex items-center gap-1">
          <span>{row.id}</span>
          <button
            onClick={() => handleSort('id')}
            className="text-gray-400 hover:text-primary-accent"
          >
            {sortColumn === 'id' ? (
              sortDirection === 'asc' ? <IoChevronUp size={14} /> : <IoChevronDown size={14} />
            ) : (
              <IoChevronUp size={14} className="opacity-0" />
            )}
          </button>
        </div>
      ),
    },
    {
      key: 'client_name',
      label: 'Name',
      render: (value, row) => (
        <a
          href="#"
          className="text-blue-600 hover:underline"
          onClick={(e) => {
            e.preventDefault()
            handleViewClient(row.id)
          }}
        >
          {value || row.client_name || row.companyName || row.company_name || '-'}
        </a>
      )
    },
    {
      key: 'email',
      label: 'Email',
      render: (value) => value || '-'
    },
    {
      render: (value, row) => {
        const phone = value || row.phone_number || ''
        const code = row.phoneCountryCode || row.phone_country_code || ''
        return phone ? `${code} ${phone}` : '-'
      }
    },
    {
      key: 'labels',
      label: 'Tags',
      render: (value, row) => {
        // We might need to fetch labels for each client or attach them in getAll
        // For now, assuming row.labels works if implemented in backend
        // If not, we might not see labels in the list until backend 'getAll' includes them
        // Let's rely on a future backend update or if we patch getAll to include labels
        // For now, just render if present
        if (!value || (Array.isArray(value) && value.length === 0)) return '-'

        return (
          <div className="flex flex-wrap gap-1">
            {/* If value is array of strings */}
            {Array.isArray(value) && value.map((labelName, idx) => {
              const labelObj = labels.find(l => l.name === labelName)
              const color = labelObj?.color || '#3b82f6' // Default blue
              return (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-white text-[11px] font-bold shadow-sm uppercase tracking-wider"
                  style={{ backgroundColor: color }}
                >
                  {labelName}
                </span>
              )
            })}
          </div>
        )
      }
    },
    {
      key: 'totalProjects',
      label: 'Projects',
      render: (value, row) => value || row.total_projects || 0
    },
    {
      key: 'totalInvoiced',
      label: 'Total invoiced',
      render: (value, row) => {
        const amount = row.totalInvoiced || 0
        return <span className="text-sm text-primary-text">${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      },
    },
    {
      key: 'paymentReceived',
      label: 'Payment Received',
      render: (value, row) => {
        const amount = row.paymentReceived || 0
        return <span className="text-sm text-primary-text">${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      },
    },
    {
      key: 'due',
      label: 'Due',
      render: (value, row) => {
        const amount = row.due || 0
        return <span className="text-sm text-primary-text">${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      },
    },
  ]

  const handleSelectClient = (clientId) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    )
  }

  const handleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([])
    } else {
      setSelectedClients(clients.map(c => c.id))
    }
  }

  const handleBulkEmail = () => {
    if (selectedClients.length === 0) {
      alert('Please select at least one client')
      return
    }
    setIsBulkEmailModalOpen(true)
  }

  const handleAdd = () => {
    setFormData({
      companyName: '',
      email: '',
      password: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      phoneCountryCode: '+1',
      phoneNumber: '',
      website: '',
      vatNumber: '',
      gstNumber: '',
      currency: 'USD',
      currencySymbol: '',
      disableOnlinePayment: false,
    })
    setIsAddModalOpen(true)
  }

  const handleEdit = async (client) => {
    // Fetch full client details with company_id to ensure all fields are available
    try {
      const validCompanyId = parseInt(companyId, 10)
      if (validCompanyId && !isNaN(validCompanyId) && validCompanyId > 0) {
        const response = await clientsAPI.getById(client.id, { company_id: validCompanyId })
        if (response.data.success) {
          const fullClient = response.data.data
          setSelectedClient(fullClient)
          setFormData({
            companyName: fullClient.company_name || fullClient.companyName || '',
            email: fullClient.email || '',
            password: '', // Don't show password in edit
            address: fullClient.address || '',
            city: fullClient.city || '',
            state: fullClient.state || '',
            zip: fullClient.zip || '',
            country: fullClient.country || 'United States',
            phoneCountryCode: fullClient.phone_country_code || fullClient.phoneCountryCode || '+1',
            phoneNumber: fullClient.phone_number || fullClient.phoneNumber || '',
            website: fullClient.website || '',
            vatNumber: fullClient.vat_number || fullClient.vatNumber || '',
            gstNumber: fullClient.gst_number || fullClient.gstNumber || '',
            currency: fullClient.currency || 'USD',
            currencySymbol: fullClient.currency_symbol || fullClient.currencySymbol || '$',
            disableOnlinePayment: fullClient.disable_online_payment !== undefined ? fullClient.disable_online_payment : (fullClient.disableOnlinePayment || false),
          })

          // Fetch contacts for this client
          try {
            const contactsRes = await clientsAPI.getContacts(fullClient.id, { company_id: validCompanyId })
            if (contactsRes.data.success) {
              setClientContacts(prev => ({
                ...prev,
                [fullClient.id]: contactsRes.data.data || []
              }))
            }
          } catch (error) {
            console.error('Error fetching contacts:', error)
          }

          setIsEditModalOpen(true)
        } else {
          alert('Failed to fetch client details')
        }
      } else {
        alert('Company ID is required. Please login again.')
      }
    } catch (error) {
      console.error('Error fetching client:', error)
      alert('Failed to fetch client details')
    }
  }

  const handleViewClient = (clientId) => {
    navigate(`/app/admin/clients/${clientId}`)
  }

  const handleDelete = async (client) => {
    if (window.confirm(`Are you sure you want to delete ${client.company_name || client.companyName}?`)) {
      try {
        await clientsAPI.delete(client.id, { company_id: companyId })
        await fetchClients()
        alert('Client deleted successfully!')
      } catch (error) {
        console.error('Error deleting client:', error)
        alert(error.response?.data?.error || 'Failed to delete client')
      }
    }
  }

  const handleSave = async () => {
    if (!formData.companyName || formData.companyName.trim() === '') {
      alert('Client Name is required')
      return
    }
    if (isAddModalOpen) {
      if (!formData.email || formData.email.trim() === '') {
        alert('Email is required for new client')
        return
      }
      if (!formData.password || formData.password.trim() === '') {
        alert('Password is required for new client')
        return
      }
    }

    try {
      // Validate companyId before creating/updating
      const validCompanyId = parseInt(companyId, 10)
      if (!validCompanyId || isNaN(validCompanyId) || validCompanyId <= 0) {
        alert('Company ID is required. Please login again.')
        return
      }

      const clientData = {
        client_name: formData.companyName.trim(), // Changed from company_name to client_name
        company_id: validCompanyId, // Auto-set from Admin session
        email: isAddModalOpen ? formData.email.trim() : undefined,
        password: isAddModalOpen ? formData.password : undefined, // Only send password for new clients
        address: formData.address?.trim() || null,
        city: formData.city?.trim() || null,
        state: formData.state?.trim() || null,
        zip: formData.zip?.trim() || null,
        country: formData.country || 'United States',
        phone_country_code: formData.phoneCountryCode || '+1',
        phone_number: formData.phoneNumber?.trim() || null,
        website: formData.website?.trim() || null,
        vat_number: formData.vatNumber?.trim() || null,
        gst_number: formData.gstNumber?.trim() || null,
        currency: formData.currency || 'USD',
        currency_symbol: formData.currencySymbol || '$',
        disable_online_payment: formData.disableOnlinePayment || false,
        status: 'Active',
      }

      if (isEditModalOpen && selectedClient) {
        const response = await clientsAPI.update(selectedClient.id, clientData)
        if (response.data.success) {
          alert('Client updated successfully!')
          await fetchClients()
          setIsEditModalOpen(false)
          setSelectedClient(null)
        } else {
          alert(response.data.error || 'Failed to update client')
        }
      } else {
        console.log('Creating client with data:', { ...clientData, password: '***' })
        const response = await clientsAPI.create(clientData)
        if (response.data.success) {
          // Store created client data for success modal
          const createdClient = response.data.data
          setCreatedClientData({
            id: createdClient.id,
            name: createdClient.company_name || formData.companyName,
            email: formData.email,
            password: formData.password, // Store password before resetting form
            role: 'CLIENT'
          })

          await fetchClients()
          setIsAddModalOpen(false)

          // Reset form
          setFormData({
            companyName: '',
            email: '',
            password: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            country: 'United States',
            phoneCountryCode: '+1',
            phoneNumber: '',
            website: '',
            vatNumber: '',
            gstNumber: '',
            clientGroups: [],
            labels: [],
            currency: 'USD',
            currencySymbol: '',
            disableOnlinePayment: false,
          })
          setShowPassword(false)

          // Show success modal
          setIsSuccessModalOpen(true)
        } else {
          alert(response.data.error || 'Failed to create client')
        }
      }
    } catch (error) {
      console.error('Error saving client:', error)
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      })
      const errorMessage = error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'Failed to save client. Please check your connection and try again.'
      alert(errorMessage)
    }
  }

  const handleAddContact = () => {
    // Determine context: strictly use selectedClient ONLY if we are in a modal that implies a specific client context
    const isClientContext = isEditModalOpen || isViewModalOpen;
    const clientForContact = isClientContext ? selectedClient : null;

    // If no client selected and we're not in a client context, allow user to select client
    if (!clientForContact) {
      // Check if there are any clients available
      if (clients.length === 0) {
        alert('Please add a client first before adding contacts.')
        return
      }
      // Allow user to select client from dropdown in modal
      setContactFormData({
        name: '',
        clientName: '',
        clientId: '',
        jobTitle: '',
        email: '',
        phone: '',
        isPrimary: false,
      })
      setIsContactModalOpen(true)
      return
    }

    setContactFormData({
      name: '',
      clientName: clientForContact?.companyName || clientForContact?.company_name || '',
      clientId: clientForContact?.id || '',
      jobTitle: '',
      email: '',
      phone: '',
      isPrimary: false,
    })
    setIsContactModalOpen(true)
  }

  const handleEditContact = (contact) => {
    setSelectedContact(contact)
    setContactFormData({
      name: contact.name || '',
      clientName: contact.clientName || contact.clientCompanyName || '',
      clientId: contact.clientId || contact.client_id || '',
      jobTitle: contact.jobTitle || contact.job_title || '',
      email: contact.email || '',
      phone: contact.phone || '',
      isPrimary: contact.isPrimary || contact.is_primary || false,
    })
    setIsEditContactModalOpen(true)
  }

  const handleSaveContact = async () => {
    if (!contactFormData.name || !contactFormData.email) {
      alert('Name and Email are required')
      return
    }

    // Get client ID - use selectedClient, clientId from form, or find from edit modal
    let clientId = null
    let clientForContact = selectedClient

    if (contactFormData.clientId) {
      clientId = contactFormData.clientId
      clientForContact = clients.find(c => c.id === clientId) || clientForContact
    } else if (clientForContact) {
      clientId = clientForContact.id
    } else if (isEditModalOpen && selectedClient) {
      clientId = selectedClient.id
      clientForContact = selectedClient
    }

    if (!clientId) {
      alert('Please select a client')
      return
    }

    try {
      const contactData = {
        name: contactFormData.name.trim(),
        job_title: contactFormData.jobTitle?.trim() || null,
        email: contactFormData.email.trim(),
        phone: contactFormData.phone?.trim() || null,
        is_primary: contactFormData.isPrimary || false,
      }

      if (selectedContact && isEditContactModalOpen) {
        // Update existing contact
        await clientsAPI.updateContact(clientId, selectedContact.id, contactData)
        alert('Contact updated successfully!')
        setIsEditContactModalOpen(false)
        setSelectedContact(null)
      } else {
        // Add new contact
        await clientsAPI.addContact(clientId, contactData, { company_id: companyId })
        alert('Contact added successfully!')
        setIsContactModalOpen(false)
      }

      await fetchClients() // Refresh to get updated contacts

      // Reset contact form
      setContactFormData({
        name: '',
        clientName: '',
        clientId: '',
        jobTitle: '',
        email: '',
        phone: '',
        isPrimary: false,
      })

      // Only clear selectedClient if we're not in edit/view mode
      if (!isEditModalOpen && !isViewModalOpen) {
        setSelectedClient(null)
      }
    } catch (error) {
      console.error('Error saving contact:', error)
      alert(error.response?.data?.error || 'Failed to save contact')
    }
  }

  const handleDeleteContact = async (contact) => {
    if (!contact || !contact.id) {
      console.error('Invalid contact data:', contact)
      return
    }

    if (window.confirm(`Delete contact ${contact.name}?`)) {
      try {
        // Find the client ID from the contact
        const clientId = contact.clientId || contact.client_id
        if (!clientId) {
          alert('Client ID not found for this contact')
          return
        }

        await clientsAPI.deleteContact(clientId, contact.id)
        await fetchClients() // Refresh to update contacts
        alert('Contact deleted successfully!')
      } catch (error) {
        console.error('Error deleting contact:', error)
        alert(error.response?.data?.error || 'Failed to delete contact')
      }
    }
  }

  const actions = (row) => (
    <div className="flex items-center justify-end gap-1 sm:gap-2">
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (row && row.id) {
            handleViewClient(row.id)
          } else {
            console.error('Invalid row data:', row)
          }
        }}
        className="p-1.5 sm:p-2 text-primary-accent hover:bg-primary-accent hover:bg-opacity-10 rounded transition-colors"
        title="View"
        type="button"
      >
        <IoEye size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (row && row.id) {
            handleEdit(row)
          } else {
            console.error('Invalid row data:', row)
          }
        }}
        className="p-1.5 sm:p-2 text-warning hover:bg-warning hover:bg-opacity-10 rounded transition-colors"
        title="Edit"
        type="button"
      >
        <IoCreate size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (row && row.id) {
            handleDelete(row)
          } else {
            console.error('Invalid row data:', row)
          }
        }}
        className="p-1.5 sm:p-2 text-danger hover:bg-danger hover:bg-opacity-10 rounded transition-colors"
        title="Delete"
        type="button"
      >
        <IoTrash size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
    </div>
  )

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 border-b-2 border-gray-200">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 font-medium transition-colors ${activeTab === 'overview'
                  ? 'text-primary-accent border-b-2 border-primary-accent -mb-[2px]'
                  : 'text-secondary-text hover:text-primary-text'
                  }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('clients')}
                className={`px-4 py-2 font-medium transition-colors ${activeTab === 'clients'
                  ? 'text-primary-accent border-b-2 border-primary-accent -mb-[2px]'
                  : 'text-secondary-text hover:text-primary-text'
                  }`}
              >
                Clients
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-4 py-2 font-medium transition-colors ${activeTab === 'contacts'
                  ? 'text-primary-accent border-b-2 border-primary-accent -mb-[2px]'
                  : 'text-secondary-text hover:text-primary-text'
                  }`}
              >
                Contacts
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsManageLabelsModalOpen(true)}
              className="flex items-center gap-2"
            >
              <IoPricetag size={16} />
              <span className="hidden sm:inline">Manage labels</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center gap-2 hover:bg-gray-800 hover:text-white hover:border-gray-800"
            >
              <IoDownload size={16} />
              <span className="hidden sm:inline">Import clients</span>
            </Button>
            <AddButton onClick={handleAdd} label="Add client" />
          </div>
        </div>

      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-sm font-medium text-primary-text">Filters:</span>
              {/* Date Range */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-xs sm:text-sm border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
              </select>
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-xs sm:text-sm border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {/* Owner Filter */}
              <select
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-xs sm:text-sm border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              >
                <option value="">All Owners</option>
                {employees.map(emp => (
                  <option key={emp.user_id || emp.id} value={emp.user_id || emp.id}>
                    {emp.name || emp.email}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          {/* Stats Cards - Fully Responsive Grid */}
          {overviewLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="p-4">
                  <div className="h-14 bg-gray-200 rounded animate-pulse" />
                </Card>
              ))}
            </div>
          ) : overviewData ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <Card
                className="p-4 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                onClick={() => {
                  setActiveTab('clients')
                  setStatusFilter('')
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xs font-medium text-secondary-text">Total Clients</h3>
                  <IoStatsChart className="text-primary-accent flex-shrink-0" size={16} />
                </div>
                <p className="text-xl font-bold text-primary-text">{overviewData.totals.total_clients}</p>
              </Card>
              <Card
                className="p-4 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                onClick={() => {
                  setActiveTab('clients')
                  setStatusFilter('Active')
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xs font-medium text-secondary-text">Active</h3>
                  <IoCheckmarkCircle className="text-green-500 flex-shrink-0" size={16} />
                </div>
                <p className="text-xl font-bold text-green-600">{overviewData.totals.active_clients}</p>
              </Card>
              <Card
                className="p-4 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                onClick={() => {
                  setActiveTab('clients')
                  setStatusFilter('Inactive')
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xs font-medium text-secondary-text">Inactive</h3>
                  <IoCloseCircle className="text-red-500 flex-shrink-0" size={16} />
                </div>
                <p className="text-xl font-bold text-red-600">{overviewData.totals.inactive_clients}</p>
              </Card>
              <Card className="p-4 overflow-hidden">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xs font-medium text-secondary-text">Total Revenue</h3>
                  <IoCash className="text-green-500 flex-shrink-0" size={16} />
                </div>
                <p className="text-base lg:text-lg font-bold text-primary-text break-all">
                  ${(overviewData.revenue.total_revenue || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </Card>
              <Card className="p-4 overflow-hidden">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xs font-medium text-secondary-text whitespace-nowrap">Payment Received</h3>
                  <IoCheckmarkCircle className="text-blue-500 flex-shrink-0" size={16} />
                </div>
                <p className="text-base lg:text-lg font-bold text-blue-600 break-all">
                  ${(overviewData.revenue.payment_received || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </Card>
              <Card className="p-4 overflow-hidden">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xs font-medium text-secondary-text">Outstanding</h3>
                  <IoTrendingDown className="text-orange-500 flex-shrink-0" size={16} />
                </div>
                <p className="text-base lg:text-lg font-bold text-orange-600 break-all">
                  ${(overviewData.revenue.outstanding_amount || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <Card className="p-4 overflow-hidden">
                <h3 className="text-xs font-medium text-secondary-text mb-2">Total Clients</h3>
                <p className="text-xl font-bold text-primary-text">{clients.length}</p>
              </Card>
              <Card className="p-4 overflow-hidden">
                <h3 className="text-xs font-medium text-secondary-text mb-2">Active</h3>
                <p className="text-xl font-bold text-green-600">{clients.filter(c => c.status === 'Active').length}</p>
              </Card>
              <Card className="p-4 overflow-hidden">
                <h3 className="text-xs font-medium text-secondary-text mb-2">Inactive</h3>
                <p className="text-xl font-bold text-red-600">{clients.filter(c => c.status === 'Inactive').length}</p>
              </Card>
              <Card className="p-4 overflow-hidden">
                <h3 className="text-xs font-medium text-secondary-text mb-2">Total Revenue</h3>
                <p className="text-base lg:text-lg font-bold text-primary-text break-all">
                  ${clients.reduce((sum, c) => sum + (c.totalInvoiced || 0), 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </Card>
              <Card className="p-4 overflow-hidden">
                <h3 className="text-xs font-medium text-secondary-text mb-2">Payment Received</h3>
                <p className="text-base lg:text-lg font-bold text-blue-600 break-all">
                  ${clients.reduce((sum, c) => sum + (c.paymentReceived || 0), 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </Card>
              <Card className="p-4 overflow-hidden">
                <h3 className="text-xs font-medium text-secondary-text mb-2">Outstanding</h3>
                <p className="text-base lg:text-lg font-bold text-orange-600 break-all">
                  ${clients.reduce((sum, c) => sum + (c.due || 0), 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </Card>
            </div>
          )}

          {/* Charts Row */}
          {overviewData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Client Growth Chart */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-primary-text">Client Growth</h3>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveTab('clients')}
                    className="text-sm"
                  >
                    View All
                  </Button>
                </div>
                {overviewData.client_growth && overviewData.client_growth.length > 0 ? (
                  <div className="h-64">
                    <BarChart
                      data={overviewData.client_growth.map(g => ({ name: g.month, value: g.count }))}
                      dataKey="value"
                      name="Clients"
                      height={250}
                      color="#0073EA"
                    />
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-secondary-text">
                    No growth data available
                  </div>
                )}
              </Card>

              {/* Active vs Inactive Chart */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-primary-text">Client Status</h3>
                </div>
                {overviewData.totals ? (
                  <div className="h-64">
                    <DonutChart
                      data={[
                        { name: 'Active', value: overviewData.totals.active_clients },
                        { name: 'Inactive', value: overviewData.totals.inactive_clients },
                      ]}
                      height={250}
                    />
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-secondary-text">
                    No status data available
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* Revenue by Client & Assigned Users */}
          {overviewData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Revenue by Client */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-primary-text mb-4">Top Clients by Revenue</h3>
                {overviewData.revenue_by_client && overviewData.revenue_by_client.length > 0 ? (
                  <div className="space-y-3">
                    {overviewData.revenue_by_client.slice(0, 5).map((client) => (
                      <div
                        key={client.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => handleViewClient(client.id)}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-primary-text">{client.company_name}</p>
                          <p className="text-xs text-secondary-text">${client.total_revenue.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-600">${client.payment_received.toLocaleString()}</p>
                          <p className="text-xs text-secondary-text">Paid</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary-text">No revenue data available</p>
                )}
              </Card>

              {/* Assigned Users */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-primary-text mb-4">Assigned Users</h3>
                {overviewData.assigned_users && overviewData.assigned_users.length > 0 ? (
                  <div className="space-y-3">
                    {overviewData.assigned_users.slice(0, 5).map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => {
                          setActiveTab('clients')
                          setOwnerFilter(user.id.toString())
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-accent/20 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary-accent">
                              {user.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-primary-text">{user.name}</p>
                            <p className="text-xs text-secondary-text">{user.email}</p>
                          </div>
                        </div>
                        <Badge variant="info">{user.clients_count} clients</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary-text">No assigned users</p>
                )}
              </Card>
            </div>
          )}

          {/* Recent Clients & Recent Activity */}
          {overviewData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Recent Clients */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-primary-text">Recent Clients</h3>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveTab('clients')}
                    className="text-sm"
                  >
                    View All
                  </Button>
                </div>
                {overviewData.recent_clients && overviewData.recent_clients.length > 0 ? (
                  <div className="space-y-3">
                    {overviewData.recent_clients.map((client) => (
                      <div
                        key={client.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => handleViewClient(client.id)}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-primary-text">{client.company_name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={client.status === 'Active' ? 'success' : 'warning'} className="text-xs">
                              {client.status}
                            </Badge>
                            <span className="text-xs text-secondary-text">
                              {new Date(client.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-primary-text">${client.total_invoiced.toLocaleString()}</p>
                          <p className="text-xs text-secondary-text">{client.total_invoices} invoices</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary-text">No recent clients</p>
                )}
              </Card>

              {/* Recent Activity */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-primary-text mb-4">Recent Activity</h3>
                {overviewData.recent_activity && overviewData.recent_activity.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {overviewData.recent_activity.map((activity, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => {
                          if (activity.related_type === 'client') {
                            handleViewClient(activity.related_id)
                          }
                        }}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.activity_type === 'client_created' ? 'bg-blue-100' :
                          activity.activity_type === 'invoice_created' ? 'bg-green-100' :
                            'bg-purple-100'
                          }`}>
                          {activity.activity_type === 'client_created' ? <IoPerson size={16} className="text-blue-600" /> :
                            activity.activity_type === 'invoice_created' ? <IoDocumentText size={16} className="text-green-600" /> :
                              <IoCash size={16} className="text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-primary-text">{activity.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-secondary-text">{activity.user_name || 'System'}</span>
                            <span className="text-xs text-secondary-text">•</span>
                            <span className="text-xs text-secondary-text">
                              {new Date(activity.activity_date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary-text">No recent activity</p>
                )}
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Clients Tab */}
      {activeTab === 'clients' && (
        <div className="w-full overflow-x-auto">
          <DataTable
            columns={clientColumns}
            data={clients.filter(c => {
              // Search filter
              if (searchQuery) {
                const query = searchQuery.toLowerCase()
                const matchesSearch =
                  (c.companyName || c.company_name || '').toLowerCase().includes(query) ||
                  (c.city || '').toLowerCase().includes(query) ||
                  (c.phoneNumber || c.phone_number || '').toLowerCase().includes(query) ||
                  (c.email || '').toLowerCase().includes(query)
                if (!matchesSearch) return false
              }
              // Status filter from overview
              if (statusFilter && c.status !== statusFilter) return false
              // Owner filter from overview
              if (ownerFilter && c.owner_id?.toString() !== ownerFilter) return false
              return true
            })}
            searchPlaceholder="Search clients..."
            filterConfig={[
              { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
              { key: 'city', label: 'City', type: 'text' },
              { key: 'phoneNumber', label: 'Phone', type: 'text' },
            ]}
            actions={actions}
            bulkActions={true}
            selectedRows={selectedClients}
            onSelectAll={handleSelectAll}
            loading={loading}
            onRowClick={(row) => handleViewClient(row.id)}
          />
        </div>
      )}

      {/* Contacts Tab */}
      {activeTab === 'contacts' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-primary-text">Contacts</h2>
              <p className="text-sm text-secondary-text mt-1">Manage all client contacts</p>
            </div>
            <Button
              variant="primary"
              onClick={() => {
                if (clients.length === 0) {
                  alert('Please add a client first before adding contacts.')
                  return
                }
                handleAddContact()
              }}
              className="flex items-center gap-2"
            >
              <IoPersonAdd size={18} />
              Add Contact
            </Button>
          </div>

          {/* Contacts Table */}
          {contactsToDisplay.length === 0 ? (
            <Card className="p-6">
              <div className="text-center py-8">
                <IoPerson size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-secondary-text">No contacts found</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (clients.length === 0) {
                      alert('Please add a client first before adding contacts.')
                      return
                    }
                    handleAddContact()
                  }}
                  className="mt-4 flex items-center gap-2 mx-auto"
                >
                  <IoPersonAdd size={18} />
                  Add First Contact
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-0 overflow-hidden">
              {/* Mobile: Cards View */}
              <div className="block sm:hidden">
                <div className="space-y-3 p-4">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <IoPerson className="text-gray-500" size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-primary-text">{contact.name}</p>
                            <p className="text-xs text-secondary-text">{contact.jobTitle || contact.job_title || 'No title'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEditContact(contact)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                          >
                            <IoCreate size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteContact(contact)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <IoTrash size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-secondary-text">Client:</span>
                          <button
                            onClick={() => contact.clientId && handleViewClient(contact.clientId)}
                            className="text-blue-600 hover:underline"
                          >
                            {contact.clientName || contact.clientCompanyName}
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-secondary-text">Email:</span>
                          <a href={`mailto:${contact.email}`} className="text-primary-text">{contact.email}</a>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center gap-2">
                            <span className="text-secondary-text">Phone:</span>
                            <a href={`tel:${contact.phone}`} className="text-primary-text">{contact.phone}</a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop: Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <DataTable
                  columns={[
                    {
                      key: 'name',
                      label: 'Name',
                      render: (value, row) => (
                        <button
                          onClick={() => row.clientId && handleViewClient(row.clientId)}
                          className="text-blue-600 hover:underline text-left"
                        >
                          {value}
                        </button>
                      ),
                    },
                    {
                      key: 'clientName',
                      label: 'Client',
                      render: (value, row) => (
                        <button
                          onClick={() => row.clientId && handleViewClient(row.clientId)}
                          className="text-blue-600 hover:underline text-left"
                        >
                          {value || row.clientCompanyName || '-'}
                        </button>
                      ),
                    },
                    { key: 'jobTitle', label: 'Job Title', render: (value, row) => value || row.job_title || '-' },
                    { key: 'email', label: 'Email' },
                    { key: 'phone', label: 'Phone', render: (value) => value || '-' },
                    {
                      key: 'actions',
                      label: 'Actions',
                      render: (_, row) => (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditContact(row)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <IoCreate size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteContact(row)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <IoTrash size={18} />
                          </button>
                        </div>
                      ),
                    },
                  ]}
                  data={filteredContacts}
                  loading={loading}
                  emptyMessage="No contacts found"
                />
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Add/Edit Client Modal */}
      <RightSideModal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setIsEditModalOpen(false)
          setSelectedClient(null)
        }}
        title={isAddModalOpen ? 'Add New Client' : 'Edit Client'}
      >
        <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Company Information */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-primary-text mb-4">Client Information</h3>
            <div className="space-y-4">
              <div>
                {/* Company ID - Hidden field (auto-set from session) */}
                <input type="hidden" name="company_id" value={companyId} />

                <Input
                  label="Client Name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Enter client name"
                  required
                />
              </div>
              {isAddModalOpen && (
                <>
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@example.com"
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-primary-text mb-2">
                      Password <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter password for login"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-text hover:text-primary-text"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <p className="text-xs text-secondary-text mt-1">
                      This password will be used for client login
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Address Details */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
              <IoLocation size={20} />
              Address Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter address"
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Enter city"
                />
                <Input
                  label="State"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="Enter state"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Zip"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  placeholder="Enter zip code"
                />
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-2">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Labels Field */}
              <div className="pt-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Label
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                  >
                    <option value="">Select label</option>
                    {labels.map(labelItem => (
                      <option key={labelItem.name} value={labelItem.name}>
                        {labelItem.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="outline"
                    onClick={() => setIsManageLabelsModalOpen(true)}
                    className="flex-shrink-0"
                    title="Manage Labels"
                  >
                    <IoPricetag size={18} />
                  </Button>
                </div>
                {labels.length === 0 && (
                  <p className="text-xs text-secondary-text mt-1">No labels found. Add one via the manage button.</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
              <IoCall size={20} />
              Contact Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Phone
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.phoneCountryCode}
                    onChange={(e) => setFormData({ ...formData, phoneCountryCode: e.target.value })}
                    className="w-24 px-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                  >
                    {countryCodes.map(code => (
                      <option key={code} value={code}>{code}</option>
                    ))}
                  </select>
                  <Input
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="201-555-0123"
                    className="flex-1"
                  />
                </div>
              </div>
              <Input
                label="Website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
                icon={IoGlobe}
              />
            </div>
          </div>

          {/* Tax & Registration */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
              <IoDocumentText size={20} />
              Tax & Registration
            </h3>
            <div className="space-y-4">
              <Input
                label="VAT Number"
                value={formData.vatNumber}
                onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                placeholder="Enter VAT number"
              />
              <Input
                label="GST Number"
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                placeholder="Enter GST number"
              />
            </div>
          </div>

          {/* Contacts Section */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary-text flex items-center gap-2">
                <IoPersonAdd size={20} />
                Contacts
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Set selected client for contact modal
                  if (isEditModalOpen && selectedClient) {
                    setSelectedClient(selectedClient)
                  }
                  handleAddContact()
                }}
                className="flex items-center gap-2"
              >
                <IoPersonAdd size={16} />
                Add Contact
              </Button>
            </div>
            <div className="space-y-2">
              {((isEditModalOpen && selectedClient && clientContacts[selectedClient.id]) || []).length > 0 ? (
                (clientContacts[selectedClient?.id] || []).map(contact => (
                  <div key={contact.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-primary-text">{contact.name}</p>
                      <p className="text-sm text-secondary-text">
                        {contact.job_title || contact.jobTitle || 'No title'} • {contact.email}
                        {contact.phone && ` • ${contact.phone}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {contact.is_primary && (
                        <Badge variant="success" className="text-xs">Primary</Badge>
                      )}
                      <button
                        onClick={() => handleDeleteContact({ ...contact, clientId: selectedClient.id })}
                        className="p-1 text-gray-400 hover:text-danger transition-colors"
                        title="Delete contact"
                      >
                        <IoTrash size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-secondary-text text-center py-4">
                  {isEditModalOpen ? 'No contacts added yet. Click "Add Contact" to add one.' : 'Save the client first, then add contacts.'}
                </p>
              )}
            </div>
          </div>

          {/* Billing Preferences */}
          <div className="pb-4">
            <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
              <IoCash size={20} />
              Billing Preferences
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
              <Input
                label="Currency Symbol"
                value={formData.currencySymbol}
                onChange={(e) => setFormData({ ...formData, currencySymbol: e.target.value })}
                placeholder="Keep it blank to use the default ($)"
                helperText="Keep it blank to use the default ($)"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="disableOnlinePayment"
                  checked={formData.disableOnlinePayment}
                  onChange={(e) => setFormData({ ...formData, disableOnlinePayment: e.target.checked })}
                  className="w-4 h-4 text-primary-accent rounded focus:ring-primary-accent"
                />
                <label htmlFor="disableOnlinePayment" className="text-sm font-medium text-primary-text">
                  Disable Online Payment
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 pt-4 border-t border-gray-200 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false)
                setIsEditModalOpen(false)
              }}
              className="px-4 text-gray-900 hover:text-white min-w-[100px]"
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} className="px-4 min-w-[120px]">
              {isAddModalOpen ? 'Save Client' : 'Update Client'}
            </Button>
          </div>
        </div>
      </RightSideModal>

      {/* View Client Modal */}
      <RightSideModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedClient(null)
        }}
        title={selectedClient?.companyName || 'Client Details'}
      >
        {selectedClient && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-primary-text">{selectedClient.companyName || selectedClient.company_name}</h3>
              <Badge variant={(selectedClient.status || 'Active') === 'Active' ? 'success' : 'default'}>
                {selectedClient.status || 'Active'}
              </Badge>
            </div>

            {/* Company Information */}
            <div>
              <h4 className="font-semibold text-primary-text mb-3">Company Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-secondary-text">Email</label>
                  <p className="text-primary-text font-medium">{selectedClient.email || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-semibold text-primary-text mb-3">Address</h4>
              <p className="text-sm text-primary-text">
                {selectedClient.address || ''}, {selectedClient.city || ''}, {selectedClient.state || ''} {selectedClient.zip || ''}
                <br />
                {selectedClient.country || ''}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-primary-text mb-3">Contact</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-secondary-text">Phone:</span> {selectedClient.phoneCountryCode || selectedClient.phone_country_code || ''} {selectedClient.phoneNumber || selectedClient.phone_number || '-'}</p>
                {(selectedClient.website) && (
                  <p><span className="text-secondary-text">Website:</span> <a href={selectedClient.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedClient.website}</a></p>
                )}
              </div>
            </div>

            {/* Contacts List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-primary-text">Contacts</h4>
                <Button variant="outline" size="sm" onClick={handleAddContact}>
                  <IoPersonAdd size={16} />
                  Add Contact
                </Button>
              </div>
              <div className="space-y-2">
                {(clientContacts[selectedClient?.id] || []).length > 0 ? (
                  (clientContacts[selectedClient.id] || []).map(contact => (
                    <div key={contact.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-primary-text">{contact.name}</p>
                        <p className="text-sm text-secondary-text">
                          {contact.job_title || contact.jobTitle || 'No title'} • {contact.email}
                          {contact.phone && ` • ${contact.phone}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {contact.is_primary && (
                          <Badge variant="success" className="text-xs">Primary</Badge>
                        )}
                        <button
                          onClick={() => handleDeleteContact({ ...contact, clientId: selectedClient.id })}
                          className="p-1 text-gray-400 hover:text-danger transition-colors"
                          title="Delete contact"
                        >
                          <IoTrash size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-secondary-text text-center py-4">
                    No contacts added yet. Click "Add Contact" to add one.
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => {
                  setIsViewModalOpen(false)
                  handleEdit(selectedClient)
                }}
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsViewModalOpen(false)
                  setIsEmailModalOpen(true)
                }}
                className="flex-1"
              >
                Send Email
              </Button>
            </div>
          </div>
        )}
      </RightSideModal>

      {/* Add/Edit Contact Modal */}
      <Modal
        isOpen={isContactModalOpen || isEditContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false)
          setIsEditContactModalOpen(false)
          setSelectedContact(null)
          setContactFormData({
            name: '',
            clientName: '',
            clientId: '',
            jobTitle: '',
            email: '',
            phone: '',
            isPrimary: false,
          })
        }}
        title={isEditContactModalOpen ? 'Edit Contact' : 'Add Contact'}
      >
        <div className="space-y-4">
          {/* Client Selection - Only show if no client is selected */}
          {!selectedClient && (
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Select Client <span className="text-danger">*</span>
              </label>
              <select
                value={contactFormData.clientId || ''}
                onChange={(e) => {
                  const clientId = parseInt(e.target.value)
                  const client = clients.find(c => c.id === clientId)
                  setContactFormData({
                    ...contactFormData,
                    clientId: clientId,
                    clientName: client?.companyName || client?.company_name || ''
                  })
                  setSelectedClient(client)
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                required
              >
                <option value="">-- Select Client --</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.companyName || client.company_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedClient && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-secondary-text">Client:</p>
              <p className="font-medium text-primary-text">{selectedClient.companyName || selectedClient.company_name}</p>
            </div>
          )}

          <Input
            label="Name"
            value={contactFormData.name}
            onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
            placeholder="Enter contact name"
            required
          />
          <Input
            label="Job Title"
            value={contactFormData.jobTitle}
            onChange={(e) => setContactFormData({ ...contactFormData, jobTitle: e.target.value })}
            placeholder="e.g., CEO, Manager"
          />
          <Input
            label="Email"
            type="email"
            value={contactFormData.email}
            onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
            placeholder="contact@example.com"
            required
          />
          <Input
            label="Phone"
            value={contactFormData.phone}
            onChange={(e) => setContactFormData({ ...contactFormData, phone: e.target.value })}
            placeholder="+1 234-567-8900"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPrimary"
              checked={contactFormData.isPrimary}
              onChange={(e) => setContactFormData({ ...contactFormData, isPrimary: e.target.checked })}
              className="w-4 h-4 text-primary-accent rounded focus:ring-primary-accent"
            />
            <label htmlFor="isPrimary" className="text-sm font-medium text-primary-text">
              Set as Primary Contact
            </label>
          </div>
          <div className="flex gap-3 pt-4 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsContactModalOpen(false)
                setIsEditContactModalOpen(false)
                setSelectedContact(null)
                setSelectedClient(null)
                setContactFormData({
                  name: '',
                  clientName: '',
                  clientId: '',
                  jobTitle: '',
                  email: '',
                  phone: '',
                  isPrimary: false,
                })
              }}
              className="px-4"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveContact}
              className="px-4"
              disabled={!selectedClient && !contactFormData.clientId}
            >
              Save Contact
            </Button>
          </div>
        </div>
      </Modal>

      {/* Manage Labels Modal */}
      <Modal
        isOpen={isManageLabelsModalOpen}
        onClose={() => setIsManageLabelsModalOpen(false)}
        title="Manage labels"
        size="sm"
      >
        <div className="space-y-6">
          {/* Color selection row */}
          <div className="flex flex-wrap gap-2 justify-center py-2">
            {[
              '#22c55e', '#10b981', '#3b82f6', '#6366f1', '#94a3b8',
              '#eab308', '#f97316', '#ef4444', '#ec4899', '#8b5cf6',
              '#06b6d4', '#14b8a6'
            ].map((color) => (
              <button
                key={color}
                onClick={() => setNewLabelColor(color)}
                className={`w-5 h-5 rounded transition-all transform hover:scale-110 ${newLabelColor === color ? 'ring-2 ring-offset-2 ring-primary-accent scale-110 shadow-sm' : ''}`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Label"
              className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent/20 focus:border-primary-accent transition-all"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleAddLabel()
              }}
            />
            <Button
              variant="primary"
              onClick={handleAddLabel}
              disabled={!newLabel.trim()}
              className="flex items-center gap-2 px-4 shadow-sm"
            >
              <IoCheckmarkCircle size={18} />
              Save
            </Button>
          </div>

          {/* Existing Labels Pills */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {labels.length === 0 ? (
                <p className="text-sm text-secondary-text italic py-2">No labels added yet</p>
              ) : (
                labels.map((label, index) => (
                  <div
                    key={index}
                    className="group relative flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-semibold shadow-sm transition-all hover:pr-8"
                    style={{ backgroundColor: label.color }}
                  >
                    {label.name}
                    <button
                      onClick={() => handleDeleteLabel(label.name)}
                      className="absolute right-1 p-1 text-white/80 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete Label"
                    >
                      <IoClose size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              onClick={() => setIsManageLabelsModalOpen(false)}
              className="flex items-center gap-2 text-gray-600 border-gray-200 hover:bg-gray-50"
            >
              <IoClose size={18} />
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Excel Export Modal */}
      <Modal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        title="Export to Excel"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-secondary-text">Export client data to Excel format</p>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gray-300" />
              <span className="text-sm text-primary-text">Include all columns</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gray-300" />
              <span className="text-sm text-primary-text">Include contacts</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-primary-text">Include custom fields</span>
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsExcelModalOpen(false)}
              className="flex-1"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert('Excel export started!')
                setIsExcelModalOpen(false)
              }}
              className="flex-1"
              size="sm"
            >
              Export
            </Button>
          </div>
        </div>
      </Modal>

      {/* Print Modal */}
      <Modal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        title="Print Clients"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-secondary-text">Print client list</p>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="printType" value="list" defaultChecked className="rounded border-gray-300" />
              <span className="text-sm text-primary-text">Print List View</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="printType" value="details" className="rounded border-gray-300" />
              <span className="text-sm text-primary-text">Print with Details</span>
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsPrintModalOpen(false)}
              className="flex-1"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                window.print()
                setIsPrintModalOpen(false)
              }}
              className="flex-1"
              size="sm"
            >
              Print
            </Button>
          </div>
        </div>
      </Modal>

      {/* Import Contacts Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import Contacts"
        size="sm"
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <IoDownload className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-sm text-secondary-text mb-1">Drag & drop CSV file here or click to browse</p>
            <p className="text-xs text-secondary-text">Supports: CSV, XLS, XLSX</p>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsImportModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert('Import started!')
                setIsImportModalOpen(false)
              }}
              className="flex-1"
            >
              Import
            </Button>
          </div>
        </div>
      </Modal>

      {/* Bulk Email Modal */}
      <Modal
        isOpen={isBulkEmailModalOpen}
        onClose={() => setIsBulkEmailModalOpen(false)}
        title={`Bulk Email to ${selectedClients.length} Clients`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Recipients ({selectedClients.length} selected)
            </label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 max-h-32 overflow-y-auto">
              {clients.filter(c => selectedClients.includes(c.id)).map(client => {
                const contacts = clientContacts[client.id] || []
                return (
                  <div key={client.id} className="text-sm text-secondary-text">
                    {client.company_name || client.companyName} &lt;{contacts[0]?.email || 'no-email'}&gt;
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Email Template
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none">
              <option>Select template...</option>
              <option>Follow-up Email</option>
              <option>Proposal Email</option>
              <option>Welcome Email</option>
            </select>
          </div>
          <Input label="Subject" placeholder="Enter email subject" />
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Message
            </label>
            <textarea
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter your message..."
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsBulkEmailModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert(`Email sent to ${selectedClients.length} clients successfully!`)
                setIsBulkEmailModalOpen(false)
                setSelectedClients([])
              }}
              className="flex-1"
            >
              Send Email
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Modal - Show Client Credentials */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false)
          setCreatedClientData(null)
        }}
        title="Client Created Successfully!"
        size="md"
      >
        {createdClientData && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <IoCheckmarkCircle size={40} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-primary-text mb-2">
                Client has been created successfully!
              </h3>
              <p className="text-sm text-secondary-text">
                Please save these login credentials for the client.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 space-y-4 border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-300 pb-3">
                <span className="text-sm font-semibold text-secondary-text">Client Name:</span>
                <span className="text-base font-bold text-primary-text">{createdClientData.name}</span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-300 pb-3">
                <span className="text-sm font-semibold text-secondary-text">Client ID:</span>
                <span className="text-base font-bold text-primary-accent">#{createdClientData.id}</span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-300 pb-3">
                <span className="text-sm font-semibold text-secondary-text">Email:</span>
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-primary-text break-all max-w-[200px]">{createdClientData.email}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(createdClientData.email)
                      alert('Email copied to clipboard!')
                    }}
                    className="p-1.5 text-primary-accent hover:bg-primary-accent hover:bg-opacity-10 rounded transition-colors"
                    title="Copy Email"
                  >
                    <IoDocumentText size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-gray-300 pb-3">
                <span className="text-sm font-semibold text-secondary-text">Password:</span>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-primary-text font-mono bg-white px-3 py-1 rounded border border-gray-300">{createdClientData.password}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(createdClientData.password)
                      alert('Password copied to clipboard!')
                    }}
                    className="p-1.5 text-primary-accent hover:bg-primary-accent hover:bg-opacity-10 rounded transition-colors"
                    title="Copy Password"
                  >
                    <IoDocumentText size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-secondary-text">Role:</span>
                <Badge variant="success" className="text-sm px-3 py-1">{createdClientData.role}</Badge>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <IoDocumentText size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">Important:</p>
                  <p className="text-xs text-blue-800">
                    These credentials will be used by the client to log in to their dashboard.
                    Please save or share these details securely with the client. The password cannot be retrieved later.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  // Copy all credentials to clipboard
                  const credentials = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT LOGIN CREDENTIALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Client Name: ${createdClientData.name}
Client ID: #${createdClientData.id}
Email: ${createdClientData.email}
Password: ${createdClientData.password}
Role: ${createdClientData.role}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please share these credentials securely with the client.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
                  navigator.clipboard.writeText(credentials)
                  alert('✅ All credentials copied to clipboard!')
                }}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <IoDocumentText size={18} />
                Copy All Credentials
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsSuccessModalOpen(false)
                  setCreatedClientData(null)
                }}
                className="flex-1"
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Clients
