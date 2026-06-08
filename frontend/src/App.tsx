import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [serverStatus, setServerStatus] = useState<string>('Checking...')

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/health`)
        setServerStatus('Server is running ✅')
      } catch (error) {
        setServerStatus('Server is not running ❌')
      }
    }
    checkServer()
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-blue-600">Life Control System</h1>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>

        <footer className="bg-gray-100 text-center py-4 mt-8">
          <p className="text-sm text-gray-600">Backend Status: {serverStatus}</p>
        </footer>
      </div>
    </Router>
  )
}

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Subjects" icon="📚" />
      <Card title="Habits" icon="✅" />
      <Card title="Goals" icon="🎯" />
      <Card title="Tasks" icon="📝" />
    </div>
  )
}

function Card({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
      <div className="text-4xl mb-2">{icon}</div>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-500 text-sm mt-2">Coming soon...</p>
    </div>
  )
}

export default App