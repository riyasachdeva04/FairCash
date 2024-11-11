"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer } from "@/components/ui/chart"
import { ThumbsUp, ThumbsDown, Briefcase, GraduationCap, Award, Clock } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import GitHubCalendar from 'react-github-calendar'
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"
import {
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { language: "JS", Progress: 90, fill: "#FFD700" },
  { language: "Python", Progress: 80, fill: "#4B0082" },
  { language: "Cpp", Progress: 90, fill: "#00CED1" },
  { language: "Java", Progress: 80, fill: "#FF6347" },
  { language: "Go", Progress: 89, fill: "#32CD32" },
]

const chartConfig = {
  Progress: {
    label: "Progress",
  },
  JS: {
    label: "JS",
    color: "#FFD700",
  },
  Python: {
    label: "Python",
    color: "#4B0082",
  },
  Cpp: {
    label: "C++",
    color: "#00CED1",
  },
  Java: {
    label: "Java",
    color: "#FF6347",
  },
  Go: {
    label: "Go",
    color: "#32CD32",
  },
} satisfies ChartConfig

const employeeData = {
  experience: "8 years",
  almaMater: "MIT",
  recommendations: 15,
  performanceScore: 92,
}

const explicitTheme = {
    light: ['#1e293b', '#334155', '#475569', '#64748b', '#94a3b8'],
    dark: ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b'],
  }

export default function EmployeeProfile() {
  const [map1, setMap1] = useState(new Map())
  const [map2, setMap2] = useState(new Map())
  const [feedback, setFeedback] = useState("")
  const [employee, setEmployee] = useState(null)
  
  useEffect(() => {
    const empData = JSON.parse(localStorage.getItem('employee'))
    setEmployee(empData)
  }, [])

  if (!employee) return <p className="text-gray-200">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 py-6">
      <div className="container mx-auto px-4">
        <Card className="bg-gray-900 border-gray-800 shadow-lg mb-6">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20 border-2 border-gray-700">
                <AvatarImage src={`https://www.github.com/${employee.Name.split(' ')[0]}${employee.Name.split(' ')[1]}.png`} alt={employee.Name} />
                <AvatarFallback className="bg-gray-800 text-gray-200">{employee.Name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-100">{employee.Name}</CardTitle>
                <CardDescription className="text-gray-400">{employee.Role}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-gray-300">
                <Briefcase className="mr-2 h-4 w-4 text-gray-500" />
                <span>{employeeData.experience}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <GraduationCap className="mr-2 h-4 w-4 text-gray-500" />
                <span>{employeeData.almaMater}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Award className="mr-2 h-4 w-4 text-gray-500" />
                <span>{employeeData.recommendations} Recommendations</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                <span>Performance: {employeeData.performanceScore}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-100">Comparison Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="salary">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="salary" className="data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100">Code Consistency</TabsTrigger>
                <TabsTrigger value="skills" className="data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100">Skill Analysis</TabsTrigger>
              </TabsList>
              <TabsContent value="salary">
                <Card className="bg-gray-800 border-gray-700 p-5 mb-6">
                  <GitHubCalendar username="riyasachdeva04" theme={explicitTheme}/>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-100">Work Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-300">Hours Worked (This Week)</h3>
                        <Progress value={80} className="w-full bg-gray-700">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }} />
                        </Progress>
                        <p className="text-sm text-gray-400 mt-1">32 / 40 hours</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-300">Leaves Taken (This Year)</h3>
                        <Progress value={40} className="w-full bg-gray-700">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '40%' }} />
                        </Progress>
                        <p className="text-sm text-gray-400 mt-1">8 / 20 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="skills">
                <Card className="bg-gray-800 border-gray-700" style={{'height': '40vh'}}>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <BarChart accessibilityLayer data={chartData} style={{'height': '35vh'}}>
                        <CartesianGrid vertical={false} stroke="#4a5568" />
                        <XAxis
                          dataKey="language"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                          tick={{ fill: '#a0aec0', fontSize: 12 }}
                          tickFormatter={(value) =>
                            chartConfig[value as keyof typeof chartConfig]?.label
                          }
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                          dataKey="Progress"
                          strokeWidth={2}
                          radius={8}
                          activeIndex={2}
                          activeBar={({ ...props }) => {
                            return (
                              <Rectangle
                                {...props}
                                fillOpacity={0.8}
                                stroke={props.payload.fill}
                                strokeDasharray={4}
                                strokeDashoffset={4}
                              />
                            )
                          }}
                        />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-100">Rate Your Coworker</CardTitle>
            <CardDescription className="text-gray-400">Provide feedback based on specific categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Collaboration", "Technical Skill", "Communication", "Problem Solving"].map((category) => (
                <div key={category} className="flex flex-col items-center">
                  <span className="font-semibold mb-2 text-gray-300">{category}</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => {
                      const newMap = new Map(map1)
                      newMap.set(category, !map1.get(category))
                      setMap1(newMap)
                    }} className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                      <ThumbsUp className={`h-4 w-4 ${map1.get(category) ? "text-green-400 fill-current" : "text-gray-400"}`}/>
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => {
                      const newMap = new Map(map2)
                      newMap.set(category, !map2.get(category))
                      setMap2(newMap)
                    }} className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                      <ThumbsDown className={`h-4 w-4 ${map2.get(category) ? "text-red-400 fill-current" : "text-gray-400"}`}/>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-100">Submit Anonymous Feedback</CardTitle>
            <CardDescription className="text-gray-400">Your feedback will be kept confidential</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Share your experience working with this person..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mb-4 bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500"
            />
            <Button onClick={() => {
              setMap1(new Map())
              setMap2(new Map())
              setFeedback("")
            }} className="bg-blue-600 hover:bg-blue-700 text-white">
              Submit Feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}