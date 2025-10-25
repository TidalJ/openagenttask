import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [form, setForm] = React.useState({
    name: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try{
      const res = await axios.post("http://localhost:5000/api/auth/login", form, {
        withCredentials: true
      });

      navigate("/Console");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.log(err);
    }
  }

  const handleSetName = (e) => {
    setForm(
      f => ({
        ...f,
        name: e.target.value
      })
    )
  }

  const handleSetPassword = (e) => {
    setForm(
      f => ({
        ...f,
        password: e.target.value
      })
    )
  }




  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to console</CardTitle>
          <CardDescription>
            Enter your admin account to login console
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  onChange={handleSetName}
                  value={form.name}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={handleSetPassword}
                  required
                  placeholder="Enter your password"
                  value={form.password}
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
            </div>
            <CardFooter className="flex-col gap-2 mt-6">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login