import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ProtectedRoute from './components/auth/ProtectedRoute'
import TeachersList from './components/teachers/TeachersList'
import TeacherDetail from './components/teachers/TeacherDetail'
import TeacherForm from './components/teachers/TeacherForm'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/teachers" element={<TeachersList />} />
                <Route path="/teachers/:id" element={<TeacherDetail />} />
                <Route path="/teachers/new" element={<TeacherForm />} />
                <Route path="/teachers/:id/edit" element={<TeacherForm />} />
              </Route>
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
