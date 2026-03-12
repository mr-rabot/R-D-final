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
  Search,
  GraduationCap,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  UserPlus,
  Upload,
  UserCircle,
  ShieldCheck,
  Zap,
  Briefcase
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("control-center");
  const { toast } = useToast();

  // Founder state simulation
  const [founder, setFounder] = useState({
    name: "Om Prakash Sinha",
    role: "Founder & Director",
    image: "https://picsum.photos/seed/opsinha-face/600/600"
  });

  // Co-founder state simulation
  const [coFounder, setCoFounder] = useState({
    name: "Dr. Anjali Sinha",
    role: "Co-Founder & Research Head",
    image: "https://picsum.photos/seed/cofounder/400/400"
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleProfileUpdate = (type: 'founder' | 'co-founder') => {
    toast({
      title: `${type === 'founder' ? 'Founder' : 'Co-Founder'} Profile Updated`,
      description: "Changes have been saved to the live platform.",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-[0_50px_100px_rgba(0,0,0,0.5)] rounded-[40px] overflow-hidden bg-white animate-in zoom-in duration-500">
          <div className="bg-primary p-12 text-center text-white relative">
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                 <div className="bg-white/20 backdrop-blur-md p-4 rounded-3xl shadow-2xl">
                  <ShieldCheck className="h-10 w-10 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">Operations Hub</h2>
              <p className="text-blue-100/60 text-xs mt-3 font-bold uppercase tracking-[0.2em]">Secure Staff Access</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
          </div>
          <CardContent className="p-10 md:p-12">
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Identity (Email)</label>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="prexani.tech@gmail.com" 
                  className="rounded-2xl h-14 bg-slate-50 border-none px-6 focus-visible:ring-primary shadow-inner" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Operations Token</label>
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="rounded-2xl h-14 bg-slate-50 border-none px-6 focus-visible:ring-primary shadow-inner" 
                />
              </div>
              <Button type="submit" className="w-full bg-primary h-16 rounded-2xl text-lg font-bold hover:bg-blue-600 shadow-xl transition-all active:scale-95">
                Authenticate
              </Button>
              <div className="text-center">
                <Link href="/" className="text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-[0.2em] transition-colors">Return to Public Portal</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const navItems = [
    { id: "control-center", icon: LayoutDashboard, label: "Command Center" },
    { id: "inquiries", icon: MessageSquare, label: "Active Requests", count: "12" },
    { id: "team", icon: UserPlus, label: "Team & Leadership" },
    { id: "experts", icon: Users, label: "PhD Experts" },
    { id: "settings", icon: Settings, label: "System Config" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-slate-900 text-white p-5 flex justify-between items-center sticky top-0 z-50 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg font-headline font-bold tracking-tight">R&D OPS</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white bg-white/10 rounded-xl">
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-80 bg-slate-900 text-white flex flex-col transition-transform duration-500 ease-in-out lg:relative lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-10 border-b border-white/5 hidden lg:block">
          <div className="flex items-center gap-4">
            <div className="bg-primary p-3 rounded-2xl shadow-2xl shadow-primary/40">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
               <h1 className="text-xl font-headline font-bold leading-none tracking-tight">OPERATIONS</h1>
               <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400 font-bold mt-2 block">Management Hub</span>
            </div>
          </div>
        </div>
        <nav className="flex-grow p-8 space-y-4 overflow-y-auto">
          {navItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={cn(
                "flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all duration-300",
                activeTab === item.id 
                  ? "bg-primary text-white shadow-2xl shadow-primary/30 translate-x-2" 
                  : "hover:bg-white/5 text-slate-400 hover:text-white"
              )}
            >
              <div className="flex items-center gap-5">
                <item.icon className="h-5 w-5" />
                <span className="font-bold text-sm tracking-wide uppercase">{item.label}</span>
              </div>
              {item.count && (
                <span className="bg-primary-foreground/20 text-[10px] font-bold px-3 py-1 rounded-lg">
                  {item.count}
                </span>
              )}
            </div>
          ))}
        </nav>
        <div className="p-8 border-t border-white/5">
          <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-white hover:bg-red-500/10 rounded-2xl h-14" onClick={() => setIsLoggedIn(false)}>
            <LogOut className="h-5 w-5 mr-4" /> Sign Out Hub
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 overflow-auto w-full animate-in fade-in duration-700">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-slate-900">Command Center</h2>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">Monitoring Global Initiatives & Maintenance</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <Button className="flex-1 md:flex-none bg-primary hover:bg-blue-600 rounded-2xl h-14 font-bold px-8 shadow-xl shadow-primary/20">
               Generate Report
             </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">
          <TabsContent value="control-center" className="mt-0 space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                { label: "Active Pipelines", value: "48", trend: "+12%", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-100/50" },
                { label: "Pending Review", value: "14", trend: "High Priority", icon: Clock, color: "text-orange-600", bg: "bg-orange-100/50" },
                { label: "Completed Works", value: "522", trend: "Lifetime", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100/50" },
                { label: "Alerts", value: "2", trend: "Action Needed", icon: AlertCircle, color: "text-red-600", bg: "bg-red-100/50" }
              ].map((stat, i) => (
                <Card key={i} className="border-none shadow-[0_20px_40px_rgba(0,0,0,0.02)] rounded-[40px] p-8 bg-white hover:shadow-2xl hover:-translate-y-1 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn("p-4 rounded-2xl shadow-sm", stat.bg, stat.color)}>
                      <stat.icon className="h-7 w-7" />
                    </div>
                    <Badge variant="outline" className="border-slate-100 text-[9px] font-bold text-slate-400 rounded-lg uppercase tracking-widest">{stat.trend}</Badge>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                  <h3 className="text-4xl font-headline font-bold text-slate-900">{stat.value}</h3>
                </Card>
              ))}
            </div>
            
            <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[48px] overflow-hidden bg-white p-10 md:p-12 relative">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-4 text-center md:text-left">
                   <h3 className="text-3xl font-headline font-bold text-slate-900">System Status</h3>
                   <p className="text-slate-500 leading-relaxed max-w-lg">All systems are nominal. Research processing pipelines are operating at 100% capacity. No critical latency detected in publishing workflows.</p>
                   <div className="flex gap-3 justify-center md:justify-start">
                     <Badge className="bg-emerald-500 text-white border-none px-4 py-1.5 rounded-full uppercase text-[9px] tracking-widest font-bold">Online</Badge>
                     <Badge className="bg-blue-500 text-white border-none px-4 py-1.5 rounded-full uppercase text-[9px] tracking-widest font-bold">Stable</Badge>
                   </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="h-24 w-24 rounded-full border-[12px] border-emerald-50 border-t-emerald-500 animate-spin" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Sync Active</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full" />
            </Card>
          </TabsContent>

          <TabsContent value="inquiries">
            <Card className="border-none shadow-2xl rounded-[48px] overflow-hidden bg-white">
              <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div>
                   <h3 className="text-2xl font-headline font-bold">Client Inquiries</h3>
                   <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Global Project Request Stream</p>
                 </div>
                 <div className="relative w-full md:w-72">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                   <Input placeholder="Search requests..." className="pl-12 rounded-2xl h-12 bg-slate-50 border-none" />
                 </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/50 border-none">
                    <TableRow className="hover:bg-transparent border-none">
                      <TableHead className="font-bold text-slate-400 uppercase tracking-[0.2em] text-[9px] h-16 px-10">Client Identity</TableHead>
                      <TableHead className="font-bold text-slate-400 uppercase tracking-[0.2em] text-[9px] h-16">Active Project</TableHead>
                      <TableHead className="font-bold text-slate-400 uppercase tracking-[0.2em] text-[9px] h-16">Timeline</TableHead>
                      <TableHead className="font-bold text-slate-400 uppercase tracking-[0.2em] text-[9px] h-16">Status</TableHead>
                      <TableHead className="text-right font-bold text-slate-400 uppercase tracking-[0.2em] text-[9px] h-16 px-10">Operations</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Arjun Mehta", project: "Clinical Neuro-Study", date: "Oct 24, 2024", status: "New", color: "bg-blue-500" },
                      { name: "Dr. Sunita Rao", project: "Quantum Algorithms", date: "Oct 23, 2024", status: "Review", color: "bg-orange-500" },
                      { name: "Li Wei", project: "Bio-Synthetic Ethics", date: "Oct 22, 2024", status: "Completed", color: "bg-emerald-500" },
                      { name: "Sarah Williams", project: "Socio-Data Pipeline", date: "Oct 22, 2024", status: "New", color: "bg-blue-500" },
                    ].map((row, i) => (
                      <TableRow key={i} className="border-slate-50 group hover:bg-slate-50/50 transition-all">
                        <TableCell className="font-bold text-slate-900 py-8 px-10">
                           <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse" />
                             {row.name}
                           </div>
                        </TableCell>
                        <TableCell className="text-slate-500 font-medium">{row.project}</TableCell>
                        <TableCell className="text-slate-400 font-bold text-xs uppercase">{row.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className={cn("h-2 w-2 rounded-full", row.color)} />
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{row.status}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right px-10">
                          <Button variant="ghost" className="font-bold text-primary hover:bg-primary/10 rounded-xl px-6">Manage</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <div className="space-y-12">
              <div className="grid lg:grid-cols-2 gap-10">
                <Card className="border-none shadow-xl rounded-[48px] p-10 md:p-12 bg-white flex flex-col justify-between">
                  <div className="space-y-8">
                    <CardHeader className="px-0 pt-0">
                      <div className="bg-primary/10 p-4 rounded-2xl w-fit mb-6">
                        <UserCircle className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-3xl font-headline font-bold">Founder Profile</CardTitle>
                      <CardDescription className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Maintenance Portal for Om Prakash Sinha</CardDescription>
                    </CardHeader>
                    <div className="space-y-8">
                      <div className="flex items-center gap-8">
                        <div className="relative h-28 w-28 rounded-[32px] overflow-hidden border-4 border-slate-50 shadow-2xl">
                          <Image src={founder.image} alt="Founder" fill className="object-cover" />
                        </div>
                        <div className="space-y-3">
                          <Button variant="outline" className="rounded-2xl h-12 border-slate-200 font-bold px-6 flex gap-3 active:scale-95 transition-all">
                            <Upload className="h-4 w-4" /> Replace Image
                          </Button>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Target: Face Centered (1:1)</p>
                        </div>
                      </div>

                      <div className="grid gap-6">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Public Name</label>
                          <Input 
                            value={founder.name} 
                            onChange={(e) => setFounder({...founder, name: e.target.value})}
                            className="rounded-2xl h-14 bg-slate-50 border-none px-6 font-bold" 
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Designation</label>
                          <Input 
                            value={founder.role}
                            onChange={(e) => setFounder({...founder, role: e.target.value})}
                            className="rounded-2xl h-14 bg-slate-50 border-none px-6 font-bold" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => handleProfileUpdate('founder')} className="w-full h-16 bg-primary rounded-3xl font-bold shadow-2xl shadow-primary/30 mt-12 transition-all active:scale-95">
                    Sync Founder Profile
                  </Button>
                </Card>

                <Card className="border-none shadow-xl rounded-[48px] p-10 md:p-12 bg-white flex flex-col justify-between">
                  <div className="space-y-8">
                    <CardHeader className="px-0 pt-0">
                      <div className="bg-primary/10 p-4 rounded-2xl w-fit mb-6">
                        <Briefcase className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-3xl font-headline font-bold">Co-Founder Profile</CardTitle>
                      <CardDescription className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Maintenance Portal for Research Head</CardDescription>
                    </CardHeader>
                    <div className="space-y-8">
                      <div className="flex items-center gap-8">
                        <div className="relative h-28 w-28 rounded-[32px] overflow-hidden border-4 border-slate-50 shadow-2xl">
                          <Image src={coFounder.image} alt="Co-Founder" fill className="object-cover" />
                        </div>
                        <div className="space-y-3">
                          <Button variant="outline" className="rounded-2xl h-12 border-slate-200 font-bold px-6 flex gap-3 active:scale-95 transition-all">
                            <Upload className="h-4 w-4" /> Replace Image
                          </Button>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Target: Face Centered (1:1)</p>
                        </div>
                      </div>

                      <div className="grid gap-6">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Public Name</label>
                          <Input 
                            value={coFounder.name} 
                            onChange={(e) => setCoFounder({...coFounder, name: e.target.value})}
                            className="rounded-2xl h-14 bg-slate-50 border-none px-6 font-bold" 
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Designation</label>
                          <Input 
                            value={coFounder.role}
                            onChange={(e) => setCoFounder({...coFounder, role: e.target.value})}
                            className="rounded-2xl h-14 bg-slate-50 border-none px-6 font-bold" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => handleProfileUpdate('co-founder')} className="w-full h-16 bg-slate-900 rounded-3xl font-bold shadow-2xl shadow-slate-900/30 mt-12 transition-all active:scale-95 text-white">
                    Sync Co-Founder Profile
                  </Button>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experts">
             <Card className="border-none shadow-2xl rounded-[48px] p-12 bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                   <div>
                     <h3 className="text-3xl font-headline font-bold">Expert Roster</h3>
                     <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Elite PhD Network Management</p>
                   </div>
                   <Button className="w-full md:w-auto bg-slate-900 hover:bg-black rounded-2xl h-14 font-bold px-10 shadow-xl shadow-slate-900/20">
                     Onboard Expert
                   </Button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { name: "Dr. Sarah Chen", domain: "Life Sciences", status: "Active" },
                    { name: "Dr. Marcus Thorne", domain: "Engineering", status: "In Project" },
                    { name: "Dr. Elena Rossi", domain: "Social Sciences", status: "Available" }
                  ].map((expert, i) => (
                    <div key={i} className="p-8 bg-slate-50 rounded-[32px] hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-slate-100 group">
                      <div className="h-16 w-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                        <Users className="h-7 w-7" />
                      </div>
                      <h4 className="font-bold text-xl text-slate-900 mb-1">{expert.name}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">{expert.domain}</p>
                      <div className="flex justify-between items-center">
                        <Badge className="bg-white text-slate-600 border-none shadow-sm px-4 py-1.5 rounded-full text-[9px] font-bold uppercase">{expert.status}</Badge>
                        <Button variant="ghost" size="sm" className="font-bold text-primary hover:bg-transparent p-0">Configure</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
