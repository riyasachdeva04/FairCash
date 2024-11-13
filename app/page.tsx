import { Appbar } from "./components/Appbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Bookmark, Users, BarChart, Mail, Briefcase } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Redirect } from "./components/Redirect"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      <Appbar />
      <Redirect></Redirect>
      <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-blue-300">Empower Your Team with Peer Recognition</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-400">
            FairCash: The internal tool that allows employees to upvote, downvote, and bookmark their coworkers,
            fostering a culture of appreciation and continuous improvement.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-300">Featured Coworkers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Johnson",
                role: "Senior Software Engineer",
                email: "alex.j@company.com",
                upvotes: 42,
                downvotes: 3,
              },
              {
                name: "Samantha Lee",
                role: "Product Manager",
                email: "sam.lee@company.com",
                upvotes: 38,
                downvotes: 5,
              },
              {
                name: "Michael Chen",
                role: "UX Designer",
                email: "m.chen@company.com",
                upvotes: 35,
                downvotes: 2,
              },
            ].map((employee, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-100">{employee.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    width={100}
                    height={100}
                    alt={employee.name}
                    className="rounded-full mx-auto mb-4"
                  />
                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium flex items-center justify-center text-gray-300">
                      <Briefcase className="h-4 w-4 mr-2" />
                      {employee.role}
                    </p>
                    <p className="text-sm text-gray-400 flex items-center justify-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {employee.email}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                      <ThumbsUp className="h-5 w-5 text-green-400" />
                    </Button>
                    <span className="text-gray-300">{employee.upvotes}</span>
                    <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                      <ThumbsDown className="h-5 w-5 text-red-400" />
                    </Button>
                    <span className="text-gray-300">{employee.downvotes}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                    <Bookmark className="h-5 w-5 text-gray-400" />
                    <span className="sr-only">Bookmark</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-gray-950 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-300">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Upvote & Downvote",
                description: "Recognize your coworkers' achievements or provide constructive feedback.",
                icon: (
                  <div className="flex space-x-2">
                    <ThumbsUp className="h-8 w-8 text-green-400" />
                    <ThumbsDown className="h-8 w-8 text-red-400" />
                  </div>
                ),
              },
              {
                title: "Bookmarks",
                description: "Save and organize profiles of coworkers you frequently collaborate with.",
                icon: <Bookmark className="h-8 w-8 text-blue-400" />,
              },
              {
                title: "Performance Insights",
                description: "Gain valuable insights into team dynamics and individual contributions.",
                icon: <BarChart className="h-8 w-8 text-purple-400" />,
              },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-blue-300">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Create Profile", icon: <Users className="h-12 w-12 mx-auto mb-4 text-blue-400" /> },
              { step: 2, title: "Explore Coworkers", icon: <Briefcase className="h-12 w-12 mx-auto mb-4 text-green-400" /> },
              { step: 3, title: "Rate & Bookmark", icon: <ThumbsUp className="h-12 w-12 mx-auto mb-4 text-yellow-400" /> },
              { step: 4, title: "Gain Insights", icon: <BarChart className="h-12 w-12 mx-auto mb-4 text-purple-400" /> },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center bg-gray-800 p-6 rounded-lg">
                {item.icon}
                <h3 className="text-xl font-semibold mb-2 text-gray-100">Step {item.step}</h3>
                <p className="text-gray-400">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-gray-950 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-blue-300">Benefits for Your Organization</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Improved Collaboration",
                description: "Foster better teamwork by recognizing and appreciating coworkers' strengths.",
              },
              {
                title: "Data-Driven Decisions",
                description: "Use insights from employee interactions to inform HR and management decisions.",
              },
              {
                title: "Increased Engagement",
                description: "Boost employee morale and engagement through peer recognition and feedback.",
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-gray-100">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-300">Ready to Empower Your Team?</h2>
          <p className="mb-8 max-w-2xl mx-auto text-gray-400">
            Join innovative companies using FairCash to foster a culture of recognition and continuous
            improvement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Request a Demo</Button>
            <Button variant="outline" size="lg" className="bg-transparent border-blue-600 text-blue-400 hover:bg-blue-900">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-950 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                title: "Product",
                links: [
                  { name: "Features", href: "#" },
                  { name: "Pricing", href: "#" },
                  { name: "FAQ", href: "#" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About Us", href: "#" },
                  { name: "Careers", href: "#" },
                  { name: "Contact", href: "#" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { name: "Blog", href: "#" },
                  { name: "Case Studies", href: "#" },
                  { name: "Webinars", href: "#" },
                ],
              },
              {
                title: "Legal",
                links: [
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Service", href: "#" },
                  { name: "Security", href: "#" },
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4 text-gray-100">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} className="text-sm text-gray-400 hover:text-blue-400 hover:underline">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} FairCash. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}