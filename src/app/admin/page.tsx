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
  Plus,
  GraduationCap
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
            <div className="flex justify-center mb-4">
               <div className="bg-primary p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-headline font-bold">R&D Portal</h2>
            <p className="text-blue-100 text-sm mt-2">Secure access for research staff</p>
          </div>
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@rd-research.com" 
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
      <aside className="w-72 bg-accent text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-md">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
               <h1 className="text-lg font-headline font-bold leading-none">R&D</h1>
               <span className="text-[8px] uppercase tracking-widest text-blue-200">research and development</span>
            </div>
          </div>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: FileText, label: "Resource Library" },
            { icon: MessageSquare, label: "Researcher Inquiries" },
            { icon: Users, label: "Academic Network" },
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
            <h2 className="text-3xl font-headline font-bold text-accent">Operations Center</h2>
            <p className="text-muted-foreground">Managing global research initiatives.</p>
          </div>
          <div className="flex gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search records..." className="pl-10 w-64 bg-white border-none shadow-sm rounded-xl" />
            </div>
            <Button className="bg-primary rounded-xl gap-2"><Plus className="h-4 w-4" /> New Initiative</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Pending Reviews", value: "142", trend: "+12%", color: "text-blue-600" },
            { label: "Active Grants", value: "28", trend: "+3", color: "text-green-600" },
            { label: "New Publications", value: "5", trend: "This week", color: "text-purple-600" },
            { label: "System Uptime", value: "99.9%", trend: "Optimal", color: "text-orange-600" }
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
            <TabsTrigger value="content" className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-4 px-0">Resource Management</TabsTrigger>
            <TabsTrigger value="stats" className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-4 px-0">Analytics Hub</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Principal Investigator</TableHead>
                    <TableHead>Field of Study</TableHead>
                    <TableHead>Submission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Alice Johnson", project: "Clinical Neuro", date: "Oct 24, 2024", status: "Pending" },
                    { name: "Robert Smith", project: "Quantum Logic", date: "Oct 23, 2024", status: "In Progress" },
                    { name: "Dr. K. Miller", project: "Bio-Genetics", date: "Oct 22, 2024", status: "Completed" },
                    { name: "Sarah Williams", project: "Social Dynamics", date: "Oct 22, 2024", status: "Pending" },
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
                        <Button variant="ghost" size="sm">Audit</Button>
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
                  <CardTitle>Core Methodology</CardTitle>
                  <CardDescription>Define standards for R&D processes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["Phase 1 Protocol", "Safety Standards", "Ethics Framework", "Data Handling"].map((page, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-muted/20 rounded-xl">
                      <span className="text-sm font-medium">{page}</span>
                      <Button size="sm" variant="outline" className="rounded-lg">Update</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle>Knowledge Hub</CardTitle>
                  <CardDescription>Internal research findings and guidance.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["Statistical Best Practices", "Grant Winning Strategies", "Peer-Review Ethics"].map((blog, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-muted/20 rounded-xl">
                      <span className="text-sm font-medium truncate max-w-[150px]">{blog}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="rounded-lg">Review</Button>
                        <Button size="sm" variant="destructive" className="rounded-lg">Archive</Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-accent rounded-xl">Publish New Finding</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
