import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import AddButton from '../../../components/ui/AddButton'
import DataTable from '../../../components/ui/DataTable'
import RightSideModal from '../../../components/ui/RightSideModal'
import Badge from '../../../components/ui/Badge'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { ticketsAPI } from '../../../api'
import { IoEye } from 'react-icons/io5'

const Tickets = () => {
  const { user } = useAuth()
  const userId = user?.id || localStorage.getItem('userId')
  const companyId = user?.company_id || localStorage.getItem('companyId')
  const clientId = user?.client_id || localStorage.getItem('clientId')
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    subject: '',
    ticket_type: 'Bug Reports',
    description: '',
  })

  const ticketTypes = ['Bug Reports', 'General Support', 'Feature Request', 'Billing Issue', 'Technical Issue']

  const [tickets, setTickets] = useState([])

  useEffect(() => {
    if (companyId) {
      fetchTickets()
    }
  }, [clientId, companyId])

  const fetchTickets = async () => {
    try {
      setLoading(true)
      // Use clientId if available, otherwise use userId as fallback
      const effectiveClientId = clientId || userId
      console.log('Fetching tickets with clientId:', effectiveClientId, 'companyId:', companyId)
      
      const response = await ticketsAPI.getAll({
        company_id: companyId,
        client_id: effectiveClientId
      })
      if (response.data.success) {
        const fetchedTickets = response.data.data || []
        const transformedTickets = fetchedTickets.map(ticket => ({
          id: ticket.id,
          ticketId: `Ticket #${ticket.id}`,
          title: ticket.subject || ticket.title || 'N/A',
          ticketType: ticket.ticket_type || 'General Support',
          status: ticket.status || 'Open',
          lastActivity: ticket.updated_at 
            ? new Date(ticket.updated_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })
            : ticket.created_at 
              ? new Date(ticket.created_at).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })
              : 'N/A',
          ...ticket
        }))
        setTickets(transformedTickets)
      }
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { key: 'ticketId', label: 'Ticket ID' },
    { key: 'title', label: 'Title' },
    { key: 'ticketType', label: 'Ticket type' },
    { key: 'lastActivity', label: 'Last activity' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const statusColors = {
          Open: 'danger',
          New: 'warning',
          Pending: 'warning',
          Closed: 'default',
          Resolved: 'success',
        }
        return <Badge variant={statusColors[value] || 'default'}>{value}</Badge>
      },
    },
  ]

  const handleAdd = () => {
    setFormData({ subject: '', ticket_type: 'Bug Reports', description: '' })
    setIsAddModalOpen(true)
  }

  const handleView = (ticket) => {
    setSelectedTicket(ticket)
    setIsViewModalOpen(true)
  }

  const handleSave = async () => {
    if (!formData.subject) {
      alert('Subject is required')
      return
    }

    try {
      const effectiveClientId = clientId || userId
      const ticketData = {
        company_id: companyId,
        client_id: effectiveClientId,
        subject: formData.subject,
        ticket_type: formData.ticket_type || 'Bug Reports',
        description: formData.description || '',
        status: 'Open'
      }
      
      const response = await ticketsAPI.create(ticketData)
      if (response.data.success) {
        alert('Ticket created successfully!')
        await fetchTickets()
        setIsAddModalOpen(false)
        setFormData({ subject: '', ticket_type: 'Bug Reports', description: '' })
      } else {
        alert(response.data.error || 'Failed to create ticket')
      }
    } catch (error) {
      console.error('Error creating ticket:', error)
      alert(error.response?.data?.error || 'Failed to create ticket')
    }
  }

  const actions = (row) => (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleView(row)
        }}
        className="p-2 text-primary-accent hover:bg-primary-accent hover:bg-opacity-10 rounded transition-colors"
        title="View Details"
      >
        <IoEye size={18} />
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Tickets</h1>
          <p className="text-secondary-text mt-1">Manage your support tickets</p>
        </div>
        <AddButton onClick={handleAdd} label="Create Ticket" />
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-secondary-text">Loading tickets...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={tickets}
          searchPlaceholder="Search tickets..."
          filters={true}
          filterConfig={[
            { key: 'status', label: 'Status', type: 'select', options: ['Open', 'Pending', 'Closed', 'Resolved'] },
            { key: 'created', label: 'Created Date', type: 'daterange' },
          ]}
          actions={actions}
          bulkActions={false}
        />
      )}

      <RightSideModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add ticket"
      >
        <div className="space-y-4">
          <Input
            label="Title"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Title"
          />
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Ticket type
            </label>
            <select
              value={formData.ticket_type}
              onChange={(e) => setFormData({ ...formData, ticket_type: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
            >
              {ticketTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Description"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button variant="outline" className="flex items-center gap-2">
              <span>📎</span> Upload File
            </Button>
            <button className="p-2 text-gray-500 hover:text-primary-accent">
              🎤
            </button>
          </div>
          <div className="flex gap-3 pt-4 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              ✕ Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              ✓ Save
            </Button>
          </div>
        </div>
      </RightSideModal>

      <RightSideModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Ticket Details"
      >
        {selectedTicket && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-secondary-text">Ticket ID</label>
              <p className="text-primary-text mt-1">{selectedTicket.ticketId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Subject</label>
              <p className="text-primary-text mt-1">{selectedTicket.subject}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Status</label>
              <div className="mt-1">
                <Badge
                  variant={
                    selectedTicket.status === 'Closed'
                      ? 'success'
                      : selectedTicket.status === 'Pending'
                        ? 'warning'
                        : 'info'
                  }
                >
                  {selectedTicket.status}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Created</label>
              <p className="text-primary-text mt-1">{selectedTicket.created}</p>
            </div>
          </div>
        )}
      </RightSideModal>
    </div>
  )
}

export default Tickets

