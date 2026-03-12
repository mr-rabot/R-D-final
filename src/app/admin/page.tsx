
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
  GraduationCap,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
          <div className="bg-accent p-10 text-center text-white relative">
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                 <div className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/20">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-headline font-bold">Operations Portal</h2>
              <p className="text-blue-100/60 text-sm mt-2">Secure access for R&D staff only</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
          </div>
          <CardContent className="p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rd-services.com" 
                  className="rounded-2xl h-14 bg-slate-50 border-none px-6 focus-visible:ring-primary" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Secure Token</label>
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="rounded-2xl h-14 bg-slate-50 border-none px-6 focus-visible:ring-primary" 
                />
              </div>
              <Button type="submit" className="w-full bg-accent h-14 rounded-2xl text-lg font-bold hover:bg-slate-900 shadow-xl transition-all">
                Authenticate
              </Button>
              <div className="text-center">
                <Link href="/" className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">Back to Homepage</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-accent text-white flex flex-col hidden lg:flex border-r border-white/5">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/20">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
               <h1 className="text-xl font-headline font-bold leading-none tracking-tight">OPERATIONS</h1>
               <span className="text-[9px] uppercase tracking-[0.2em] text-blue-200 font-bold mt-1 block">R & D SERVICES</span>
            </div>
          </div>
        </div>
        <nav className="flex-grow p-6 space-y-3">
          {[
            { icon: LayoutDashboard, label: "Control Center", active: true },
            { icon: MessageSquare, label: "Client Inquiries", count: "12" },
            { icon: FileText, label: "Manuscript Library" },
            { icon: Users, label: "Expert Network" },
            { icon: Bell, label: "System Alerts" },
            { icon: Settings, label: "Platform Config" },
          ].map((item, i) => (
            <div 
              key={i} 
              className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${item.active ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-white/5 text-blue-100/40 hover:text-white'}`}
            >
              <div className="flex items-center gap-4">
                <item.icon className="h-5 w-5" />
                <span className="font-bold text-sm tracking-wide">{item.label}</span>
              </div>
              {item.count && (
                <span className="bg-primary-foreground/20 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {item.count}
                </span>
              )}
            </div>
          ))}
        </nav>
        <div className="p-6 border-t border-white/5">
          <Button variant="ghost" className="w-full justify-start text-blue-100/60 hover:text-white hover:bg-white/5 rounded-2xl h-12" onClick={() => setIsLoggedIn(false)}>
            <LogOut className="h-5 w-5 mr-3" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-headline font-bold text-accent">Operations Hub</h2>
            <p className="text-slate-500 font-medium">Monitoring global research initiatives and publishing workflows.</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search manuscripts..." className="pl-12 w-full md:w-80 bg-white border-none shadow-sm rounded-2xl h-12" />
            </div>
            <Button className="bg-primary rounded-2xl h-12 px-6 font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 gap-2 whitespace-nowrap">
              <Plus className="h-5 w-5" /> New Initiative
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: "Active Pipelines", value: "48", trend: "+12%", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Pending Review", value: "14", trend: "High Priority", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Completed Works", value: "522", trend: "Overall", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
            { label: "Alerts", value: "2", trend: "Action Required", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" }
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm rounded-[32px] p-6 bg-white hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <Badge variant="outline" className="border-slate-100 text-[10px] font-bold text-slate-400 rounded-lg">{stat.trend}</Badge>
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className={`text-3xl font-bold text-accent`}>{stat.value}</h3>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="inquiries" className="space-y-8">
          <TabsList className="bg-white border-none rounded-[24px] w-full md:w-auto justify-start h-14 p-2 gap-2 shadow-sm">
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-2xl px-8 h-full font-bold text-sm">Recent Inquiries</TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-2xl px-8 h-full font-bold text-sm">Asset Management</TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-2xl px-8 h-full font-bold text-sm">Expert Network</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
              <Table>
                <TableHeader className="bg-slate-50 border-none">
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px] h-14 px-8">Client / Investigator</TableHead>
                    <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px] h-14">Field / Project</TableHead>
                    <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px] h-14">Timeline</TableHead>
                    <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px] h-14">Status</TableHead>
                    <TableHead className="text-right font-bold text-slate-400 uppercase tracking-widest text-[10px] h-14 px-8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Arjun Mehta", project: "Clinical Neuro-Study", date: "Oct 24, 2024", status: "New", color: "bg-blue-500" },
                    { name: "Dr. Sunita Rao", project: "Quantum Algorithms", date: "Oct 23, 2024", status: "Review", color: "bg-orange-500" },
                    { name: "Li Wei", project: "Bio-Synthetic Ethics", date: "Oct 22, 2024", status: "Completed", color: "bg-green-500" },
                    { name: "Sarah Williams", project: "Socio-Economic Data", date: "Oct 22, 2024", status: "New", color: "bg-blue-500" },
                  ].map((row, i) => (
                    <TableRow key={i} className="border-slate-50 px-8">
                      <TableCell className="font-bold text-accent py-6 px-8">{row.name}</TableCell>
                      <TableCell className="text-slate-500">{row.project}</TableCell>
                      <TableCell className="text-slate-500">{row.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`h-1.5 w-1.5 rounded-full ${row.color}`} />
                          <span className="text-xs font-bold text-slate-600">{row.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <Button variant="ghost" size="sm" className="font-bold text-primary hover:text-primary hover:bg-primary/5 rounded-xl">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm rounded-[32px] p-8 bg-white">
                <CardHeader className="px-0 pt-0 pb-8">
                  <CardTitle className="text-2xl font-headline font-bold">Protocol Standards</CardTitle>
                  <CardDescription className="text-slate-400 font-medium">Internal R&D guidelines and safety standards.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 space-y-4">
                  {["Phase 1 Verification", "Ethics Submission", "Data Integrity Guide", "Peer-Review Checklist"].map((page, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl group cursor-pointer hover:bg-slate-100 transition-all">
                      <span className="text-sm font-bold text-slate-600 group-hover:text-accent">{page}</span>
                      <Button size="sm" variant="ghost" className="rounded-xl font-bold text-xs text-primary">Edit</Button>
                    </div>
                  ))}
                  <Button className="w-full bg-slate-100 hover:bg-slate-200 text-accent rounded-2xl h-12 font-bold border-none mt-4 shadow-none">
                    View Master Repository
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-[32px] p-8 bg-white">
                <CardHeader className="px-0 pt-0 pb-8">
                  <CardTitle className="text-2xl font-headline font-bold">Manuscript Hub</CardTitle>
                  <CardDescription className="text-slate-400 font-medium">Manage research papers and thesis archives.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 space-y-4">
                  {["Deep Learning Trends", "Nanotech Bio-Safety", "Sustainable Agronomy"].map((blog, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                      <span className="text-sm font-bold text-slate-600 truncate max-w-[200px]">{blog}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="rounded-xl font-bold text-xs text-primary">Audit</Button>
                        <Button size="sm" variant="ghost" className="rounded-xl font-bold text-xs text-red-500 hover:text-red-600 hover:bg-red-50">Archive</Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-accent hover:bg-slate-900 text-white rounded-2xl h-12 font-bold shadow-xl shadow-accent/20 mt-4">
                    Create New Resource
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
