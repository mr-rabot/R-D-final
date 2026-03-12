"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
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
  AlertCircle,
  Menu,
  X
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Specific credentials provided by user
    if (email === "prexani.tech@gmail.com" && password === "Admin@9343") {
      setIsLoggedIn(true);
      toast({
        title: "Authenticated Successfully",
        description: "Welcome back to the Operations Portal.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: "Invalid credentials. Please check your token and email.",
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
          <div className="bg-accent p-8 md:p-10 text-center text-white relative">
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                 <div className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/20">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-headline font-bold">Operations Portal</h2>
              <p className="text-blue-100/60 text-sm mt-2">Secure access for R&D staff only</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
          </div>
          <CardContent className="p-8 md:p-10">
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

  const navItems = [
    { icon: LayoutDashboard, label: "Control Center", active: true },
    { icon: MessageSquare, label: "Client Inquiries", count: "12" },
    { icon: Users, label: "Expert Network" },
    { icon: Bell, label: "System Alerts" },
    { icon: Settings, label: "Platform Config" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-accent text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg font-headline font-bold uppercase tracking-tight">R&D Ops</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white">
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-80 bg-accent text-white flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-white/5 hidden lg:block">
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
        <nav className="flex-grow p-6 space-y-3 overflow-y-auto">
          {navItems.map((item, i) => (
            <div 
              key={i} 
              onClick={() => setIsSidebarOpen(false)}
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
      <main className="flex-grow p-4 md:p-10 overflow-auto w-full">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-accent">Operations Hub</h2>
            <p className="text-slate-500 font-medium text-sm md:text-base">Monitoring global research initiatives and publishing workflows.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search records..." className="pl-12 w-full sm:w-80 bg-white border-none shadow-sm rounded-2xl h-12" />
            </div>
            <Button className="bg-primary rounded-2xl h-12 px-6 font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 gap-2 w-full sm:w-auto whitespace-nowrap">
              <Plus className="h-5 w-5" /> New Initiative
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
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
              <h3 className={`text-2xl md:text-3xl font-bold text-accent`}>{stat.value}</h3>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="inquiries" className="space-y-8">
          <TabsList className="bg-white border-none rounded-[24px] w-full md:w-auto justify-start h-auto md:h-14 p-2 gap-2 shadow-sm overflow-x-auto">
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-2xl px-6 md:px-8 h-10 md:h-full font-bold text-sm">Inquiries</TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-2xl px-6 md:px-8 h-10 md:h-full font-bold text-sm">Experts</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50 border-none">
                    <TableRow className="hover:bg-transparent border-none">
                      <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px] h-14 px-8 min-w-[150px]">Client</TableHead>
                      <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px] h-14 min-w-[180px]">Project</TableHead>
                      <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px] h-14 min-w-[120px]">Timeline</TableHead>
                      <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px] h-14 min-w-[100px]">Status</TableHead>
                      <TableHead className="text-right font-bold text-slate-400 uppercase tracking-widest text-[10px] h-14 px-8 min-w-[120px]">Actions</TableHead>
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
                          <Button variant="ghost" size="sm" className="font-bold text-primary hover:text-primary hover:bg-primary/5 rounded-xl">Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="network">
             <Card className="border-none shadow-sm rounded-[32px] p-6 md:p-8 bg-white">
                <CardHeader className="px-0 pt-0 pb-8">
                  <CardTitle className="text-2xl font-headline font-bold">Expert Roster</CardTitle>
                  <CardDescription className="text-slate-400 font-medium">Manage and assign PhD experts to active projects.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 space-y-4">
                  {["Dr. Sarah Chen (Life Sciences)", "Dr. Marcus Thorne (Engineering)", "Dr. Elena Rossi (Social Sciences)"].map((expert, i) => (
                    <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50 rounded-2xl gap-4">
                      <span className="text-sm font-bold text-slate-600">{expert}</span>
                      <Button size="sm" variant="ghost" className="rounded-xl font-bold text-xs text-primary w-full sm:w-auto">Assign Task</Button>
                    </div>
                  ))}
                  <Button className="w-full bg-accent hover:bg-slate-900 text-white rounded-2xl h-12 font-bold shadow-xl shadow-accent/20 mt-4">
                    Onboard New Expert
                  </Button>
                </CardContent>
              </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}