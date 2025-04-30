import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import FanForm from './pages/FanForm'
import Dashboard from './pages/Dashboard'
import Home from './pages/HomePage'
import { Gamepad, FilePlus, Users } from 'lucide-react'

function App() {
  const location = useLocation()

  // Sidebar só aparece em páginas internas, exceto /, /home, /dashboard e /cadastro
  const showSidebar =
    location.pathname !== '/' &&
    location.pathname !== '/home' &&
    location.pathname !== '/dashboard' &&
    location.pathname !== '/cadastro'

  return (
    <div className="min-h-screen flex bg-[#0F0F0F] text-white font-sans">
      {/* Sidebar apenas fora da home, cadastro e dashboard */}
      {showSidebar && (
        <aside className="w-64 bg-[#1C1C1C] h-screen px-6 py-8 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <Gamepad size={26} className="text-purple-500" />
              <h1 className="text-xl font-bold text-purple-500 tracking-wide">Know Your Fan</h1>
            </div>

            <nav className="flex flex-col gap-2 text-sm">
              <SidebarLink
                to="/cadastro"
                icon={<FilePlus size={18} />}
                label="Cadastro"
                active={location.pathname === '/cadastro'}
              />
              <SidebarLink
                to="/dashboard"
                icon={<Users size={18} />}
                label="Dashboard"
                active={location.pathname === '/dashboard'}
              />
            </nav>
          </div>

          <footer className="text-xs text-gray-500 text-center">
            © 2025 KnowYourFan
          </footer>
        </aside>
      )}

      {/* Conteúdo principal */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro" element={<FanForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function SidebarLink({
  to,
  icon,
  label,
  active,
}: {
  to: string
  icon: React.ReactNode
  label: string
  active: boolean
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
        active
          ? 'bg-purple-700/30 text-purple-400 font-semibold shadow-inner'
          : 'text-gray-200 hover:bg-purple-700/10'
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}
