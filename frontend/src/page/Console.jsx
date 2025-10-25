import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { isAuthenticated } from '@/utils/auth'

// Shadcn UI Components for Dropdown and Dialog
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Console = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [authenticated, setAuthenticated] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = async () => {
    const auth = await isAuthenticated()
    if (!auth) {
      setAuthenticated(false)
      navigate('/Login')
      return
    }
    setAuthenticated(true)
    fetchContacts()
  }

  const fetchContacts = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await axios.get("http://localhost:5000/api/contact", { withCredentials: true })
      setContacts(response.data.contacts)
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setAuthenticated(false)
        navigate('/Login')
      } else {
        setError("Failed to fetch contact information. Please try again.")
        console.error("Error fetching contacts:", err)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/contact/${id}`, { status }, { withCredentials: true });
      fetchContacts(); // Refresh the list
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update status. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`, { withCredentials: true });
      fetchContacts(); // Refresh the list
    } catch (error) {
      console.error("Error deleting contact:", error);
      setError("Failed to delete contact. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!authenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-8">
            <p>Redirecting to login...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Admin Console</CardTitle>
          <CardDescription>
            View and manage contact submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Contact Submissions</h2>
            <Button onClick={fetchContacts} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <p>Loading contact information...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-8">
              <p>No contact submissions yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Phone</th>
                    <th className="py-2 px-4 text-left">Message</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-b">
                      <td className="py-2 px-4">{contact.name}</td>
                      <td className="py-2 px-4">
                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                          {contact.email}
                        </a>
                      </td>
                      <td className="py-2 px-4">{contact.phone || "-"}</td>
                      <td className="py-2 px-4 max-w-xs truncate" title={contact.message}>
                        {contact.message}
                      </td>
                      <td className="py-2 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {contact.status}
                        </span>
                      </td>
                      <td className="py-2 px-4">{formatDate(contact.created_at)}</td>
                      <td className="py-2 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(contact.id, 'verified')}
                            disabled={contact.status === 'verified'}
                          >
                            {contact.status === 'verified' ? 'Verified' : 'Mark as verified'}
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the contact message.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(contact.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Console