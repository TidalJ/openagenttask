import axios from 'axios'

// Check if user is authenticated
export const isAuthenticated = async () => {
  try {
    // Make a request to a protected endpoint to verify authentication
    await axios.get("http://localhost:5000/api/contact", { withCredentials: true })
    return true
  } catch (error) {
    // If we get a 401 or 403, the user is not authenticated or not authorized
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      return false
    }
    // For other errors, we assume the user is authenticated but there was a network issue
    return true
  }
}