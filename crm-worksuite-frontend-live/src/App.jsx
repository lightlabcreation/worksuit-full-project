import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { SettingsProvider } from './context/SettingsContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <AppRoutes />
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </SettingsProvider>
  )
}

export default App

