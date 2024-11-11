"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "@/components/ui/chart"
import { ThumbsUp, ThumbsDown, Briefcase, GraduationCap, Award, Clock, Calendar } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import GitHubCalendar from 'react-github-calendar';

const employeeData = {
  experience: "8 years",
  almaMater: "MIT",
  recommendations: 15,
  performanceScore: 92,
}
// const map1 = new Map();

const salaryComparisonData = [
  { month: "Jan", employee: 8000, average: 8500 },
  { month: "Feb", employee: 8200, average: 8600 },
  { month: "Mar", employee: 8400, average: 8700 },
  { month: "Apr", employee: 8600, average: 8800 },
  { month: "May", employee: 8800, average: 8900 },
  { month: "Jun", employee: 9000, average: 9000 },
]

const skillAnalysisData = [
  { skill: "JavaScript", score: 95 },
  { skill: "React", score: 90 },
  { skill: "Node.js", score: 85 },
  { skill: "Python", score: 80 },
  { skill: "SQL", score: 88 },
]

export default function EmployeeProfile() {
  const [feedback, setFeedback] = useState("")
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const empData = JSON.parse(localStorage.getItem('employee'));
    setEmployee(empData);
  }, []); 

  if (!employee) return <p>Loading...</p>;
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={`https://www.github.com/${employee.Name.split(' ')[0]}${employee.Name.split(' ')[1]}.png`} alt={employee.Name} />
                <AvatarFallback>{employee.Name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{employee.Name}</CardTitle>
                <CardDescription>{employee.Role}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                <span>{employeeData.experience}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
                <span>{employeeData.almaMater}</span>
              </div>
              <div className="flex items-center">
                <Award className="mr-2 h-4 w-4" />
                <span>{employeeData.recommendations} Recommendations</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>Performance: {employeeData.performanceScore}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Comparison Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="salary">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="salary">Salary Comparison</TabsTrigger>
                <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
              </TabsList>
              <TabsContent value="salary">
                {/* <LineChart
                  data={salaryComparisonData}
                  index="month"
                  categories={["employee", "average"]}
                  colors={["blue", "green"]}
                  valueFormatter={(value) => `$${value}`}
                  className="mt-6 aspect-[4/3]"
                /> */}
              </TabsContent>
              <TabsContent value="skills">
                {/* <BarChart
                  data={skillAnalysisData}
                  index="skill"
                  categories={["score"]}
                  colors={["purple"]}
                  valueFormatter={(value) => `${value}%`}
                  className="mt-6 aspect-[4/3]"
                /> */}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Card className="flex-1 p-5">
        <GitHubCalendar username={`${employee.Name.split(' ')[0]}${employee.Name.split(' ')[1]}`}/>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Work Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Hours Worked (This Week)</h3>
              <Progress value={80} className="w-full" />
              <p className="text-sm text-muted-foreground mt-1">32 / 40 hours</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Leaves Taken (This Year)</h3>
              <Progress value={40} className="w-full" />
              <p className="text-sm text-muted-foreground mt-1">8 / 20 days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Rate Your Coworker</CardTitle>
          <CardDescription>Provide feedback based on specific categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Collaboration", "Technical Skill", "Communication", "Problem Solving"].map((category) => (
              <div key={category} className="flex flex-col items-center">
                <span className="font-semibold mb-2">{category}</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Submit Anonymous Feedback</CardTitle>
          <CardDescription>Your feedback will be kept confidential</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Share your experience working with this person..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="mb-4"
          />
          <Button>Submit Feedback</Button>
        </CardContent>
      </Card>
    </div>
  )
}