import { useState } from 'react'
import AddButton from '../../../components/ui/AddButton'
import DataTable from '../../../components/ui/DataTable'
import RightSideModal from '../../../components/ui/RightSideModal'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import { IoCreate, IoTrash, IoEye } from 'react-icons/io5'
import Badge from '../../../components/ui/Badge'

const RolesPermissions = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [formData, setFormData] = useState({
    roleName: '',
    permissions: {
      leads: false,
      clients: false,
      projects: false,
      invoices: false,
      reports: false,
    },
  })

  const [roles, setRoles] = useState([
    {
      id: 1,
      roleName: 'Admin',
      permissions: 'All Permissions',
    },
    {
      id: 2,
      roleName: 'Manager',
      permissions: 'Leads, Clients, Projects',
    },
    {
      id: 3,
      roleName: 'Employee',
      permissions: 'Projects, Tasks',
    },
  ])

  const columns = [
    { key: 'roleName', label: 'Role Name' },
    { key: 'permissions', label: 'Permissions' },
  ]

  const handleAdd = () => {
    setFormData({
      roleName: '',
      permissions: {
        leads: false,
        clients: false,
        projects: false,
        invoices: false,
        reports: false,
      },
    })
    setIsAddModalOpen(true)
  }

  const handleView = (role) => {
    setSelectedRole(role)
    setIsViewModalOpen(true)
  }

  const handleEdit = (role) => {
    setSelectedRole(role)
    setFormData({
      roleName: role.roleName,
      permissions: {
        leads: true,
        clients: true,
        projects: true,
        invoices: false,
        reports: false,
      },
    })
    setIsEditModalOpen(true)
  }

  const handleSave = () => {
    const permissionList = Object.entries(formData.permissions)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(', ')

    if (isEditModalOpen && selectedRole) {
      setRoles(
        roles.map((r) =>
          r.id === selectedRole.id
            ? { ...selectedRole, roleName: formData.roleName, permissions: permissionList }
            : r
        )
      )
      setIsEditModalOpen(false)
    } else {
      const newRole = {
        id: roles.length + 1,
        roleName: formData.roleName,
        permissions: permissionList || 'No Permissions',
      }
      setRoles([...roles, newRole])
      setIsAddModalOpen(false)
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
        title="View"
      >
        <IoEye size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleEdit(row)
        }}
        className="p-2 text-warning hover:bg-warning hover:bg-opacity-10 rounded transition-colors"
        title="Edit"
      >
        <IoCreate size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          if (window.confirm(`Delete role "${row.roleName}"?`)) {
            setRoles(roles.filter((r) => r.id !== row.id))
          }
        }}
        className="p-2 text-danger hover:bg-danger hover:bg-opacity-10 rounded transition-colors"
        title="Delete"
      >
        <IoTrash size={18} />
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Roles & Permissions</h1>
          <p className="text-secondary-text mt-1">Manage user roles and permissions</p>
        </div>
        <AddButton onClick={handleAdd} label="Add Role" />
      </div>

      <DataTable
        columns={columns}
        data={roles}
        searchPlaceholder="Search roles..."
        filters={true}
        filterConfig={[
          { key: 'roleName', label: 'Role Name', type: 'text' },
        ]}
        actions={actions}
        bulkActions={true}
      />

      <RightSideModal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setIsEditModalOpen(false)
        }}
        title={isAddModalOpen ? 'Add New Role' : 'Edit Role'}
        width="w-[600px]"
      >
        <div className="space-y-4">
          <Input
            label="Role Name"
            value={formData.roleName}
            onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-primary-text mb-3">
              Permissions
            </label>
            <div className="space-y-2">
              {Object.keys(formData.permissions).map((permission) => (
                <label
                  key={permission}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions[permission]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        permissions: {
                          ...formData.permissions,
                          [permission]: e.target.checked,
                        },
                      })
                    }
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-primary-text capitalize">{permission}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false)
                setIsEditModalOpen(false)
              }}
              className="px-4"
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} className="px-4">
              {isAddModalOpen ? 'Save Role' : 'Update Role'}
            </Button>
          </div>
        </div>
      </RightSideModal>

      {/* View Modal */}
      <RightSideModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Role Details"
      >
        {selectedRole && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-secondary-text">Role Name</label>
              <p className="text-primary-text mt-1 text-base font-semibold">{selectedRole.roleName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Permissions</label>
              <p className="text-primary-text mt-1 text-base">{selectedRole.permissions}</p>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsViewModalOpen(false)
                  handleEdit(selectedRole)
                }}
                className="flex-1"
              >
                Edit
              </Button>
            </div>
          </div>
        )}
      </RightSideModal>
    </div>
  )
}

export default RolesPermissions
