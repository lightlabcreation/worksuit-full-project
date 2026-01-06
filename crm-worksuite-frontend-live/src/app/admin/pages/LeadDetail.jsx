import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { leadsAPI, estimatesAPI, proposalsAPI, contractsAPI, documentsAPI, eventsAPI, contactsAPI } from '../../../api'
import { useAuth } from '../../../context/AuthContext'
import { useSettings } from '../../../context/SettingsContext'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import Input from '../../../components/ui/Input'
import Modal from '../../../components/ui/Modal'
import RightSideModal from '../../../components/ui/RightSideModal'
import {
  IoArrowBack,
  IoPerson,
  IoCall,
  IoMail,
  IoLocation,
  IoCalendar,
  IoAdd,
  IoCreate,
  IoTrash,
  IoCheckmarkCircle,
  IoDocumentText,
  IoChatbubble,
  IoTime,
  IoChevronDown,
  IoSearch,
  IoFilter,
  IoGrid,
  IoPersonAdd,
  IoPrint,
  IoDownload,
  IoEye,
  IoClose,
  IoFileTray,
  IoFileTrayFull
} from 'react-icons/io5'

const LeadDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { settings } = useSettings()
  const companyId = user?.company_id || localStorage.getItem('companyId') || 1
  const [lead, setLead] = useState(null)
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [probabilityFilter, setProbabilityFilter] = useState(null)
  const [calendarView, setCalendarView] = useState('month')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true)

  // Data states
  const [estimates, setEstimates] = useState([])
  const [proposals, setProposals] = useState([])
  const [contracts, setContracts] = useState([])
  const [files, setFiles] = useState([])
  const [contacts, setContacts] = useState([])
  const [tasks, setTasks] = useState([])
  const [notes, setNotes] = useState([])
  const [reminders, setReminders] = useState([])
  const [events, setEvents] = useState([])

  // Loading states
  const [loadingEstimates, setLoadingEstimates] = useState(false)
  const [loadingProposals, setLoadingProposals] = useState(false)
  const [loadingContracts, setLoadingContracts] = useState(false)
  const [loadingFiles, setLoadingFiles] = useState(false)
  const [loadingContacts, setLoadingContacts] = useState(false)

  // Modals
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false)
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false)
  const [isAddReminderModalOpen, setIsAddReminderModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false)
  const [isAddFileModalOpen, setIsAddFileModalOpen] = useState(false)
  const [isAddEstimateModalOpen, setIsAddEstimateModalOpen] = useState(false)
  const [isAddProposalModalOpen, setIsAddProposalModalOpen] = useState(false)
  const [isAddContractModalOpen, setIsAddContractModalOpen] = useState(false)
  const [isViewContractModalOpen, setIsViewContractModalOpen] = useState(false)

  const [selectedContract, setSelectedContract] = useState(null)

  // Convert to Client Modal State
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Constants for conversion modal
  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'India', 'Germany', 'France']
  const countryCodes = ['+1', '+44', '+91', '+61', '+49', '+33']
  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD']

  const [convertFormData, setConvertFormData] = useState({
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
    currencySymbol: '$',
    disableOnlinePayment: false,
  })

  // Form data
  const [contactFormData, setContactFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    contact_type: 'Client',
    status: 'Active',
    notes: ''
  })

  const [eventFormData, setEventFormData] = useState({
    event_name: '',
    description: '',
    where: '',
    starts_on_date: new Date().toISOString().split('T')[0],
    starts_on_time: '09:00',
    ends_on_date: new Date().toISOString().split('T')[0],
    ends_on_time: '10:00',
    label_color: '#FF0000',
    status: 'Pending',
    employee_ids: [],
    client_ids: [],
    department_ids: [],
    host_id: user?.id || null,
  })

  const [taskFormData, setTaskFormData] = useState({
    title: '',
    dueDate: '',
    priority: 'medium',
    description: ''
  })

  const [noteFormData, setNoteFormData] = useState({
    content: ''
  })

  const [reminderFormData, setReminderFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: ''
  })

  const [followUpFormData, setFollowUpFormData] = useState({
    date: '',
    time: '',
    notes: ''
  })

  const [fileFormData, setFileFormData] = useState({
    title: '',
    category: '',
    description: '',
    file: null
  })
  const [estimateFormData, setEstimateFormData] = useState({
    estimate_number: '',
    estimate_date: new Date().toISOString().split('T')[0],
    valid_till: '',
    currency: 'USD',
    calculate_tax: 'After Discount',
    description: '',
    note: '',
    terms: 'Thank you for your business.',
    discount: 0,
    discount_type: '%',
    amount: '',
    status: 'draft',
    client_id: null,
    project_id: null,
    items: []
  })

  const [proposalFormData, setProposalFormData] = useState({
    title: '',
    valid_till: '',
    currency: 'USD',
    description: '',
    note: '',
    terms: 'Thank you for your business.',
    discount: 0,
    discount_type: '%',
    amount: '',
    status: 'draft',
    client_id: null,
    project_id: null,
    items: []
  })

  const [contractFormData, setContractFormData] = useState({
    title: '',
    contract_date: new Date().toISOString().split('T')[0],
    valid_until: '',
    tax: '',
    second_tax: '',
    note: '',
    amount: '',
    status: 'draft',
    client_id: null,
    project_id: null
  })

  // Lead stages
  const leadStages = [
    { id: 'New', label: 'New', color: 'bg-blue-100 text-blue-800' },
    { id: 'Qualified', label: 'Qualified', color: 'bg-purple-100 text-purple-800' },
    { id: 'Discussion', label: 'Discussion', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'Negotiation', label: 'Negotiation', color: 'bg-orange-100 text-orange-800' },
    { id: 'Won', label: 'Won', color: 'bg-green-100 text-green-800' },
    { id: 'Lost', label: 'Lost', color: 'bg-red-100 text-red-800' },
  ]

  useEffect(() => {
    fetchLead()
    fetchLeads()
    // Fetch contacts when lead is loaded
    if (id) {
      fetchContacts()
    }
  }, [id])

  useEffect(() => {
    if (lead && activeTab === 'estimates') {
      fetchEstimates()
    } else if (lead && activeTab === 'proposals') {
      fetchProposals()
    } else if (lead && activeTab === 'contracts') {
      fetchContracts()
    } else if (lead && activeTab === 'files') {
      fetchFiles()
    } else if (lead && activeTab === 'contacts') {
      fetchContacts()
    } else if (lead && activeTab === 'overview') {
      // Fetch contacts when Overview tab is active
      fetchContacts()
      fetchEvents()
    }
  }, [lead, activeTab, id])

  // Fetch events when currentMonth changes or on initial load for overview
  useEffect(() => {
    if (activeTab === 'overview' && companyId) {
      fetchEvents()
    }
  }, [currentMonth, companyId, activeTab])

  const fetchLead = async () => {
    try {
      setLoading(true)
      const response = await leadsAPI.getById(id, { company_id: companyId })
      if (response.data.success) {
        const leadData = response.data.data
        setLead({
          id: leadData.id,
          personName: leadData.person_name || '',
          companyName: leadData.company_name || '',
          email: leadData.email || '',
          phone: leadData.phone || '',
          status: leadData.status || 'New',
          source: leadData.source || '',
          address: leadData.address || '',
          city: leadData.city || '',
          country: leadData.country || '',
          value: leadData.value || 0,
          probability: leadData.probability || null,
          labels: leadData.labels || [],
          ownerName: leadData.owner_name || '',
          createdDate: leadData.created_at || '',
          notes: leadData.notes || '',
        })
      }
    } catch (error) {
      console.error('Error fetching lead:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchLeads = async () => {
    try {
      const response = await leadsAPI.getAll({ company_id: companyId })
      if (response.data.success) {
        const fetchedLeads = response.data.data || []
        const transformedLeads = fetchedLeads.map(lead => ({
          id: lead.id,
          personName: lead.person_name || '',
          companyName: lead.company_name || '',
          status: lead.status || 'New',
          probability: lead.probability || null,
        }))
        setLeads(transformedLeads)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    }
  }

  const fetchEstimates = async () => {
    try {
      setLoadingEstimates(true)
      const response = await estimatesAPI.getAll({ lead_id: id, company_id: companyId })
      if (response.data.success) {
        setEstimates(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching estimates:', error)
      setEstimates([])
    } finally {
      setLoadingEstimates(false)
    }
  }

  const fetchProposals = async () => {
    try {
      setLoadingProposals(true)
      const response = await proposalsAPI.getAll({ lead_id: id, company_id: companyId })
      if (response.data.success) {
        setProposals(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching proposals:', error)
      setProposals([])
    } finally {
      setLoadingProposals(false)
    }
  }

  const fetchContracts = async () => {
    try {
      setLoadingContracts(true)
      const response = await contractsAPI.getAll({ lead_id: id, company_id: companyId })
      if (response.data.success) {
        setContracts(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching contracts:', error)
      setContracts([])
    } finally {
      setLoadingContracts(false)
    }
  }

  const fetchFiles = async () => {
    try {
      setLoadingFiles(true)
      const response = await documentsAPI.getAll({ lead_id: id, company_id: companyId })
      if (response.data.success) {
        setFiles(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching files:', error)
      setFiles([])
    } finally {
      setLoadingFiles(false)
    }
  }

  const fetchContacts = async () => {
    try {
      setLoadingContacts(true)
      const companyId = user?.company_id || localStorage.getItem('companyId') || 1
      const response = await contactsAPI.getAll({ lead_id: id, company_id: companyId })
      if (response.data.success) {
        setContacts(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
      setContacts([])
    } finally {
      setLoadingContacts(false)
    }
  }

  const fetchEvents = async () => {
    try {
      if (!companyId || isNaN(companyId) || companyId <= 0) {
        console.error('Invalid companyId for fetchEvents:', companyId)
        setEvents([])
        return
      }
      const year = currentMonth.getFullYear()
      const month = currentMonth.getMonth() + 1
      console.log('LeadDetail fetchEvents - year:', year, 'month:', month, 'companyId:', companyId)
      // Fetch all company events for now - lead_id filter will work after DB migration
      const response = await eventsAPI.getAll({
        company_id: companyId,
        year,
        month
      })
      console.log('LeadDetail fetchEvents response:', response.data)
      if (response.data.success) {
        const fetchedEvents = response.data.data || []
        console.log('LeadDetail setting events:', fetchedEvents.length, 'events')
        setEvents(fetchedEvents)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      setEvents([])
    }
  }

  const filteredLeads = leads.filter(l => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'my') return true
    return true
  }).filter(l => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return l.personName?.toLowerCase().includes(query) ||
      l.companyName?.toLowerCase().includes(query)
  }).filter(l => {
    if (!probabilityFilter) return true
    return l.probability === parseInt(probabilityFilter)
  })

  const handleConvertToClient = () => {
    if (!lead) return

    setConvertFormData({
      companyName: lead.companyName || lead.personName || '',
      email: lead.email || '',
      password: '',
      address: lead.address || '',
      city: lead.city || '',
      state: lead.state || '',
      zip: lead.zip || '',
      country: lead.country || 'United States',
      phoneCountryCode: '+1',
      phoneNumber: lead.phone || '',
      website: lead.website || '',
      vatNumber: '',
      gstNumber: '',
      currency: 'USD',
      currencySymbol: '$',
      disableOnlinePayment: false,
    })
    setIsConvertModalOpen(true)
  }

  const handleSaveConversion = async () => {
    // Trim values
    const companyName = convertFormData.companyName?.trim()
    const email = convertFormData.email?.trim()
    const password = convertFormData.password

    if (!companyName || !email || !password) {
      alert('Company Name, Email and Password are required')
      return
    }

    try {
      const data = {
        companyName: companyName,
        email: email,
        password: password,
        client_name: companyName,
        company_id: parseInt(companyId),
        address: convertFormData.address || null,
        city: convertFormData.city || null,
        state: convertFormData.state || null,
        zip: convertFormData.zip || null,
        country: convertFormData.country || 'United States',
        phoneCountryCode: convertFormData.phoneCountryCode || '+1',
        phoneNumber: convertFormData.phoneNumber || null,
        website: convertFormData.website || null,
        vatNumber: convertFormData.vatNumber || null,
        gstNumber: convertFormData.gstNumber || null,
        currency: convertFormData.currency || 'USD',
        currencySymbol: convertFormData.currencySymbol || '$',
        disableOnlinePayment: convertFormData.disableOnlinePayment ? 1 : 0
      }

      console.log('Converting lead with data:', { ...data, password: '***' })

      const response = await leadsAPI.convertToClient(id, data, { company_id: companyId })
      if (response.data.success) {
        alert('Lead converted to client successfully!')
        setIsConvertModalOpen(false)
        navigate('/app/admin/clients')
      }
    } catch (error) {
      console.error('Error converting lead:', error)
      const errorData = error.response?.data
      console.error('Error response:', errorData)

      if (errorData?.details && errorData.details.includes('Duplicate entry') && errorData.details.includes('email')) {
        alert('This email address is already registered. Please use a different email.')
      } else {
        alert(errorData?.error || 'Failed to convert lead to client')
      }
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const getCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay() // Sunday = 0

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const calendarDays = getCalendarDays()

  const getEventsForDay = (day) => {
    if (!day) return []
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth() + 1
    const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const dayEvents = events.filter(event => {
      if (!event.starts_on_date) return false
      // Handle both ISO date format and simple date string
      const eventDate = event.starts_on_date.split('T')[0]
      return eventDate === dateString
    })
    if (dayEvents.length > 0) {
      console.log('Events for day', day, ':', dayEvents.length, 'dateString:', dateString)
    }
    return dayEvents
  }

  const handleExportExcel = () => {
    // Export logic
    const data = {
      lead: lead,
      estimates: estimates,
      proposals: proposals,
      contracts: contracts
    }
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lead-${lead?.personName}-${new Date().toISOString()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleAddContact = async () => {
    if (!contactFormData.name) {
      alert('Name is required')
      return
    }

    try {
      const contactData = {
        name: contactFormData.name.trim(),
        company: contactFormData.company?.trim() || null,
        email: contactFormData.email?.trim() || null,
        phone: contactFormData.phone?.trim() || null,
        contact_type: contactFormData.contact_type || 'Client',
        status: contactFormData.status || 'Active',
        notes: contactFormData.notes?.trim() || null,
        lead_id: id ? parseInt(id) : null,
        company_id: parseInt(companyId),
      }

      await contactsAPI.create(contactData)
      alert('Contact created successfully!')
      setIsAddContactModalOpen(false)
      setContactFormData({ name: '', company: '', email: '', phone: '', contact_type: 'Client', status: 'Active', notes: '' })
      fetchContacts() // Refresh contacts list
    } catch (error) {
      console.error('Error creating contact:', error)
      alert(error.response?.data?.error || 'Failed to create contact')
    }
  }

  const handleAddEvent = async () => {
    if (!eventFormData.event_name) {
      alert('Event name is required')
      return
    }
    if (!eventFormData.where) {
      alert('Location is required')
      return
    }
    if (!eventFormData.starts_on_date) {
      alert('Start date is required')
      return
    }
    if (!eventFormData.starts_on_time) {
      alert('Start time is required')
      return
    }

    try {
      const eventData = {
        event_name: eventFormData.event_name,
        description: eventFormData.description || null,
        where: eventFormData.where,
        starts_on_date: eventFormData.starts_on_date,
        starts_on_time: eventFormData.starts_on_time,
        ends_on_date: eventFormData.ends_on_date || eventFormData.starts_on_date,
        ends_on_time: eventFormData.ends_on_time || eventFormData.starts_on_time,
        label_color: eventFormData.label_color,
        status: eventFormData.status || 'Pending',
        employee_ids: eventFormData.employee_ids || [],
        client_ids: eventFormData.client_ids || [],
        department_ids: eventFormData.department_ids || [],
        host_id: eventFormData.host_id || user?.id || null,
        lead_id: id // Associate event with this lead
      }

      const response = await eventsAPI.create(eventData, { company_id: companyId, user_id: user?.id || 1 })
      if (response.data.success) {
        alert('Event created successfully!')
        setIsAddEventModalOpen(false)
        setEventFormData({
          event_name: '',
          description: '',
          where: '',
          starts_on_date: new Date().toISOString().split('T')[0],
          starts_on_time: '09:00',
          ends_on_date: new Date().toISOString().split('T')[0],
          ends_on_time: '10:00',
          label_color: '#FF0000',
          status: 'Pending',
          employee_ids: [],
          client_ids: [],
          department_ids: [],
          host_id: user?.id || null,
        })
        // Refresh events
        await fetchEvents()
      } else {
        alert(response.data.error || 'Failed to create event')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      alert(error.response?.data?.error || 'Failed to create event')
    }
  }

  const handleAddTask = () => {
    // Add task logic
    setIsAddTaskModalOpen(false)
    setTaskFormData({ title: '', dueDate: '', priority: 'medium', description: '' })
  }

  const handleAddNote = () => {
    // Add note logic
    setIsAddNoteModalOpen(false)
    setNoteFormData({ content: '' })
  }

  const handleAddReminder = () => {
    // Add reminder logic
    setIsAddReminderModalOpen(false)
    setReminderFormData({ title: '', date: '', time: '', description: '' })
  }

  const handleFollowUp = async () => {
    if (!followUpFormData.date || !followUpFormData.time) {
      alert('Please select both date and time for follow-up')
      return
    }

    try {
      // Update lead with follow-up date
      const followUpDate = `${followUpFormData.date}T${followUpFormData.time}:00`
      await leadsAPI.update(id, {
        due_followup: followUpFormData.date,
        notes: lead?.notes ? `${lead.notes}\n\nFollow-up scheduled: ${followUpDate} - ${followUpFormData.notes || ''}` : `Follow-up scheduled: ${followUpDate} - ${followUpFormData.notes || ''}`
      }, { company_id: companyId })

      // Create calendar event for follow-up
      const eventData = {
        event_name: `Follow-up: ${lead?.personName || 'Lead'}`,
        description: followUpFormData.notes || `Follow-up with ${lead?.personName || 'lead'}`,
        where: lead?.companyName || 'TBD',
        starts_on_date: followUpFormData.date,
        starts_on_time: followUpFormData.time,
        ends_on_date: followUpFormData.date,
        ends_on_time: followUpFormData.time.split(':').map((v, i) => i === 0 ? String(parseInt(v) + 1).padStart(2, '0') : v).join(':'),
        label_color: '#FF6B6B',
        status: 'Pending',
        company_id: parseInt(companyId),
        user_id: user?.id || 1,
        lead_id: id // Associate follow-up with this lead
      }

      await eventsAPI.create(eventData, { company_id: companyId, user_id: user?.id || 1 })

      alert('Follow-up scheduled successfully! It has been added to your calendar.')
      setIsFollowUpModalOpen(false)
      setFollowUpFormData({ date: '', time: '', notes: '' })
      fetchLead() // Refresh lead data
    } catch (error) {
      console.error('Error scheduling follow-up:', error)
      alert(error.response?.data?.error || 'Failed to schedule follow-up')
    }
  }

  // Estimate handlers
  const handleViewEstimate = (estimate) => {
    navigate(`/app/admin/estimates/${estimate.id}`)
  }

  const handleEditEstimate = (estimate) => {
    navigate(`/app/admin/estimates/${estimate.id}?edit=true`)
  }

  const handleDeleteEstimate = async (estimate) => {
    if (window.confirm(`Are you sure you want to delete estimate ${estimate.estimate_number || estimate.id}?`)) {
      try {
        await estimatesAPI.delete(estimate.id, { company_id: companyId })
        alert('Estimate deleted successfully!')
        fetchEstimates()
      } catch (error) {
        console.error('Error deleting estimate:', error)
        alert(error.response?.data?.error || 'Failed to delete estimate')
      }
    }
  }

  // Proposal handlers
  const handleViewProposal = (proposal) => {
    navigate(`/app/admin/proposals/${proposal.id}`)
  }

  const handleEditProposal = (proposal) => {
    navigate(`/app/admin/proposals/${proposal.id}?edit=true`)
  }

  const handleDeleteProposal = async (proposal) => {
    if (window.confirm(`Are you sure you want to delete proposal ${proposal.title || proposal.id}?`)) {
      try {
        await proposalsAPI.delete(proposal.id, { company_id: companyId })
        alert('Proposal deleted successfully!')
        fetchProposals()
      } catch (error) {
        console.error('Error deleting proposal:', error)
        alert(error.response?.data?.error || 'Failed to delete proposal')
      }
    }
  }

  // Contract handlers
  const handleViewContract = (contract) => {
    setSelectedContract(contract)
    setIsViewContractModalOpen(true)
  }

  const handleEditContract = (contract) => {
    // Set form data and open edit modal
    setContractFormData({
      title: contract.title || '',
      contract_date: contract.contract_date ? contract.contract_date.split('T')[0] : new Date().toISOString().split('T')[0],
      valid_until: contract.valid_until ? contract.valid_until.split('T')[0] : '',
      tax: contract.tax || '',
      second_tax: contract.second_tax || '',
      note: contract.note || '',
      amount: contract.amount || '',
      status: contract.status || 'Draft',
      client_id: contract.client_id || null,
      project_id: contract.project_id || null
    })
    setSelectedContract(contract)
    setIsAddContractModalOpen(true)
  }

  const handleDeleteContract = async (contract) => {
    if (window.confirm(`Are you sure you want to delete contract ${contract.title || contract.id}?`)) {
      try {
        await contractsAPI.delete(contract.id, { company_id: companyId })
        alert('Contract deleted successfully!')
        fetchContracts()
      } catch (error) {
        console.error('Error deleting contract:', error)
        alert(error.response?.data?.error || 'Failed to delete contract')
      }
    }
  }

  // File handlers
  const handleDownloadFile = async (file) => {
    try {
      // If file has a direct URL, open it in new tab or download
      const fileUrl = file.file_path || file.file_url || file.url
      if (fileUrl && (fileUrl.startsWith('http://') || fileUrl.startsWith('https://'))) {
        // For external URLs, open in new tab to trigger download
        window.open(fileUrl, '_blank')
        return
      }

      // For files stored on server, use the download API
      const response = await documentsAPI.download(file.id, { company_id: companyId })

      // Check if response is a redirect (URL)
      if (response.request?.responseURL && response.request.responseURL !== response.config.url) {
        window.open(response.request.responseURL, '_blank')
        return
      }

      // Create blob and download
      const contentType = response.headers['content-type'] || 'application/octet-stream'
      const blob = new Blob([response.data], { type: contentType })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', file.name || file.file_name || file.title || `file-${file.id}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading file:', error)

      // Try to open the file URL directly as fallback
      const fileUrl = file.file_path || file.file_url || file.url
      if (fileUrl) {
        try {
          window.open(fileUrl, '_blank')
          return
        } catch (e) {
          console.error('Fallback download also failed:', e)
        }
      }

      alert(error.response?.data?.error || 'Failed to download file. The file may have been moved or deleted.')
    }
  }

  const handleDeleteFile = async (file) => {
    if (window.confirm(`Are you sure you want to delete file ${file.name || file.file_name}?`)) {
      try {
        await documentsAPI.delete(file.id)
        alert('File deleted successfully!')
        fetchFiles()
      } catch (error) {
        console.error('Error deleting file:', error)
        alert(error.response?.data?.error || 'Failed to delete file')
      }
    }
  }

  const handleAddFile = async () => {
    if (!fileFormData.file) {
      alert('Please select a file')
      return
    }
    if (!fileFormData.title) {
      alert('File title is required')
      return
    }

    try {
      const uploadFormData = new FormData()
      uploadFormData.append('company_id', companyId)
      uploadFormData.append('lead_id', id)
      uploadFormData.append('title', fileFormData.title)
      uploadFormData.append('category', fileFormData.category || '')
      uploadFormData.append('description', fileFormData.description || '')
      uploadFormData.append('file', fileFormData.file)

      const response = await documentsAPI.create(uploadFormData)
      if (response.data.success) {
        alert('File uploaded successfully!')
        setIsAddFileModalOpen(false)
        setFileFormData({ title: '', category: '', description: '', file: null })
        fetchFiles()
      } else {
        alert(response.data.error || 'Failed to upload file')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert(error.response?.data?.error || 'Failed to upload file')
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileFormData({ ...fileFormData, file })
    }
  }

  // Add Estimate handler
  const handleAddEstimate = async () => {
    try {
      // Extract currency code from format like "USD ($)" -> "USD"
      const currencyCode = estimateFormData.currency ? estimateFormData.currency.split(' ')[0] : 'USD'

      const estimateData = {
        estimate_number: estimateFormData.estimate_number || null,
        valid_till: estimateFormData.valid_till || null,
        currency: currencyCode,
        calculate_tax: estimateFormData.calculate_tax || 'After Discount',
        description: estimateFormData.description || '',
        note: estimateFormData.note || '',
        terms: estimateFormData.terms || 'Thank you for your business.',
        discount: parseFloat(estimateFormData.discount) || 0,
        discount_type: estimateFormData.discount_type || '%',
        sub_total: parseFloat(estimateFormData.amount) || 0,
        total: parseFloat(estimateFormData.amount) || 0,
        status: (estimateFormData.status || 'draft').toString().toLowerCase(),
        lead_id: parseInt(id),
        company_id: parseInt(companyId),
        items: []
      }

      const response = await estimatesAPI.create(estimateData)
      if (response.data.success) {
        alert('Estimate created successfully!')
        setIsAddEstimateModalOpen(false)
        setEstimateFormData({
          estimate_number: '', estimate_date: new Date().toISOString().split('T')[0], valid_till: '',
          currency: 'USD', calculate_tax: 'After Discount', description: '', note: '',
          terms: 'Thank you for your business.', discount: 0, discount_type: '%', amount: '', status: 'draft', client_id: null, project_id: null, items: []
        })
        fetchEstimates()
      } else {
        alert(response.data.error || 'Failed to create estimate')
      }
    } catch (error) {
      console.error('Error creating estimate:', error)
      alert(error.response?.data?.error || 'Failed to create estimate')
    }
  }

  // Add Proposal handler
  const handleAddProposal = async () => {
    try {
      // Extract currency code from format like "USD ($)" -> "USD"
      const currencyCode = proposalFormData.currency ? proposalFormData.currency.split(' ')[0] : 'USD'

      const proposalData = {
        title: proposalFormData.title || null,
        valid_till: proposalFormData.valid_till || null,
        currency: currencyCode,
        description: proposalFormData.description || '',
        note: proposalFormData.note || '',
        terms: proposalFormData.terms || 'Thank you for your business.',
        discount: parseFloat(proposalFormData.discount) || 0,
        discount_type: proposalFormData.discount_type || '%',
        sub_total: parseFloat(proposalFormData.amount) || 0,
        total: parseFloat(proposalFormData.amount) || 0,
        status: (proposalFormData.status || 'draft').toString().toLowerCase(),
        lead_id: parseInt(id),
        company_id: parseInt(companyId),
        items: []
      }

      const response = await proposalsAPI.create(proposalData)
      if (response.data.success) {
        alert('Proposal created successfully!')
        setIsAddProposalModalOpen(false)
        setProposalFormData({
          title: '', valid_till: '', currency: 'USD', description: '', note: '',
          terms: 'Thank you for your business.', discount: 0, discount_type: '%', amount: '', status: 'draft', client_id: null, project_id: null, items: []
        })
        fetchProposals()
      } else {
        alert(response.data.error || 'Failed to create proposal')
      }
    } catch (error) {
      console.error('Error creating proposal:', error)
      alert(error.response?.data?.error || 'Failed to create proposal')
    }
  }

  // Add Contract handler
  const handleAddContract = async () => {
    try {
      const contractData = {
        title: contractFormData.title || null,
        contract_date: contractFormData.contract_date || null,
        valid_until: contractFormData.valid_until || null,
        tax: contractFormData.tax || null,
        second_tax: contractFormData.second_tax || null,
        note: contractFormData.note || '',
        amount: parseFloat(contractFormData.amount) || 0,
        status: (contractFormData.status || 'draft').toString().toLowerCase(),
        lead_id: parseInt(id),
        company_id: parseInt(companyId)
      }

      const response = await contractsAPI.create(contractData)
      if (response.data.success) {
        alert('Contract created successfully!')
        setIsAddContractModalOpen(false)
        setContractFormData({
          title: '', contract_date: new Date().toISOString().split('T')[0], valid_until: '',
          tax: '', second_tax: '', note: '', amount: '', status: 'draft', client_id: null, project_id: null
        })
        fetchContracts()
      } else {
        alert(response.data.error || 'Failed to create contract')
      }
    } catch (error) {
      console.error('Error creating contract:', error)
      alert(error.response?.data?.error || 'Failed to create contract')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-primary-text">Loading...</div>
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-primary-text">Lead not found</div>
      </div>
    )
  }

  const stage = leadStages.find(s => s.id === lead.status)

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-gray-50">
      {/* Left Sidebar - Lead List */}
      <div className="hidden lg:flex w-full lg:w-72 xl:w-80 bg-white border-r border-gray-200 h-full flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => navigate('/app/admin/leads')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <IoArrowBack size={20} />
            </button>
            <h2 className="text-lg font-semibold text-primary-text">Leads</h2>
            <button
              onClick={() => navigate('/app/admin/leads?tab=kanban')}
              className="ml-auto text-sm text-secondary-text hidden sm:inline hover:text-primary-accent transition-colors cursor-pointer"
            >
              Kanban
            </button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden ml-2 p-2 hover:bg-gray-100 rounded-lg"
            >
              <IoClose size={20} />
            </button>
          </div>

          {/* Filters */}
          <div className="space-y-3">
            <div>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              >
                <option value="all">- Quick filters -</option>
                <option value="my">My Leads</option>
                <option value="thisWeek">This Week</option>
                <option value="call">Call</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setProbabilityFilter(probabilityFilter === '50' ? null : '50')}
                className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${probabilityFilter === '50'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                50%
              </button>
              <button
                onClick={() => setProbabilityFilter(probabilityFilter === '90' ? null : '90')}
                className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${probabilityFilter === '90'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                90%
              </button>
              <button className="p-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                <IoCall size={16} />
              </button>
              <button className="p-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                <IoPerson size={16} />
              </button>
            </div>

            <div className="relative">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Lead List */}
        <div className="flex-1 overflow-y-auto">
          {filteredLeads.map((l) => (
            <div
              key={l.id}
              onClick={() => navigate(`/app/admin/leads/${l.id}`)}
              className={`px-4 py-3 cursor-pointer transition-all duration-200 border-l-4 ${l.id === parseInt(id)
                ? 'bg-primary-accent text-white border-l-primary-accent'
                : 'bg-white border-l-transparent hover:bg-gray-50'
                }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${l.id === parseInt(id) ? 'text-white' : 'text-gray-900'}`}>{l.personName}</p>
                  {l.companyName && (
                    <p className={`text-xs truncate ${l.id === parseInt(id) ? 'text-white/80' : 'text-gray-500'}`}>{l.companyName}</p>
                  )}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${l.id === parseInt(id)
                  ? 'bg-white/20 text-white'
                  : leadStages.find(s => s.id === l.status)?.color || 'bg-gray-100 text-gray-800'
                  }`}>
                  {l.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-center gap-2">
          <button className="px-3 py-1 text-sm text-secondary-text hover:text-primary-text">‹</button>
          <button className="px-3 py-1 text-sm bg-primary-accent text-white rounded">1</button>
          <button className="px-3 py-1 text-sm text-secondary-text hover:text-primary-text">2</button>
          <button className="px-3 py-1 text-sm text-secondary-text hover:text-primary-text">3</button>
          <button className="px-3 py-1 text-sm text-secondary-text hover:text-primary-text">4</button>
          <button className="px-3 py-1 text-sm text-secondary-text hover:text-primary-text">›</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/app/admin/leads')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoArrowBack size={20} />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-primary-text">{lead.personName}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportExcel}
                className="flex items-center gap-2"
              >
                <IoDownload size={16} />
                <span className="hidden sm:inline">Excel</span>
              </Button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-200"
              >
                <IoPrint size={16} />
                <span className="hidden sm:inline">Print</span>
              </button>
              <Button
                variant="outline"
                onClick={() => setIsFollowUpModalOpen(true)}
                className="flex items-center gap-2"
              >
                <IoCalendar size={18} />
                <span className="hidden sm:inline">Follow</span>
              </Button>
              <Button
                variant="primary"
                onClick={handleConvertToClient}
                className="flex items-center gap-2"
              >
                <IoPersonAdd size={18} />
                <span className="hidden sm:inline">Convert to client</span>
                <span className="sm:hidden">Convert</span>
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-gray-200 overflow-x-auto">
            {['Overview', 'Estimates', 'Proposals', 'Contracts', 'Files'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === tab.toLowerCase()
                  ? 'border-primary-accent text-primary-accent'
                  : 'border-transparent text-secondary-text hover:text-primary-text'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Lead Info summary */}
              <Card className="p-6 bg-gradient-to-br from-white to-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Lead Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Lead Type</p>
                    <p className="text-sm text-gray-900 font-semibold mt-1">{lead.leadType || lead.lead_type || 'Organization'}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Person / Organization</p>
                    <p className="text-sm text-gray-900 font-semibold mt-1">
                      {lead.personName || lead.companyName || '-'}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Owner</p>
                    <p className="text-sm text-gray-900 font-semibold mt-1">{lead.ownerName || '-'}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email</p>
                    <p className="text-sm text-gray-900 font-semibold mt-1">{lead.email || '-'}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Phone</p>
                    <p className="text-sm text-gray-900 font-semibold mt-1">{lead.phone || '-'}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Status</p>
                    <div className="mt-1">
                      <Badge className={`text-xs ${stage?.color || ''}`}>
                        {lead.status || 'New'}
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Source</p>
                    <p className="text-sm text-gray-900 font-semibold mt-1">{lead.source || 'N/A'}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Address</p>
                    <p className="text-sm text-gray-900 font-semibold mt-1">
                      {[lead.address, lead.city, lead.country].filter(Boolean).join(', ') || 'N/A'}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Probability</p>
                    <p className="text-sm text-gray-900 font-semibold mt-1">{lead.probability !== null && lead.probability !== undefined ? `${lead.probability}%` : 'N/A'}</p>
                  </div>
                </div>
              </Card>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium mb-1">Estimates</p>
                      <p className="text-3xl font-bold text-blue-900">{estimates.length}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <IoDocumentText className="text-blue-600" size={24} />
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 font-medium mb-1">Estimate Requests</p>
                      <p className="text-3xl font-bold text-purple-900">0</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <IoDocumentText className="text-purple-600" size={24} />
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium mb-1">Proposals</p>
                      <p className="text-3xl font-bold text-green-900">{proposals.length}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <IoDocumentText className="text-green-600" size={24} />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Contacts */}
              <Card className="p-6 bg-gradient-to-br from-white to-gray-50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <IoPerson className="text-gray-600" size={24} />
                    Contacts
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddContactModalOpen(true)}
                    className="flex items-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <IoAdd size={16} />
                    Add Contact
                  </Button>
                </div>
                {loadingContacts ? (
                  <div className="text-center py-8 text-secondary-text">
                    <p>Loading contacts...</p>
                  </div>
                ) : contacts.length === 0 ? (
                  <div className="text-center py-8 text-secondary-text">
                    <IoPerson size={48} className="mx-auto mb-2 text-gray-300" />
                    <p>No contacts found</p>
                    <p className="text-xs mt-2">Click "Add contact" to add a new contact for this lead</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {contacts.map((contact) => (
                      <div key={contact.id || `contact-${contact.name}`} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-primary-accent/20 flex items-center justify-center flex-shrink-0">
                          <IoPerson className="text-primary-accent" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-primary-text truncate">{contact.name}</p>
                              {contact.company && (
                                <p className="text-sm text-secondary-text truncate">{contact.company}</p>
                              )}
                              {contact.assigned_user_name && (
                                <p className="text-xs text-secondary-text mt-1">Assigned to: {contact.assigned_user_name}</p>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                              {contact.contact_type && (
                                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded">{contact.contact_type}</span>
                              )}
                              {contact.status && (
                                <span className={`text-xs px-2 py-0.5 rounded ${contact.status === 'Active' ? 'bg-green-100 text-green-800' :
                                  contact.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                  {contact.status}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 space-y-1">
                            {contact.email && (
                              <p className="text-sm text-secondary-text truncate flex items-center gap-1">
                                <span className="text-xs">📧</span>
                                {contact.email}
                              </p>
                            )}
                            {contact.phone && (
                              <p className="text-sm text-secondary-text truncate flex items-center gap-1">
                                <span className="text-xs">📞</span>
                                {contact.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Events */}
              <Card className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <h3 className="text-lg font-semibold text-primary-text">Events</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                      {['month', 'week', 'day', 'list'].map((view) => (
                        <button
                          key={view}
                          onClick={() => setCalendarView(view)}
                          className={`px-2 sm:px-3 py-1 text-xs font-medium rounded transition-colors ${calendarView === view
                            ? 'bg-white text-primary-text shadow-sm'
                            : 'text-secondary-text hover:text-primary-text'
                            }`}
                        >
                          {view.charAt(0).toUpperCase() + view.slice(1)}
                        </button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAddEventModalOpen(true)}
                      className="flex items-center gap-2"
                    >
                      <IoAdd size={16} />
                      Add event
                    </Button>
                  </div>
                </div>

                {calendarView === 'month' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        ‹
                      </button>
                      <h4 className="font-semibold text-primary-text text-sm sm:text-base">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h4>
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        ›
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center text-xs font-medium text-secondary-text py-2">
                          {day}
                        </div>
                      ))}
                      {calendarDays.map((day, index) => {
                        const dayEvents = getEventsForDay(day)
                        const today = new Date()
                        const isToday = day &&
                          currentMonth.getFullYear() === today.getFullYear() &&
                          currentMonth.getMonth() === today.getMonth() &&
                          day === today.getDate()
                        return (
                          <div
                            key={index}
                            className={`min-h-[60px] p-1 sm:p-2 text-xs sm:text-sm border border-gray-200 rounded ${isToday ? 'bg-yellow-100 border-yellow-300' : ''
                              } ${day ? 'hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'}`}
                          >
                            {day && (
                              <>
                                <div className="font-medium mb-1">{day}</div>
                                {dayEvents.length > 0 && (
                                  <div className="space-y-1">
                                    {dayEvents.slice(0, 2).map((event, idx) => (
                                      <div
                                        key={idx}
                                        className="text-[10px] px-1 py-0.5 rounded truncate"
                                        style={{ backgroundColor: event.label_color + '20', color: event.label_color }}
                                        title={event.event_name}
                                      >
                                        {event.event_name}
                                      </div>
                                    ))}
                                    {dayEvents.length > 2 && (
                                      <div className="text-[10px] text-gray-500">+{dayEvents.length - 2} more</div>
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          )}

          {activeTab === 'estimates' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={() => setIsAddEstimateModalOpen(true)}
                  className="flex items-center gap-2"
                >
                  <IoAdd size={18} />
                  Add Estimate
                </Button>
              </div>
              <Card className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimate</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimate Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loadingEstimates ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-secondary-text">Loading...</td>
                        </tr>
                      ) : estimates.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-secondary-text">No record found.</td>
                        </tr>
                      ) : (
                        estimates.map((estimate) => (
                          <tr key={estimate.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-text font-medium">
                              {estimate.estimate_number || `EST-${estimate.id}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                              {estimate.created_at ? new Date(estimate.created_at).toLocaleDateString() : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-text">
                              ${estimate.total || 0}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant={estimate.status === 'Accepted' || estimate.status === 'Sent' ? 'success' : 'default'}>
                                {estimate.status || 'Draft'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => handleViewEstimate(estimate)}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="View"
                                >
                                  <IoEye size={18} />
                                </button>
                                <button
                                  onClick={() => handleEditEstimate(estimate)}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <IoCreate size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteEstimate(estimate)}
                                  className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                                  title="Delete"
                                >
                                  <IoTrash size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'proposals' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={() => setIsAddProposalModalOpen(true)}
                  className="flex items-center gap-2"
                >
                  <IoAdd size={18} />
                  Add Proposal
                </Button>
              </div>
              <Card className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposal</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loadingProposals ? (
                        <tr>
                          <td colSpan="8" className="px-6 py-8 text-center text-secondary-text">Loading...</td>
                        </tr>
                      ) : proposals.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="px-6 py-8 text-center text-secondary-text">No record found.</td>
                        </tr>
                      ) : (
                        proposals.map((proposal) => (
                          <tr key={proposal.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-text font-medium">
                              {proposal.title || proposal.estimate_number || `PROP-${proposal.id}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                              {proposal.created_at ? new Date(proposal.created_at).toLocaleDateString() : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                              {proposal.valid_till ? new Date(proposal.valid_till).toLocaleDateString() : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                              {proposal.sent_at ? new Date(proposal.sent_at).toLocaleDateString() : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                              {proposal.updated_at ? new Date(proposal.updated_at).toLocaleDateString() : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-text">
                              ${proposal.total || 0}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant={proposal.status === 'Accepted' || proposal.status === 'Sent' ? 'success' : 'default'}>
                                {proposal.status || 'Draft'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => handleViewProposal(proposal)}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="View"
                                >
                                  <IoEye size={18} />
                                </button>
                                <button
                                  onClick={() => handleEditProposal(proposal)}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <IoCreate size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProposal(proposal)}
                                  className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                                  title="Delete"
                                >
                                  <IoTrash size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={() => setIsAddContractModalOpen(true)}
                  className="flex items-center gap-2"
                >
                  <IoAdd size={18} />
                  Add Contract
                </Button>
              </div>
              <Card className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loadingContracts ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-8 text-center text-secondary-text">Loading...</td>
                        </tr>
                      ) : contracts.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-8 text-center text-secondary-text">No record found.</td>
                        </tr>
                      ) : (
                        contracts.map((contract) => (
                          <tr key={contract.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-text">
                              {contract.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-text font-medium">
                              {contract.title || `Contract ${contract.id}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                              {contract.contract_date ? new Date(contract.contract_date).toLocaleDateString() : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                              {contract.valid_until ? new Date(contract.valid_until).toLocaleDateString() : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-text">
                              ${contract.amount || 0}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant={contract.status === 'Active' ? 'success' : 'default'}>
                                {contract.status || 'Pending'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => handleViewContract(contract)}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="View"
                                >
                                  <IoEye size={18} />
                                </button>
                                <button
                                  onClick={() => handleEditContract(contract)}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <IoCreate size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteContract(contract)}
                                  className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                                  title="Delete"
                                >
                                  <IoTrash size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={() => setIsAddFileModalOpen(true)}
                  className="flex items-center gap-2"
                >
                  <IoAdd size={18} />
                  Add File
                </Button>
              </div>
              <Card className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loadingFiles ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-secondary-text">Loading...</td>
                        </tr>
                      ) : files.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-secondary-text">No record found.</td>
                        </tr>
                      ) : (
                        files.map((file) => (
                          <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-text">
                              {file.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <IoDocumentText size={20} className="text-primary-accent" />
                                <span className="text-sm text-primary-text font-medium">{file.title || file.name || file.file_name || `File ${file.id}`}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                              {file.size || (file.file_size ? `${(file.file_size / 1024).toFixed(2)} KB` : '-')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                              {file.created_at ? new Date(file.created_at).toLocaleDateString() : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => handleDownloadFile(file)}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="Download"
                                >
                                  <IoDownload size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteFile(file)}
                                  className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                                  title="Delete"
                                >
                                  <IoTrash size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - HIDDEN (removed for full-width tables) */}
      <div className="hidden">
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between lg:hidden">
            <h3 className="text-lg font-semibold text-primary-text">Lead Info</h3>
            <button
              onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <IoClose size={20} />
            </button>
          </div>

          {/* Lead Info */}
          <div>
            <h3 className="text-sm font-semibold text-primary-text mb-3">Lead Info</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-secondary-text">Organization</label>
                <p className="text-sm text-primary-text mt-1">{lead.companyName || '-'}</p>
              </div>
              <div>
                <label className="text-xs text-secondary-text">Status</label>
                <div className="mt-1">
                  <Badge className={`text-xs ${stage?.color || ''}`}>
                    {lead.status}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-xs text-secondary-text">Source</label>
                <p className="text-sm text-primary-text mt-1">{lead.source || 'Elsewhere'}</p>
              </div>
              <div>
                <label className="text-xs text-secondary-text">Add Label</label>
                <button className="mt-1 text-xs text-primary-accent hover:underline">+ Add Label</button>
              </div>
              <div>
                <label className="text-xs text-secondary-text">Manager</label>
                <p className="text-sm text-primary-text mt-1">{lead.ownerName || 'Demo'}</p>
                <button className="mt-1 text-xs text-primary-accent hover:underline">+ Add Managers</button>
              </div>
              <div>
                <label className="text-xs text-secondary-text">Country</label>
                <p className="text-sm text-primary-text mt-1">{lead.country || 'Botswana'}</p>
              </div>
              <div>
                <label className="text-xs text-secondary-text">Phone</label>
                <p className="text-sm text-primary-text mt-1">{lead.phone || '-'}</p>
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-primary-text">Tasks</h3>
              <button
                onClick={() => setIsAddTaskModalOpen(true)}
                className="text-xs text-primary-accent hover:underline flex items-center gap-1"
              >
                <IoAdd size={14} />
                Add task
              </button>
            </div>
            <div className="space-y-2">
              {tasks.length === 0 ? (
                <p className="text-xs text-secondary-text">No tasks</p>
              ) : (
                tasks.map((task, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded text-xs">
                    {task.title}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-primary-text">Notes</h3>
              <button
                onClick={() => setIsAddNoteModalOpen(true)}
                className="text-xs text-primary-accent hover:underline flex items-center gap-1"
              >
                <IoAdd size={14} />
                Add note
              </button>
            </div>
            <div className="space-y-2">
              {notes.length === 0 ? (
                <p className="text-xs text-secondary-text">No notes</p>
              ) : (
                notes.map((note, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded text-xs">
                    {note.content}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Reminders */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-primary-text">Reminders (Private)</h3>
              <button
                onClick={() => setIsAddReminderModalOpen(true)}
                className="text-xs text-primary-accent hover:underline flex items-center gap-1"
              >
                <IoAdd size={14} />
                Add reminder
              </button>
            </div>
            <div className="space-y-2">
              {reminders.length === 0 ? (
                <p className="text-xs text-secondary-text">No reminders</p>
              ) : (
                reminders.map((reminder, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded text-xs">
                    {reminder.title}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Toggle Right Sidebar Button - REMOVED (sidebar hidden) */}

      {/* Modals - Same as before */}
      {/* Add Contact Modal */}
      <Modal
        isOpen={isAddContactModalOpen}
        onClose={() => {
          setIsAddContactModalOpen(false)
          setContactFormData({ name: '', company: '', email: '', phone: '', contact_type: 'Client', status: 'Active', notes: '' })
        }}
        title="Add Contact"
      >
        <div className="space-y-4">
          <Input
            label="Name *"
            value={contactFormData.name}
            onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
            placeholder="Enter contact name"
            required
          />
          <Input
            label="Company"
            value={contactFormData.company}
            onChange={(e) => setContactFormData({ ...contactFormData, company: e.target.value })}
            placeholder="Enter company name"
          />
          <Input
            label="Email"
            type="email"
            value={contactFormData.email}
            onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
            placeholder="Enter email address"
          />
          <Input
            label="Phone"
            value={contactFormData.phone}
            onChange={(e) => setContactFormData({ ...contactFormData, phone: e.target.value })}
            placeholder="Enter phone number"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-1">Contact Type</label>
              <select
                value={contactFormData.contact_type}
                onChange={(e) => setContactFormData({ ...contactFormData, contact_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
              >
                <option value="Client">Client</option>
                <option value="Vendor">Vendor</option>
                <option value="Partner">Partner</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-1">Status</label>
              <select
                value={contactFormData.status}
                onChange={(e) => setContactFormData({ ...contactFormData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-1">Notes</label>
            <textarea
              value={contactFormData.notes}
              onChange={(e) => setContactFormData({ ...contactFormData, notes: e.target.value })}
              placeholder="Enter any additional notes"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddContactModalOpen(false)
                setContactFormData({ name: '', company: '', email: '', phone: '', contact_type: 'Client', status: 'Active', notes: '' })
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddContact} className="flex-1">
              Add Contact
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Event Modal */}
      <Modal
        isOpen={isAddEventModalOpen}
        onClose={() => {
          setIsAddEventModalOpen(false)
          setEventFormData({
            event_name: '',
            description: '',
            where: '',
            starts_on_date: new Date().toISOString().split('T')[0],
            starts_on_time: '09:00',
            ends_on_date: new Date().toISOString().split('T')[0],
            ends_on_time: '10:00',
            label_color: '#FF0000',
            status: 'Pending',
            employee_ids: [],
            client_ids: [],
            department_ids: [],
            host_id: user?.id || null,
          })
        }}
        title="Add Event"
      >
        <div className="space-y-4">
          <Input
            label="Event Name *"
            value={eventFormData.event_name}
            onChange={(e) => setEventFormData({ ...eventFormData, event_name: e.target.value })}
            placeholder="Enter event name"
            required
          />
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Label Color *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={eventFormData.label_color}
                onChange={(e) => setEventFormData({ ...eventFormData, label_color: e.target.value })}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <Input
                value={eventFormData.label_color}
                onChange={(e) => setEventFormData({ ...eventFormData, label_color: e.target.value })}
                placeholder="#FF0000"
                className="flex-1"
              />
            </div>
          </div>
          <Input
            label="Where *"
            value={eventFormData.where}
            onChange={(e) => setEventFormData({ ...eventFormData, where: e.target.value })}
            placeholder="Enter location"
            required
          />
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Description</label>
            <textarea
              value={eventFormData.description}
              onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date *"
              type="date"
              value={eventFormData.starts_on_date}
              onChange={(e) => {
                const newDate = e.target.value
                setEventFormData({
                  ...eventFormData,
                  starts_on_date: newDate,
                  ends_on_date: newDate
                })
              }}
              required
            />
            <Input
              label="Start Time *"
              type="time"
              value={eventFormData.starts_on_time}
              onChange={(e) => setEventFormData({ ...eventFormData, starts_on_time: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="End Date *"
              type="date"
              value={eventFormData.ends_on_date}
              onChange={(e) => setEventFormData({ ...eventFormData, ends_on_date: e.target.value })}
              required
            />
            <Input
              label="End Time *"
              type="time"
              value={eventFormData.ends_on_time}
              onChange={(e) => setEventFormData({ ...eventFormData, ends_on_time: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Status</label>
            <select
              value={eventFormData.status}
              onChange={(e) => setEventFormData({ ...eventFormData, status: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddEventModalOpen(false)
                setEventFormData({
                  event_name: '',
                  description: '',
                  where: '',
                  starts_on_date: new Date().toISOString().split('T')[0],
                  starts_on_time: '09:00',
                  ends_on_date: new Date().toISOString().split('T')[0],
                  ends_on_time: '10:00',
                  label_color: '#FF0000',
                  status: 'Pending',
                  employee_ids: [],
                  client_ids: [],
                  department_ids: [],
                  host_id: user?.id || null,
                })
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddEvent} className="flex-1">
              Add Event
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        title="Add Task"
      >
        <div className="space-y-4">
          <Input
            label="Title"
            value={taskFormData.title}
            onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
            placeholder="Enter task title"
          />
          <Input
            label="Due Date"
            type="date"
            value={taskFormData.dueDate}
            onChange={(e) => setTaskFormData({ ...taskFormData, dueDate: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Priority</label>
            <select
              value={taskFormData.priority}
              onChange={(e) => setTaskFormData({ ...taskFormData, priority: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Description</label>
            <textarea
              value={taskFormData.description}
              onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter description"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsAddTaskModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddTask} className="flex-1">
              Add Task
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Note Modal */}
      <Modal
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
        title="Add Note"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Note</label>
            <textarea
              value={noteFormData.content}
              onChange={(e) => setNoteFormData({ content: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter note"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsAddNoteModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddNote} className="flex-1">
              Add Note
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Reminder Modal */}
      <Modal
        isOpen={isAddReminderModalOpen}
        onClose={() => setIsAddReminderModalOpen(false)}
        title="Add Reminder"
      >
        <div className="space-y-4">
          <Input
            label="Title"
            value={reminderFormData.title}
            onChange={(e) => setReminderFormData({ ...reminderFormData, title: e.target.value })}
            placeholder="Enter reminder title"
          />
          <Input
            label="Date"
            type="date"
            value={reminderFormData.date}
            onChange={(e) => setReminderFormData({ ...reminderFormData, date: e.target.value })}
          />
          <Input
            label="Time"
            type="time"
            value={reminderFormData.time}
            onChange={(e) => setReminderFormData({ ...reminderFormData, time: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Description</label>
            <textarea
              value={reminderFormData.description}
              onChange={(e) => setReminderFormData({ ...reminderFormData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter description"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsAddReminderModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddReminder} className="flex-1">
              Add Reminder
            </Button>
          </div>
        </div>
      </Modal>

      {/* Follow-up Modal */}
      <Modal
        isOpen={isFollowUpModalOpen}
        onClose={() => {
          setIsFollowUpModalOpen(false)
          setFollowUpFormData({ date: '', time: '', notes: '' })
        }}
        title="Schedule Follow-up"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This follow-up will be automatically added to your calendar.
            </p>
          </div>
          <Input
            label="Follow-up Date"
            type="date"
            value={followUpFormData.date}
            onChange={(e) => setFollowUpFormData({ ...followUpFormData, date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            required
          />
          <Input
            label="Follow-up Time"
            type="time"
            value={followUpFormData.time}
            onChange={(e) => setFollowUpFormData({ ...followUpFormData, time: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Notes</label>
            <textarea
              value={followUpFormData.notes}
              onChange={(e) => setFollowUpFormData({ ...followUpFormData, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Add any notes about this follow-up..."
            />
          </div>
          {lead?.due_followup && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Current Follow-up:</strong> {new Date(lead.due_followup).toLocaleDateString()}
              </p>
            </div>
          )}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsFollowUpModalOpen(false)
                setFollowUpFormData({ date: '', time: '', notes: '' })
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleFollowUp} className="flex-1">
              Schedule Follow-up
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add File Modal */}
      <Modal
        isOpen={isAddFileModalOpen}
        onClose={() => {
          setIsAddFileModalOpen(false)
          setFileFormData({ title: '', category: '', description: '', file: null })
        }}
        title="Add File"
      >
        <div className="space-y-4">
          <Input
            label="File Title *"
            value={fileFormData.title}
            onChange={(e) => setFileFormData({ ...fileFormData, title: e.target.value })}
            placeholder="Enter file title"
            required
          />
          <Input
            label="Category"
            value={fileFormData.category}
            onChange={(e) => setFileFormData({ ...fileFormData, category: e.target.value })}
            placeholder="Enter category (optional)"
          />
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Description</label>
            <textarea
              value={fileFormData.description}
              onChange={(e) => setFileFormData({ ...fileFormData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter file description (optional)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">File *</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              required
            />
            {fileFormData.file && (
              <p className="mt-2 text-sm text-secondary-text">Selected: {fileFormData.file.name}</p>
            )}
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddFileModalOpen(false)
                setFileFormData({ title: '', category: '', description: '', file: null })
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddFile} className="flex-1">
              Upload File
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Estimate Modal */}
      <Modal
        isOpen={isAddEstimateModalOpen}
        onClose={() => {
          setIsAddEstimateModalOpen(false)
          setEstimateFormData({
            estimate_number: '', estimate_date: new Date().toISOString().split('T')[0], valid_till: '',
            currency: 'USD', calculate_tax: 'After Discount', description: '', note: '',
            terms: 'Thank you for your business.', discount: 0, discount_type: '%', amount: '', status: 'Draft'
          })
        }}
        title="Add Estimate"
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Input
            label="Estimate Number"
            value={estimateFormData.estimate_number}
            onChange={(e) => setEstimateFormData({ ...estimateFormData, estimate_number: e.target.value })}
            placeholder="Auto-generated if empty"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Estimate Date"
              type="date"
              value={estimateFormData.estimate_date}
              onChange={(e) => setEstimateFormData({ ...estimateFormData, estimate_date: e.target.value })}
            />
            <Input
              label="Valid Till"
              type="date"
              value={estimateFormData.valid_till}
              onChange={(e) => setEstimateFormData({ ...estimateFormData, valid_till: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">Currency</label>
              <select
                value={estimateFormData.currency}
                onChange={(e) => setEstimateFormData({ ...estimateFormData, currency: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="INR (₹)">INR (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">Calculate Tax</label>
              <select
                value={estimateFormData.calculate_tax}
                onChange={(e) => setEstimateFormData({ ...estimateFormData, calculate_tax: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              >
                <option value="Before Discount">Before Discount</option>
                <option value="After Discount">After Discount</option>
              </select>
            </div>
          </div>
          <Input
            label="Amount"
            type="number"
            value={estimateFormData.amount}
            onChange={(e) => setEstimateFormData({ ...estimateFormData, amount: e.target.value })}
            placeholder="Enter total amount"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Discount"
              type="number"
              value={estimateFormData.discount}
              onChange={(e) => setEstimateFormData({ ...estimateFormData, discount: e.target.value })}
              placeholder="0"
            />
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">Discount Type</label>
              <select
                value={estimateFormData.discount_type}
                onChange={(e) => setEstimateFormData({ ...estimateFormData, discount_type: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              >
                <option value="%">Percentage (%)</option>
                <option value="flat">Flat Amount</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Status</label>
            <select
              value={estimateFormData.status}
              onChange={(e) => setEstimateFormData({ ...estimateFormData, status: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
            >
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Description</label>
            <textarea
              value={estimateFormData.description}
              onChange={(e) => setEstimateFormData({ ...estimateFormData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Note</label>
            <textarea
              value={estimateFormData.note}
              onChange={(e) => setEstimateFormData({ ...estimateFormData, note: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Note for recipient"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Terms & Conditions</label>
            <textarea
              value={estimateFormData.terms}
              onChange={(e) => setEstimateFormData({ ...estimateFormData, terms: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Terms and conditions"
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddEstimateModalOpen(false)
                setEstimateFormData({
                  estimate_number: '', estimate_date: new Date().toISOString().split('T')[0], valid_till: '',
                  currency: 'USD', calculate_tax: 'After Discount', description: '', note: '',
                  terms: 'Thank you for your business.', discount: 0, discount_type: '%', amount: '', status: 'Draft'
                })
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddEstimate} className="flex-1">
              Create Estimate
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Proposal Modal */}
      <Modal
        isOpen={isAddProposalModalOpen}
        onClose={() => {
          setIsAddProposalModalOpen(false)
          setProposalFormData({
            title: '', valid_till: '', currency: 'USD', description: '', note: '',
            terms: 'Thank you for your business.', discount: 0, discount_type: '%', amount: '', status: 'Draft'
          })
        }}
        title="Add Proposal"
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Input
            label="Proposal Title"
            value={proposalFormData.title}
            onChange={(e) => setProposalFormData({ ...proposalFormData, title: e.target.value })}
            placeholder="Enter proposal title"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Valid Till"
              type="date"
              value={proposalFormData.valid_till}
              onChange={(e) => setProposalFormData({ ...proposalFormData, valid_till: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">Currency</label>
              <select
                value={proposalFormData.currency}
                onChange={(e) => setProposalFormData({ ...proposalFormData, currency: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="INR (₹)">INR (₹)</option>
              </select>
            </div>
          </div>
          <Input
            label="Amount"
            type="number"
            value={proposalFormData.amount}
            onChange={(e) => setProposalFormData({ ...proposalFormData, amount: e.target.value })}
            placeholder="Enter total amount"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Discount"
              type="number"
              value={proposalFormData.discount}
              onChange={(e) => setProposalFormData({ ...proposalFormData, discount: e.target.value })}
              placeholder="0"
            />
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">Discount Type</label>
              <select
                value={proposalFormData.discount_type}
                onChange={(e) => setProposalFormData({ ...proposalFormData, discount_type: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              >
                <option value="%">Percentage (%)</option>
                <option value="flat">Flat Amount</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Status</label>
            <select
              value={proposalFormData.status}
              onChange={(e) => setProposalFormData({ ...proposalFormData, status: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
            >
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Description</label>
            <textarea
              value={proposalFormData.description}
              onChange={(e) => setProposalFormData({ ...proposalFormData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Note</label>
            <textarea
              value={proposalFormData.note}
              onChange={(e) => setProposalFormData({ ...proposalFormData, note: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Note for recipient"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Terms & Conditions</label>
            <textarea
              value={proposalFormData.terms}
              onChange={(e) => setProposalFormData({ ...proposalFormData, terms: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Terms and conditions"
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddProposalModalOpen(false)
                setProposalFormData({
                  title: '', valid_till: '', currency: 'USD', description: '', note: '',
                  terms: 'Thank you for your business.', discount: 0, discount_type: '%', amount: '', status: 'Draft'
                })
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddProposal} className="flex-1">
              Create Proposal
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Contract Modal */}
      <Modal
        isOpen={isAddContractModalOpen}
        onClose={() => {
          setIsAddContractModalOpen(false)
          setContractFormData({
            title: '', contract_date: new Date().toISOString().split('T')[0], valid_until: '',
            tax: '', second_tax: '', note: '', amount: '', status: 'Draft'
          })
        }}
        title="Add Contract"
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Input
            label="Contract Title"
            value={contractFormData.title}
            onChange={(e) => setContractFormData({ ...contractFormData, title: e.target.value })}
            placeholder="Enter contract title"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Contract Date"
              type="date"
              value={contractFormData.contract_date}
              onChange={(e) => setContractFormData({ ...contractFormData, contract_date: e.target.value })}
            />
            <Input
              label="Valid Until"
              type="date"
              value={contractFormData.valid_until}
              onChange={(e) => setContractFormData({ ...contractFormData, valid_until: e.target.value })}
            />
          </div>
          <Input
            label="Amount"
            type="number"
            value={contractFormData.amount}
            onChange={(e) => setContractFormData({ ...contractFormData, amount: e.target.value })}
            placeholder="Enter contract amount"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">TAX</label>
              <select
                value={contractFormData.tax}
                onChange={(e) => setContractFormData({ ...contractFormData, tax: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              >
                <option value="">-</option>
                <option value="GST 10%">GST 10%</option>
                <option value="CGST 18%">CGST 18%</option>
                <option value="VAT 10%">VAT 10%</option>
                <option value="IGST 10%">IGST 10%</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">Second TAX</label>
              <select
                value={contractFormData.second_tax}
                onChange={(e) => setContractFormData({ ...contractFormData, second_tax: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              >
                <option value="">-</option>
                <option value="GST 10%">GST 10%</option>
                <option value="CGST 18%">CGST 18%</option>
                <option value="VAT 10%">VAT 10%</option>
                <option value="IGST 10%">IGST 10%</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Status</label>
            <select
              value={contractFormData.status}
              onChange={(e) => setContractFormData({ ...contractFormData, status: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
            >
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Note</label>
            <textarea
              value={contractFormData.note}
              onChange={(e) => setContractFormData({ ...contractFormData, note: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter note"
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddContractModalOpen(false)
                setContractFormData({
                  title: '', contract_date: new Date().toISOString().split('T')[0], valid_until: '',
                  tax: '', second_tax: '', note: '', amount: '', status: 'Draft'
                })
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddContract} className="flex-1">
              {selectedContract ? 'Update Contract' : 'Create Contract'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* View Contract Modal */}
      <Modal
        isOpen={isViewContractModalOpen}
        onClose={() => {
          setIsViewContractModalOpen(false)
          setSelectedContract(null)
        }}
        title="Contract Details"
        size="lg"
      >
        {selectedContract && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-secondary-text">Contract Number</p>
                <p className="text-primary-text font-medium">{selectedContract.contract_number || `#${selectedContract.id}`}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-text">Title</p>
                <p className="text-primary-text font-medium">{selectedContract.title || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-text">Contract Date</p>
                <p className="text-primary-text">{selectedContract.contract_date ? new Date(selectedContract.contract_date).toLocaleDateString() : '-'}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-text">Valid Until</p>
                <p className="text-primary-text">{selectedContract.valid_until ? new Date(selectedContract.valid_until).toLocaleDateString() : '-'}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-text">Amount</p>
                <p className="text-primary-text font-medium">${selectedContract.amount || 0}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-text">Status</p>
                <Badge variant={selectedContract.status === 'Accepted' ? 'success' : 'default'}>
                  {selectedContract.status || 'Draft'}
                </Badge>
              </div>
              {selectedContract.tax && (
                <div>
                  <p className="text-sm text-secondary-text">Tax</p>
                  <p className="text-primary-text">{selectedContract.tax}</p>
                </div>
              )}
              {selectedContract.second_tax && (
                <div>
                  <p className="text-sm text-secondary-text">Second Tax</p>
                  <p className="text-primary-text">{selectedContract.second_tax}</p>
                </div>
              )}
            </div>
            {selectedContract.note && (
              <div>
                <p className="text-sm text-secondary-text">Note</p>
                <p className="text-primary-text">{selectedContract.note}</p>
              </div>
            )}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => {
                  setIsViewContractModalOpen(false)
                  setSelectedContract(null)
                }}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsViewContractModalOpen(false)
                  handleEditContract(selectedContract)
                }}
                className="flex-1"
              >
                Edit Contract
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Convert to Client Modal */}
      <RightSideModal
        isOpen={isConvertModalOpen}
        onClose={() => setIsConvertModalOpen(false)}
        title="Convert Lead to Client"
      >
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-primary-text mb-3">Login Details</h3>
            <div className="space-y-4">
              <Input
                label="Client Name *"
                value={convertFormData.companyName}
                onChange={(e) => setConvertFormData({ ...convertFormData, companyName: e.target.value })}
                placeholder="Enter client name"
                required
              />
              <Input
                label="Client Email *"
                type="email"
                value={convertFormData.email}
                onChange={(e) => setConvertFormData({ ...convertFormData, email: e.target.value })}
                placeholder="Enter client email"
                required
                helperText="Client will login using this email"
              />
              <div className="relative">
                <Input
                  label="Password *"
                  type={showPassword ? "text" : "password"}
                  value={convertFormData.password}
                  onChange={(e) => setConvertFormData({ ...convertFormData, password: e.target.value })}
                  placeholder="Enter login password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-primary-accent"
                >
                  {showPassword ? <IoEye size={20} /> : <IoEye size={20} className="opacity-50" />}
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-primary-text mb-3">Company Details</h3>
            <div className="space-y-4">
              <Input
                label="Address"
                value={convertFormData.address}
                onChange={(e) => setConvertFormData({ ...convertFormData, address: e.target.value })}
                placeholder="Enter address"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={convertFormData.city}
                  onChange={(e) => setConvertFormData({ ...convertFormData, city: e.target.value })}
                  placeholder="Enter city"
                />
                <Input
                  label="State"
                  value={convertFormData.state}
                  onChange={(e) => setConvertFormData({ ...convertFormData, state: e.target.value })}
                  placeholder="Enter state"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Zip Code"
                  value={convertFormData.zip}
                  onChange={(e) => setConvertFormData({ ...convertFormData, zip: e.target.value })}
                  placeholder="Enter zip code"
                />
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-2">Country</label>
                  <select
                    value={convertFormData.country}
                    onChange={(e) => setConvertFormData({ ...convertFormData, country: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-2">Code</label>
                  <select
                    value={convertFormData.phoneCountryCode}
                    onChange={(e) => setConvertFormData({ ...convertFormData, phoneCountryCode: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                  >
                    {countryCodes.map(code => (
                      <option key={code} value={code}>{code}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Phone Number"
                    value={convertFormData.phoneNumber}
                    onChange={(e) => setConvertFormData({ ...convertFormData, phoneNumber: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <Input
                label="Website"
                value={convertFormData.website}
                onChange={(e) => setConvertFormData({ ...convertFormData, website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-primary-text mb-3">Billing Points</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="VAT Number"
                  value={convertFormData.vatNumber}
                  onChange={(e) => setConvertFormData({ ...convertFormData, vatNumber: e.target.value })}
                  placeholder="Enter VAT number"
                />
                <Input
                  label="GST Number"
                  value={convertFormData.gstNumber}
                  onChange={(e) => setConvertFormData({ ...convertFormData, gstNumber: e.target.value })}
                  placeholder="Enter GST number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">Currency</label>
                <select
                  value={convertFormData.currency}
                  onChange={(e) => setConvertFormData({ ...convertFormData, currency: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsConvertModalOpen(false)}
              className="px-4 text-gray-900 hover:text-white min-w-[100px]"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveConversion}
              className="px-4 bg-primary-accent text-white hover:bg-primary-accent/90 min-w-[150px]"
            >
              Perform Conversion
            </Button>
          </div>
        </div>
      </RightSideModal>
    </div>
  )
}

export default LeadDetail
