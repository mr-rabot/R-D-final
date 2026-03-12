
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Users, 
  Bell,
  Search,
  Plus
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-3xl overflow-hidden">
          <div className="bg-accent p-8 text-center text-white">
            <h2 className="text-3xl font-headline font-bold">Admin Portal</h2>
            <p className="text-blue-100 text-sm mt-2">Secure access for AcadeFlow staff</p>
          </div>
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@acadeflow.com" 
                  className="rounded-xl h-12" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="rounded-xl h-12" 
                />
              </div>
              <Button type="submit" className="w-full bg-accent h-12 rounded-xl text-lg">
                Log In
              </Button>
              <div className="text-center">
                <Link href="/" className="text-sm text-primary hover:underline">Back to Homepage</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-accent text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-headline font-bold">AcadeFlow Admin</h1>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: FileText, label: "Content CMS" },
            { icon: MessageSquare, label: "Inquiries" },
            { icon: Users, label: "Researchers" },
            { icon: Bell, label: "Notifications" },
            { icon: Settings, label: "System Settings" },
          ].map((item, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${item.active ? 'bg-primary text-white' : 'hover:bg-white/5 text-blue-100/60'}`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Button variant="ghost" className="w-full justify-start text-blue-100 hover:text-white hover:bg-white/5" onClick={() => setIsLoggedIn(false)}>
            <LogOut className="h-5 w-5 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-headline font-bold text-accent">Dashboard Overview</h2>
            <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
          </div>
          <div className="flex gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search inquiries..." className="pl-10 w-64 bg-white border-none shadow-sm rounded-xl" />
            </div>
            <Button className="bg-primary rounded-xl gap-2"><Plus className="h-4 w-4" /> New Content</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Inquiries", value: "142", trend: "+12%", color: "text-blue-600" },
            { label: "Active Projects", value: "28", trend: "+3", color: "text-green-600" },
            { label: "New Blog Posts", value: "5", trend: "This week", color: "text-purple-600" },
            { label: "Client Rating", value: "4.9/5", trend: "0.1", color: "text-orange-600" }
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm rounded-2xl">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
                <div className="flex items-baseline justify-between">
                  <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="inquiries" className="space-y-6">
          <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-8">
            <TabsTrigger value="inquiries" className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-4 px-0">Recent Inquiries</TabsTrigger>
            <TabsTrigger value="content" className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-4 px-0">Manage Content</TabsTrigger>
            <TabsTrigger value="stats" className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-4 px-0">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Project Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Alice Johnson", project: "Clinical Analysis", date: "Oct 24, 2024", status: "Pending" },
                    { name: "Robert Smith", project: "Thesis Formatting", date: "Oct 23, 2024", status: "In Progress" },
                    { name: "Dr. K. Miller", project: "Grant Proposal", date: "Oct 22, 2024", status: "Completed" },
                    { name: "Sarah Williams", project: "Literature Review", date: "Oct 22, 2024", status: "Pending" },
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.project}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
                        <Badge variant={row.status === "Pending" ? "outline" : row.status === "Completed" ? "default" : "secondary"}>
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle>Static Pages</CardTitle>
                  <CardDescription>Edit homepage sections and service descriptions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["Homepage Hero", "Services Catalog", "Pricing Tiers", "FAQ Section"].map((page, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-muted/20 rounded-xl">
                      <span className="text-sm font-medium">{page}</span>
                      <Button size="sm" variant="outline" className="rounded-lg">Edit</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle>Academic Blog</CardTitle>
                  <CardDescription>Manage articles and publication guides.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["10 Tips for PhD Success", "Understanding LaTeX", "Citation Best Practices"].map((blog, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-muted/20 rounded-xl">
                      <span className="text-sm font-medium truncate max-w-[150px]">{blog}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="rounded-lg">Edit</Button>
                        <Button size="sm" variant="destructive" className="rounded-lg">Delete</Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-accent rounded-xl">Write New Post</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
