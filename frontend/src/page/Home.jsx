import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Contact } from '@/page/Contact'

export const Home = () => {
  return (
<div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-20 mt-15 min-h-80">
        <h1 className="text-5xl font-extrabold mb-20 text-gray-900">
          Welcome to RoboMind Technologies
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-20">
          We design and build intelligent robotic solutions that empower businesses to automate operations, enhance productivity, and drive innovation.
        </p>
        <div className="mt-6 mb-35">
          <Button size="lg" className="rounded-full">
            Explore Our Solutions
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <h2 className="text-3xl font-bold mb-20 ">Our Solutions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-35  min-h-80">
        <Card>
          <CardHeader>
            <CardTitle>AI Service Robots</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Our AI-powered service robots assist in hospitality, healthcare, and retail—delivering personalized experiences and seamless automation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Industrial Automation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              From smart factories to precision assembly, our robotic systems reduce errors, increase efficiency, and lower operational costs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>R&D Robotics Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We provide customizable robotic kits and SDKs for researchers, startups, and universities exploring next-gen AI robotics.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* About Section */}
      <div className="text-center max-w-3xl mx-auto  mb-20  ">
        <h2 className="text-3xl font-bold mb-20  ">About RoboMind</h2>
        <p className="text-gray-600 mb-35">
          Founded in 2022, RoboMind Technologies is a visionary robotics company based in Sydney, Australia. 
          Our mission is to bridge the gap between artificial intelligence and real-world automation through elegant design, cutting-edge engineering, and user-centered innovation.
        </p>
      </div>

      {/* Contact Section */}
      <div className="mt-16  mb-20  ">
        <Contact />
      </div>
    </div>
  )
}

export default Home