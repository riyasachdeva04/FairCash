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
import GitHubCalendar from 'react-github-calendar';
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"
import {
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { language: "JS", Progress: 90, fill: "var(--color-chrome)" },
  { language: "Python", Progress: 80, fill: "var(--color-safari)" },
  { language: "Cpp", Progress: 90, fill: "var(--color-firefox)" },
  { language: "Java", Progress: 80, fill: "var(--color-edge)" },
  { language: "Go", Progress: 89, fill: "var(--color-other)" },
]
const chartConfig = {
    Progress: {
    label: "Progress",
  },
  JS: {
    label: "JS",
    color: "hsl(var(--chart-1))",
  },
  Python: {
    label: "Python",
    color: "hsl(var(--chart-2))",
  },
  Cpp: {
    label: "C++",
    color: "hsl(var(--chart-3))",
  },
  Java: {
    label: "Java",
    color: "hsl(var(--chart-4))",
  },
  Go: {
    label: "Go",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

const employeeData = {
  experience: "8 years",
  almaMater: "MIT",
  recommendations: 15,
  performanceScore: 92,
}
const explicitTheme: ThemeInput = {
  light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
  dark: ['#f0f0f0', '#4D455D', '#7DB9B6', '#F5E9CF', '#E96479'],
};



export default function EmployeeProfile() {
  const [map1, setMap1] = useState(new Map());
  const [map2, setMap2] = useState(new Map());
  const [feedback, setFeedback] = useState("")
  const [employee, setEmployee] = useState(null);
  
  useEffect(() => {
    const empData = JSON.parse(localStorage.getItem('employee'));
    setEmployee(empData);
  }, []); 

  if (!employee) return <p>Loading...</p>;
  return (
    <div className="container mx-auto p-6">
      {/* <div className="flex flex-col md:flex-row gap-6"> */}
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
                <TabsTrigger value="salary">Code Consistency</TabsTrigger>
                <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
              </TabsList>
              <TabsContent value="salary">
                <Card className="flex-1 p-5" >
                  <GitHubCalendar username="riyasachdeva04" theme={explicitTheme}/>
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
                <Card style={{'height': '40vh'}}>
                    {/* <CardHeader> */}
                        {/* <CardTitle>Bar Chart - Active</CardTitle>
                        <CardDescription>January - June 2024</CardDescription> */}
                    {/* </CardHeader> */}
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={chartData} style={{'height': '40vh'}}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="language"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
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
      {/* </div> */}
      {/* <Card className="flex-1 p-5">
        <GitHubCalendar username="riyasachdeva04" theme={explicitTheme}/>
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
      </Card> */}

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
                <Button variant="outline" size="icon" onClick={() => {
                  const newMap = new Map(map1); 
                  newMap.set(category, !map1.get(category));  
                  setMap1(newMap);
                }}>
                  <ThumbsUp className={`h-4 w-4 ${map1.get(category) ? "fill-current" : ""}`}/>
                  {map1.get(category) ? true : false}
                </Button>
                <Button variant="outline" size="icon" onClick={() => {
                  const newMap = new Map(map2); 
                  newMap.set(category, !map2.get(category));  
                  setMap2(newMap);
                }}>
                  <ThumbsDown className={`h-4 w-4 ${map2.get(category) ? "fill-current" : ""}`}/>
                  {map2.get(category) ? true : false}
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
          <Button onClick={() => {
            for(const category of ["Collaboration", "Technical Skill", "Communication", "Problem Solving"]){
              const maptemp = new Map();
              setMap1(maptemp);
              setMap2(maptemp);
              setFeedback("");
              
            }
          }} >Submit Feedback</Button>
        </CardContent>
      </Card>
    </div>
  )
}