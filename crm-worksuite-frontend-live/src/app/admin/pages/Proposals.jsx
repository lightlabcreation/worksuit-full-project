import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AddButton from '../../../components/ui/AddButton'
import DataTable from '../../../components/ui/DataTable'
import RightSideModal from '../../../components/ui/RightSideModal'
import Badge from '../../../components/ui/Badge'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import { proposalsAPI, clientsAPI, projectsAPI, companiesAPI, itemsAPI } from '../../../api'
import Modal from '../../../components/ui/Modal'
import { 
  IoAdd,
  IoSearch,
  IoFilter,
  IoDownload,
  IoChevronDown,
  IoChevronUp,
  IoEllipsisVertical,
  IoCheckmarkCircle,
  IoTrash,
  IoCreate,
  IoEye,
  IoDocumentText,
  IoClose,
  IoCalendar,
  IoGrid,
  IoList,
  IoPrint,
  IoCopy,
  IoOpenOutline,
  IoMailOutline,
  IoCreateOutline,
  IoHappyOutline,
  IoRefresh,
  IoStorefront,
  IoCheckmark
} from 'react-icons/io5'

const Proposals = () => {
  const navigate = useNavigate()
  // Get company_id from localStorage - auto-set for all operations
  const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
  
  const [viewMode, setViewMode] = useState('list') // 'list' or 'grid'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [clientFilter, setClientFilter] = useState('')
  const [projectFilter, setProjectFilter] = useState('')
  const [startDateFilter, setStartDateFilter] = useState('')
  const [endDateFilter, setEndDateFilter] = useState('')
  const [amountMinFilter, setAmountMinFilter] = useState('')
  const [amountMaxFilter, setAmountMaxFilter] = useState('')
  const [createdByFilter, setCreatedByFilter] = useState('')
  const [quickFilter, setQuickFilter] = useState('All') // All, Draft, Edit, Mail
  const [sortColumn, setSortColumn] = useState('created_at')
  const [sortDirection, setSortDirection] = useState('DESC')
  const [proposals, setProposals] = useState([])
  const [companies, setCompanies] = useState([])
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([]) // Clients filtered by company
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([]) // Projects filtered by client
  const [loading, setLoading] = useState(true)
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [filterOptions, setFilterOptions] = useState({
    statuses: [],
    clients: [],
    projects: [],
    created_by_users: []
  })
  const [items, setItems] = useState([])
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false)
  const [itemSearchQuery, setItemSearchQuery] = useState('')
  const [itemCategoryFilter, setItemCategoryFilter] = useState('')

  const [formData, setFormData] = useState({
    company_id: companyId, // Auto-set from session
    client_id: '',
    project_id: '',
    valid_till: '',
    status: 'draft',
    description: '',
    note: '',
    terms: '',
    currency: 'USD',
    discount: 0,
    discount_type: '%',
    items: [], // Array of { item_name, description, quantity, unit_price, tax_rate, amount }
  })

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch filter options
  const fetchFilterOptions = useCallback(async () => {
    try {
      const storedUser = localStorage.getItem('user')
      const params = {}
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          if (userData.company_id) {
            params.company_id = userData.company_id
          }
        } catch (e) {
          console.error('Error parsing user data:', e)
        }
      }
      const response = await proposalsAPI.getFilters(params)
      if (response.data.success) {
        setFilterOptions(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching filter options:', error)
    }
  }, [])

  // Fetch functions
  const fetchProposals = useCallback(async () => {
    try {
      setLoading(true)
      // Build query params
      const params = {}
      
      // Search
      if (debouncedSearchQuery) {
        params.search = debouncedSearchQuery
      }
      
      // Status filter
      if (statusFilter && statusFilter !== 'All') {
        params.status = statusFilter.toLowerCase()
      }
      
      // Client filter
      if (clientFilter) {
        params.client_id = clientFilter
      }
      
      // Project filter
      if (projectFilter) {
        params.project_id = projectFilter
      }
      
      // Date range filters
      if (startDateFilter) {
        params.start_date = startDateFilter
      }
      if (endDateFilter) {
        params.end_date = endDateFilter
      }
      
      // Amount range filters
      if (amountMinFilter) {
        params.amount_min = amountMinFilter
      }
      if (amountMaxFilter) {
        params.amount_max = amountMaxFilter
      }
      
      // Created by filter
      if (createdByFilter) {
        params.created_by = createdByFilter
      }
      
      // Sorting
      if (sortColumn) {
        params.sort_by = sortColumn
        params.sort_order = sortDirection
      }
      
      // Get company_id from localStorage or user context
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          if (userData.company_id) {
            params.company_id = userData.company_id
          }
        } catch (e) {
          console.error('Error parsing user data:', e)
        }
      }
      
      const response = await proposalsAPI.getAll(params)
      console.log('Proposals API response:', response)
      console.log('Proposals API response.data:', response.data)
      console.log('Proposals API response.data.data:', response.data?.data)
      console.log('Proposals count:', response.data?.data?.length || 0)
      
      if (response && response.data && response.data.success) {
        const proposalsData = (response.data.data || []).map(est => {
          // Handle status - convert to lowercase for consistency
          const status = (est.status || 'draft').toLowerCase()
          
          // Format estimate_number - ensure it's in PROPOSAL #X format
          let estimateNumber = est.estimate_number || `PROPOSAL #${est.id}`
          if (!estimateNumber.includes('PROPOSAL')) {
            // Extract number from PROP#001 format
            const numMatch = estimateNumber.match(/PROP#?(\d+)/)
            const proposalNum = numMatch ? numMatch[1] : est.id
            estimateNumber = `PROPOSAL #${proposalNum}`
          }
          
          return {
            id: est.id,
            estimate_number: estimateNumber,
            company_id: est.company_id,
            company_name: est.company_name || '--',
            client_id: est.client_id,
            client_name: est.client_name || '--',
            project_id: est.project_id,
            project_name: est.project_name || '--',
            proposal_date: est.created_at || est.proposal_date || '',
            valid_till: est.valid_till || '--',
            last_email_seen: est.last_email_seen || null,
            last_preview_seen: est.last_preview_seen || null,
            status: status,
            description: est.description || '',
            note: est.note || '',
            terms: est.terms || '',
            currency: est.currency || 'USD',
            sub_total: parseFloat(est.sub_total) || 0,
            discount_amount: parseFloat(est.discount_amount) || 0,
            tax_amount: parseFloat(est.tax_amount) || 0,
            total: parseFloat(est.total) || 0,
            items: est.items || [],
          }
        })
        console.log('Transformed proposals data:', proposalsData)
        setProposals(proposalsData)
      } else {
        console.error('Failed to fetch proposals:', response?.data?.error || 'Unknown error')
        setProposals([])
        if (response?.data?.error) {
          alert(response.data.error)
        }
      }
    } catch (error) {
      console.error('Error fetching proposals:', error)
      console.error('Error response:', error.response)
      setProposals([])
      const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch proposals'
      console.error('Error message:', errorMessage)
      // Don't show alert on every error, just log it
    } finally {
      setLoading(false)
    }
  }, [debouncedSearchQuery, statusFilter, clientFilter, projectFilter, startDateFilter, endDateFilter, amountMinFilter, amountMaxFilter, createdByFilter, sortColumn, sortDirection])

  const fetchClients = useCallback(async () => {
    try {
      // Fetch only clients belonging to the logged-in admin's company
      if (!companyId || isNaN(companyId) || companyId <= 0) {
        console.error('Invalid companyId for fetchClients:', companyId)
        setClients([])
        setFilteredClients([])
        return
      }
      const response = await clientsAPI.getAll({ company_id: companyId })
      if (response.data.success) {
        setClients(response.data.data || [])
        setFilteredClients(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
      setClients([])
      setFilteredClients([])
    }
  }, [companyId])

  const fetchCompanies = useCallback(async () => {
    try {
      const response = await companiesAPI.getAll()
      if (response.data.success) {
        setCompanies(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching companies:', error)
    }
  }, [])

  const fetchProjects = useCallback(async () => {
    try {
      // Get company_id from localStorage
      const storedUser = localStorage.getItem('user')
      let companyId = null
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          companyId = userData.company_id
        } catch (e) {
          console.error('Error parsing user data:', e)
        }
      }
      if (!companyId) {
        companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      }
      if (!companyId || isNaN(companyId) || companyId <= 0) {
        console.error('Invalid companyId for fetchProjects:', companyId)
        setProjects([])
        return
      }
      const response = await projectsAPI.getAll({ company_id: companyId })
      if (response.data.success) {
        setProjects(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }, [])

  const fetchItems = useCallback(async () => {
    try {
      const params = { company_id: companyId }
      if (itemCategoryFilter) {
        params.category = itemCategoryFilter
      }
      const response = await itemsAPI.getAll(params)
      if (response.data.success) {
        setItems(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }, [companyId, itemCategoryFilter])

  // Fetch initial data on mount
  useEffect(() => {
    fetchCompanies()
    fetchClients()
    fetchProjects()
    fetchItems()
  }, [fetchCompanies, fetchClients, fetchProjects, fetchItems])

  // Fetch proposals on mount and when statusFilter changes
  // Fetch filter options on mount
  useEffect(() => {
    fetchFilterOptions()
  }, [fetchFilterOptions])

  // Fetch proposals when filters change
  useEffect(() => {
    fetchProposals()
  }, [fetchProposals])

  // Show all clients (no company filter)
  useEffect(() => {
    setFilteredClients(clients)
  }, [clients])

  // Filter projects by client (which is already filtered by company)
  useEffect(() => {
    if (formData.client_id && projects.length > 0) {
      const clientId = parseInt(formData.client_id)
      const filtered = projects.filter(project => {
        const projectClientId = parseInt(project.client_id)
        return projectClientId === clientId
      })
      setFilteredProjects(filtered)
      console.log('Filtering projects for client:', clientId, 'Found:', filtered.length, 'projects')
    } else {
      setFilteredProjects([])
    }
  }, [formData.client_id, projects])

  const handleAdd = async () => {
    // Fetch clients directly and set them
    try {
      const response = await clientsAPI.getAll({ company_id: companyId })
      if (response.data.success) {
        const clientsData = response.data.data || []
        setClients(clientsData)
        setFilteredClients(clientsData)
        console.log('Add Proposal - Loaded clients:', clientsData.length)
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
    
    setFormData({
      company_id: companyId, // Auto-set from session
      client_id: '',
      project_id: '',
      valid_till: '',
      status: 'draft',
      description: '',
      note: '',
      terms: 'Thank you for your business.',
      currency: 'USD',
      discount: 0,
      discount_type: '%',
      items: [{ item_name: '', description: '', quantity: 1, unit_price: 0, tax_rate: 0, amount: 0 }],
    })
    setFilteredProjects([])
    setIsAddModalOpen(true)
  }

  const handleEdit = async (proposal) => {
    try {
      // Fetch clients directly and set them
      const adminCompanyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      try {
        const clientsResponse = await clientsAPI.getAll({ company_id: adminCompanyId })
        if (clientsResponse.data.success) {
          const clientsData = clientsResponse.data.data || []
          setClients(clientsData)
          setFilteredClients(clientsData)
          console.log('Edit Proposal - Loaded clients:', clientsData.length)
        }
      } catch (err) {
        console.error('Error fetching clients:', err)
      }
      
      const response = await proposalsAPI.getById(proposal.id)
      if (response.data.success) {
        const data = response.data.data
        
        setFormData({
          company_id: adminCompanyId.toString(),
          client_id: data.client_id?.toString() || '',
          project_id: data.project_id?.toString() || '',
          valid_till: data.valid_till ? data.valid_till.split('T')[0] : '',
          status: data.status || 'draft',
          description: data.description || '',
          note: data.note || '',
          terms: data.terms || 'Thank you for your business.',
          currency: data.currency || 'USD',
          discount: data.discount || 0,
          discount_type: data.discount_type || '%',
          items: data.items && data.items.length > 0 ? data.items.map(item => ({
            item_name: item.item_name || item.description || '',
            description: item.description || '',
            quantity: item.quantity || 1,
            unit_price: item.unit_price || 0,
            tax_rate: item.tax_rate || 0,
            amount: item.amount || (item.quantity * item.unit_price) || 0,
          })) : [{ item_name: '', description: '', quantity: 1, unit_price: 0, tax_rate: 0, amount: 0 }],
        })
        
        // If client_id exists, fetch projects for that client
        if (data.client_id) {
          try {
            const projectsResponse = await projectsAPI.getAll({ 
              company_id: adminCompanyId, 
              client_id: data.client_id 
            })
            if (projectsResponse.data.success) {
              setFilteredProjects(projectsResponse.data.data || [])
            }
          } catch (err) {
            console.error('Error fetching projects:', err)
          }
        }
        
        setIsEditModalOpen(true)
        setSelectedProposal(proposal)
      }
    } catch (error) {
      console.error('Error fetching proposal:', error)
      alert('Failed to load proposal details')
    }
  }

  const handleView = (proposal) => {
    navigate(`/app/admin/proposals/${proposal.id}`)
  }

  const handleDelete = async (proposal) => {
    if (window.confirm(`Are you sure you want to delete proposal ${proposal.estimate_number || proposal.id}?`)) {
      try {
        // DELETE API - DELETE request
        const response = await proposalsAPI.delete(proposal.id)
        if (response.data.success) {
          alert('Proposal deleted successfully!')
          await fetchProposals()
        } else {
          alert(response.data.error || 'Failed to delete proposal')
        }
      } catch (error) {
        console.error('Error deleting proposal:', error)
        const errorMessage = error.response?.data?.error || error.message || 'Failed to delete proposal'
        alert(errorMessage)
      }
    }
  }

  const handleDuplicate = async (proposal) => {
    try {
      const response = await proposalsAPI.duplicate(proposal.id)
      if (response.data.success) {
        alert('Proposal duplicated successfully!')
        await fetchProposals()
      } else {
        alert(response.data.error || 'Failed to duplicate proposal')
      }
    } catch (error) {
      console.error('Error duplicating proposal:', error)
      const errorMessage = error.response?.data?.error || error.message || 'Failed to duplicate proposal'
      alert(errorMessage)
    }
  }

  const handleStatusChange = async (proposal, newStatus) => {
    try {
      const response = await proposalsAPI.updateStatus(proposal.id, newStatus)
      if (response.data.success) {
        alert(`Proposal status updated to ${newStatus}!`)
        await fetchProposals()
      } else {
        alert(response.data.error || 'Failed to update proposal status')
      }
    } catch (error) {
      console.error('Error updating proposal status:', error)
      const errorMessage = error.response?.data?.error || error.message || 'Failed to update proposal status'
      alert(errorMessage)
    }
  }

  const handleSendEmail = async (proposal) => {
    try {
      const email = prompt('Enter recipient email:', proposal.client_email || '')
      if (!email) return
      
      const response = await proposalsAPI.sendEmail(proposal.id, {
        to: email,
        subject: `Proposal ${proposal.estimate_number}`,
        message: 'Please review the attached proposal.'
      })
      if (response.data.success) {
        alert('Proposal sent successfully!')
        await fetchProposals()
      } else {
        alert(response.data.error || 'Failed to send proposal')
      }
    } catch (error) {
      console.error('Error sending proposal:', error)
      const errorMessage = error.response?.data?.error || error.message || 'Failed to send proposal'
      alert(errorMessage)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-')
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0)
  }

  const handleDownloadExcel = () => {
    try {
      // Create CSV content
      const headers = ['Proposal Number', 'Client', 'Project', 'Valid Until', 'Total', 'Status', 'Created At']
      const rows = filteredProposals.map(proposal => [
        proposal.estimate_number || `PROP#${proposal.id}`,
        proposal.client_name || '-',
        proposal.project_name || '-',
        formatDate(proposal.valid_till),
        proposal.total || 0,
        proposal.status || 'draft',
        formatDate(proposal.created_at)
      ])
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      ].join('\n')
      
      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `proposals_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading Excel:', error)
      alert('Failed to download proposals')
    }
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      alert('Please allow popups to print')
      return
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Proposals Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .text-right { text-align: right; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>Proposals Report</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
        <table>
          <thead>
            <tr>
              <th>Proposal Number</th>
              <th>Client</th>
              <th>Project</th>
              <th>Valid Until</th>
              <th class="text-right">Total</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            ${filteredProposals.map(proposal => `
              <tr>
                <td>${(proposal.estimate_number || `PROP#${proposal.id}`).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
                <td>${(proposal.client_name || '-').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
                <td>${(proposal.project_name || '-').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
                <td>${formatDate(proposal.valid_till)}</td>
                <td class="text-right">${formatCurrency(proposal.total)}</td>
                <td>${(proposal.status || 'draft').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
                <td>${formatDate(proposal.created_at)}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" style="text-align: right; font-weight: bold;">Total:</td>
              <td class="text-right" style="font-weight: bold;">${formatCurrency(filteredProposals.reduce((sum, p) => sum + (parseFloat(p.total) || 0), 0))}</td>
              <td colspan="2"></td>
            </tr>
          </tfoot>
        </table>
      </body>
      </html>
    `
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }

  const handleAddItem = () => {
    // Open the Add Item modal to select from existing items
    setIsAddItemModalOpen(true)
  }

  const handleAddItemFromModal = (item) => {
    // Add selected item to proposal items
    const newItem = {
      item_name: item.title || '',
      description: item.description || '',
      quantity: 1,
      unit_price: parseFloat(item.rate || 0),
      tax_rate: 0,
      amount: parseFloat(item.rate || 0)
    }
    setFormData({
      ...formData,
      items: [...formData.items, newItem]
    })
    setIsAddItemModalOpen(false)
  }

  const handleAddEmptyItem = () => {
    // Add empty item manually
    setFormData({
      ...formData,
      items: [...formData.items, { item_name: '', description: '', quantity: 1, unit_price: 0, tax_rate: 0, amount: 0 }]
    })
  }

  const handleRemoveItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      items: newItems.length > 0 ? newItems : [{ item_name: '', description: '', quantity: 1, unit_price: 0, tax_rate: 0, amount: 0 }]
    })
  }

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items]
    newItems[index][field] = value
    
    // Calculate amount
    if (field === 'quantity' || field === 'unit_price' || field === 'tax_rate') {
      const quantity = parseFloat(newItems[index].quantity || 0)
      const unitPrice = parseFloat(newItems[index].unit_price || 0)
      const taxRate = parseFloat(newItems[index].tax_rate || 0)
      let amount = quantity * unitPrice
      if (taxRate > 0) {
        amount += (amount * taxRate / 100)
      }
      newItems[index].amount = amount
    }
    
    setFormData({ ...formData, items: newItems })
  }

  const calculateTotals = () => {
    const subTotal = formData.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)
    const discount = parseFloat(formData.discount) || 0
    const discountAmount = formData.discount_type === '%' 
      ? (subTotal * discount / 100)
      : discount
    const totalAfterDiscount = subTotal - discountAmount
    const taxAmount = formData.items.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity || 0)
      const unitPrice = parseFloat(item.unit_price || 0)
      const taxRate = parseFloat(item.tax_rate || 0)
      const itemSubtotal = quantity * unitPrice
      return sum + (itemSubtotal * taxRate / 100)
    }, 0)
    const total = totalAfterDiscount + taxAmount
    
    return { subTotal, discountAmount, taxAmount, total }
  }

  const handleSave = async () => {
    // Validation
    if (!formData.client_id) {
      alert('Client is required')
      return
    }
    if (!formData.valid_till) {
      alert('Valid Until Date is required')
      return
    }
    if (!formData.items || formData.items.length === 0 || formData.items.every(item => !item.item_name && !item.description)) {
      alert('At least one item is required')
      return
    }

    try {
      const totals = calculateTotals()
      
      const proposalData = {
        company_id: companyId, // Auto-set from session
        client_id: parseInt(formData.client_id),
        project_id: formData.project_id ? parseInt(formData.project_id) : null,
        valid_till: formData.valid_till,
        status: formData.status || 'draft',
        description: formData.description || null,
        note: formData.note || null,
        terms: formData.terms || 'Thank you for your business.',
        currency: formData.currency || 'USD',
        discount: formData.discount || 0,
        discount_type: formData.discount_type || '%',
        items: formData.items.filter(item => item.item_name || item.description).map(item => ({
          item_name: item.item_name || item.description || '',
          description: item.description || item.item_name || '',
          quantity: parseFloat(item.quantity) || 1,
          unit_price: parseFloat(item.unit_price) || 0,
          tax_rate: parseFloat(item.tax_rate) || 0,
          amount: parseFloat(item.amount) || 0,
        })), // Filter empty items and map to API format
      }

      if (isEditModalOpen && selectedProposal) {
        // UPDATE API - PUT request
        const response = await proposalsAPI.update(selectedProposal.id, proposalData)
        if (response.data.success) {
          alert('Proposal updated successfully!')
          await fetchProposals()
          setIsEditModalOpen(false)
          setSelectedProposal(null)
          // Reset form
          setFormData({
            company_id: '',
            client_id: '',
            project_id: '',
            valid_till: '',
            status: 'draft',
            description: '',
            note: '',
            terms: 'Thank you for your business.',
            currency: 'USD',
            discount: 0,
            discount_type: '%',
            items: [],
          })
          setFilteredClients([])
          setFilteredProjects([])
        } else {
          alert(response.data.error || 'Failed to update proposal')
        }
      } else {
        // CREATE API - POST request
        const response = await proposalsAPI.create(proposalData)
        if (response.data.success) {
          alert('Proposal created successfully!')
          await fetchProposals()
          setIsAddModalOpen(false)
          // Reset form
          setFormData({
            company_id: '',
            client_id: '',
            project_id: '',
            valid_till: '',
            status: 'draft',
            description: '',
            note: '',
            terms: 'Thank you for your business.',
            currency: 'USD',
            discount: 0,
            discount_type: '%',
            items: [],
          })
          setFilteredClients([])
          setFilteredProjects([])
        } else {
          alert(response.data.error || 'Failed to create proposal')
        }
      }
    } catch (error) {
      console.error('Error saving proposal:', error)
      const errorMessage = error.response?.data?.error || error.message || 'Failed to save proposal'
      alert(errorMessage)
    }
  }

  const handleConvertToInvoice = async () => {
    if (!selectedProposal) return
    
    if (window.confirm('Convert this proposal to an invoice?')) {
      try {
        const response = await proposalsAPI.convertToInvoice(selectedProposal.id, {})
        if (response.data.success) {
          alert('Proposal converted to invoice successfully!')
          setIsViewModalOpen(false)
          await fetchProposals()
        } else {
          alert(response.data.error || 'Failed to convert proposal')
        }
      } catch (error) {
        console.error('Error converting proposal:', error)
        alert(error.response?.data?.error || 'Failed to convert proposal')
      }
    }
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toLowerCase()
    return `${dateStr} ${timeStr}`
  }

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')
    } else {
      setSortColumn(column)
      setSortDirection('desc')
    }
  }

  const handleCopy = async (proposal) => {
    await handleDuplicate(proposal)
  }

  const columns = [
    {
      key: 'estimate_number',
      label: 'Proposal',
      render: (value, row) => (
        <button
          onClick={() => handleSort('estimate_number')}
          className="flex items-center gap-1 hover:text-primary-accent font-semibold text-primary-text text-left"
        >
          {value || '--'}
          {sortColumn === 'estimate_number' ? (
            sortDirection === 'desc' ? <IoChevronDown size={14} /> : <IoChevronUp size={14} />
          ) : (
            <IoChevronDown size={14} className="opacity-30" />
          )}
        </button>
      ),
    },
    {
      key: 'client_name',
      label: 'Client',
      render: (value) => (
        <span className="text-primary-text">{value || '-'}</span>
      ),
    },
    {
      key: 'proposal_date',
      label: 'Proposal date',
      render: (value) => (
        <span className="text-primary-text">{formatDate(value)}</span>
      ),
    },
    {
      key: 'valid_till',
      label: 'Valid until',
      render: (value) => (
        <span className="text-primary-text">{formatDate(value)}</span>
      ),
    },
    {
      key: 'last_email_seen',
      label: 'Last email seen',
      render: (value) => (
        <span className="text-primary-text">{value ? formatDateTime(value) : '-'}</span>
      ),
    },
    {
      key: 'last_preview_seen',
      label: 'Last preview seen',
      render: (value) => (
        <span className="text-primary-text">{value ? formatDateTime(value) : '-'}</span>
      ),
    },
    {
      key: 'total',
      label: 'Amount',
      render: (value) => (
        <span className="font-semibold text-primary-text">{formatCurrency(value)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const statusColors = {
          draft: 'bg-gray-100 text-gray-800',
          sent: 'bg-blue-100 text-blue-800',
          accepted: 'bg-blue-100 text-blue-800',
          declined: 'bg-red-100 text-red-800',
        }
        return (
          <Badge className={`text-xs ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value === 'accepted' ? 'Accepted' : value === 'draft' ? 'Draft' : value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Draft'}
          </Badge>
        )
      },
    },
    {
      key: 'actions',
      label: '',
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDuplicate(row)
            }}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="Duplicate"
          >
            <IoCopy size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleView(row)
            }}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="View"
          >
            <IoOpenOutline size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleEdit(row)
            }}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="Edit"
          >
            <IoCreate size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(row)
            }}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <IoTrash size={16} />
          </button>
        </div>
      ),
    },
  ]

  const filteredProposals = proposals.filter(proposal => {
    // Search filter (use debounced search query)
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase()
      if (!proposal.estimate_number?.toLowerCase().includes(query) && 
          !proposal.client_name?.toLowerCase().includes(query) &&
          !proposal.project_name?.toLowerCase().includes(query) &&
          !proposal.id?.toString().includes(query)) {
        return false
      }
    }
    
    // Status filter
    if (statusFilter !== 'All') {
      const proposalStatus = (proposal.status || '').toLowerCase()
      const filterStatus = statusFilter.toLowerCase()
      if (proposalStatus !== filterStatus) {
        return false
      }
    }
    
    // Quick filter
    if (quickFilter === 'Draft') {
      if (proposal.status !== 'draft') return false
    } else if (quickFilter === 'Edit') {
      // Filter for editable proposals (draft or sent)
      if (proposal.status !== 'draft' && proposal.status !== 'sent') return false
    } else if (quickFilter === 'Mail') {
      // Filter for proposals with email activity
      if (!proposal.last_email_seen) return false
    }
    
    return true
  }).sort((a, b) => {
    let aVal = a[sortColumn] || ''
    let bVal = b[sortColumn] || ''
    
    if (sortColumn === 'estimate_number') {
      // Extract number for sorting
      const aNum = parseInt(aVal.toString().replace(/\D/g, '')) || 0
      const bNum = parseInt(bVal.toString().replace(/\D/g, '')) || 0
      return sortDirection === 'desc' ? bNum - aNum : aNum - bNum
    }
    
    if (sortColumn === 'total') {
      return sortDirection === 'desc' ? (bVal || 0) - (aVal || 0) : (aVal || 0) - (bVal || 0)
    }
    
    if (typeof aVal === 'string') aVal = aVal.toLowerCase()
    if (typeof bVal === 'string') bVal = bVal.toLowerCase()
    
    if (sortDirection === 'desc') {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
    } else {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
    }
  })

  const totals = calculateTotals()

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-text">Proposals</h1>
        </div>
        <AddButton onClick={handleAdd} label="Add proposal" />
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {/* View Toggle Buttons */}
            <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-gray-200 text-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="Grid View"
              >
                <IoGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-gray-200 text-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="List View"
              >
                <IoList size={18} />
              </button>
            </div>
            
            {/* Filters Dropdown */}
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className={`px-3 py-2 text-sm border border-gray-300 rounded-lg flex items-center gap-2 transition-colors hover:bg-gray-800 hover:text-white hover:border-gray-800 ${
                isFiltersOpen ? 'bg-gray-800 text-white border-gray-800' : ''
              }`}
            >
              <IoFilter size={16} />
              Filters
              <IoChevronDown size={14} />
            </button>
            
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadExcel}
              className="flex items-center gap-1.5 px-2 sm:px-3 hover:bg-gray-800 hover:text-white hover:border-gray-800"
              title="Download Excel"
            >
              <IoDownload size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline text-xs sm:text-sm">Excel</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-2 sm:px-3 hover:bg-gray-800 hover:text-white hover:border-gray-800"
              title="Print"
            >
              <IoPrint size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline text-xs sm:text-sm">Print</span>
            </Button>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none text-sm w-full sm:w-64"
              />
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text" size={18} />
            </div>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {isFiltersOpen && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                >
                  <option value="All">All Status</option>
                  {filterOptions.statuses.map(status => (
                    <option key={status} value={status.toLowerCase()}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">Client</label>
                <select
                  value={clientFilter}
                  onChange={(e) => setClientFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                >
                  <option value="">All Clients</option>
                  {filterOptions.clients.map(client => (
                    <option key={client.id} value={client.id}>{client.client_name || client.name || client.company_name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">Project</label>
                <select
                  value={projectFilter}
                  onChange={(e) => setProjectFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                >
                  <option value="">All Projects</option>
                  {filterOptions.projects.map(project => (
                    <option key={project.id} value={project.id}>{project.project_name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">Created By</label>
                <select
                  value={createdByFilter}
                  onChange={(e) => setCreatedByFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                >
                  <option value="">All Users</option>
                  {filterOptions.created_by_users.map(user => (
                    <option key={user.id} value={user.id}>{user.name || user.email}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">Start Date From</label>
                <input
                  type="date"
                  value={startDateFilter}
                  onChange={(e) => setStartDateFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">End Date To</label>
                <input
                  type="date"
                  value={endDateFilter}
                  onChange={(e) => setEndDateFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">Min Amount</label>
                <input
                  type="number"
                  value={amountMinFilter}
                  onChange={(e) => setAmountMinFilter(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">Max Amount</label>
                <input
                  type="number"
                  value={amountMaxFilter}
                  onChange={(e) => setAmountMaxFilter(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => {
                  setStatusFilter('All')
                  setClientFilter('')
                  setProjectFilter('')
                  setStartDateFilter('')
                  setEndDateFilter('')
                  setAmountMinFilter('')
                  setAmountMaxFilter('')
                  setCreatedByFilter('')
                  setQuickFilter('All')
                  setIsFiltersOpen(false)
                }}
                size="sm"
              >
                Clear Filters
              </Button>
              <Button
                variant="primary"
                onClick={() => setIsFiltersOpen(false)}
                size="sm"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Proposals View - Table or Grid */}
      {viewMode === 'list' ? (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {columns.map((column, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-8 text-center text-secondary-text">
                      Loading...
                    </td>
                  </tr>
                ) : filteredProposals.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-8 text-center text-secondary-text">
                      No proposals found
                    </td>
                  </tr>
                ) : (
                  filteredProposals.map((proposal) => (
                    <tr key={proposal.id} className="hover:bg-gray-50">
                      {columns.map((column, idx) => (
                        <td key={idx} className="px-4 py-3">
                          {column.render ? column.render(proposal[column.key], proposal) : (proposal[column.key] || '')}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        /* Grid View - Cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-8 text-secondary-text">Loading...</div>
          ) : filteredProposals.length === 0 ? (
            <div className="col-span-full text-center py-8 text-secondary-text">No proposals found</div>
          ) : (
            filteredProposals.map((proposal) => (
              <Card key={proposal.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/app/admin/proposals/${proposal.id}`)}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-primary-text text-sm">#{proposal.proposal_number || proposal.id}</h3>
                    <p className="text-xs text-secondary-text mt-1">{proposal.client_name || 'No Client'}</p>
                  </div>
                  <Badge className={`text-xs ${
                    proposal.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    proposal.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                    proposal.status === 'declined' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {proposal.status || 'Draft'}
                  </Badge>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-secondary-text">Amount:</span>
                    <span className="font-medium text-primary-text">${parseFloat(proposal.total || proposal.amount || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-text">Valid Till:</span>
                    <span className="text-primary-text">{proposal.valid_till ? new Date(proposal.valid_till).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-text">Project:</span>
                    <span className="text-primary-text truncate max-w-[120px]">{proposal.project_name || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleView(proposal); }}
                    className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors"
                    title="View"
                  >
                    <IoEye size={16} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEdit(proposal); }}
                    className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                    title="Edit"
                  >
                    <IoCreate size={16} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(proposal); }}
                    className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                    title="Delete"
                  >
                    <IoTrash size={16} />
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Add/Edit Proposal Modal */}
      <RightSideModal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setIsEditModalOpen(false)
          setSelectedProposal(null)
          setFormData({
            company_id: '',
            client_id: '',
            project_id: '',
            valid_till: '',
            status: 'draft',
            description: '',
            note: '',
            terms: 'Thank you for your business.',
            currency: 'USD',
            discount: 0,
            discount_type: '%',
            items: [{ item_name: '', description: '', quantity: 1, unit_price: 0, tax_rate: 0, amount: 0 }],
          })
          setFilteredClients([])
          setFilteredProjects([])
        }}
        title={isEditModalOpen ? "Edit Proposal" : "Add Proposal"}
        width="max-w-5xl"
      >
        <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary-text mb-4">Basic Information</h3>
            <div className="space-y-4">
              {/* Client - Company auto-set from session */}
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Client <span className="text-danger">*</span>
                </label>
                <select
                  value={formData.client_id}
                  onChange={(e) => {
                    setFormData({ 
                      ...formData, 
                      client_id: e.target.value,
                      project_id: '' // Reset project when client changes
                    })
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                  required
                >
                  <option value="">-- Select Client --</option>
                  {filteredClients.length === 0 ? (
                    <option value="" disabled>No clients found</option>
                  ) : (
                    filteredClients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.client_name || client.name || client.company_name || `Client #${client.id}`}
                      </option>
                    ))
                  )}
                </select>
                {filteredClients.length === 0 && (
                  <p className="text-xs text-secondary-text mt-1">No clients available. Add clients first.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Project (Optional)
                </label>
                <select
                  value={formData.project_id}
                  onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={!formData.client_id}
                >
                  <option value="">-- Select Project (Optional) --</option>
                  {!formData.client_id ? (
                    <option value="" disabled>Select Client First</option>
                  ) : filteredProjects.length === 0 ? (
                    <option value="" disabled>No projects found for this client</option>
                  ) : (
                    filteredProjects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.project_name || project.name}
                      </option>
                    ))
                  )}
                </select>
                {formData.client_id && filteredProjects.length === 0 && (
                  <p className="text-xs text-secondary-text mt-1">No projects available for this client</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-2">
                    Valid Until Date <span className="text-danger">*</span>
                  </label>
                  <Input
                    type="date"
                    value={formData.valid_till}
                    onChange={(e) => setFormData({ ...formData, valid_till: e.target.value })}
                    required
                    disabled={!formData.company_id || !formData.client_id}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={!formData.client_id}
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="accepted">Accepted</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter proposal description"
                  disabled={!formData.company_id || !formData.client_id}
                />
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary-text">Items</h3>
              <Button 
                variant="outline" 
                onClick={handleAddItem} 
                className="flex items-center gap-2"
                disabled={!formData.company_id || !formData.client_id}
              >
                <IoAdd size={16} />
                Add Item
              </Button>
            </div>
            <div className="space-y-3">
              {formData.items.map((item, index) => (
                <div key={index} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-primary-text">Item {index + 1}</span>
                    {formData.items.length > 1 && (
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-600 hover:text-red-800"
                        type="button"
                      >
                        <IoClose size={20} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Input
                      label="Item Name"
                      value={item.item_name || item.description || ''}
                      onChange={(e) => {
                        const value = e.target.value
                        handleItemChange(index, 'item_name', value)
                        if (!item.description) {
                          handleItemChange(index, 'description', value)
                        }
                      }}
                      placeholder="Item name/description"
                      required
                      disabled={!formData.company_id || !formData.client_id}
                    />
                    <Input
                      label="Description (Optional)"
                      value={item.description || ''}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      placeholder="Additional description"
                      disabled={!formData.company_id || !formData.client_id}
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <Input
                        label="Quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                        disabled={!formData.company_id || !formData.client_id}
                      />
                      <Input
                        label="Unit Price"
                        type="number"
                        value={item.unit_price}
                        onChange={(e) => handleItemChange(index, 'unit_price', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                        disabled={!formData.company_id || !formData.client_id}
                      />
                      <Input
                        label="Tax Rate (%)"
                        type="number"
                        value={item.tax_rate}
                        onChange={(e) => handleItemChange(index, 'tax_rate', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                        disabled={!formData.company_id || !formData.client_id}
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-secondary-text">Amount: </span>
                      <span className="font-semibold text-primary-text">{formatCurrency(item.amount)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-secondary-text">Sub Total:</span>
                <span className="font-semibold text-primary-text">{formatCurrency(totals.subTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-secondary-text">Discount ({formData.discount_type}):</span>
                <span className="font-semibold text-primary-text">-{formatCurrency(totals.discountAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-secondary-text">Tax:</span>
                <span className="font-semibold text-primary-text">{formatCurrency(totals.taxAmount)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-300">
                <span className="text-lg font-bold text-primary-text">Total:</span>
                <span className="text-lg font-bold text-primary-accent">{formatCurrency(totals.total)}</span>
              </div>
            </div>
          </div>

          {/* Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Discount
              </label>
              <Input
                type="number"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
                min="0"
                step="0.01"
                disabled={!formData.company_id || !formData.client_id}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Discount Type
              </label>
              <select
                value={formData.discount_type}
                onChange={(e) => setFormData({ ...formData, discount_type: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={!formData.company_id || !formData.client_id}
              >
                <option value="%">Percentage (%)</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
          </div>

          {/* Notes & Terms */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Notes
              </label>
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Additional notes"
                disabled={!formData.company_id || !formData.client_id}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Terms & Conditions
              </label>
              <textarea
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Terms and conditions"
                disabled={!formData.company_id || !formData.client_id}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3 pt-4 border-t border-gray-200 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false)
                setIsEditModalOpen(false)
                setSelectedProposal(null)
              }}
              className="px-4 text-gray-900 hover:text-white min-w-[100px]"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              className="px-4 flex items-center gap-2 min-w-[120px] justify-center"
            >
              <IoCheckmarkCircle size={18} />
              {isEditModalOpen ? 'Update' : 'Save'} Proposal
            </Button>
          </div>
        </div>
      </RightSideModal>

      {/* View Proposal Modal */}
      <RightSideModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedProposal(null)
        }}
        title="Proposal Details"
        width="800px"
      >
        {selectedProposal && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-secondary-text">Proposal #</label>
                <p className="text-primary-text mt-1 text-base font-semibold">{selectedProposal.estimate_number || selectedProposal.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-secondary-text">Status</label>
                <div className="mt-1">
                  <Badge variant={selectedProposal.status === 'accepted' ? 'success' : selectedProposal.status === 'declined' ? 'danger' : selectedProposal.status === 'sent' ? 'info' : 'default'}>
                    {selectedProposal.status ? selectedProposal.status.charAt(0).toUpperCase() + selectedProposal.status.slice(1) : 'Draft'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-secondary-text">Company</label>
                <p className="text-primary-text mt-1 text-base">{selectedProposal.company_name || '--'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-secondary-text">Client</label>
                <p className="text-primary-text mt-1 text-base">{selectedProposal.client_name || '--'}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-secondary-text">Project</label>
              <p className="text-primary-text mt-1 text-base">{selectedProposal.project_name || '--'}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-secondary-text">Valid Until</label>
              <p className="text-primary-text mt-1 text-base">{formatDate(selectedProposal.valid_till)}</p>
            </div>

            {selectedProposal.description && (
              <div>
                <label className="text-sm font-medium text-secondary-text">Description</label>
                <p className="text-primary-text mt-1 text-base whitespace-pre-wrap">{selectedProposal.description}</p>
              </div>
            )}

            {/* Items */}
            {selectedProposal.items && selectedProposal.items.length > 0 && (
              <div>
                <label className="text-sm font-medium text-secondary-text mb-3 block">Items</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-secondary-text">Description</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-secondary-text">Qty</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-secondary-text">Unit Price</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-secondary-text">Tax</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-secondary-text">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedProposal.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 text-primary-text">{item.item_name || item.description || '--'}</td>
                          <td className="px-4 py-2 text-right text-primary-text">{item.quantity || 0}</td>
                          <td className="px-4 py-2 text-right text-primary-text">{formatCurrency(item.unit_price || 0)}</td>
                          <td className="px-4 py-2 text-right text-primary-text">{item.tax_rate || 0}%</td>
                          <td className="px-4 py-2 text-right font-semibold text-primary-text">{formatCurrency(item.amount || 0)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Totals */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-text">Sub Total:</span>
                  <span className="font-semibold text-primary-text">{formatCurrency(selectedProposal.sub_total || 0)}</span>
                </div>
                {selectedProposal.discount_amount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary-text">Discount:</span>
                    <span className="font-semibold text-primary-text">-{formatCurrency(selectedProposal.discount_amount || 0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-text">Tax:</span>
                  <span className="font-semibold text-primary-text">{formatCurrency(selectedProposal.tax_amount || 0)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-300">
                  <span className="text-lg font-bold text-primary-text">Total:</span>
                  <span className="text-lg font-bold text-primary-accent">{formatCurrency(selectedProposal.total || 0)}</span>
                </div>
              </div>
            </div>

            {selectedProposal.note && (
              <div>
                <label className="text-sm font-medium text-secondary-text">Notes</label>
                <p className="text-primary-text mt-1 text-base whitespace-pre-wrap">{selectedProposal.note}</p>
              </div>
            )}

            {selectedProposal.terms && (
              <div>
                <label className="text-sm font-medium text-secondary-text">Terms & Conditions</label>
                <p className="text-primary-text mt-1 text-base whitespace-pre-wrap">{selectedProposal.terms}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => {
                  setIsViewModalOpen(false)
                  handleEdit(selectedProposal)
                }}
                className="flex-1"
              >
                Edit Proposal
              </Button>
              {selectedProposal.status === 'accepted' && (
                <Button
                  variant="primary"
                  onClick={handleConvertToInvoice}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <IoDocumentText size={18} />
                  Convert to Invoice
                </Button>
              )}
              <Button
                variant="primary"
                onClick={() => {
                  setIsViewModalOpen(false)
                  setSelectedProposal(null)
                }}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </RightSideModal>

      {/* Add Item Modal */}
      <Modal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        title="Add Items to Proposal"
        size="xl"
      >
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search items..."
                value={itemSearchQuery}
                onChange={(e) => setItemSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none text-sm"
              />
              <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <select
              value={itemCategoryFilter}
              onChange={(e) => setItemCategoryFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none text-sm"
            >
              <option value="">All Categories</option>
              {[...new Set(items.map(item => item.category).filter(Boolean))].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Items Grid */}
          {(() => {
            const filteredItemsForModal = items.filter(item => {
              const matchesSearch = !itemSearchQuery || 
                item.title?.toLowerCase().includes(itemSearchQuery.toLowerCase()) ||
                item.description?.toLowerCase().includes(itemSearchQuery.toLowerCase()) ||
                item.category?.toLowerCase().includes(itemSearchQuery.toLowerCase())
              const matchesCategory = !itemCategoryFilter || item.category === itemCategoryFilter
              return matchesSearch && matchesCategory
            })

            return filteredItemsForModal.length === 0 ? (
              <div className="text-center py-8 text-secondary-text">
                <p>No items found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {filteredItemsForModal.map((item) => (
                  <Card 
                    key={item.id} 
                    className="p-4 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => handleAddItemFromModal(item)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Item Image */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image_url ? (
                          <img 
                            src={item.image_url} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <IoStorefront size={24} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-primary-text text-sm mb-1 truncate">
                          {item.title}
                        </h3>
                        <p className="text-red-500 font-bold text-sm mb-1">
                          ${parseFloat(item.rate || 0).toFixed(2)}
                          <span className="text-gray-400 font-normal text-xs">/{item.unit_type || 'PC'}</span>
                        </p>
                        {item.description && (
                          <p className="text-secondary-text text-xs line-clamp-2 mb-2">
                            {item.description}
                          </p>
                        )}
                        <div className="flex items-center gap-1 text-xs text-primary-accent">
                          <IoCheckmark size={14} />
                          <span>Click to add</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )
          })()}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleAddEmptyItem}
              className="flex items-center gap-2"
            >
              <IoAdd size={18} />
              Add Empty Item
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsAddItemModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Proposals
