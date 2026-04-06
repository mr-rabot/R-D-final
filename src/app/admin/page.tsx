"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { 
  LogOut, 
  ShieldCheck, 
  Zap, 
  Plus, 
  Trash2, 
  Upload, 
  UserCircle,
  Save,
  Rocket,
  Menu,
  X,
  Settings,
  Loader2,
  Image as ImageIcon,
  GalleryVertical,
  Users,
  MessageSquare,
  DollarSign,
  HelpCircle,
  Newspaper,
  Star,
  Layout,
  ExternalLink,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Cropper from "react-easy-crop";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";

const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<string> => {
  const image = new window.Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const targetWidth = pixelCrop.width;
  const targetHeight = pixelCrop.height;
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetWidth,
    targetHeight
  );

  return canvas.toDataURL("image/png");
};

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("media");
  const { toast } = useToast();
  const [localSiteData, setLocalSiteData] = useState<any>(null);

  // Modal states
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [currentEditingPath, setCurrentEditingPath] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{path: string, index: number} | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const session = localStorage.getItem("rd_admin_session");
    if (session === "active") {
      setIsLoggedIn(true);
    }
    
    fetch('/api/leadership')
      .then(res => res.json())
      .then(data => {
        setLocalSiteData(data);
        setIsLoadingData(false);
      })
      .catch(err => {
        console.error("Init load error:", err);
        setIsLoadingData(false);
      });
  }, []);

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result as string);
        setCurrentEditingPath(path);
        setIsCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => {
      if (!acc) return undefined;
      const index = parseInt(part);
      return !isNaN(index) ? acc[index] : acc[part];
    }, obj);
  };

  const saveCroppedImage = async () => {
    if (imageToCrop && croppedAreaPixels && currentEditingPath && localSiteData) {
      setIsUploading(true);
      try {
        const oldUrl = getNestedValue(localSiteData, currentEditingPath);
        const croppedBase64 = await getCroppedImg(imageToCrop, croppedAreaPixels);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: croppedBase64,
            name: currentEditingPath.replace(/\./g, '_'),
            oldUrl: oldUrl
          })
        });

        const result = await response.json();
        if (result.url) {
          const newData = JSON.parse(JSON.stringify(localSiteData));
          const parts = currentEditingPath.split('.');
          let current = newData;
          for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            const index = parseInt(part);
            if (!isNaN(index)) {
               current = current[index];
            } else {
               if (!current[part]) current[part] = {};
               current = current[part];
            }
          }
          current[parts[parts.length - 1]] = result.url;

          setLocalSiteData(newData);
          setIsCropperOpen(false);
          setImageToCrop(null);
          toast({ title: "Asset Updated", description: "Image saved and ready to push live." });
        }
      } catch (err) {
        toast({ variant: "destructive", title: "Upload Failed", description: "Could not process image." });
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  const saveToSite = async () => {
    if (!localSiteData) return;
    setIsSyncing(true);
    try {
      const response = await fetch('/api/leadership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localSiteData)
      });
      if (response.ok) {
        toast({ title: "Sync Successful", description: "All changes are now live on the website." });
      } else {
        throw new Error("Sync failed");
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Persistence Error", description: "Failed to save data to server." });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "prexani.tech@gmail.com" && password === "Admin@9343") {
      setIsLoggedIn(true);
      localStorage.setItem("rd_admin_session", "active");
      toast({ title: "Access Granted", description: "Welcome back to R&DServices Ops." });
    } else {
      toast({ variant: "destructive", title: "Login Failed", description: "Invalid admin credentials." });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("rd_admin_session");
    toast({ title: "Signed Out", description: "Your session has ended." });
  };

  const addItem = (path: string, defaultValue: any) => {
    const newData = JSON.parse(JSON.stringify(localSiteData));
    const parts = path.split('.');
    let current = newData;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        if (!Array.isArray(current[part])) current[part] = [];
        current[part].push(defaultValue);
      } else {
        if (!current[part]) current[part] = {};
        current = current[part];
      }
    }
    
    setLocalSiteData(newData);
    toast({ title: "Entry Created", description: `Added new item to ${path}.` });
  };

  const executeRemoval = () => {
    if (!deleteConfirm) return;
    const { path, index } = deleteConfirm;
    
    const newData = JSON.parse(JSON.stringify(localSiteData));
    const parts = path.split('.');
    let current = newData;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        current[part].splice(index, 1);
      } else {
        current = current[part];
      }
    }
    
    setLocalSiteData(newData);
    setDeleteConfirm(null);
    toast({ title: "Item Removed", description: "Entry deleted successfully." });
  };

  const updateListItem = (path: string, index: number, field: string, value: any) => {
    const newData = JSON.parse(JSON.stringify(localSiteData));
    const parts = path.split('.');
    let current = newData;
    for (const part of parts) {
      current = current[part];
    }
    current[index][field] = value;
    setLocalSiteData(newData);
  };

  if (isLoadingData) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <div className="font-headline font-bold text-xl text-slate-900 tracking-tight uppercase">Initializing R&DServices Ops...</div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-400 blur-[100px] rounded-full" />
        </div>
        
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[40px] overflow-hidden bg-white z-10">
          <div className="bg-primary p-12 text-center text-white relative">
            <ShieldCheck className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-headline font-bold uppercase tracking-tight">R&DServices Ops</h2>
            <p className="text-blue-100/60 text-[10px] uppercase tracking-widest font-bold mt-2">Central Authority System</p>
          </div>
          <CardContent className="p-8 lg:p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Admin Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-2xl h-14 bg-slate-50 border-none shadow-inner" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Key Password</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded-2xl h-14 bg-slate-50 border-none shadow-inner" />
              </div>
              <Button type="submit" className="w-full h-16 rounded-2xl font-bold shadow-xl shadow-primary/20 text-lg transition-all active:scale-95">Authenticate</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const navigationItems = [
    { id: "media", icon: GalleryVertical, label: "Brand Assets" },
    { id: "hero", icon: Rocket, label: "Landing Experience" },
    { id: "summary", icon: Layout, label: "Firm Architecture" },
    { id: "leadership", icon: Users, label: "Authority Profiles" },
    { id: "services", icon: Zap, label: "Service Hub" },
    { id: "pricing", icon: DollarSign, label: "Revenue Plans" },
    { id: "testimonials", icon: Star, label: "Social Proof" },
    { id: "faqs", icon: HelpCircle, label: "Support Desk" },
    { id: "blog", icon: Newspaper, label: "Academic Hub" },
    { id: "settings", icon: Settings, label: "Control Center" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row relative">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, currentEditingPath || '')} />
      
      {/* Improved Sidebar */}
      <aside className={cn(
        "fixed inset-0 z-[100] bg-[#0a0f1c] text-white flex flex-col transition-transform duration-500 lg:relative lg:translate-x-0 lg:w-80 border-r border-white/5",
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-10 border-b border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-headline font-bold tracking-tight">R&DServices</h1>
            <Button variant="ghost" size="icon" className="lg:hidden text-slate-400" onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/80">Operations Dashboard</div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 space-y-1.5 custom-scrollbar">
          {navigationItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
              className={cn(
                "p-4 rounded-2xl cursor-pointer flex gap-4 items-center transition-all group",
                activeTab === item.id 
                  ? "bg-primary text-white shadow-xl shadow-primary/10" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", activeTab === item.id ? "text-white" : "text-slate-500")} /> 
              <span className="font-bold text-sm tracking-tight">{item.label}</span>
              {activeTab === item.id && <ChevronRight className="h-4 w-4 ml-auto opacity-40" />}
            </div>
          ))}
        </div>

        <div className="p-6 mt-auto space-y-4">
          <Link href="/" target="_blank" className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 text-slate-300 hover:text-white transition-colors">
            <ExternalLink className="h-4 w-4" />
            <span className="text-xs font-bold">View Live Site</span>
          </Link>
          <div className="pt-6 border-t border-white/5">
            <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-white hover:bg-red-500/10 hover:text-red-400 rounded-2xl p-4" onClick={handleLogout}>
              <LogOut className="h-5 w-5 mr-3" /> <span className="font-bold text-sm">Sign Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-12 lg:p-16 overflow-auto relative">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden bg-white shadow-sm" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <div className="space-y-1">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-slate-900 uppercase tracking-tight">
                {activeTab.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
              <p className="text-sm text-slate-400 font-medium italic">Managing Scholarly Content Resources</p>
            </div>
          </div>
          <Button disabled={isSyncing} onClick={saveToSite} className="bg-primary hover:bg-blue-600 rounded-2xl font-bold shadow-2xl shadow-primary/20 px-10 h-16 flex gap-3 w-full sm:w-auto text-lg transition-all active:scale-95">
            {isSyncing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            {isSyncing ? "Saving Changes..." : "Push Live"}
          </Button>
        </header>

        <Tabs value={activeTab} className="space-y-12">
          {/* Media Hub */}
          <TabsContent value="media">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Card className="p-8 space-y-6 border-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] rounded-[40px] bg-white group">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">Brand Logo</h3>
                  <div className="p-2 bg-slate-50 rounded-xl text-slate-400"><ImageIcon className="h-5 w-5" /></div>
                </div>
                <div className="relative h-48 w-full bg-slate-50 rounded-[30px] flex items-center justify-center border-2 border-dashed border-slate-100 group-hover:border-primary/20 transition-colors">
                  {localSiteData?.brand?.logo ? (
                    <Image src={localSiteData.brand.logo} alt="Logo" fill className="object-contain p-8" unoptimized />
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <ImageIcon className="h-10 w-10" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">No Logo Set</span>
                    </div>
                  )}
                </div>
                <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-100 hover:border-primary hover:text-primary font-bold" onClick={() => { setCurrentEditingPath(`brand.logo`); fileInputRef.current?.click(); }}>Replace Brand Identity</Button>
              </Card>
              <Card className="p-8 space-y-6 border-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] rounded-[40px] bg-white group">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">Hero Canvas</h3>
                  <div className="p-2 bg-slate-50 rounded-xl text-slate-400"><Layout className="h-5 w-5" /></div>
                </div>
                <div className="relative h-48 w-full bg-slate-50 rounded-[30px] overflow-hidden border-2 border-dashed border-slate-100 group-hover:border-primary/20 transition-colors">
                  {localSiteData?.hero?.image ? (
                    <Image src={localSiteData.hero.image} alt="Hero" fill className="object-cover" unoptimized />
                  ) : (
                    <div className="flex items-center justify-center h-full opacity-30"><ImageIcon className="h-10 w-10" /></div>
                  )}
                </div>
                <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-100 hover:border-primary hover:text-primary font-bold" onClick={() => { setCurrentEditingPath(`hero.image`); fileInputRef.current?.click(); }}>Change Background Visual</Button>
              </Card>
             </div>
          </TabsContent>

          {/* Hero & Stats */}
          <TabsContent value="hero">
            <Card className="p-10 space-y-8 border-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] rounded-[40px] bg-white">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Elite Badge</label>
                  <Input value={localSiteData?.hero?.badge} onChange={(e) => setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, badge: e.target.value}})} placeholder="e.g. Premier Research Excellence" className="rounded-2xl h-14 bg-slate-50 border-none shadow-inner" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Headline Title</label>
                  <Input value={localSiteData?.hero?.title} onChange={(e) => setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, title: e.target.value}})} placeholder="Hero Title" className="rounded-2xl h-14 bg-slate-50 border-none shadow-inner" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Value Proposition (Subtitle)</label>
                <Textarea value={localSiteData?.hero?.subtitle} onChange={(e) => setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, subtitle: e.target.value}})} placeholder="Detailed value proposition..." className="rounded-2xl min-h-[140px] bg-slate-50 border-none shadow-inner p-6" />
              </div>
              
              <div className="pt-10 border-t border-slate-50">
                <div className="flex items-center gap-3 mb-8">
                  <h4 className="font-bold text-xl text-slate-900">Performance Metrics</h4>
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {localSiteData?.hero?.stats?.map((stat: any, i: number) => (
                    <div key={i} className="p-8 bg-slate-50 rounded-[30px] space-y-4 shadow-inner relative group">
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase font-bold text-slate-300 tracking-widest">Label</label>
                        <Input value={stat.label} onChange={(e) => {
                          const newStats = [...localSiteData.hero.stats];
                          newStats[i].label = e.target.value;
                          setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, stats: newStats}});
                        }} className="h-12 bg-white rounded-xl font-medium border-none shadow-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase font-bold text-slate-300 tracking-widest">Impact Value</label>
                        <Input value={stat.value} onChange={(e) => {
                          const newStats = [...localSiteData.hero.stats];
                          newStats[i].value = e.target.value;
                          setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, stats: newStats}});
                        }} className="h-12 bg-white rounded-xl font-bold border-none shadow-sm text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Firm Summary */}
          <TabsContent value="summary">
            <Card className="p-10 space-y-10 border-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] rounded-[40px] bg-white">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Section Title</label>
                <Input value={localSiteData?.firmSummary?.title} onChange={(e) => setLocalSiteData({...localSiteData, firmSummary: {...localSiteData.firmSummary, title: e.target.value}})} className="rounded-2xl h-14 bg-slate-50 border-none shadow-inner" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Firm Narrative</label>
                <Textarea value={localSiteData?.firmSummary?.description} onChange={(e) => setLocalSiteData({...localSiteData, firmSummary: {...localSiteData.firmSummary, description: e.target.value}})} className="rounded-2xl min-h-[200px] bg-slate-50 border-none shadow-inner p-8 text-lg font-light leading-relaxed" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Legacy Visual</label>
                <div className="relative h-64 w-full bg-slate-50 rounded-[40px] overflow-hidden border-2 border-dashed border-slate-100 group">
                  {localSiteData?.firmSummary?.image ? (
                    <Image src={localSiteData.firmSummary.image} alt="Summary" fill className="object-cover transition-transform group-hover:scale-105" unoptimized />
                  ) : (
                    <div className="flex items-center justify-center h-full opacity-30"><ImageIcon className="h-12 w-12" /></div>
                  )}
                </div>
                <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-100 hover:border-primary hover:text-primary font-bold" onClick={() => { setCurrentEditingPath(`firmSummary.image`); fileInputRef.current?.click(); }}>Change Summary Visual</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Authority Profiles */}
          <TabsContent value="leadership">
            <div className="grid md:grid-cols-2 gap-10">
              <Card className="p-10 space-y-8 border-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] rounded-[40px] bg-white">
                <h3 className="text-2xl font-headline font-bold text-slate-900 border-b border-slate-50 pb-6">Founder & Director</h3>
                <div className="flex flex-col items-center gap-6">
                  <div className="relative h-56 w-56 bg-slate-50 rounded-full overflow-hidden border-[8px] border-white shadow-2xl">
                    {localSiteData?.leadership?.founder?.image ? (
                      <Image src={localSiteData.leadership.founder.image} alt="Founder" fill className="object-cover" unoptimized />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-200"><UserCircle className="h-20 w-20" /></div>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary font-bold hover:bg-primary/5" onClick={() => { setCurrentEditingPath(`leadership.founder.image`); fileInputRef.current?.click(); }}>Replace Portrait</Button>
                </div>
                <div className="space-y-4">
                  <Input value={localSiteData?.leadership?.founder?.name} onChange={(e) => setLocalSiteData({...localSiteData, leadership: {...localSiteData.leadership, founder: {...localSiteData.leadership.founder, name: e.target.value}}})} placeholder="Full Scholarly Name" className="rounded-2xl h-14 bg-slate-50 border-none shadow-inner text-center font-bold" />
                  <Input value={localSiteData?.leadership?.founder?.role} onChange={(e) => setLocalSiteData({...localSiteData, leadership: {...localSiteData.leadership, founder: {...localSiteData.leadership.founder, role: e.target.value}}})} placeholder="Designated Role" className="rounded-2xl h-12 bg-slate-50 border-none shadow-inner text-center text-slate-400" />
                </div>
              </Card>

              <Card className="p-10 space-y-8 border-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] rounded-[40px] bg-white bg-slate-50/30 border border-slate-100 border-dashed">
                <h3 className="text-2xl font-headline font-bold text-slate-200 border-b border-white/5 pb-6">Co-Founder (Locked)</h3>
                <div className="flex flex-col items-center justify-center h-full opacity-20 pointer-events-none grayscale">
                  <UserCircle className="h-40 w-40 text-slate-200" />
                  <p className="mt-4 font-bold uppercase tracking-widest text-[10px]">Placeholder Registry</p>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Service Hub */}
          <TabsContent value="services">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {localSiteData?.services?.map((s: any, i: number) => (
                <Card key={i} className="p-8 space-y-6 border-none shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[40px] bg-white group hover:ring-2 hover:ring-primary/20 transition-all">
                  <div className="flex justify-between items-center">
                    <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">Tier {i + 1}</span>
                    <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl" onClick={() => setDeleteConfirm({path: 'services', index: i})}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                   <div className="relative h-40 w-full bg-slate-50 rounded-[24px] overflow-hidden mb-2 group">
                    {s.image ? (
                      <Image src={s.image} alt={s.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                    ) : (
                      <div className="flex items-center justify-center h-full opacity-20"><ImageIcon className="h-8 w-8" /></div>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Button size="sm" className="bg-white text-primary hover:bg-white/90" onClick={() => { setCurrentEditingPath(`services.${i}.image`); fileInputRef.current?.click(); }}>Change Image</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Input value={s.title} onChange={(e) => updateListItem('services', i, 'title', e.target.value)} className="rounded-xl font-bold border-none bg-slate-50 h-12 shadow-inner" placeholder="Service Title" />
                    <Textarea value={s.description} onChange={(e) => updateListItem('services', i, 'description', e.target.value)} className="rounded-xl text-sm min-h-[120px] bg-slate-50 border-none shadow-inner p-4" placeholder="Detailed Service Scope" />
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="h-full min-h-[350px] border-2 border-dashed border-slate-100 rounded-[40px] flex flex-col gap-6 text-slate-300 hover:text-primary hover:border-primary/50 hover:bg-primary/[0.02] transition-all group" onClick={() => addItem('services', { title: "New Academic Service", description: "Comprehensive guidance for scholars...", features: ["Feature 1"], image: "" })}>
                <div className="p-6 bg-slate-50 rounded-full group-hover:bg-primary/10 transition-colors"><Plus className="h-10 w-10" /></div>
                <span className="font-bold uppercase tracking-widest text-xs">Register New Service</span>
              </Button>
            </div>
          </TabsContent>

          {/* Pricing */}
          <TabsContent value="pricing">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {localSiteData?.pricing?.map((p: any, i: number) => (
                <Card key={i} className={cn(
                  "p-8 space-y-6 border-none shadow-xl rounded-[40px] bg-white relative transition-all",
                  p.highlight ? "ring-2 ring-primary" : ""
                )}>
                  {p.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg">Featured Plan</div>}
                  
                  <div className="flex justify-between items-center gap-4">
                    <Input value={p.name} onChange={(e) => updateListItem('pricing', i, 'name', e.target.value)} className="font-bold h-12 border-none bg-slate-50 rounded-2xl shadow-inner text-xl" />
                    <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-50 rounded-xl shrink-0" onClick={() => setDeleteConfirm({path: 'pricing', index: i})}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-slate-300 tracking-widest ml-1">Plan Catchphrase</label>
                      <Textarea value={p.description} onChange={(e) => updateListItem('pricing', i, 'description', e.target.value)} className="text-sm h-24 rounded-2xl bg-slate-50 border-none shadow-inner p-4" />
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <input type="checkbox" checked={p.highlight} onChange={(e) => updateListItem('pricing', i, 'highlight', e.target.checked)} className="h-5 w-5 rounded-lg border-slate-300 text-primary focus:ring-primary" id={`highlight-${i}`} />
                      <label htmlFor={`highlight-${i}`} className="text-sm font-bold text-slate-600 cursor-pointer">Boost Visibility (Highlight)</label>
                    </div>

                    {p.highlight && (
                      <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                        <label className="text-[9px] uppercase font-bold text-slate-300 tracking-widest ml-1">Popularity Badge</label>
                        <Input value={p.badge} onChange={(e) => updateListItem('pricing', i, 'badge', e.target.value)} className="h-10 text-[10px] rounded-xl font-bold bg-primary/5 border-none shadow-inner text-primary uppercase" placeholder="e.g. MOST POPULAR" />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="h-[400px] border-2 border-dashed border-slate-100 rounded-[40px] text-slate-300 hover:text-primary hover:bg-primary/[0.02] transition-all" onClick={() => addItem('pricing', { name: "New Strategy Plan", description: "Plan highlights...", features: ["Core Support"], highlight: false })}>
                <Plus className="h-10 w-10" />
              </Button>
            </div>
          </TabsContent>

          {/* Social Proof (Testimonials) */}
          <TabsContent value="testimonials">
            <div className="grid md:grid-cols-2 gap-10">
              {localSiteData?.testimonials?.map((t: any, i: number) => (
                <Card key={i} className="p-10 space-y-8 border-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] rounded-[45px] bg-white group hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center gap-6">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden bg-slate-50 border-4 border-white shadow-xl shrink-0 group">
                      {t.image ? (
                        <Image src={t.image} alt={t.name} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-200 bg-slate-50"><UserCircle className="h-14 w-14" /></div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="icon" variant="ghost" className="text-white h-full w-full rounded-none" onClick={() => { setCurrentEditingPath(`testimonials.${i}.image`); fileInputRef.current?.click(); }}><ImageIcon className="h-5 w-5" /></Button>
                      </div>
                    </div>
                    <div className="flex-grow space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 w-full">
                          <label className="text-[8px] uppercase font-bold text-slate-300 tracking-widest">Client Name</label>
                          <Input value={t.name} onChange={(e) => updateListItem('testimonials', i, 'name', e.target.value)} className="h-12 font-bold rounded-xl border-none bg-slate-50 shadow-inner text-lg" />
                        </div>
                        <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-50 ml-2" onClick={() => setDeleteConfirm({path: 'testimonials', index: i})}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase font-bold text-slate-300 tracking-widest">Scholarly Role</label>
                        <Input value={t.role} onChange={(e) => updateListItem('testimonials', i, 'role', e.target.value)} className="h-10 text-xs rounded-xl border-none bg-slate-50 shadow-inner text-slate-400" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold text-slate-400 tracking-widest ml-1">Scholarly Narrative</label>
                    <Textarea value={t.content} onChange={(e) => updateListItem('testimonials', i, 'content', e.target.value)} className="min-h-[140px] text-base font-light italic text-slate-600 rounded-[24px] bg-slate-50 border-none shadow-inner p-6 leading-relaxed" />
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Star className="h-5 w-5 text-primary fill-primary" />
                    <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Client Rating (1-5)</span>
                    <Input type="number" min="1" max="5" value={t.stars} onChange={(e) => updateListItem('testimonials', i, 'stars', parseInt(e.target.value))} className="h-12 w-24 rounded-xl border-none bg-white shadow-sm text-center font-bold text-primary text-xl" />
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="border-2 border-dashed border-slate-100 rounded-[45px] h-full min-h-[400px] text-slate-300 hover:text-primary hover:bg-primary/[0.02] transition-all" onClick={() => addItem('testimonials', { name: "Client Identity", role: "Academic Scholar", content: "The scholarly support was...", stars: 5, image: "" })}>
                <Plus className="h-12 w-12" />
              </Button>
            </div>
          </TabsContent>

          {/* Support Desk (FAQs) */}
          <TabsContent value="faqs">
            <div className="space-y-6 max-w-5xl mx-auto">
              {localSiteData?.faqs?.map((f: any, i: number) => (
                <Card key={i} className="p-8 space-y-6 border-none shadow-lg rounded-[30px] bg-white group hover:shadow-2xl transition-all relative">
                  <div className="flex justify-between items-start gap-6">
                    <div className="bg-slate-50 p-4 rounded-2xl w-full shadow-inner flex items-center gap-4">
                      <div className="h-8 w-8 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0">Q</div>
                      <Input value={f.question} onChange={(e) => updateListItem('faqs', i, 'question', e.target.value)} className="font-bold border-none bg-transparent shadow-none p-0 h-auto text-lg focus-visible:ring-0" placeholder="Question Title" />
                    </div>
                    <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-50 rounded-xl shrink-0 mt-2" onClick={() => setDeleteConfirm({path: 'faqs', index: i})}><Trash2 className="h-5 w-5" /></Button>
                  </div>
                  <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 flex gap-4">
                     <div className="h-8 w-8 bg-slate-200 rounded-xl flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">A</div>
                     <Textarea value={f.answer} onChange={(e) => updateListItem('faqs', i, 'answer', e.target.value)} className="rounded-none bg-transparent border-none shadow-none h-auto min-h-[100px] text-slate-600 focus-visible:ring-0 p-0 leading-relaxed" placeholder="Detailed Scholarly Response" />
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="w-full py-12 border-2 border-dashed border-slate-100 rounded-[30px] text-slate-300 hover:text-primary hover:bg-primary/[0.02] transition-all font-bold uppercase tracking-[0.2em] text-xs" onClick={() => addItem('faqs', { question: "New Scholarly Inquiry?", answer: "Comprehensive response details..." })}>
                <Plus className="h-6 w-6 mr-3" /> Add Support Resource
              </Button>
            </div>
          </TabsContent>

          {/* Academic Hub (Blog) */}
          <TabsContent value="blog">
             <Card className="p-10 space-y-8 border-none shadow-xl rounded-[40px] bg-white mb-12">
               <h3 className="text-2xl font-headline font-bold text-slate-900 border-b border-slate-50 pb-6 flex items-center gap-3">
                 <Newspaper className="h-6 w-6 text-primary" /> Hub Configuration
               </h3>
               <div className="grid md:grid-cols-2 gap-10">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Hub Identifier</label>
                    <Input value={localSiteData?.blog?.title} onChange={(e) => setLocalSiteData({...localSiteData, blog: {...localSiteData.blog, title: e.target.value}})} className="rounded-2xl h-14 bg-slate-50 border-none shadow-inner font-bold text-lg" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mission Tagline</label>
                    <Input value={localSiteData?.blog?.subtitle} onChange={(e) => setLocalSiteData({...localSiteData, blog: {...localSiteData.blog, subtitle: e.target.value}})} className="rounded-2xl h-14 bg-slate-50 border-none shadow-inner" />
                 </div>
               </div>
             </Card>
             
             <div className="grid md:grid-cols-2 gap-10">
               {localSiteData?.blog?.posts?.map((p: any, i: number) => (
                 <Card key={i} className="p-10 space-y-8 border-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] rounded-[45px] bg-white group hover:ring-2 hover:ring-primary/20 transition-all overflow-hidden">
                    <div className="relative h-64 w-full bg-slate-50 rounded-[30px] overflow-hidden group">
                      {p.image ? (
                        <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                      ) : (
                        <div className="flex items-center justify-center h-full opacity-20"><ImageIcon className="h-12 w-12" /></div>
                      )}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <Button size="sm" className="bg-white text-primary rounded-xl font-bold" onClick={() => { setCurrentEditingPath(`blog.posts.${i}.image`); fileInputRef.current?.click(); }}>Replace Thumbnail</Button>
                      </div>
                      <div className="absolute top-6 left-6">
                        <span className="bg-primary text-white px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">{p.category}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-start gap-4">
                        <div className="w-full space-y-1">
                           <label className="text-[8px] uppercase font-bold text-slate-300 tracking-widest">Scholarly Title</label>
                           <Input value={p.title} onChange={(e) => updateListItem('blog.posts', i, 'title', e.target.value)} className="font-bold border-none bg-slate-50 rounded-2xl shadow-inner h-14 text-xl" />
                        </div>
                        <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-50 shrink-0 mt-6" onClick={() => setDeleteConfirm({path: 'blog.posts', index: i})}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase font-bold text-slate-300 tracking-widest">Insight Excerpt</label>
                        <Textarea value={p.excerpt} onChange={(e) => updateListItem('blog.posts', i, 'excerpt', e.target.value)} className="text-base font-light text-slate-600 h-32 rounded-2xl bg-slate-50 border-none shadow-inner p-6 leading-relaxed" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                        <div className="space-y-1">
                           <label className="text-[8px] uppercase font-bold text-slate-300 tracking-widest">Metadata: Category</label>
                           <Input value={p.category} onChange={(e) => updateListItem('blog.posts', i, 'category', e.target.value)} className="h-12 text-[10px] rounded-xl bg-slate-50 border-none font-bold text-primary uppercase" />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[8px] uppercase font-bold text-slate-300 tracking-widest">Metadata: Publish Date</label>
                           <Input value={p.date} onChange={(e) => updateListItem('blog.posts', i, 'date', e.target.value)} className="h-12 text-[10px] rounded-xl bg-slate-50 border-none font-bold text-slate-400" />
                        </div>
                      </div>
                    </div>
                 </Card>
               ))}
               <Button variant="outline" className="h-full min-h-[500px] border-2 border-dashed border-slate-100 rounded-[45px] text-slate-300 hover:text-primary hover:bg-primary/[0.02] transition-all flex flex-col gap-6" onClick={() => addItem('blog.posts', { title: "Insightful Publication Title", excerpt: "Abstract summary of the scholarly insight...", author: "Academic Team", date: "May 15, 2025", image: "", category: "Research" })}>
                 <div className="p-10 bg-slate-50 rounded-full"><Plus className="h-12 w-12" /></div>
                 <span className="font-bold uppercase tracking-widest text-xs">New Academic Hub Publication</span>
               </Button>
             </div>
          </TabsContent>

          {/* Integration Hub */}
          <TabsContent value="settings">
            <Card className="p-10 space-y-12 border-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] rounded-[45px] bg-white">
              <div className="space-y-10">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                  <div className="p-4 bg-[#25D366]/10 rounded-2xl text-[#25D366]"><MessageSquare className="h-8 w-8" /></div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-headline font-bold text-slate-900">WhatsApp Dispatch</h3>
                    <p className="text-sm text-slate-400 font-medium">Connect global inquiries directly to your mobile terminal.</p>
                  </div>
                </div>
                
                <div className="space-y-4 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Terminal Phone Number</label>
                    <Input 
                      value={localSiteData?.integrations?.whatsapp || ""} 
                      onChange={(e) => setLocalSiteData({...localSiteData, integrations: {...localSiteData.integrations, whatsapp: e.target.value}})} 
                      placeholder="e.g. 916209779365" 
                      className="rounded-2xl h-16 bg-slate-50 border-none shadow-inner text-xl font-bold tracking-widest"
                    />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl text-blue-600 border border-blue-100">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p className="text-xs font-medium leading-relaxed">Ensure you include the full country code without '+' or special characters for optimal protocol performance.</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-10 border-t border-slate-50 space-y-6">
                 <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-primary" /> Authority Security</h3>
                 <div className="p-8 bg-slate-900 text-white rounded-[32px] space-y-4 relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-sm font-medium text-blue-200/60 leading-relaxed max-w-xl">
                        Credentials for R&DServices Ops are currently hardware-mapped for maximum integrity. For security rotation or protocol updates, please contact your technical security officer.
                      </p>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
                 </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Image Cropper Modal */}
      <Dialog open={isCropperOpen} onOpenChange={setIsCropperOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[50px] bg-white shadow-2xl">
          <DialogHeader className="p-8 bg-[#0a0f1c] text-white">
            <DialogTitle className="text-2xl font-headline font-bold flex items-center gap-3">
              <ImageIcon className="h-6 w-6 text-primary" /> Authority Visual Alignment
            </DialogTitle>
          </DialogHeader>
          <div className="relative h-[450px] bg-slate-900">
            {imageToCrop && (
              <Cropper 
                image={imageToCrop} 
                crop={crop} 
                zoom={zoom} 
                aspect={
                  currentEditingPath?.includes('logo') ? 600/260 : 
                  currentEditingPath?.includes('founder') || currentEditingPath?.includes('testimonials') ? 1 : 
                  currentEditingPath?.includes('hero') ? 4/5 : 
                  16/9
                } 
                onCropChange={setCrop} 
                onZoomChange={setZoom} 
                onCropComplete={onCropComplete} 
              />
            )}
          </div>
          <div className="p-10 grid grid-cols-2 gap-6 bg-white border-t border-slate-50">
            <Button variant="ghost" className="rounded-2xl h-16 font-bold text-slate-400 hover:text-slate-900" onClick={() => setIsCropperOpen(false)}>Abort Change</Button>
            <Button disabled={isUploading} className="rounded-2xl font-bold h-16 shadow-xl shadow-primary/20 transition-all active:scale-95" onClick={saveCroppedImage}>
              {isUploading ? <Loader2 className="h-6 w-6 animate-spin mr-3" /> : <Upload className="h-6 w-6 mr-3" />}
              {isUploading ? "Encrypting Asset..." : "Confirm Alignment"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="max-w-md p-0 overflow-hidden border-none rounded-[40px] bg-white shadow-2xl">
          <div className="p-10 text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-2">
              <Trash2 className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-headline font-bold text-slate-900">Delete Permanently?</h3>
              <p className="text-sm text-slate-400 leading-relaxed px-4">
                You are about to remove this scholarly resource from the registry. This action cannot be undone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
               <Button variant="ghost" className="h-14 rounded-2xl font-bold" onClick={() => setDeleteConfirm(null)}>Retain Entry</Button>
               <Button className="h-14 rounded-2xl font-bold bg-red-500 hover:bg-red-600 shadow-xl shadow-red-500/20" onClick={executeRemoval}>Confirm Removal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
