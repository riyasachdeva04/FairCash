"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Users, TrendingUp, DollarSign } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const departmentData = [
  { name: "Product Innovation Lab", maleAvg: 100000, femaleAvg: 92000 },
  { name: "AI & Machine Learning", maleAvg: 120000, femaleAvg: 108000 },
  { name: "Cloud Infrastructure", maleAvg: 110000, femaleAvg: 99000 },
  { name: "Data Science & Analytics", maleAvg: 105000, femaleAvg: 96600 },
  { name: "Cybersecurity & Privacy", maleAvg: 115000, femaleAvg: 103500 },
  { name: "UX & Design", maleAvg: 95000, femaleAvg: 89300 },
  { name: "Engineering & Development", maleAvg: 108000, femaleAvg: 97200 },
  { name: "Growth & Marketing Technology", maleAvg: 98000, femaleAvg: 90160 },
]

// Calculate the pay gap percentage
const calculatePayGap = (male: number, female: number) => {
  return ((male - female) / male * 100).toFixed(1)
}

// Calculate the overall pay gap
const overallPayGap = calculatePayGap(
  departmentData.reduce((sum, dept) => sum + dept.maleAvg, 0) / departmentData.length,
  departmentData.reduce((sum, dept) => sum + dept.femaleAvg, 0) / departmentData.length
)

export default function GenderPayGapDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-100">Gender Pay Gap Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Overall Pay Gap</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{overallPayGap}%</div>
              <p className="text-xs text-gray-500">Difference in average salaries</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Departments Analyzed</CardTitle>
              <Briefcase className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-100">{departmentData.length}</div>
              <p className="text-xs text-gray-500">Across the organization</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Employees Affected</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-100">1,234</div>
              <p className="text-xs text-gray-500">Total workforce analyzed</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Highest Gap</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {Math.max(...departmentData.map(dept => parseFloat(calculatePayGap(dept.maleAvg, dept.femaleAvg))))}%
              </div>
              <p className="text-xs text-gray-500">In a single department</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-900 border-gray-800 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-100">Pay Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chart">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="chart" className="data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100">Chart View</TabsTrigger>
                <TabsTrigger value="table" className="data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100">Table View</TabsTrigger>
              </TabsList>
              <TabsContent value="chart">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                    <XAxis dataKey="name" tick={{ fill: '#a0aec0' }} />
                    <YAxis tick={{ fill: '#a0aec0' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#2d3748', border: 'none' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend />
                    <Bar dataKey="maleAvg" name="Male Average" fill="#3182ce" />
                    <Bar dataKey="femaleAvg" name="Female Average" fill="#ed64a6" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="table">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs uppercase bg-gray-800 text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">Department</th>
                        <th scope="col" className="px-6 py-3">Male Avg</th>
                        <th scope="col" className="px-6 py-3">Female Avg</th>
                        <th scope="col" className="px-6 py-3">Pay Gap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentData.map((dept) => (
                        <tr key={dept.name} className="border-b bg-gray-800 border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-300">
                            {dept.name}
                          </th>
                          <td className="px-6 py-4">{dept.maleAvg.toLocaleString()}</td>
                          <td className="px-6 py-4">{dept.femaleAvg.toLocaleString()}</td>
                          <td className="px-6 py-4 text-red-500">
                            {calculatePayGap(dept.maleAvg, dept.femaleAvg)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-100">Department Pay Gap Progress</CardTitle>
            <CardDescription className="text-gray-400">Tracking improvements in reducing the pay gap</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentData.map((dept) => (
                <div key={dept.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">{dept.name}</span>
                    <span className="text-sm font-medium text-gray-300">
                      {calculatePayGap(dept.maleAvg, dept.femaleAvg)}%
                    </span>
                  </div>
                  <Progress 
                    value={100 - parseFloat(calculatePayGap(dept.maleAvg, dept.femaleAvg))} 
                    className="h-2 bg-gray-700"
                  >
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `{100 - parseFloat(calculatePayGap(dept.maleAvg, dept.femaleAvg))}%` }} 
                    />
                  </Progress>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}