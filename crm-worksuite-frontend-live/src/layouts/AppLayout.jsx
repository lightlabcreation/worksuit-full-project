import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()

  // Detect any detail page (project, lead, client, task, employee)
  const isDetailPage = /\/app\/admin\/(projects|leads|clients|tasks|employees)\/\d+/.test(location.pathname)

  // Auto‑close the main sidebar when we are on a detail page
  useEffect(() => {
    if (isDetailPage) {
      setSidebarOpen(false)
    }
  }, [isDetailPage])

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-main-bg">
      {/* TopBar – hide the menu button on detail pages */}
      <TopBar
        onMenuClick={() => setSidebarOpen(true)}
        isSidebarCollapsed={sidebarCollapsed || isDetailPage}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        hideMenuButton={isDetailPage}
      />
      <div className="flex relative w-full">
        {/* Main navigation sidebar – hide on any detail page */}
        {!isDetailPage && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        )}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ease-smooth min-h-screen w-full relative z-10 ${isDetailPage
            ? 'ml-0'
            : sidebarCollapsed
              ? 'ml-0 lg:ml-20'
              : 'ml-0 lg:ml-64'
            }`}
          style={{ paddingTop: '5rem' }}
        >
          <main className={`flex-1 w-full max-w-full overflow-x-hidden relative z-10 ${isDetailPage ? 'p-0' : 'p-6 lg:p-8 xl:p-10'
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
