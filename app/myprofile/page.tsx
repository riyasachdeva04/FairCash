"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThumbsUp, ThumbsDown, Briefcase, GraduationCap, Award, Clock, Star } from "lucide-react"
import GitHubCalendar from 'react-github-calendar'
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, Label, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const reviews = [
  {
    id: 1,
    name: "Anonymous",
    avatar: "https://uploads.dailydot.com/2024/09/alien-cult-1.jpg?auto=compress&fm=pjpg",
    rating: 4,
    comment: "You're great at troubleshooting when things go wrong, but I think you could work more closely with us on CI/CD pipelines to make model integration smoother."
  },
  {
    id: 2,
    name: "Anonymous",
    avatar: "https://uploads.dailydot.com/2024/09/alien-cult-1.jpg?auto=compress&fm=pjpg",
    rating: 5,
    comment: "You’re fantastic at building out data-heavy solutions, but when scaling models, sometimes we find ourselves having to rework the infrastructure you’ve set up due to resource needs."
  },
  {
    id: 3,
    name: "Anonymous",
    avatar: "https://uploads.dailydot.com/2024/09/alien-cult-1.jpg?auto=compress&fm=pjpg",
    rating: 3,
    comment: "I appreciate how you handle data privacy and security, but sometimes there’s a lack of awareness about potential vulnerabilities when models are deployed into production."
  }
]

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
const chartData2 = [
  { browser: "chrome", visitors: 90, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 60, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 95, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 20, fill: "var(--color-edge)" },
  { browser: "other", visitors: 80, fill: "var(--color-other)" },
]
const chartConfig2 = {
  visitors: {
    label: "Severity",
  },
  chrome: {
    label: "Technical Expertise",
    color: "#37a228",
  },
  safari: {
    label: "Lack of Collaboration",
    color: "#ff0000",
  },
  firefox: {
    label: "Focus on Technical Detail",
    color: "#37a228",
  },
  edge: {
    label: "Limited Deployment and Scalability Awareness",
    color: "#ff0000",
  },
  other: {
    label: "Security Awareness",
    color: "#37a228",
  },
} satisfies ChartConfig

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
                <AvatarImage src="https://www.github.com/riyasachdeva04.png" alt='riya' />
                <AvatarFallback className="bg-gray-800 text-gray-200">RS</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-100">Riya Sachdeva</CardTitle>
                <CardDescription className="text-gray-400">Data Scientist</CardDescription>
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
            <CardTitle className="text-xl font-bold text-gray-100">My Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Collaboration", "Technical Skill", "Communication", "Problem Solving"].map((category) => (
                <div key={category} className="flex flex-col items-center">
                  <span className="font-semibold mb-2 text-gray-300">{category}</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                      <ThumbsUp className="h-4 w-4 text-green-400" />
                      <span className="ml-1 text-gray-300">5</span>
                    </Button>
                    <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                      <ThumbsDown className="h-4 w-4 text-red-400" />
                      <span className="ml-1 text-gray-300">1</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-100">Feedback Analysis</CardTitle>
            <CardDescription className="text-gray-400">What do your Co-Workers think about you?</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <ChartContainer
                config={chartConfig2}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData2}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="text-small fill-muted-foreground"
                              >
                                Sentimental
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="text-small fill-muted-foreground"
                              >
                                Analysis
                              </tspan>
                            </text>
                          )
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
            <div className="flex-1">
              {/* <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-100">Featured Reviews</CardTitle>
              </CardHeader> */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={review.avatar} alt={review.name} />
                      <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-100">{review.name}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-300">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}