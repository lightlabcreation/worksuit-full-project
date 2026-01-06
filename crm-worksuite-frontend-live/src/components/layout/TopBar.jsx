import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import {
  IoMenu,
  IoSearch,
  IoAdd,
  IoGlobe,
  IoTime,
  IoNotifications,
  IoMail,
  IoChevronDown,
  IoLogOut,
  IoPerson,
} from 'react-icons/io5'
import NotificationDropdown from './NotificationDropdown'
import MessagesPanel from './MessagesPanel'
import LanguageDropdown from './LanguageDropdown'

const TopBar = ({ onMenuClick, isSidebarCollapsed, onToggleSidebar }) => {
  const { user, logout } = useAuth()
  const { theme } = useTheme()
  const isDark = theme.mode === 'dark'
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const [showLanguage, setShowLanguage] = useState(false)
  const profileMenuRef = useRef(null)

  const notificationCount = 3 // Unread notifications count

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileMenu])

  const handleLogout = () => {
    logout()
    setShowProfileMenu(false)
    navigate('/login')
  }

  const getProfilePath = () => {
    if (!user) return '/app/superadmin/settings'
    switch (user.role) {
      case 'SUPERADMIN':
        return '/app/superadmin/settings'
      case 'ADMIN':
        return '/app/admin/settings'
      case 'EMPLOYEE':
        return '/app/employee/my-profile'
      case 'CLIENT':
        return '/app/client/profile'
      default:
        return '/app/superadmin/settings'
    }
  }

  const getRoleDisplayName = () => {
    if (!user) return 'USER'
    switch (user.role) {
      case 'SUPERADMIN':
        return 'Super Admin'
      case 'ADMIN':
        return 'ADMIN'
      case 'EMPLOYEE':
        return 'EMPLOYEE'
      case 'CLIENT':
        return 'CLIENT'
      default:
        return user.role || 'USER'
    }
  }

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 border-b z-50 w-full h-20 flex items-center shadow-sm" 
        style={{ 
          zIndex: 1000,
          backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
          borderColor: isDark ? '#404040' : '#e5e7eb',
        }}
      >
        <div className="px-4 lg:px-6 py-3 flex items-center justify-between w-full gap-4">
          {/* LEFT SIDE - RISE Logo and Toggle Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
            {/* Logo / App Icon */}
            <div className="flex items-center gap-3 cursor-pointer flex-shrink-0 group" onClick={() => navigate('/app/admin/dashboard')}>
              <div className="w-9 h-9 bg-gradient-to-br from-primary-accent to-info rounded-xl flex items-center justify-center flex-shrink-0 shadow-card group-hover:shadow-elevated transition-all duration-200">
                <span className="text-white font-bold text-base">R</span>
              </div>
              <span className="text-xl font-bold text-primary-text whitespace-nowrap hidden sm:block">RISE</span>
            </div>

            {/* Sidebar Toggle Button - Just after RISE */}
            {/* Mobile: Opens/closes sidebar overlay, Desktop: Collapses/expands sidebar */}
            <button
              onClick={(e) => {
                if (window.innerWidth < 1024) {
                  onMenuClick()
                } else {
                  onToggleSidebar()
                }
              }}
              className="flex items-center justify-center w-9 h-9 text-secondary-text hover:text-primary-text hover:bg-sidebar-hover rounded-xl transition-all duration-200 flex-shrink-0"
              title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <IoMenu size={20} className={`transition-transform duration-200 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Plus Icon */}
            <button
              className="p-2.5 text-secondary-text hover:text-primary-text hover:bg-sidebar-hover rounded-xl transition-all duration-200 flex-shrink-0"
              title="Add"
            >
              <IoAdd size={20} />
            </button>

            {/* Globe / Language Selector */}
            <div className="relative flex-shrink-0" style={{ zIndex: 1002 }}>
              <button
                onClick={() => setShowLanguage(!showLanguage)}
                className="p-2.5 text-secondary-text hover:text-primary-text hover:bg-sidebar-hover rounded-xl transition-all duration-200 relative"
                title="Language"
              >
                <IoGlobe size={20} />
              </button>
              <LanguageDropdown isOpen={showLanguage} onClose={() => setShowLanguage(false)} />
            </div>

            {/* Clock Icon */}
            <button
              className="hidden sm:flex items-center justify-center p-2.5 text-secondary-text hover:text-primary-text hover:bg-sidebar-hover rounded-xl transition-all duration-200 flex-shrink-0"
              title="Clock"
            >
              <IoTime size={20} />
            </button>

            {/* Notification Bell */}
            <div className="relative flex-shrink-0" style={{ zIndex: 1002 }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 text-secondary-text hover:text-primary-text hover:bg-sidebar-hover rounded-xl transition-all duration-200 relative"
                title="Notifications"
              >
                <IoNotifications size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-soft">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>
              <NotificationDropdown
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
              />
            </div>

            {/* User Profile */}
            <div className="relative flex-shrink-0" ref={profileMenuRef} style={{ zIndex: 1002 }}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-2 py-1.5 text-primary-text hover:bg-sidebar-hover rounded-xl transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-accent to-info flex items-center justify-center flex-shrink-0 shadow-card">
                  <span className="text-white text-sm font-semibold">
                    {user?.role === 'SUPERADMIN' ? 'SA' : user?.role === 'ADMIN' ? 'AD' : user?.role === 'EMPLOYEE' ? 'EM' : user?.role === 'CLIENT' ? 'CL' : user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
                  </span>
                </div>
                <span className="hidden md:block text-sm font-medium text-primary-text max-w-[140px] truncate">
                  {getRoleDisplayName()}
                </span>
                <IoChevronDown size={16} className="hidden md:block text-secondary-text" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden" style={{ position: 'fixed', top: '5.5rem', right: '1rem', zIndex: 10000, maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto' }}>
                  <div className="p-5 border-b border-border-light bg-gradient-to-r from-primary-accent/5 to-info/5">
                    <p className="text-sm font-semibold text-primary-text truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-secondary-text truncate mt-1">{user?.email || ''}</p>
                    <p className="text-xs font-semibold text-primary-accent mt-1">{getRoleDisplayName()}</p>
                    {user?.company_name && (
                      <p className="text-xs text-primary-accent font-medium mt-1.5 truncate">
                        {user.company_name}
                      </p>
                    )}
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        navigate(getProfilePath())
                        setShowProfileMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-primary-text hover:bg-sidebar-hover rounded-xl transition-all duration-200"
                    >
                      <IoPerson size={18} />
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 mt-1"
                    >
                      <IoLogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

    </>
  )
}

export default TopBar
