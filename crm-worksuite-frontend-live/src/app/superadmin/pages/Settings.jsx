import { useState, useEffect } from 'react'
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import axiosInstance from '../../../api/axiosInstance'
import { IoSettings, IoCheckmarkCircle } from 'react-icons/io5'

const Settings = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    system_name: 'Worksuite CRM',
    default_currency: 'USD',
    default_timezone: 'UTC',
    session_timeout: '30',
    max_file_size: '10',
    allowed_file_types: 'pdf,doc,docx,xls,xlsx,jpg,jpeg,png',
    email_from: 'noreply@worksuite.com',
    email_from_name: 'Worksuite CRM',
    smtp_host: '',
    smtp_port: '587',
    smtp_username: '',
    smtp_password: '',
    backup_frequency: 'daily',
    enable_audit_log: true,
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/superadmin/settings')
      if (response.data.success) {
        setFormData(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await axiosInstance.put('/superadmin/settings', formData)
      if (response.data.success) {
        alert('System settings saved successfully!')
        fetchSettings()
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert(error.response?.data?.error || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent mx-auto"></div>
          <p className="mt-4 text-secondary-text">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary-text">System Settings</h1>
          <p className="text-secondary-text mt-1">Configure system-wide settings</p>
        </div>
      </div>

      {/* General Settings */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
          <IoSettings size={20} />
          General Settings
        </h2>
        <div className="space-y-4">
          <Input
            label="System Name"
            value={formData.system_name}
            onChange={(e) => setFormData({ ...formData, system_name: e.target.value })}
            placeholder="Worksuite CRM"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Default Currency
              </label>
              <select
                value={formData.default_currency}
                onChange={(e) => setFormData({ ...formData, default_currency: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-transparent"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>

            <Input
              label="Default Timezone"
              value={formData.default_timezone}
              onChange={(e) => setFormData({ ...formData, default_timezone: e.target.value })}
              placeholder="UTC"
            />
          </div>

          <Input
            label="Session Timeout (minutes)"
            type="number"
            value={formData.session_timeout}
            onChange={(e) => setFormData({ ...formData, session_timeout: e.target.value })}
            placeholder="30"
          />
        </div>
      </Card>

      {/* File Upload Settings */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-primary-text mb-4">File Upload Settings</h2>
        <div className="space-y-4">
          <Input
            label="Max File Size (MB)"
            type="number"
            value={formData.max_file_size}
            onChange={(e) => setFormData({ ...formData, max_file_size: e.target.value })}
            placeholder="10"
          />

          <Input
            label="Allowed File Types"
            value={formData.allowed_file_types}
            onChange={(e) => setFormData({ ...formData, allowed_file_types: e.target.value })}
            placeholder="pdf,doc,docx,jpg,png"
          />
        </div>
      </Card>

      {/* Email Settings */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-primary-text mb-4">Email Settings</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="From Email"
              type="email"
              value={formData.email_from}
              onChange={(e) => setFormData({ ...formData, email_from: e.target.value })}
              placeholder="noreply@worksuite.com"
            />

            <Input
              label="From Name"
              value={formData.email_from_name}
              onChange={(e) => setFormData({ ...formData, email_from_name: e.target.value })}
              placeholder="Worksuite CRM"
            />
          </div>

          <Input
            label="SMTP Host"
            value={formData.smtp_host}
            onChange={(e) => setFormData({ ...formData, smtp_host: e.target.value })}
            placeholder="smtp.gmail.com"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="SMTP Port"
              value={formData.smtp_port}
              onChange={(e) => setFormData({ ...formData, smtp_port: e.target.value })}
              placeholder="587"
            />

            <Input
              label="SMTP Username"
              value={formData.smtp_username}
              onChange={(e) => setFormData({ ...formData, smtp_username: e.target.value })}
              placeholder="your-email@gmail.com"
            />
          </div>

          <Input
            label="SMTP Password"
            type="password"
            value={formData.smtp_password}
            onChange={(e) => setFormData({ ...formData, smtp_password: e.target.value })}
            placeholder="Enter SMTP password"
          />
        </div>
      </Card>

      {/* Backup Settings */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-primary-text mb-4">Backup Settings</h2>
        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">
            Backup Frequency
          </label>
          <select
            value={formData.backup_frequency}
            onChange={(e) => setFormData({ ...formData, backup_frequency: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-transparent"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </Card>

      {/* Audit Log */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-primary-text mb-4">Audit Log</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-primary-text">Enable Audit Log</p>
            <p className="text-sm text-secondary-text">Track all system activities</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.enable_audit_log}
              onChange={(e) => setFormData({ ...formData, enable_audit_log: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-accent"></div>
          </label>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          variant="primary"
          onClick={handleSave} 
          className="px-6 py-2.5 bg-primary-accent text-white hover:bg-primary-accent/90" 
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  )
}

export default Settings
