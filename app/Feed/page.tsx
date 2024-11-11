"use client"; // Mark this file as a Client Component

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Bookmark, Briefcase, Mail, Github } from "lucide-react";
import Link from "next/link";
import Papa from "papaparse";
import { Appbar } from "../components/Appbar";
import { Navbar } from "../components/Navbar";
export default function Feed() {
  <Appbar></Appbar>
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("/employees.csv");
      const csvText = await response.text();
      const parsedData = Papa.parse(csvText, { header: true }).data;

      const processedData = parsedData.map((employee) => ({
        ...employee,
        upvotes: !isNaN(Number(employee.Upvotes)) ? Number(employee.Upvotes) : 0,
        downvotes: !isNaN(Number(employee.Downvotes)) ? Number(employee.Downvotes) : 0,
        isBookmarked: false,
        isUpvoted: false,
        isDownvoted: false
      }));

      setEmployees(processedData);
    };

    loadData();
  }, []);

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
    );
  };
  

  const handleBookmark = (index) => {
    setEmployees((prev) =>
      prev.map((emp, i) =>
        i === index ? { ...emp, isBookmarked: !emp.isBookmarked } : emp
      )
    );
  };

  return (
    <div className="flex-container mx-auto p-4">
    {/* <div className="d-flex justify-between items-center w-full">
      <h1 className="text-3xl font-bold mb-6">Employee Feed</h1>
      <div className="my-3">
        <Link href={{ pathname: `/profile` }} passHref>
          <Button>Your Profile</Button>
        </Link>
      </div>
    </div> */}
    <Navbar></Navbar>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={`https://www.github.com/${employee.Name.split(' ')[0]}${employee.Name.split(' ')[1]}.png`} alt={employee.Name} />
                  <AvatarFallback>
                    {employee.Name.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{employee.Name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{employee.Role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span className="text-sm">{employee.Department}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{employee.Email}</span>
                </div>
                <div className="flex items-center">
                  <Github className="w-4 h-4 mr-2" />
                  <button className="text-sm" onClick={() => {window.location.href = `https://www.github.com/${employee.Name.split(' ')[0]}${employee.Name.split(' ')[1]}`}}>Github</button>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(index, "upvote")}
                  >
                    <ThumbsUp className={`w-4 h-4 ${employee.isUpvoted ? "fill-current" : ""}`} />
                    <span>{employee.upvotes}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(index, "downvote")}
                  >
                    <ThumbsDown className={`w-4 h-4 ${employee.isDownvoted ? "fill-current" : ""}`} />
                    <span>{employee.downvotes}</span>
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBookmark(index)}
                >
                  <Bookmark
                    className={`w-4 h-4 ${employee.isBookmarked ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
              <div className="flex my-3">
                <Link href={{ pathname: `/profile` }} passHref>
                  <Button onClick={() => {localStorage.setItem('employee', JSON.stringify(employee))}}>View Profile</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
