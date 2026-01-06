import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { projectsAPI, tasksAPI, documentsAPI, timeTrackingAPI, expensesAPI, employeesAPI, notesAPI, notificationsAPI } from '../../../api'
import Timer from '../../../components/ui/Timer'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import Input from '../../../components/ui/Input'
import Modal from '../../../components/ui/Modal'
import {
  IoArrowBack,
  IoPerson,
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
  IoStar,
  IoHelpCircle,
  IoBriefcase,
  IoCash,
  IoReceipt,
  IoList,
  IoEllipsisVertical,
  IoGlobe,
  IoBookmark,
  IoNotifications,
  IoSettings,
  IoStopwatch,
  IoCopy,
  IoCheckmark,
  IoBan,
  IoPlay,
  IoStop,
  IoFlag,
  IoCalendarOutline,
  IoMail
} from 'react-icons/io5'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerElapsedTime, setTimerElapsedTime] = useState(0)
  const [timerStartTime, setTimerStartTime] = useState(null)
  const timerIntervalRef = useRef(null)

  // Data states
  const [tasks, setTasks] = useState([])
  const [tasksKanban, setTasksKanban] = useState({ todo: [], 'in progress': [], review: [], done: [] })
  const [milestones, setMilestones] = useState([])
  const [notes, setNotes] = useState([])
  const [files, setFiles] = useState([])
  const [comments, setComments] = useState([])
  const [timesheets, setTimesheets] = useState([])
  const [expenses, setExpenses] = useState([])
  const [members, setMembers] = useState([])
  const [activities, setActivities] = useState([])
  const [employees, setEmployees] = useState([])

  // Loading states
  const [loadingTasks, setLoadingTasks] = useState(false)
  const [loadingMilestones, setLoadingMilestones] = useState(false)
  const [loadingNotes, setLoadingNotes] = useState(false)
  const [loadingFiles, setLoadingFiles] = useState(false)
  const [loadingComments, setLoadingComments] = useState(false)
  const [loadingTimesheets, setLoadingTimesheets] = useState(false)
  const [loadingExpenses, setLoadingExpenses] = useState(false)

  // Modals
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [selectedExpense, setSelectedExpense] = useState(null)
  const [isViewExpenseModalOpen, setIsViewExpenseModalOpen] = useState(false)
  const [selectedTimesheet, setSelectedTimesheet] = useState(null)
  const [isViewTimesheetModalOpen, setIsViewTimesheetModalOpen] = useState(false)
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isAddMilestoneModalOpen, setIsAddMilestoneModalOpen] = useState(false)
  const [isAddFileModalOpen, setIsAddFileModalOpen] = useState(false)
  const [isAddCommentModalOpen, setIsAddCommentModalOpen] = useState(false)
  const [isAddTimesheetModalOpen, setIsAddTimesheetModalOpen] = useState(false)
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false)
  const [isRemindersModalOpen, setIsRemindersModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false)
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [draggedTask, setDraggedTask] = useState(null)
  const [reminders, setReminders] = useState([])
  const [reminderFormData, setReminderFormData] = useState({
    title: '',
    description: '',
    reminder_date: '',
    reminder_time: ''
  })
  const [settingsFormData, setSettingsFormData] = useState({
    public_gantt_chart: 'enable',
    public_task_board: 'enable',
    task_approval: 'disable'
  })

  // Form data
  const [memberFormData, setMemberFormData] = useState({
    userId: ''
  })

  const [noteFormData, setNoteFormData] = useState({
    title: '',
    content: ''
  })

  const [milestoneFormData, setMilestoneFormData] = useState({
    title: '',
    due_date: '',
    description: ''
  })

  const [fileFormData, setFileFormData] = useState({
    title: '',
    file: null,
    description: ''
  })

  const [commentFormData, setCommentFormData] = useState({
    content: ''
  })

  const [timesheetFormData, setTimesheetFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    hours: '',
    description: ''
  })

  const [expenseFormData, setExpenseFormData] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: ''
  })

  const [taskFormData, setTaskFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'Medium',
    status: 'Incomplete'
  })

  useEffect(() => {
    if (id) {
      fetchProject()
      fetchProjects()
    }
  }, [id])

  useEffect(() => {
    if (project && id) {
      const tab = activeTab.toLowerCase()
      if (tab === 'tasks list' || tab === 'tasks kanban') {
        fetchTasks()
      } else if (tab === 'milestones') {
        fetchMilestones()
      } else if (tab === 'notes') {
        fetchNotes()
      } else if (tab === 'files') {
        fetchFiles()
      } else if (tab === 'comments') {
        fetchComments()
      } else if (tab === 'timesheets') {
        fetchTimesheets()
      } else if (tab === 'expenses') {
        fetchExpenses()
      } else if (tab === 'overview') {
        fetchTasks()
        fetchMembers()
        fetchActivities()
        fetchTimesheets()
        fetchExpenses()
        fetchNotes()
      }
    }
  }, [project, activeTab, id])

  const fetchProject = async () => {
    try {
      setLoading(true)
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const response = await projectsAPI.getById(id, { company_id: companyId })
      if (response.data.success) {
        const projectData = response.data.data
        setProject({
          id: projectData.id,
          name: projectData.project_name || '',
          code: projectData.short_code || '',
          description: projectData.description || '',
          startDate: projectData.start_date || '',
          deadline: projectData.deadline || '',
          status: projectData.status || 'in progress',
          progress: projectData.progress || 0,
          budget: projectData.budget || null,
          label: projectData.label || '',
          clientName: projectData.client_name || '',
          projectManager: projectData.project_manager_name || '',
          members: projectData.members || [],
        })

        // Set members
        setMembers(projectData.members || [])
      }
    } catch (error) {
      console.error('Error fetching project:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProjects = async () => {
    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const response = await projectsAPI.getAll({ company_id: companyId })
      if (response.data.success) {
        const fetchedProjects = response.data.data || []
        const transformedProjects = fetchedProjects.map(p => ({
          id: p.id,
          name: p.project_name || '',
          status: p.status || 'in progress',
          label: p.label || '',
          clientName: p.client_name || '',
        }))
        setProjects(transformedProjects)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const fetchTasks = async () => {
    try {
      setLoadingTasks(true)
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const response = await tasksAPI.getAll({ project_id: id, company_id: companyId })
      if (response.data.success) {
        const fetchedTasks = response.data.data || []
        setTasks(fetchedTasks)

        // Organize tasks for Kanban
        const kanbanTasks = {
          todo: fetchedTasks.filter(t => t.status === 'Incomplete' || t.status === 'incomplete'),
          'in progress': fetchedTasks.filter(t => t.status === 'Doing' || t.status === 'doing'),
          review: fetchedTasks.filter(t => t.status === 'Review' || t.status === 'review'),
          done: fetchedTasks.filter(t => t.status === 'Done' || t.status === 'done' || t.status === 'Complete' || t.status === 'complete'),
        }
        setTasksKanban(kanbanTasks)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setTasks([])
    } finally {
      setLoadingTasks(false)
    }
  }

  const fetchMilestones = async () => {
    try {
      setLoadingMilestones(true)
      // Fetch milestones as tasks with milestone type
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const response = await tasksAPI.getAll({
        company_id: companyId,
        project_id: id
      })
      if (response.data.success) {
        // Filter tasks that are milestones (task_category = 'milestone')
        const milestoneTasks = (response.data.data || []).filter(task =>
          task.task_category === 'milestone'
        )
        setMilestones(milestoneTasks)
      }
    } catch (error) {
      console.error('Error fetching milestones:', error)
      setMilestones([])
    } finally {
      setLoadingMilestones(false)
    }
  }

  const fetchNotes = async () => {
    try {
      setLoadingNotes(true)
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const response = await notesAPI.getAll({
        company_id: companyId,
        project_id: id
      })
      if (response.data.success) {
        setNotes(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching notes:', error)
      setNotes([])
    } finally {
      setLoadingNotes(false)
    }
  }

  const fetchFiles = async () => {
    try {
      setLoadingFiles(true)
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const response = await documentsAPI.getAll({ project_id: id, company_id: companyId })
      if (response.data && response.data.success) {
        setFiles(response.data.data || [])
      } else {
        setFiles([])
      }
    } catch (error) {
      console.error('Error fetching files:', error)
      setFiles([])
    } finally {
      setLoadingFiles(false)
    }
  }

  const fetchComments = async () => {
    try {
      setLoadingComments(true)
      // Comments are stored as notes with a specific type
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const response = await notesAPI.getAll({
        company_id: companyId,
        project_id: id
      })
      if (response.data && response.data.success) {
        // Filter notes that are comments (you can add a type field or use title/content to identify)
        const commentsList = response.data.data || []
        setComments(commentsList)
      } else {
        setComments([])
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
      setComments([])
    } finally {
      setLoadingComments(false)
    }
  }

  const fetchTimesheets = async () => {
    try {
      setLoadingTimesheets(true)
      if (!id) {
        console.error('Project id is missing for fetchTimesheets')
        setTimesheets([])
        return
      }
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      if (!companyId || isNaN(companyId) || companyId <= 0) {
        console.error('Invalid companyId for fetchTimesheets:', companyId)
        setTimesheets([])
        return
      }

      // Ensure params are properly constructed
      const params = {
        project_id: parseInt(id, 10),
        company_id: companyId
      }

      console.log('Fetching timesheets with params:', params)

      const response = await timeTrackingAPI.getAll(params)
      if (response.data && response.data.success) {
        setTimesheets(response.data.data || [])
      } else {
        setTimesheets([])
      }
    } catch (error) {
      console.error('Error fetching timesheets:', error)
      console.error('Error response:', error.response?.data)
      console.error('Request URL:', error.config?.url)
      console.error('Request params:', error.config?.params)
      setTimesheets([])
    } finally {
      setLoadingTimesheets(false)
    }
  }

  const fetchExpenses = async () => {
    try {
      setLoadingExpenses(true)
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const response = await expensesAPI.getAll({ project_id: id, company_id: companyId })
      if (response.data && response.data.success) {
        setExpenses(response.data.data || [])
      } else {
        setExpenses([])
      }
    } catch (error) {
      console.error('Error fetching expenses:', error)
      setExpenses([])
    } finally {
      setLoadingExpenses(false)
    }
  }

  const fetchMembers = async () => {
    try {
      if (project && project.members) {
        setMembers(project.members)
      }
    } catch (error) {
      console.error('Error fetching members:', error)
    }
  }

  const fetchActivities = async () => {
    try {
      // Activities API might not exist, so create mock activities from tasks
      const activitiesList = []
      if (tasks.length > 0) {
        tasks.slice(0, 10).forEach(task => {
          activitiesList.push({
            id: task.id,
            type: 'task_added',
            user: 'John Doe',
            time: new Date().toLocaleString(),
            description: `Added Task: #${task.code || task.id} - ${task.title}`
          })
        })
      }
      setActivities(activitiesList)
    } catch (error) {
      console.error('Error fetching activities:', error)
      setActivities([])
    }
  }

  const filteredProjects = projects.filter(p => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'completed') return p.status === 'completed'
    if (activeFilter === 'high priority') return p.label === 'High Priority' || p.label === 'Urgent'
    if (activeFilter === 'open') return p.status === 'in progress' || p.status === 'open'
    return true
  }).filter(p => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return p.name?.toLowerCase().includes(query)
  })

  // Calculate task stats
  const taskStats = {
    todo: tasks.filter(t => t.status === 'Incomplete' || t.status === 'incomplete').length,
    'in progress': tasks.filter(t => t.status === 'Doing' || t.status === 'doing').length,
    review: tasks.filter(t => t.status === 'Review' || t.status === 'review').length,
    done: tasks.filter(t => t.status === 'Done' || t.status === 'done' || t.status === 'Complete' || t.status === 'complete').length,
  }

  // Calculate total hours worked
  const totalHoursWorked = timesheets.reduce((sum, ts) => sum + parseFloat(ts.hours || 0), 0)

  const handleUpdateStatus = async (newStatus) => {
    if (!project) return

    try {
      const response = await projectsAPI.update(project.id, { status: newStatus })
      if (response.data.success) {
        alert(`Project marked as ${newStatus}`)
        fetchProject()
      }
    } catch (error) {
      console.error('Error updating project status:', error)
      alert('Failed to update project status')
    }
    setIsActionsDropdownOpen(false)
  }

  const handleCloneProject = async () => {
    if (!project) return

    try {
      const cloneData = {
        ...project,
        project_name: `${project.name} (Copy)`,
        short_code: `${project.code}-COPY`,
      }
      delete cloneData.id

      const response = await projectsAPI.create(cloneData)
      if (response.data.success) {
        alert('Project cloned successfully!')
        navigate(`/app/admin/projects/${response.data.data.id}`)
      }
    } catch (error) {
      console.error('Error cloning project:', error)
      alert('Failed to clone project')
    }
    setIsActionsDropdownOpen(false)
  }

  const handleStartTimer = async () => {
    const now = Date.now()
    setTimerStartTime(now)
    setIsTimerRunning(true)
    setTimerElapsedTime(0)

    // Start interval for real-time updates
    timerIntervalRef.current = setInterval(() => {
      setTimerElapsedTime((prev) => {
        const elapsed = Math.floor((Date.now() - now) / 1000)
        return elapsed
      })
    }, 1000)

    try {
      // Optionally save timer start to backend
      if (project?.id) {
        // await timeTrackingAPI.startTimer({ project_id: project.id })
      }
    } catch (error) {
      console.error('Error starting timer:', error)
    }
  }

  const handleStopTimer = async () => {
    setIsTimerRunning(false)
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }

    const hours = (timerElapsedTime / 3600).toFixed(2)

    try {
      // Save time entry to backend
      if (project?.id && timerElapsedTime > 0) {
        const storedUser = localStorage.getItem('user')
        let userId = null
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser)
            userId = userData.id
          } catch (e) {
            console.error('Error parsing user data:', e)
          }
        }

        if (userId) {
          await timeTrackingAPI.create({
            user_id: userId,
            project_id: project.id,
            hours: parseFloat(hours),
            date: new Date().toISOString().split('T')[0],
            description: `Timer entry for project: ${project.name}`
          })
          alert(`Timer stopped. ${hours} hours logged.`)
          // Refresh timesheets
          fetchTimesheets()
        }
      }
    } catch (error) {
      console.error('Error stopping timer:', error)
      alert('Failed to save time entry')
    }

    setTimerElapsedTime(0)
    setTimerStartTime(null)
  }

  const formatTimerTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  // Cleanup timer interval on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [])

  const fetchEmployees = async () => {
    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const response = await employeesAPI.getAll({ company_id: companyId })
      if (response.data.success) {
        setEmployees(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching employees:', error)
      setEmployees([])
    }
  }

  // Fetch employees when modal opens
  useEffect(() => {
    if (isAddMemberModalOpen) {
      fetchEmployees()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddMemberModalOpen])

  const handleAddMember = async () => {
    if (!memberFormData.userId) {
      alert('Please select a member')
      return
    }

    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const userId = parseInt(memberFormData.userId)

      // Get current members and add new one
      const currentMemberIds = members.map(m => m.id || m.user_id).filter(Boolean)

      // Check if member already exists
      if (currentMemberIds.includes(userId)) {
        alert('This member is already added to the project')
        return
      }

      // Add new member to the list
      const updatedMembers = [...currentMemberIds, userId]

      // Update project with new members list
      const response = await projectsAPI.update(id, {
        project_members: updatedMembers
      }, { company_id: companyId })

      if (response.data.success) {
        alert('Member added successfully!')
        setIsAddMemberModalOpen(false)
        setMemberFormData({ userId: '' })
        await fetchProject()
      } else {
        alert(response.data.error || 'Failed to add member')
      }
    } catch (error) {
      console.error('Error adding member:', error)
      alert(error.response?.data?.error || 'Failed to add member')
    }
  }

  const handleRemoveMember = async (userId) => {
    if (!userId) return
    if (!window.confirm('Are you sure you want to remove this member from the project?')) return

    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)

      // Get current members and remove the one being deleted
      const currentMemberIds = members.map(m => m.id || m.user_id).filter(Boolean)
      const updatedMembers = currentMemberIds.filter(id => id !== userId)

      // Update project with new members list
      const response = await projectsAPI.update(id, {
        project_members: updatedMembers
      }, { company_id: companyId })

      if (response.data.success) {
        alert('Member removed successfully!')
        await fetchProject()
      } else {
        alert(response.data.error || 'Failed to remove member')
      }
    } catch (error) {
      console.error('Error removing member:', error)
      alert(error.response?.data?.error || 'Failed to remove member')
    }
  }

  const handleAddTask = async () => {
    if (!taskFormData.title) {
      alert('Task title is required')
      return
    }

    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const userId = parseInt(localStorage.getItem('userId') || 1, 10)

      const taskData = {
        company_id: companyId,
        project_id: parseInt(id),
        title: taskFormData.title,
        description: taskFormData.description || '',
        due_date: taskFormData.due_date || null,
        deadline: taskFormData.due_date || null,
        status: taskFormData.status || 'Incomplete',
        priority: taskFormData.priority || 'Medium',
        created_by: userId
      }

      const response = await tasksAPI.create(taskData, { company_id: companyId })
      if (response.data.success) {
        alert('Task added successfully!')
        setIsAddTaskModalOpen(false)
        setTaskFormData({ title: '', description: '', due_date: '', priority: 'Medium', status: 'Incomplete' })
        await fetchTasks()
      } else {
        alert(response.data.error || 'Failed to add task')
      }
    } catch (error) {
      console.error('Error adding task:', error)
      alert(error.response?.data?.error || 'Failed to add task')
    }
  }

  const handleViewTask = (task) => {
    setSelectedTask(task)
    setIsViewTaskModalOpen(true)
  }

  // Kanban drag and drop handlers
  const handleDragStart = (e, task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e, targetStatus) => {
    e.preventDefault()
    if (!draggedTask) return

    // Map UI status to backend status
    const statusMap = {
      'todo': 'Incomplete',
      'in progress': 'Doing',
      'review': 'Review',
      'done': 'Done'
    }

    const backendStatus = statusMap[targetStatus]
    if (draggedTask.status === backendStatus) {
      setDraggedTask(null)
      return
    }

    try {
      const response = await tasksAPI.update(draggedTask.id, { status: backendStatus })
      if (response.data.success) {
        // Update local state immediately
        setTasksKanban(prev => {
          const newKanban = { ...prev }
          // Remove from old column
          Object.keys(newKanban).forEach(key => {
            newKanban[key] = newKanban[key].filter(t => t.id !== draggedTask.id)
          })
          // Add to new column
          newKanban[targetStatus] = [...newKanban[targetStatus], { ...draggedTask, status: backendStatus }]
          return newKanban
        })
      }
    } catch (error) {
      console.error('Error updating task status:', error)
      alert('Failed to update task status')
    }
    setDraggedTask(null)
  }

  const handleEditTask = (task) => {
    setSelectedTask(task)
    setTaskFormData({
      title: task.title || '',
      description: task.description || '',
      due_date: task.due_date ? task.due_date.split('T')[0] : '',
      priority: task.priority || 'Medium',
      status: task.status || 'Incomplete'
    })
    setIsEditTaskModalOpen(true)
  }

  const handleUpdateTask = async () => {
    if (!selectedTask || !taskFormData.title) {
      alert('Task title is required')
      return
    }

    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)

      const taskData = {
        title: taskFormData.title,
        description: taskFormData.description || '',
        due_date: taskFormData.due_date || null,
        deadline: taskFormData.due_date || null,
        status: taskFormData.status || 'Incomplete',
        priority: taskFormData.priority || 'Medium'
      }

      const response = await tasksAPI.update(selectedTask.id, taskData, { company_id: companyId })
      if (response.data.success) {
        alert('Task updated successfully!')
        setIsEditTaskModalOpen(false)
        setSelectedTask(null)
        setTaskFormData({ title: '', description: '', due_date: '', priority: 'Medium', status: 'Incomplete' })
        await fetchTasks()
      } else {
        alert(response.data.error || 'Failed to update task')
      }
    } catch (error) {
      console.error('Error updating task:', error)
      alert(error.response?.data?.error || 'Failed to update task')
    }
  }

  const handleDeleteTask = async (task) => {
    if (!window.confirm(`Are you sure you want to delete task "${task.title || task.id}"?`)) {
      return
    }

    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const response = await tasksAPI.delete(task.id, { company_id: companyId })
      if (response.data.success) {
        alert('Task deleted successfully!')
        await fetchTasks()
      } else {
        alert(response.data.error || 'Failed to delete task')
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      alert(error.response?.data?.error || 'Failed to delete task')
    }
  }

  const fetchReminders = async () => {
    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const userId = parseInt(localStorage.getItem('userId') || 1, 10)
      const response = await notificationsAPI.getAll({
        company_id: companyId,
        user_id: userId,
        type: 'reminder',
        related_entity_type: 'project',
        related_entity_id: id
      })
      if (response.data.success) {
        setReminders(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching reminders:', error)
      setReminders([])
    }
  }

  useEffect(() => {
    if (isRemindersModalOpen && id) {
      fetchReminders()
    }
  }, [isRemindersModalOpen, id])

  useEffect(() => {
    if (project) {
      setSettingsFormData({
        public_gantt_chart: project.public_gantt_chart || 'enable',
        public_task_board: project.public_task_board || 'enable',
        task_approval: project.task_approval || 'disable'
      })
    }
  }, [project])

  const handleAddReminder = async () => {
    if (!reminderFormData.title) {
      alert('Reminder title is required')
      return
    }

    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const userId = parseInt(localStorage.getItem('userId') || 1, 10)

      let reminderMessage = reminderFormData.description || `Reminder for project ${project?.name || id}`
      if (reminderFormData.reminder_date) {
        const reminderDate = new Date(reminderFormData.reminder_date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
        const reminderTime = reminderFormData.reminder_time || ''
        const dateTimeStr = reminderTime ? `${reminderDate} at ${reminderTime}` : reminderDate
        reminderMessage = `${reminderMessage}\n\nDue: ${dateTimeStr}`
      }

      const reminderPayload = {
        company_id: companyId,
        user_id: userId,
        type: 'reminder',
        title: reminderFormData.title,
        message: reminderMessage,
        related_entity_type: 'project',
        related_entity_id: parseInt(id),
        created_by: userId
      }

      const response = await notificationsAPI.create(reminderPayload)
      if (response.data.success) {
        alert('Reminder created successfully!')
        setIsRemindersModalOpen(false)
        setReminderFormData({ title: '', description: '', reminder_date: '', reminder_time: '' })
        await fetchReminders()
      } else {
        alert(response.data.error || 'Failed to create reminder')
      }
    } catch (error) {
      console.error('Error creating reminder:', error)
      alert(error.response?.data?.error || 'Failed to create reminder')
    }
  }

  const handleDeleteReminder = async (reminderId) => {
    if (!window.confirm('Are you sure you want to delete this reminder?')) {
      return
    }

    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const response = await notificationsAPI.delete(reminderId, { company_id: companyId })
      if (response.data.success) {
        alert('Reminder deleted successfully!')
        await fetchReminders()
      } else {
        alert(response.data.error || 'Failed to delete reminder')
      }
    } catch (error) {
      console.error('Error deleting reminder:', error)
      alert(error.response?.data?.error || 'Failed to delete reminder')
    }
  }

  const handleSaveSettings = async () => {
    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const response = await projectsAPI.update(id, {
        public_gantt_chart: settingsFormData.public_gantt_chart,
        public_task_board: settingsFormData.public_task_board,
        task_approval: settingsFormData.task_approval
      }, { company_id: companyId })

      if (response.data.success) {
        alert('Settings saved successfully!')
        setIsSettingsModalOpen(false)
        await fetchProject()
      } else {
        alert(response.data.error || 'Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert(error.response?.data?.error || 'Failed to save settings')
    }
  }

  const handleAddNote = async () => {
    if (!noteFormData.content) {
      alert('Please enter a note')
      return
    }

    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const userId = parseInt(localStorage.getItem('userId') || 1, 10)

      const noteData = {
        company_id: companyId,
        user_id: userId,
        project_id: parseInt(id),
        title: noteFormData.title || 'Project Note',
        content: noteFormData.content
      }

      let response
      if (selectedNote) {
        // Update existing note
        response = await notesAPI.update(selectedNote.id, noteData)
        if (response.data.success) {
          alert('Note updated successfully!')
        }
      } else {
        // Create new note
        response = await notesAPI.create(noteData)
        if (response.data.success) {
          alert('Note added successfully!')
        }
      }

      if (response.data.success) {
        setIsAddNoteModalOpen(false)
        setNoteFormData({ title: '', content: '' })
        setSelectedNote(null)
        await fetchNotes()
      } else {
        alert(response.data.error || 'Failed to save note')
      }
    } catch (error) {
      console.error('Error saving note:', error)
      alert(error.response?.data?.error || 'Failed to save note')
    }
  }

  const handleEditNote = (note) => {
    setNoteFormData({
      title: note.title || '',
      content: note.content || note.note || ''
    })
    setSelectedNote(note)
    setIsAddNoteModalOpen(true)
  }

  const handleDeleteNote = async (note) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return
    }
    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      await notesAPI.delete(note.id, { company_id: companyId })
      alert('Note deleted successfully!')
      await fetchNotes()
    } catch (error) {
      console.error('Error deleting note:', error)
      alert(error.response?.data?.error || 'Failed to delete note')
    }
  }

  const handleViewNote = (note) => {
    alert(`Note:\n${note.content || note.note || '-'}\n\nCreated: ${note.created_at ? new Date(note.created_at).toLocaleDateString() : '-'}`)
  }

  const handleDownloadFile = (file) => {
    if (file.file_path || file.url) {
      window.open(file.file_path || file.url, '_blank')
    } else {
      alert('File path not available')
    }
  }

  const handleDeleteFile = async (file) => {
    if (!window.confirm(`Are you sure you want to delete file "${file.name || file.file_name || file.id}"?`)) {
      return
    }
    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      await documentsAPI.delete(file.id, { company_id: companyId })
      alert('File deleted successfully!')
      await fetchFiles()
    } catch (error) {
      console.error('Error deleting file:', error)
      alert(error.response?.data?.error || 'Failed to delete file')
    }
  }

  const handleDeleteExpense = async (expense) => {
    if (!window.confirm(`Are you sure you want to delete expense "${expense.expense_number || expense.id}"?`)) {
      return
    }
    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      await expensesAPI.delete(expense.id, { company_id: companyId })
      alert('Expense deleted successfully!')
      await fetchExpenses()
    } catch (error) {
      console.error('Error deleting expense:', error)
      alert(error.response?.data?.error || 'Failed to delete expense')
    }
  }

  const handleDeleteTimesheet = async (timesheet) => {
    if (!window.confirm(`Are you sure you want to delete this timesheet entry?`)) {
      return
    }
    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      await timeTrackingAPI.delete(timesheet.id, { company_id: companyId })
      alert('Timesheet deleted successfully!')
      await fetchTimesheets()
    } catch (error) {
      console.error('Error deleting timesheet:', error)
      alert(error.response?.data?.error || 'Failed to delete timesheet')
    }
  }

  const handleDeleteMilestone = async (milestone) => {
    if (!window.confirm(`Are you sure you want to delete milestone "${milestone.title || milestone.id}"?`)) {
      return
    }
    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      await tasksAPI.delete(milestone.id, { company_id: companyId })
      alert('Milestone deleted successfully!')
      await fetchMilestones()
    } catch (error) {
      console.error('Error deleting milestone:', error)
      alert(error.response?.data?.error || 'Failed to delete milestone')
    }
  }

  const handleViewTimesheet = (timesheet) => {
    setSelectedTimesheet(timesheet)
    setIsViewTimesheetModalOpen(true)
  }

  const handleViewExpense = (expense) => {
    setSelectedExpense(expense)
    setIsViewExpenseModalOpen(true)
  }

  const handleEditExpense = (expense) => {
    setExpenseFormData({
      expense_number: expense.expense_number || '',
      category: expense.category || '',
      amount: expense.total || expense.amount || '',
      description: expense.description || '',
      status: expense.status || 'Pending'
    })
    setSelectedExpense(expense)
    setIsAddExpenseModalOpen(true)
  }

  const handleAddMilestone = async () => {
    if (!milestoneFormData.title) {
      alert('Milestone title is required')
      return
    }

    try {
      // Milestones can be stored as tasks with a special type or in a separate table
      // For now, we'll create a task with milestone type
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const userId = parseInt(localStorage.getItem('userId') || 1, 10)

      const taskData = {
        company_id: companyId,
        project_id: parseInt(id),
        title: milestoneFormData.title,
        description: milestoneFormData.description || '',
        due_date: milestoneFormData.due_date || null,
        status: 'Incomplete',
        priority: 'High',
        task_category: 'milestone',
        created_by: userId
      }

      const response = await tasksAPI.create(taskData, { company_id: companyId })
      if (response.data.success) {
        alert('Milestone added successfully!')
        setIsAddMilestoneModalOpen(false)
        setMilestoneFormData({ title: '', due_date: '', description: '' })
        await fetchMilestones()
      } else {
        alert(response.data.error || 'Failed to add milestone')
      }
    } catch (error) {
      console.error('Error adding milestone:', error)
      alert(error.response?.data?.error || 'Failed to add milestone')
    }
  }

  const handleAddFile = async () => {
    if (!fileFormData.file) {
      alert('Please select a file')
      return
    }

    // Validate file object
    if (!(fileFormData.file instanceof File) && !(fileFormData.file instanceof Blob)) {
      alert('Invalid file selected. Please select a valid file.')
      return
    }

    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const formData = new FormData()

      // Ensure file is properly appended - this is critical for multer
      formData.append('file', fileFormData.file, fileFormData.file.name)

      // Add other fields
      if (fileFormData.title) {
        formData.append('title', fileFormData.title)
      }
      if (fileFormData.description) {
        formData.append('description', fileFormData.description)
      }
      // Add company_id to formData as well (some backends expect it in body)
      formData.append('company_id', companyId.toString())

      console.log('Uploading file:', {
        fileName: fileFormData.file.name,
        fileSize: fileFormData.file.size,
        fileType: fileFormData.file.type,
        companyId: companyId,
        projectId: id
      })

      const response = await projectsAPI.uploadFile(id, formData, { company_id: companyId })
      if (response.data && response.data.success) {
        alert('File uploaded successfully!')
        setIsAddFileModalOpen(false)
        setFileFormData({ title: '', file: null, description: '' })
        await fetchFiles()
      } else {
        alert(response.data?.error || 'Failed to upload file')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        config: error.config
      })
      alert(error.response?.data?.error || error.response?.data?.message || 'Failed to upload file')
    }
  }

  const handleAddComment = async () => {
    if (!commentFormData.content) {
      alert('Please enter a comment')
      return
    }

    try {
      // Comments can be stored as notes or in a separate comments table
      // For now, we'll use notes API with a comment type
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const userId = parseInt(localStorage.getItem('userId') || 1, 10)

      const noteData = {
        company_id: companyId,
        user_id: userId,
        project_id: parseInt(id),
        title: 'Comment',
        content: commentFormData.content
      }

      const response = await notesAPI.create(noteData)
      if (response.data.success) {
        alert('Comment added successfully!')
        setIsAddCommentModalOpen(false)
        setCommentFormData({ content: '' })
        await fetchComments()
      } else {
        alert(response.data.error || 'Failed to add comment')
      }
    } catch (error) {
      console.error('Error adding comment:', error)
      alert(error.response?.data?.error || 'Failed to add comment')
    }
  }

  const handleAddTimesheet = async () => {
    if (!timesheetFormData.hours || parseFloat(timesheetFormData.hours) <= 0) {
      alert('Please enter valid hours')
      return
    }
    if (!timesheetFormData.date) {
      alert('Please select a date')
      return
    }

    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const userId = parseInt(localStorage.getItem('userId') || 1, 10)

      const timesheetData = {
        company_id: companyId,
        user_id: userId,
        project_id: parseInt(id),
        date: timesheetFormData.date || new Date().toISOString().split('T')[0],
        hours: parseFloat(timesheetFormData.hours),
        description: timesheetFormData.description || ''
      }

      console.log('Sending timesheet data:', timesheetData)
      const response = await timeTrackingAPI.create(timesheetData, { company_id: companyId })
      if (response.data.success) {
        alert('Timesheet added successfully!')
        setIsAddTimesheetModalOpen(false)
        setTimesheetFormData({ date: new Date().toISOString().split('T')[0], hours: '', description: '' })
        await fetchTimesheets()
      } else {
        alert(response.data.error || 'Failed to add timesheet')
      }
    } catch (error) {
      console.error('Error adding timesheet:', error)
      alert(error.response?.data?.error || 'Failed to add timesheet')
    }
  }

  const handleAddExpense = async () => {
    if (!expenseFormData.title) {
      alert('Expense title is required')
      return
    }
    if (!expenseFormData.amount || parseFloat(expenseFormData.amount) <= 0) {
      alert('Valid amount is required')
      return
    }

    try {
      const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
      const userId = parseInt(localStorage.getItem('userId') || 1, 10)

      // Create expense item from form data
      const expenseItem = {
        item_name: expenseFormData.title,
        description: expenseFormData.description || expenseFormData.title,
        quantity: 1,
        unit: 'Pcs',
        unit_price: parseFloat(expenseFormData.amount),
        tax: null,
        tax_rate: 0,
        amount: parseFloat(expenseFormData.amount)
      }

      const expenseData = {
        company_id: companyId,
        lead_id: null,
        description: expenseFormData.title,
        note: expenseFormData.description || '',
        currency: 'USD',
        discount: 0,
        discount_type: '%',
        valid_till: expenseFormData.date || null,
        items: [expenseItem],
        require_approval: 1,
        created_by: userId
      }

      const response = await expensesAPI.create(expenseData)
      if (response.data.success) {
        alert('Expense added successfully!')
        setIsAddExpenseModalOpen(false)
        setExpenseFormData({ title: '', amount: '', date: new Date().toISOString().split('T')[0], category: '', description: '' })
        await fetchExpenses()
      } else {
        alert(response.data.error || 'Failed to add expense')
      }
    } catch (error) {
      console.error('Error adding expense:', error)
      alert(error.response?.data?.error || 'Failed to add expense')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-primary-text">Loading...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-primary-text">Project not found</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 w-full">
      {/* Left Sidebar - Project List */}
      <div className={`${isSidebarOpen ? 'w-full lg:w-80' : 'hidden lg:block lg:w-80'} bg-white border-r border-gray-200 flex flex-col flex-shrink-0`}>
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => navigate('/app/admin/projects')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <IoArrowBack size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
            <button className="ml-auto p-1 hover:bg-gray-100 rounded">
              <IoEllipsisVertical size={16} className="text-gray-500" />
            </button>
          </div>

          {/* Filters */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">Filters</option>
                <option value="all">All projects</option>
                <option value="completed">Completed</option>
                <option value="high priority">High Priority</option>
              </select>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <IoAdd size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${activeFilter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                All projects
              </button>
              <button
                onClick={() => setActiveFilter('completed')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${activeFilter === 'completed'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveFilter('high priority')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${activeFilter === 'high priority'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                High Priority
              </button>
            </div>

            <div className="relative">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Project List */}
        <div className="flex-1 overflow-y-auto">
          {filteredProjects.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              No projects found
            </div>
          ) : (
            filteredProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  if (p.id !== parseInt(id)) {
                    navigate(`/app/admin/projects/${p.id}`)
                  }
                }}
                className={`px-4 py-3 cursor-pointer transition-colors border-l-4 ${p.id === parseInt(id)
                  ? 'bg-emerald-600 border-l-emerald-600'
                  : 'bg-white border-l-transparent hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm ${p.id === parseInt(id) ? 'text-white/60' : 'text-gray-400'}`}>›</span>
                  <p className={`font-medium text-sm truncate ${p.id === parseInt(id) ? 'text-white' : 'text-gray-900'}`}>
                    {p.name}
                  </p>
                </div>
                {p.clientName && (
                  <p className={`text-xs mb-2 ml-5 ${p.id === parseInt(id) ? 'text-white/80' : 'text-gray-500'}`}>
                    {p.clientName}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5 ml-5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${p.status === 'completed'
                    ? p.id === parseInt(id) ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                    : p.id === parseInt(id)
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-100 text-blue-700'
                    }`}>
                    {p.status === 'in progress' ? 'Open' : p.status === 'completed' ? 'Completed' : p.status}
                  </span>
                  {p.label && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${p.label === 'Urgent'
                      ? 'bg-red-500 text-white'
                      : p.label === 'On track'
                        ? 'bg-green-500 text-white'
                        : p.id === parseInt(id)
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                      {p.label}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Action Bar */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Mobile sidebar toggle */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <IoGrid size={20} />
              </button>

              <div className="flex items-center gap-2 min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">{project.name}</h1>
                <button className="p-1 hover:bg-gray-100 rounded-lg flex-shrink-0">
                  <IoStar size={18} className="text-gray-400" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <button
                onClick={() => setIsRemindersModalOpen(true)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs font-semibold rounded-lg border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-200"
              >
                <IoNotifications size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Reminders</span>
              </button>
              <button
                onClick={() => setIsSettingsModalOpen(true)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs font-semibold rounded-lg border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-200"
              >
                <IoSettings size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Settings</span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsActionsDropdownOpen(!isActionsDropdownOpen)}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs font-semibold rounded-lg border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-200"
                >
                  <IoEllipsisVertical size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Actions</span>
                  <IoChevronDown size={12} />
                </button>
                {isActionsDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => handleUpdateStatus('completed')}
                      className="w-full px-4 py-2 text-left text-sm text-primary-text hover:bg-gray-100 flex items-center gap-2"
                    >
                      <IoCheckmark size={16} />
                      Mark Project as Completed
                    </button>
                    <button
                      onClick={() => handleUpdateStatus('on hold')}
                      className="w-full px-4 py-2 text-left text-sm text-primary-text hover:bg-gray-100 flex items-center gap-2"
                    >
                      <IoBan size={16} />
                      Mark Project as Hold
                    </button>
                    <button
                      onClick={() => handleUpdateStatus('cancelled')}
                      className="w-full px-4 py-2 text-left text-sm text-primary-text hover:bg-gray-100 flex items-center gap-2"
                    >
                      <IoBan size={16} />
                      Mark Project as Canceled
                    </button>
                    <button
                      onClick={handleCloneProject}
                      className="w-full px-4 py-2 text-left text-sm text-primary-text hover:bg-gray-100 flex items-center gap-2"
                    >
                      <IoCopy size={16} />
                      Clone Project
                    </button>
                    <button
                      onClick={() => navigate(`/app/admin/projects?edit=${project.id}`)}
                      className="w-full px-4 py-2 text-left text-sm text-primary-text hover:bg-gray-100 flex items-center gap-2"
                    >
                      <IoCreate size={16} />
                      Edit Project
                    </button>
                  </div>
                )}
              </div>
              {/* Real-time Timer */}
              <div className="flex items-center gap-2">
                {isTimerRunning && (
                  <div className="text-sm font-mono font-semibold text-primary-text bg-primary-accent/10 px-3 py-1.5 rounded-lg">
                    {formatTimerTime(timerElapsedTime)}
                  </div>
                )}
                {isTimerRunning ? (
                  <button
                    onClick={handleStopTimer}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-200"
                  >
                    <IoStop size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Stop</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStartTimer}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary-accent text-white hover:bg-primary-accent/90 transition-all duration-200"
                  >
                    <IoPlay size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Start</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Project Header Info */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-text">Start date:</span>
              <span className="text-sm font-medium text-primary-text">{project.startDate ? new Date(project.startDate).toLocaleDateString() : '-'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-text">Deadline:</span>
              <span className={`text-sm font-medium ${project.deadline && new Date(project.deadline) < new Date() ? 'text-red-600' : 'text-primary-text'}`}>
                {project.deadline ? new Date(project.deadline).toLocaleDateString() : '-'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-text">Status:</span>
              <Badge className={`text-xs ${project.status === 'completed' ? 'bg-green-100 text-green-800' :
                project.status === 'in progress' || project.status === 'open' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'on hold' ? 'bg-yellow-100 text-yellow-800' :
                    project.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                }`}>
                {project.status === 'in progress' ? 'Open' : project.status}
              </Badge>
            </div>
            {project.label && (
              <Badge className={`text-xs ${project.label === 'Urgent' ? 'bg-purple-100 text-purple-800' :
                project.label === 'On track' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                {project.label}
              </Badge>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-gray-200 overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e1 #f1f5f9',
            WebkitOverflowScrolling: 'touch'
          }}>
            {['Overview', 'Tasks List', 'Tasks Kanban', 'Milestones', 'Notes', 'Files', 'Comments', 'Timesheets', 'Expenses'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex-shrink-0 min-w-fit ${activeTab === tab.toLowerCase()
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
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 w-full min-w-0 max-w-full" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9'
        }}>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Progress & Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Progress Circle Card */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex flex-col items-center">
                      {/* Circular Progress */}
                      <div className="relative w-36 h-36 mb-6">
                        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="#e5e7eb"
                            strokeWidth="10"
                            fill="none"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="#3b82f6"
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 42 * (project.progress / 100)} ${2 * Math.PI * 42}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-gray-900">{project.progress}%</span>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="w-full space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Start date:</span>
                          <span className="font-medium text-gray-900">
                            {project.startDate ? new Date(project.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-') : '-'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Deadline:</span>
                          <span className={`font-medium ${project.deadline && new Date(project.deadline) < new Date() ? 'text-red-600' : 'text-gray-900'}`}>
                            {project.deadline ? new Date(project.deadline).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-') : '-'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Status:</span>
                          <span className="text-gray-900 font-medium">
                            {project.status === 'in progress' ? 'Open' : project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Task Distribution Donut Chart */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex flex-col items-center">
                      {/* Donut Chart */}
                      <div className="relative w-36 h-36 mb-6">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          {/* Background circle */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="20"
                          />
                          {/* Segments */}
                          {(() => {
                            const total = taskStats.todo + taskStats['in progress'] + taskStats.review + taskStats.done || 1
                            const segments = [
                              { value: taskStats.todo, color: '#f97316', label: 'To do' },
                              { value: taskStats['in progress'], color: '#3b82f6', label: 'In progress' },
                              { value: taskStats.review, color: '#a855f7', label: 'Review' },
                              { value: taskStats.done, color: '#22c55e', label: 'Done' },
                            ]
                            let accumulatedPercent = 0
                            const circumference = 2 * Math.PI * 40

                            return segments.map((segment, idx) => {
                              const percent = (segment.value / total) * 100
                              const dashOffset = circumference * (1 - accumulatedPercent / 100)
                              const dashArray = `${(percent / 100) * circumference} ${circumference}`
                              accumulatedPercent += percent

                              return (
                                <circle
                                  key={idx}
                                  cx="50"
                                  cy="50"
                                  r="40"
                                  fill="none"
                                  stroke={segment.color}
                                  strokeWidth="20"
                                  strokeDasharray={dashArray}
                                  strokeDashoffset={dashOffset}
                                  transform="rotate(-90 50 50)"
                                  style={{ transition: 'stroke-dasharray 0.5s ease' }}
                                />
                              )
                            })
                          })()}
                        </svg>
                      </div>

                      {/* Legend */}
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm bg-orange-500"></div>
                          <span className="text-gray-600">To do</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
                          <span className="text-gray-600">In progress</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm bg-purple-500"></div>
                          <span className="text-gray-600">Review</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm bg-green-500"></div>
                          <span className="text-gray-600">Done</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Hours Worked Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                      <IoTime size={28} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900">{totalHoursWorked.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">Total hours worked</p>
                    </div>
                  </div>
                </div>

                {/* Project Members Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-900">Project members</h3>
                    <button
                      onClick={() => setIsAddMemberModalOpen(true)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <IoPersonAdd size={16} />
                      <span>Add member</span>
                    </button>
                  </div>
                  {members.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <IoPerson size={40} className="mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No members assigned</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {members.map((member, idx) => (
                        <div key={member.id || member.user_id || idx} className="flex items-center gap-4 py-3 group">
                          {/* Profile Avatar */}
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-base font-bold text-gray-600 shadow-sm overflow-hidden">
                            {member.avatar || member.profile_image ? (
                              <img src={member.avatar || member.profile_image} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              member.name ? member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'
                            )}
                          </div>

                          {/* Name and Position */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{member.name || member.email}</p>
                            <p className="text-xs text-gray-500 truncate">{member.position || member.role || member.job_title || 'Team Member'}</p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {member.email && (
                              <a
                                href={`mailto:${member.email}`}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title={`Email ${member.name}`}
                              >
                                <IoMail size={18} />
                              </a>
                            )}
                            <button
                              onClick={() => handleRemoveMember && handleRemoveMember(member.id || member.user_id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove member"
                            >
                              <IoClose size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Activity Feed */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Activity</h3>

                  {tasks.length === 0 && notes.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <IoDocumentText size={40} className="mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No recent activity</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                      {/* Generate activity from tasks */}
                      {tasks.slice(0, 10).map((task, idx) => {
                        const creatorName = task.created_by_name || task.assigned_to_name || 'Unknown User'
                        const initials = creatorName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'
                        const createdDate = task.created_at ? new Date(task.created_at) : new Date()
                        const formattedDate = createdDate.toLocaleDateString() === new Date().toLocaleDateString()
                          ? `Today at ${createdDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
                          : createdDate.toLocaleDateString()

                        return (
                          <div key={task.id || idx} className="flex gap-3">
                            {/* Avatar */}
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-semibold text-white">
                              {initials}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm text-gray-900">{creatorName}</span>
                                <span className="text-xs text-gray-400">{formattedDate}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500 text-white">
                                  Added
                                </span>
                                <span className="text-sm text-gray-700 truncate">
                                  Task: #{task.code || task.id} - {task.title}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      })}

                      {/* Show notes as activity */}
                      {notes.slice(0, 5).map((note, idx) => {
                        const creatorName = note.created_by_name || note.user_name || 'Unknown User'
                        const initials = creatorName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'
                        const createdDate = note.created_at ? new Date(note.created_at) : new Date()
                        const formattedDate = createdDate.toLocaleDateString() === new Date().toLocaleDateString()
                          ? `Today at ${createdDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
                          : createdDate.toLocaleDateString()

                        return (
                          <div key={`note-${note.id || idx}`} className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-semibold text-white">
                              {initials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm text-gray-900">{creatorName}</span>
                                <span className="text-xs text-gray-400">{formattedDate}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500 text-white">
                                  Note
                                </span>
                                <span className="text-sm text-gray-700 truncate">
                                  {note.title || note.content?.substring(0, 50) || 'Added a note'}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tasks list' && (
            <Card className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-primary-text">Tasks List</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddTaskModalOpen(true)}
                  className="flex items-center gap-2 hover:bg-gray-800 hover:text-white hover:border-gray-800 w-full sm:w-auto justify-center"
                >
                  <IoAdd size={16} />
                  <span className="text-xs sm:text-sm">Add task</span>
                </Button>
              </div>
              {loadingTasks ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text text-sm">Loading...</div>
              ) : tasks.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text">
                  <IoCheckmarkCircle size={40} className="sm:w-12 sm:h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No tasks found</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="font-semibold text-sm sm:text-base text-primary-text truncate">#{task.code || task.id} - {task.title}</h4>
                            <Badge className={`text-xs flex-shrink-0 ${task.priority === 'High' || task.priority === 'high' ? 'bg-red-100 text-red-800' :
                              task.priority === 'Medium' || task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                              {task.priority || 'Medium'}
                            </Badge>
                            <Badge className={`text-xs flex-shrink-0 ${task.status === 'Done' || task.status === 'done' || task.status === 'Complete' || task.status === 'complete' ? 'bg-green-100 text-green-800' :
                              task.status === 'Doing' || task.status === 'doing' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                              {task.status || 'Incomplete'}
                            </Badge>
                          </div>
                          {task.description && (
                            <p className="text-xs sm:text-sm text-secondary-text mb-1 break-words">{task.description}</p>
                          )}
                          {task.due_date && (
                            <p className="text-xs sm:text-sm text-secondary-text">Due: {new Date(task.due_date).toLocaleDateString()}</p>
                          )}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleViewTask(task)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-primary-accent"
                            title="View Task"
                          >
                            <IoEye size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <button
                            onClick={() => handleEditTask(task)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-blue-600"
                            title="Edit Task"
                          >
                            <IoCreate size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-red-600"
                            title="Delete Task"
                          >
                            <IoTrash size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {activeTab === 'tasks kanban' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-primary-text">Tasks Kanban</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddTaskModalOpen(true)}
                  className="flex items-center gap-2 hover:bg-gray-800 hover:text-white hover:border-gray-800"
                >
                  <IoAdd size={16} />
                  <span className="text-xs sm:text-sm">Add task</span>
                </Button>
              </div>
              {loadingTasks ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text text-sm">Loading...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['todo', 'in progress', 'review', 'done'].map((status) => (
                    <Card
                      key={status}
                      className="p-3 sm:p-4 min-h-[200px]"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, status)}
                    >
                      <h4 className="text-sm sm:text-base font-semibold text-primary-text mb-3 capitalize flex items-center justify-between">
                        {status === 'todo' ? 'Todo' : status === 'in progress' ? 'In Progress' : status === 'review' ? 'Review' : 'Done'}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{tasksKanban[status]?.length || 0}</span>
                      </h4>
                      <div className="space-y-2 min-h-[100px]">
                        {tasksKanban[status]?.map((task) => (
                          <div
                            key={task.id}
                            className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-move"
                            draggable
                            onDragStart={(e) => handleDragStart(e, task)}
                          >
                            <p className="text-xs sm:text-sm font-medium text-primary-text truncate">#{task.code || task.id} - {task.title}</p>
                            {task.due_date && (
                              <p className="text-xs text-secondary-text mt-1">Due: {new Date(task.due_date).toLocaleDateString()}</p>
                            )}
                          </div>
                        ))}
                        {tasksKanban[status]?.length === 0 && (
                          <div className="text-center py-4 text-xs text-secondary-text">No tasks</div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'milestones' && (
            <Card className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-primary-text">Milestones</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddMilestoneModalOpen(true)}
                  className="flex items-center gap-2 hover:bg-gray-800 hover:text-white hover:border-gray-800 w-full sm:w-auto justify-center"
                >
                  <IoAdd size={16} />
                  <span className="text-xs sm:text-sm">Add milestone</span>
                </Button>
              </div>
              {loadingMilestones ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text text-sm">Loading...</div>
              ) : milestones.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text">
                  <IoFlag size={40} className="sm:w-12 sm:h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No milestones found</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base text-primary-text truncate">{milestone.title || `Milestone ${milestone.id}`}</h4>
                          <p className="text-xs sm:text-sm text-secondary-text mt-1">Due: {milestone.due_date || '-'}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleViewTask(milestone)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-primary-accent"
                            title="View"
                          >
                            <IoEye size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <button
                            onClick={() => handleEditTask(milestone)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-blue-600"
                            title="Edit"
                          >
                            <IoCreate size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <button
                            onClick={() => handleDeleteMilestone(milestone)}
                            className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                            title="Delete"
                          >
                            <IoTrash size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {activeTab === 'notes' && (
            <Card className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-primary-text">Notes</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddNoteModalOpen(true)}
                  className="flex items-center gap-2 hover:bg-gray-800 hover:text-white hover:border-gray-800 w-full sm:w-auto justify-center"
                >
                  <IoAdd size={16} />
                  <span className="text-xs sm:text-sm">Add note</span>
                </Button>
              </div>
              {loadingNotes ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text text-sm">Loading...</div>
              ) : notes.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text">
                  <IoDocumentText size={40} className="sm:w-12 sm:h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No notes found</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {notes.map((note, index) => (
                    <div key={index} className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-primary-text whitespace-pre-wrap break-words">{note.content || note.note}</p>
                          {note.created_at && (
                            <p className="text-xs text-secondary-text mt-2">{new Date(note.created_at).toLocaleDateString()}</p>
                          )}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleViewNote(note)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-primary-accent"
                            title="View"
                          >
                            <IoEye size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <button
                            onClick={() => handleEditNote(note)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-blue-600"
                            title="Edit"
                          >
                            <IoCreate size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <button
                            onClick={() => handleDeleteNote(note)}
                            className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                            title="Delete"
                          >
                            <IoTrash size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {activeTab === 'files' && (
            <Card className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-primary-text">Files</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddFileModalOpen(true)}
                  className="flex items-center gap-2 hover:bg-gray-800 hover:text-white hover:border-gray-800 w-full sm:w-auto justify-center"
                >
                  <IoAdd size={16} />
                  <span className="text-xs sm:text-sm">Add file</span>
                </Button>
              </div>
              {loadingFiles ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text text-sm">Loading...</div>
              ) : files.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text">
                  <IoFileTray size={40} className="sm:w-12 sm:h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No files found</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {files.map((file) => (
                    <div key={file.id} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                          <IoDocumentText size={20} className="sm:w-6 sm:h-6 text-primary-accent flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm sm:text-base text-primary-text truncate">{file.name || file.file_name}</h4>
                            <p className="text-xs sm:text-sm text-secondary-text">{file.size || '-'}</p>
                            <p className="text-xs sm:text-sm text-secondary-text">{file.uploaded_at || '-'}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleDownloadFile(file)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-primary-accent"
                            title="Download"
                          >
                            <IoDownload size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <button
                            onClick={() => handleDeleteFile(file)}
                            className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                            title="Delete"
                          >
                            <IoTrash size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {activeTab === 'comments' && (
            <Card className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-primary-text">Comments</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddCommentModalOpen(true)}
                  className="flex items-center gap-2 hover:bg-gray-800 hover:text-white hover:border-gray-800 w-full sm:w-auto justify-center"
                >
                  <IoAdd size={16} />
                  <span className="text-xs sm:text-sm">Add comment</span>
                </Button>
              </div>
              {loadingComments ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text text-sm">Loading...</div>
              ) : comments.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text">
                  <IoChatbubble size={40} className="sm:w-12 sm:h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No comments found</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-3 sm:p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-accent/20 flex items-center justify-center text-xs font-semibold text-primary-accent">
                          {comment.user_name ? comment.user_name.substring(0, 2).toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm font-medium text-primary-text">{comment.user_name || 'User'}</p>
                          <p className="text-xs sm:text-sm text-secondary-text mt-1">{comment.content || comment.comment}</p>
                          <p className="text-xs text-secondary-text mt-1">{comment.created_at ? new Date(comment.created_at).toLocaleDateString() : '-'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {activeTab === 'timesheets' && (
            <Card className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-primary-text">Timesheets</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddTimesheetModalOpen(true)}
                  className="flex items-center gap-2 hover:bg-gray-800 hover:text-white hover:border-gray-800 w-full sm:w-auto justify-center"
                >
                  <IoAdd size={16} />
                  <span className="text-xs sm:text-sm">Add timesheet</span>
                </Button>
              </div>
              {loadingTimesheets ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text text-sm">Loading...</div>
              ) : timesheets.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text">
                  <IoTime size={40} className="sm:w-12 sm:h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No timesheets found</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {timesheets.map((timesheet) => (
                    <div key={timesheet.id} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base text-primary-text">{timesheet.user_name || 'User'}</h4>
                          <p className="text-xs sm:text-sm text-secondary-text mt-1">Hours: {parseFloat(timesheet.hours || 0).toFixed(2)}</p>
                          <p className="text-xs sm:text-sm text-secondary-text">Date: {timesheet.date || timesheet.created_at ? new Date(timesheet.date || timesheet.created_at).toLocaleDateString() : '-'}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleViewTimesheet(timesheet)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-primary-accent"
                            title="View"
                          >
                            <IoEye size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <button
                            onClick={() => handleDeleteTimesheet(timesheet)}
                            className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                            title="Delete"
                          >
                            <IoTrash size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {activeTab === 'expenses' && (
            <Card className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-primary-text">Expenses</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddExpenseModalOpen(true)}
                  className="flex items-center gap-2 hover:bg-gray-800 hover:text-white hover:border-gray-800 w-full sm:w-auto justify-center"
                >
                  <IoAdd size={16} />
                  <span className="text-xs sm:text-sm">Add expense</span>
                </Button>
              </div>
              {loadingExpenses ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text text-sm">Loading...</div>
              ) : expenses.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-secondary-text">
                  <IoReceipt size={40} className="sm:w-12 sm:h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No expenses found</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base text-primary-text truncate">{expense.expense_number || `EXP-${expense.id}`}</h4>
                          <p className="text-xs sm:text-sm text-secondary-text mt-1">Amount: ${parseFloat(expense.total || 0).toFixed(2)}</p>
                          <p className="text-xs sm:text-sm text-secondary-text">Status: {expense.status || 'Pending'}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleViewExpense(expense)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-primary-accent"
                            title="View"
                          >
                            <IoEye size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <button
                            onClick={() => handleEditExpense(expense)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-blue-600"
                            title="Edit"
                          >
                            <IoCreate size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(expense)}
                            className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                            title="Delete"
                          >
                            <IoTrash size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>
      </div>

      {/* Modals */}
      {/* Add Member Modal */}
      <Modal
        isOpen={isAddMemberModalOpen}
        onClose={() => {
          setIsAddMemberModalOpen(false)
          setMemberFormData({ userId: '' })
        }}
        title="Add Member"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Select Employee</label>
            <select
              value={memberFormData.userId}
              onChange={(e) => setMemberFormData({ userId: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
            >
              <option value="">Select an employee</option>
              {employees
                .filter(emp => {
                  // Filter out employees who are already members
                  const currentMemberIds = members.map(m => m.id || m.user_id || m.userId).filter(Boolean)
                  const empUserId = emp.user_id || emp.id
                  return !currentMemberIds.includes(empUserId)
                })
                .map((employee) => (
                  <option key={employee.id} value={employee.user_id || employee.id}>
                    {employee.name || employee.email || `Employee #${employee.id}`}
                    {employee.department_name ? ` - ${employee.department_name}` : ''}
                  </option>
                ))}
            </select>
            {employees.length === 0 && (
              <p className="text-xs text-secondary-text mt-1">Loading employees...</p>
            )}
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsAddMemberModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddMember} className="flex-1">
              Add Member
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Note Modal */}
      <Modal
        isOpen={isAddNoteModalOpen}
        onClose={() => {
          setIsAddNoteModalOpen(false)
          setNoteFormData({ title: '', content: '' })
        }}
        title="Add Note"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Title (Optional)</label>
            <Input
              value={noteFormData.title}
              onChange={(e) => setNoteFormData({ ...noteFormData, title: e.target.value })}
              placeholder="Enter note title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Note *</label>
            <textarea
              value={noteFormData.content}
              onChange={(e) => setNoteFormData({ ...noteFormData, content: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter note"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => {
              setIsAddNoteModalOpen(false)
              setNoteFormData({ title: '', content: '' })
            }} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddNote} className="flex-1">
              Add Note
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddTaskModalOpen}
        onClose={() => {
          setIsAddTaskModalOpen(false)
          setTaskFormData({ title: '', description: '', due_date: '', priority: 'Medium', status: 'Incomplete' })
        }}
        title="Add Task"
      >
        <div className="space-y-4">
          <Input
            label="Task Title *"
            value={taskFormData.title}
            onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
            placeholder="Enter task title"
            required
          />
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Description</label>
            <textarea
              value={taskFormData.description}
              onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter task description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Due Date"
              type="date"
              value={taskFormData.due_date}
              onChange={(e) => setTaskFormData({ ...taskFormData, due_date: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">Priority</label>
              <select
                value={taskFormData.priority}
                onChange={(e) => setTaskFormData({ ...taskFormData, priority: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-transparent"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => {
              setIsAddTaskModalOpen(false)
              setTaskFormData({ title: '', description: '', due_date: '', priority: 'Medium', status: 'Incomplete' })
            }} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddTask} className="flex-1">
              Add Task
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Milestone Modal */}
      <Modal
        isOpen={isAddMilestoneModalOpen}
        onClose={() => {
          setIsAddMilestoneModalOpen(false)
          setMilestoneFormData({ title: '', due_date: '', description: '' })
        }}
        title="Add Milestone"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Title *</label>
            <Input
              value={milestoneFormData.title}
              onChange={(e) => setMilestoneFormData({ ...milestoneFormData, title: e.target.value })}
              placeholder="Enter milestone title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Due Date</label>
            <Input
              type="date"
              value={milestoneFormData.due_date}
              onChange={(e) => setMilestoneFormData({ ...milestoneFormData, due_date: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Description</label>
            <textarea
              value={milestoneFormData.description}
              onChange={(e) => setMilestoneFormData({ ...milestoneFormData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter milestone description"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => {
              setIsAddMilestoneModalOpen(false)
              setMilestoneFormData({ title: '', due_date: '', description: '' })
            }} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddMilestone} className="flex-1">
              Add Milestone
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add File Modal */}
      <Modal
        isOpen={isAddFileModalOpen}
        onClose={() => {
          setIsAddFileModalOpen(false)
          setFileFormData({ title: '', file: null, description: '' })
        }}
        title="Add File"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">File *</label>
            <input
              type="file"
              onChange={(e) => setFileFormData({ ...fileFormData, file: e.target.files[0] })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              required
            />
            {fileFormData.file && (
              <p className="text-xs text-secondary-text mt-1">Selected: {fileFormData.file.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Title (Optional)</label>
            <Input
              value={fileFormData.title}
              onChange={(e) => setFileFormData({ ...fileFormData, title: e.target.value })}
              placeholder="Enter file title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Description</label>
            <textarea
              value={fileFormData.description}
              onChange={(e) => setFileFormData({ ...fileFormData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter file description"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => {
              setIsAddFileModalOpen(false)
              setFileFormData({ title: '', file: null, description: '' })
            }} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddFile} className="flex-1">
              Upload File
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Comment Modal */}
      <Modal
        isOpen={isAddCommentModalOpen}
        onClose={() => {
          setIsAddCommentModalOpen(false)
          setCommentFormData({ content: '' })
        }}
        title="Add Comment"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Comment *</label>
            <textarea
              value={commentFormData.content}
              onChange={(e) => setCommentFormData({ content: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter your comment"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => {
              setIsAddCommentModalOpen(false)
              setCommentFormData({ content: '' })
            }} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddComment} className="flex-1">
              Add Comment
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Timesheet Modal */}
      <Modal
        isOpen={isAddTimesheetModalOpen}
        onClose={() => {
          setIsAddTimesheetModalOpen(false)
          setTimesheetFormData({ date: new Date().toISOString().split('T')[0], hours: '', description: '' })
        }}
        title="Add Timesheet"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Date *</label>
            <Input
              type="date"
              value={timesheetFormData.date}
              onChange={(e) => setTimesheetFormData({ ...timesheetFormData, date: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Hours *</label>
            <Input
              type="number"
              step="0.25"
              min="0"
              value={timesheetFormData.hours}
              onChange={(e) => setTimesheetFormData({ ...timesheetFormData, hours: e.target.value })}
              placeholder="Enter hours worked"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Description</label>
            <textarea
              value={timesheetFormData.description}
              onChange={(e) => setTimesheetFormData({ ...timesheetFormData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter work description"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => {
              setIsAddTimesheetModalOpen(false)
              setTimesheetFormData({ date: new Date().toISOString().split('T')[0], hours: '', description: '' })
            }} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddTimesheet} className="flex-1">
              Add Timesheet
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Expense Modal */}
      <Modal
        isOpen={isAddExpenseModalOpen}
        onClose={() => {
          setIsAddExpenseModalOpen(false)
          setExpenseFormData({ title: '', amount: '', date: new Date().toISOString().split('T')[0], category: '', description: '' })
        }}
        title="Add Expense"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Title *</label>
            <Input
              value={expenseFormData.title}
              onChange={(e) => setExpenseFormData({ ...expenseFormData, title: e.target.value })}
              placeholder="Enter expense title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Amount *</label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={expenseFormData.amount}
              onChange={(e) => setExpenseFormData({ ...expenseFormData, amount: e.target.value })}
              placeholder="Enter amount"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Date *</label>
            <Input
              type="date"
              value={expenseFormData.date}
              onChange={(e) => setExpenseFormData({ ...expenseFormData, date: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Category</label>
            <Input
              value={expenseFormData.category}
              onChange={(e) => setExpenseFormData({ ...expenseFormData, category: e.target.value })}
              placeholder="Enter category"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Description</label>
            <textarea
              value={expenseFormData.description}
              onChange={(e) => setExpenseFormData({ ...expenseFormData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter expense description"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => {
              setIsAddExpenseModalOpen(false)
              setExpenseFormData({ title: '', amount: '', date: new Date().toISOString().split('T')[0], category: '', description: '' })
            }} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddExpense} className="flex-1">
              Add Expense
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reminders Modal */}
      <Modal
        isOpen={isRemindersModalOpen}
        onClose={() => {
          setIsRemindersModalOpen(false)
          setReminderFormData({ title: '', description: '', reminder_date: '', reminder_time: '' })
        }}
        title="Reminders"
      >
        <div className="space-y-4">
          <div>
            <Input
              label="Reminder Title *"
              value={reminderFormData.title}
              onChange={(e) => setReminderFormData({ ...reminderFormData, title: e.target.value })}
              placeholder="Enter reminder title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Description</label>
            <textarea
              value={reminderFormData.description}
              onChange={(e) => setReminderFormData({ ...reminderFormData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter reminder description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Reminder Date"
              type="date"
              value={reminderFormData.reminder_date}
              onChange={(e) => setReminderFormData({ ...reminderFormData, reminder_date: e.target.value })}
            />
            <Input
              label="Reminder Time"
              type="time"
              value={reminderFormData.reminder_time}
              onChange={(e) => setReminderFormData({ ...reminderFormData, reminder_time: e.target.value })}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsRemindersModalOpen(false)
                setReminderFormData({ title: '', description: '', reminder_date: '', reminder_time: '' })
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddReminder} className="flex-1">
              Add Reminder
            </Button>
          </div>

          {/* Existing Reminders List */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-sm font-semibold text-primary-text mb-3">Existing Reminders</h3>
            {reminders.length === 0 ? (
              <p className="text-sm text-secondary-text">No reminders set</p>
            ) : (
              <div className="space-y-2">
                {reminders.map((reminder) => (
                  <div key={reminder.id} className="p-3 bg-gray-50 rounded-lg flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary-text">{reminder.title}</p>
                      <p className="text-xs text-secondary-text mt-1">{reminder.message}</p>
                      <p className="text-xs text-secondary-text mt-1">
                        Created: {new Date(reminder.created_at).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteReminder(reminder.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Delete Reminder"
                    >
                      <IoTrash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title="Project Settings"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Public Gantt Chart</label>
            <select
              value={settingsFormData.public_gantt_chart}
              onChange={(e) => setSettingsFormData({ ...settingsFormData, public_gantt_chart: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
            >
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Public Task Board</label>
            <select
              value={settingsFormData.public_task_board}
              onChange={(e) => setSettingsFormData({ ...settingsFormData, public_task_board: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
            >
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Task Approval</label>
            <select
              value={settingsFormData.task_approval}
              onChange={(e) => setSettingsFormData({ ...settingsFormData, task_approval: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
            >
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsSettingsModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveSettings} className="flex-1">
              Save Settings
            </Button>
          </div>
        </div>
      </Modal>

      {/* View Task Modal */}
      <Modal
        isOpen={isViewTaskModalOpen}
        onClose={() => {
          setIsViewTaskModalOpen(false)
          setSelectedTask(null)
        }}
        title={`Task: ${selectedTask?.title || ''}`}
      >
        {selectedTask && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-text mb-1">Title</label>
              <p className="text-primary-text">{selectedTask.title}</p>
            </div>
            {selectedTask.description && (
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Description</label>
                <p className="text-primary-text whitespace-pre-wrap">{selectedTask.description}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Status</label>
                <Badge variant={
                  selectedTask.status === 'Done' || selectedTask.status === 'done' ? 'success' :
                    selectedTask.status === 'Doing' || selectedTask.status === 'doing' ? 'info' : 'warning'
                }>
                  {selectedTask.status || 'Incomplete'}
                </Badge>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Priority</label>
                <Badge variant={
                  selectedTask.priority === 'High' || selectedTask.priority === 'high' ? 'danger' :
                    selectedTask.priority === 'Medium' || selectedTask.priority === 'medium' ? 'warning' : 'info'
                }>
                  {selectedTask.priority || 'Medium'}
                </Badge>
              </div>
            </div>
            {selectedTask.due_date && (
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Due Date</label>
                <p className="text-primary-text">{new Date(selectedTask.due_date).toLocaleDateString()}</p>
              </div>
            )}
            {selectedTask.code && (
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Task Code</label>
                <p className="text-primary-text">{selectedTask.code}</p>
              </div>
            )}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsViewTaskModalOpen(false)
                  setSelectedTask(null)
                }}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsViewTaskModalOpen(false)
                  handleEditTask(selectedTask)
                }}
                className="flex-1"
              >
                Edit Task
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* View Timesheet Modal */}
      <Modal
        isOpen={isViewTimesheetModalOpen}
        onClose={() => {
          setIsViewTimesheetModalOpen(false)
          setSelectedTimesheet(null)
        }}
        title="Timesheet Details"
      >
        {selectedTimesheet && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">User</label>
                <p className="text-primary-text font-medium">{selectedTimesheet.user_name || 'Unknown'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Hours</label>
                <p className="text-primary-text font-medium">{parseFloat(selectedTimesheet.hours || 0).toFixed(2)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Date</label>
                <p className="text-primary-text">{selectedTimesheet.date ? new Date(selectedTimesheet.date).toLocaleDateString() : '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Task</label>
                <p className="text-primary-text">{selectedTimesheet.task_name || selectedTimesheet.task_title || '-'}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-text mb-1">Memo</label>
              <p className="text-primary-text whitespace-pre-wrap">{selectedTimesheet.memo || selectedTimesheet.description || '-'}</p>
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setIsViewTimesheetModalOpen(false)
                  setSelectedTimesheet(null)
                }}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* View Expense Modal */}
      <Modal
        isOpen={isViewExpenseModalOpen}
        onClose={() => {
          setIsViewExpenseModalOpen(false)
          setSelectedExpense(null)
        }}
        title="Expense Details"
      >
        {selectedExpense && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Expense #</label>
                <p className="text-primary-text font-medium">{selectedExpense.expense_number || `EXP#${selectedExpense.id}`}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Status</label>
                <Badge className={`text-xs ${selectedExpense.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  selectedExpense.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                  {selectedExpense.status || 'Pending'}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Amount</label>
                <p className="text-primary-text font-semibold text-lg">${parseFloat(selectedExpense.total || selectedExpense.amount || 0).toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Category</label>
                <p className="text-primary-text">{selectedExpense.category || '-'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Date</label>
                <p className="text-primary-text">{selectedExpense.expense_date ? new Date(selectedExpense.expense_date).toLocaleDateString() : selectedExpense.created_at ? new Date(selectedExpense.created_at).toLocaleDateString() : '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Project</label>
                <p className="text-primary-text">{project?.project_name || '-'}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-text mb-1">Description</label>
              <p className="text-primary-text whitespace-pre-wrap">{selectedExpense.description || '-'}</p>
            </div>
            {selectedExpense.receipt_path && (
              <div>
                <label className="block text-sm font-medium text-secondary-text mb-1">Receipt</label>
                <a href={selectedExpense.receipt_path} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Receipt
                </a>
              </div>
            )}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setIsViewExpenseModalOpen(false)
                  setSelectedExpense(null)
                }}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsViewExpenseModalOpen(false)
                  handleEditExpense(selectedExpense)
                }}
                className="flex-1"
              >
                Edit
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={isEditTaskModalOpen}
        onClose={() => {
          setIsEditTaskModalOpen(false)
          setSelectedTask(null)
          setTaskFormData({ title: '', description: '', due_date: '', priority: 'Medium', status: 'Incomplete' })
        }}
        title="Edit Task"
      >
        <div className="space-y-4">
          <Input
            label="Task Title *"
            value={taskFormData.title}
            onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
            placeholder="Enter task title"
            required
          />
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Description</label>
            <textarea
              value={taskFormData.description}
              onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter task description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Due Date"
              type="date"
              value={taskFormData.due_date}
              onChange={(e) => setTaskFormData({ ...taskFormData, due_date: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">Priority</label>
              <select
                value={taskFormData.priority}
                onChange={(e) => setTaskFormData({ ...taskFormData, priority: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-transparent"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Status</label>
            <select
              value={taskFormData.status}
              onChange={(e) => setTaskFormData({ ...taskFormData, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-transparent"
            >
              <option value="Incomplete">Incomplete</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditTaskModalOpen(false)
                setSelectedTask(null)
                setTaskFormData({ title: '', description: '', due_date: '', priority: 'Medium', status: 'Incomplete' })
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdateTask} className="flex-1">
              Update Task
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProjectDetail

