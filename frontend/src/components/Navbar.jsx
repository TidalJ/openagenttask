import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await axios.get("http://localhost:5000/api/contact", { withCredentials: true })
        setIsLoggedIn(true)
      } catch (error) {
        setIsLoggedIn(false)
      }
    }
    checkLoginStatus()
  }, [location.pathname]) // Re-check on route change

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true })
      setIsLoggedIn(false)
      navigate('/')
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <nav className="bg-white">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yellow-600">
          MySite
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/Console" className="text-gray-600 hover:text-gray-800">
                Console
              </Link>
              <Button
                variant="destructive"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/Login" className="text-gray-600 hover:text-gray-800">
              Console
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar