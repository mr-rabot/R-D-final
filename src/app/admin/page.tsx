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
  ShieldCheck
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
          <div className="bg-accent p-8 md:p-10 text-center text-white relative">
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                 <div className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/20">
                  <ShieldCheck className="h-8 w-8 text-white" />
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
                  placeholder="prexani.tech@gmail.com" 
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
    { id: "control-center", icon: LayoutDashboard, label: "Control Center" },
    { id: "inquiries", icon: MessageSquare, label: "Client Inquiries", count: "12" },
    { id: "team", icon: UserPlus, label: "Team Management" },
    { id: "experts", icon: Users, label: "Expert Network" },
    { id: "settings", icon: Settings, label: "Platform Config" },
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
          {navItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${activeTab === item.id ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-white/5 text-blue-100/40 hover:text-white'}`}
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
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsContent value="control-center" className="mt-0 space-y-8">
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
            
            <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white p-8">
              <h3 className="text-xl font-bold text-accent mb-6">Recent Activity</h3>
              <p className="text-slate-500">System is operational. No critical errors detected in the last 24 hours.</p>
            </Card>
          </TabsContent>

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

          <TabsContent value="team">
            <div className="space-y-8">
              {/* Founder Section */}
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-none shadow-sm rounded-[32px] p-8 bg-white">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-headline font-bold">Manage Founder Profile</CardTitle>
                    <CardDescription>Update name, role, and profile picture for Om Prakash Sinha.</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pt-6">
                    <form onSubmit={(e) => { e.preventDefault(); handleProfileUpdate('founder'); }} className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-6">
                          <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-slate-50 bg-slate-100 flex items-center justify-center">
                            {founder.image ? (
                              <Image src={founder.image} alt="Founder" fill className="object-cover" />
                            ) : (
                              <UserCircle className="h-12 w-12 text-slate-300" />
                            )}
                          </div>
                          <div className="space-y-2">
                            <Button type="button" variant="outline" className="rounded-xl flex gap-2 border-slate-200">
                              <Upload className="h-4 w-4" /> Change Founder Photo
                            </Button>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">JPG, PNG. Max 5MB.</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Founder Name</label>
                          <Input 
                            value={founder.name} 
                            onChange={(e) => setFounder({...founder, name: e.target.value})}
                            className="rounded-2xl h-12 bg-slate-50 border-none" 
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Founder Role</label>
                          <Input 
                            value={founder.role}
                            onChange={(e) => setFounder({...founder, role: e.target.value})}
                            className="rounded-2xl h-12 bg-slate-50 border-none" 
                          />
                        </div>
                      </div>
                      <Button className="w-full h-12 bg-primary rounded-2xl font-bold shadow-xl shadow-primary/20">
                        Update Founder Details
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-[32px] p-8 bg-accent text-white relative overflow-hidden flex items-center justify-center">
                  <div className="relative z-10 text-center">
                    <div className="h-40 w-40 rounded-full overflow-hidden mb-6 border-4 border-white/10 mx-auto">
                      <Image src={founder.image} alt="Founder Preview" width={160} height={160} className="object-cover" />
                    </div>
                    <h4 className="text-2xl font-headline font-bold">{founder.name}</h4>
                    <p className="text-blue-200 text-sm font-medium">{founder.role}</p>
                    <Badge className="mt-4 bg-primary text-white border-none">Live on Site</Badge>
                  </div>
                  <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                </Card>
              </div>

              {/* Co-Founder Section */}
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-none shadow-sm rounded-[32px] p-8 bg-white">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-headline font-bold">Manage Co-Founder Profile</CardTitle>
                    <CardDescription>Update details for the Research Head.</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pt-6">
                    <form onSubmit={(e) => { e.preventDefault(); handleProfileUpdate('co-founder'); }} className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-6">
                          <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-slate-50 bg-slate-100 flex items-center justify-center">
                            {coFounder.image ? (
                              <Image src={coFounder.image} alt="Co-Founder" fill className="object-cover" />
                            ) : (
                              <UserCircle className="h-12 w-12 text-slate-300" />
                            )}
                          </div>
                          <div className="space-y-2">
                            <Button type="button" variant="outline" className="rounded-xl flex gap-2 border-slate-200">
                              <Upload className="h-4 w-4" /> Change Co-Founder Photo
                            </Button>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">JPG, PNG. Max 5MB.</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Co-Founder Name</label>
                          <Input 
                            value={coFounder.name} 
                            onChange={(e) => setCoFounder({...coFounder, name: e.target.value})}
                            className="rounded-2xl h-12 bg-slate-50 border-none" 
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Co-Founder Role</label>
                          <Input 
                            value={coFounder.role}
                            onChange={(e) => setCoFounder({...coFounder, role: e.target.value})}
                            className="rounded-2xl h-12 bg-slate-50 border-none" 
                          />
                        </div>
                      </div>
                      <Button className="w-full h-12 bg-primary rounded-2xl font-bold shadow-xl shadow-primary/20">
                        Update Co-Founder Details
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-[32px] p-8 bg-slate-900 text-white relative overflow-hidden flex items-center justify-center">
                  <div className="relative z-10 text-center">
                    <div className="h-40 w-40 rounded-full overflow-hidden mb-6 border-4 border-white/10 mx-auto">
                      <Image src={coFounder.image} alt="Co-Founder Preview" width={160} height={160} className="object-cover" />
                    </div>
                    <h4 className="text-2xl font-headline font-bold">{coFounder.name}</h4>
                    <p className="text-blue-200 text-sm font-medium">{coFounder.role}</p>
                    <Badge className="mt-4 bg-white/10 text-white border-none">Live on Site</Badge>
                  </div>
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experts">
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
