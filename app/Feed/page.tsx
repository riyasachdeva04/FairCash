"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Bookmark, Briefcase, Mail, Github } from "lucide-react"
import Link from "next/link"
import Papa from "papaparse"
import { Appbar } from "../components/Appbar"
import { Navbar } from "../components/Navbar"

export default function Feed() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("/employees.csv")
      const csvText = await response.text()
      const parsedData = Papa.parse(csvText, { header: true }).data

      const processedData = parsedData.map((employee) => ({
        ...employee,
        upvotes: !isNaN(Number(employee.Upvotes)) ? Number(employee.Upvotes) : 0,
        downvotes: !isNaN(Number(employee.Downvotes)) ? Number(employee.Downvotes) : 0,
        isBookmarked: false,
        isUpvoted: false,
        isDownvoted: false
      }))

      setEmployees(processedData)
    }

    loadData()
  }, [])

  const handleVote = (index, voteType) => {
    setEmployees((prev) =>
      prev.map((emp, i) =>
        i === index
          ? {
              ...emp,
              upvotes: voteType === "upvote" 
                ? emp.isUpvoted ? emp.upvotes - 1 : emp.upvotes + 1 
                : emp.upvotes,
              isUpvoted: voteType === "upvote" 
                ? !emp.isUpvoted 
                : emp.isUpvoted,
              
              downvotes: voteType === "downvote" 
                ? emp.isDownvoted ? emp.downvotes - 1 : emp.downvotes + 1 
                : emp.downvotes,
              isDownvoted: voteType === "downvote" 
                ? !emp.isDownvoted 
                : emp.isDownvoted,
            }
          : emp
      )
    )
  }

  const handleBookmark = (index) => {
    setEmployees((prev) =>
      prev.map((emp, i) =>
        i === index ? { ...emp, isBookmarked: !emp.isBookmarked } : emp
      )
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-blue-900 text-gray-100">
      <div className="container mx-auto p-4">
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee, index) => (
            <Card key={index} className="flex flex-col bg-gray-800 border-blue-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12 ring-2 ring-blue-500">
                    <AvatarImage src={`https://www.github.com/${employee.Name.split(' ')[0]}${employee.Name.split(' ')[1]}.png`} alt={employee.Name} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {employee.Name.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-blue-300">{employee.Name}</CardTitle>
                    <p className="text-sm text-blue-400">{employee.Role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <div className="flex items-center text-blue-300">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span className="text-sm">{employee.Department}</span>
                  </div>
                  <div className="flex items-center text-blue-300">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">{employee.Email}</span>
                  </div>
                  <div className="flex items-center text-blue-300">
                    <Github className="w-4 h-4 mr-2" />
                    <button 
                      className="text-sm hover:text-blue-400 transition-colors duration-200"
                      onClick={() => {window.open(`https://www.github.com/${employee.Name.split(' ')[0]}${employee.Name.split(' ')[1]}`, '_blank')}}
                    >
                      Github
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVote(index, "upvote")}
                      className="border-green-500 hover:bg-green-700 text-green-500 hover:text-white bg-black"
                    >
                      <ThumbsUp className={`w-4 h-4 ${employee.isUpvoted ? "fill-current" : ""}`} />
                      <span className="ml-1">{employee.upvotes}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVote(index, "downvote")}
                      className="border-red-500 hover:bg-red-700 text-red-300 hover:text-white bg-black"
                    >
                      <ThumbsDown className={`w-4 h-4 ${employee.isDownvoted ? "fill-current" : ""}`} />
                      <span className="ml-1">{employee.downvotes}</span>
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBookmark(index)}
                    className="border-purple-500 hover:bg-purple-700 text-purple-300 hover:text-white bg-black"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${employee.isBookmarked ? "fill-current" : ""}`}
                    />
                  </Button>
                </div>
                <div className="flex my-3">
                  <Link href={{ pathname: `/profile` }} passHref>
                    <Button 
                      onClick={() => {localStorage.setItem('employee', JSON.stringify(employee))}}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}