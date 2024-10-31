"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Bookmark, Briefcase, Mail } from "lucide-react"
import { useInView } from "react-intersection-observer"
import Link from 'next/link'

const fetchEmployees = async (page: number) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return Array.from({ length: 10 }, (_, i) => ({
    id: page * 10 + i + 1,
    name: `Employee ${page * 10 + i + 1}`,
    role: ["Software Engineer", "Product Manager", "Designer", "Marketing Specialist", "HR Manager"][Math.floor(Math.random() * 5)],
    department: ["Engineering", "Product", "Design", "Marketing", "HR"][Math.floor(Math.random() * 5)],
    email: `employee${page * 10 + i + 1}@company.com`,
    upvotes: Math.floor(Math.random() * 100),
    downvotes: Math.floor(Math.random() * 20),
    isBookmarked: false,
  }))
}
export default function Feed() {

  const [employees, setEmployees] = useState([])
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      loadMoreEmployees()
    }
  }, [inView])

  const loadMoreEmployees = async () => {
    const newEmployees = await fetchEmployees(page)
    setEmployees(prev => [...prev, ...newEmployees])
    setPage(prev => prev + 1)
  }

  const handleVote = (employeeId: number, voteType: 'upvote' | 'downvote') => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === employeeId
          ? {
              ...emp,
              upvotes: voteType === 'upvote' ? emp.upvotes + 1 : emp.upvotes,
              downvotes: voteType === 'downvote' ? emp.downvotes + 1 : emp.downvotes,
            }
          : emp
      )
    )
  }

  const handleBookmark = (employeeId: number) => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === employeeId
          ? { ...emp, isBookmarked: !emp.isBookmarked }
          : emp
      )
    )
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Employee Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Card key={employee.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${employee.name}`} alt={employee.name} />
                  <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{employee.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span className="text-sm">{employee.department}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{employee.email}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(employee.id, 'upvote')}
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span>{employee.upvotes}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(employee.id, 'downvote')}
                  >
                    <ThumbsDown className="w-4 h-4 mr-1" />
                    <span>{employee.downvotes}</span>
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBookmark(employee.id)}
                >
                  <Bookmark className={`w-4 h-4 ${employee.isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>
              <div className="flex my-3">
              <Link href={`/profile/${employee.id}`} passHref>
                <Button>View Profile</Button>
                </Link>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div ref={ref} className="flex justify-center mt-8">
        <Button onClick={loadMoreEmployees} variant="outline">
          Load More
        </Button>
      </div>
    </div>
  )
}