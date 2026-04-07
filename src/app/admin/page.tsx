
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
  AlertCircle,
  Globe,
  Settings2,
  FileType,
  Download,
  FileUp,
  Facebook,
  Instagram,
  Linkedin
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

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
  const resourceFileInputRef = useRef<HTMLInputElement>(null);

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

  const handleResourceFileChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file && localSiteData) {
      setIsUploading(true);
      try {
        const reader = new FileReader();
        reader.onload = async () => {
          const fileData = reader.result as string;
          const oldUrl = localSiteData.resources[index].url;
          
          const response = await fetch('/api/upload-resource', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileData,
              fileName: file.name,
              oldUrl
            })
          });

          const result = await response.json();
          if (result.url) {
            const newData = JSON.parse(JSON.stringify(localSiteData));
            newData.resources[index].url = result.url;
            newData.resources[index].size = formatBytes(file.size);
            newData.resources[index].type = file.name.split('.').pop()?.toUpperCase() || 'PDF';
            
            setLocalSiteData(newData);
            toast({ title: "Resource Uploaded", description: `File linked and size calculated: ${formatBytes(file.size)}` });
          }
        };
        reader.readAsDataURL(file);
      } catch (err) {
        toast({ variant: "destructive", title: "Upload Failed", description: "Could not process file." });
      } finally {
        setIsUploading(false);
        if (resourceFileInputRef.current) resourceFileInputRef.current.value = "";
      }
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
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <div className="font-headline font-bold text-lg text-slate-900 tracking-tight uppercase">Initializing R&DServices Ops...</div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-400 blur-[100px] rounded-full" />
        </div>
        
        <Card className="w-full max-w-sm border-none shadow-2xl rounded-[32px] overflow-hidden bg-white z-10">
          <div className="bg-primary p-8 text-center text-white relative">
            <ShieldCheck className="h-10 w-10 mx-auto mb-3" />
            <h2 className="text-xl font-headline font-bold uppercase tracking-tight">R&DServices Ops</h2>
            <p className="text-blue-100/60 text-[9px] uppercase tracking-widest font-bold mt-1">Central Authority System</p>
          </div>
          <CardContent className="p-6 lg:p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-slate-400 tracking-widest ml-1">Admin Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-xl h-12 bg-slate-50 border-none shadow-inner" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-slate-400 tracking-widest ml-1">Key Password</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded-xl h-12 bg-slate-50 border-none shadow-inner" />
              </div>
              <Button type="submit" className="w-full h-14 rounded-xl font-bold shadow-xl shadow-primary/20 text-md transition-all active:scale-95">Authenticate</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const navigationItems = [
    { id: "media", icon: GalleryVertical, label: "Brand Assets" },
    { id: "settings", icon: Settings2, label: "Firm Architecture" },
    { id: "hero", icon: Rocket, label: "Landing Experience" },
    { id: "summary", icon: Layout, label: "Firm Summary" },
    { id: "leadership", icon: Users, label: "Authority Profiles" },
    { id: "services", icon: Zap, label: "Service Hub" },
    { id: "pricing", icon: DollarSign, label: "Revenue Plans" },
    { id: "testimonials", icon: Star, label: "Social Proof" },
    { id: "faqs", icon: HelpCircle, label: "Support Desk" },
    { id: "blog", icon: Newspaper, label: "Academic Hub" },
    { id: "resources", icon: Download, label: "Resources Hub" },
    { id: "control", icon: Settings, label: "Control Center" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row relative">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, currentEditingPath || '')} />
      <input type="file" ref={resourceFileInputRef} className="hidden" onChange={(e) => handleResourceFileChange(e, parseInt(currentEditingPath || '0'))} />
      
      {/* Sidebar Responsive */}
      <aside className={cn(
        "fixed inset-0 z-[100] bg-[#0a0f1c] text-white flex flex-col transition-transform duration-500 lg:relative lg:translate-x-0 lg:w-64 border-r border-white/5",
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-headline font-bold tracking-tight">R&DServices</h1>
            <Button variant="ghost" size="icon" className="lg:hidden text-slate-400" onClick={() => setIsMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary/80">Operations Dashboard</div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {navigationItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
              className={cn(
                "p-3 rounded-xl cursor-pointer flex gap-3 items-center transition-all group",
                activeTab === item.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/10" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", activeTab === item.id ? "text-white" : "text-slate-500")} /> 
              <span className="font-bold text-xs tracking-tight">{item.label}</span>
              {activeTab === item.id && <ChevronRight className="h-3 w-3 ml-auto opacity-40" />}
            </div>
          ))}
        </div>

        <div className="p-4 mt-auto space-y-2">
          <Link href="/" target="_blank" className="flex items-center gap-2 p-3 rounded-xl bg-white/5 text-slate-300 hover:text-white transition-colors">
            <ExternalLink className="h-3 w-3" />
            <span className="text-[10px] font-bold">View Live Site</span>
          </Link>
          <div className="pt-4 border-t border-white/5">
            <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-white hover:bg-red-500/10 hover:text-red-400 rounded-xl p-3" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> <span className="font-bold text-xs">Sign Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-auto relative">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden bg-white shadow-sm" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="space-y-0.5">
              <h2 className="text-xl lg:text-2xl font-headline font-bold text-slate-900 uppercase tracking-tight">
                {activeTab.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
              <p className="text-[10px] text-slate-400 font-medium italic">Scholarly Content Management</p>
            </div>
          </div>
          <Button disabled={isSyncing} onClick={saveToSite} className="bg-primary hover:bg-blue-600 rounded-xl font-bold shadow-xl shadow-primary/20 px-6 h-12 flex gap-2 w-full sm:w-auto text-sm transition-all active:scale-95">
            {isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isSyncing ? "Saving..." : "Push Live"}
          </Button>
        </header>

        <Tabs value={activeTab} className="space-y-8">
          {/* Media Hub */}
          <TabsContent value="media">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 space-y-4 border-none shadow-sm rounded-3xl bg-white group">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Brand Identity (Logo)</h3>
                  <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400"><ImageIcon className="h-4 w-4" /></div>
                </div>
                <div className="relative h-32 w-full bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-100 group-hover:border-primary/20 transition-colors">
                  {localSiteData?.brand?.logo ? (
                    <Image src={localSiteData.brand.logo} alt="Logo" fill className="object-contain p-4" unoptimized />
                  ) : (
                    <div className="flex flex-col items-center gap-1 opacity-20">
                      <ImageIcon className="h-8 w-8" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">No Logo Set</span>
                    </div>
                  )}
                </div>
                <Button variant="outline" className="w-full h-10 rounded-xl border-slate-100 hover:border-primary hover:text-primary font-bold text-xs" onClick={() => { setCurrentEditingPath(`brand.logo`); fileInputRef.current?.click(); }}>Replace Logo</Button>
              </Card>
              <Card className="p-4 space-y-4 border-none shadow-sm rounded-3xl bg-white group">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Hero Experience Visual</h3>
                  <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400"><Layout className="h-4 w-4" /></div>
                </div>
                <div className="relative h-32 w-full bg-slate-50 rounded-2xl overflow-hidden border-2 border-dashed border-slate-100 group-hover:border-primary/20 transition-colors">
                  {localSiteData?.hero?.image ? (
                    <Image src={localSiteData.hero.image} alt="Hero" fill className="object-cover" unoptimized />
                  ) : (
                    <div className="flex items-center justify-center h-full opacity-20"><ImageIcon className="h-8 w-8" /></div>
                  )}
                </div>
                <Button variant="outline" className="w-full h-10 rounded-xl border-slate-100 hover:border-primary hover:text-primary font-bold text-xs" onClick={() => { setCurrentEditingPath(`hero.image`); fileInputRef.current?.click(); }}>Change Visual</Button>
              </Card>
             </div>
          </TabsContent>

          {/* Firm Architecture */}
          <TabsContent value="settings">
            <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
               <h3 className="text-md font-headline font-bold text-slate-900 border-b border-slate-50 pb-3 flex items-center gap-2">
                 <Globe className="h-4 w-4 text-primary" /> Header & Meta Settings
               </h3>
               <div className="grid md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Platform Brand Title</label>
                    <Input value={localSiteData?.brand?.name || "R&DServices"} onChange={(e) => setLocalSiteData({...localSiteData, brand: {...localSiteData.brand, name: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none shadow-inner text-sm" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Scholarly Tagline</label>
                    <Input value={localSiteData?.brand?.tagline || "Academic Manuscript Solutions"} onChange={(e) => setLocalSiteData({...localSiteData, brand: {...localSiteData.brand, tagline: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none shadow-inner text-sm" />
                 </div>
               </div>
               
               <h3 className="text-md font-headline font-bold text-slate-900 border-b border-slate-50 pb-3 flex items-center gap-2 pt-4">
                 <Layout className="h-4 w-4 text-primary" /> Footer Infrastructure
               </h3>
               <div className="space-y-4">
                 <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Footer Narrative</label>
                    <Textarea value={localSiteData?.brand?.footerDesc || ""} onChange={(e) => setLocalSiteData({...localSiteData, brand: {...localSiteData.brand, footerDesc: e.target.value}})} className="rounded-xl min-h-[80px] bg-slate-50 border-none shadow-inner p-3 text-sm" />
                 </div>
                 <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Official Support Email</label>
                       <Input value={localSiteData?.brand?.email || ""} onChange={(e) => setLocalSiteData({...localSiteData, brand: {...localSiteData.brand, email: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none shadow-inner text-sm" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Copyright Holder</label>
                       <Input value={localSiteData?.brand?.copyright || ""} onChange={(e) => setLocalSiteData({...localSiteData, brand: {...localSiteData.brand, copyright: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none shadow-inner text-sm" />
                    </div>
                 </div>
               </div>
            </Card>
          </TabsContent>

          {/* Hero Experience */}
          <TabsContent value="hero">
            <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Elite Badge Label</label>
                  <Input value={localSiteData?.hero?.badge} onChange={(e) => setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, badge: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none shadow-inner text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Main Experience Headline</label>
                  <Input value={localSiteData?.hero?.title} onChange={(e) => setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, title: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none shadow-inner text-sm" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Scholarly Value Prop</label>
                <Textarea value={localSiteData?.hero?.subtitle} onChange={(e) => setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, subtitle: e.target.value}})} className="rounded-xl min-h-[100px] bg-slate-50 border-none shadow-inner p-3 text-sm" />
              </div>
              
              <div className="pt-6 border-t border-slate-50">
                <h4 className="font-bold text-sm text-slate-900 mb-4">Performance Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {localSiteData?.hero?.stats?.map((stat: any, i: number) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl space-y-3 shadow-inner">
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase font-bold text-slate-300 tracking-widest">Metric Label</label>
                        <Input value={stat.label} onChange={(e) => {
                          const newStats = [...localSiteData.hero.stats];
                          newStats[i].label = e.target.value;
                          setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, stats: newStats}});
                        }} className="h-9 bg-white rounded-lg text-xs font-medium border-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase font-bold text-slate-300 tracking-widest">Scholarly Value</label>
                        <Input value={stat.value} onChange={(e) => {
                          const newStats = [...localSiteData.hero.stats];
                          newStats[i].value = e.target.value;
                          setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, stats: newStats}});
                        }} className="h-9 bg-white rounded-lg text-xs font-bold border-none text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Firm Summary */}
          <TabsContent value="summary">
            <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Section Narrative Title</label>
                <Input value={localSiteData?.firmSummary?.title} onChange={(e) => setLocalSiteData({...localSiteData, firmSummary: {...localSiteData.firmSummary, title: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none shadow-inner text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Firm Global Narrative</label>
                <Textarea value={localSiteData?.firmSummary?.description} onChange={(e) => setLocalSiteData({...localSiteData, firmSummary: {...localSiteData.firmSummary, description: e.target.value}})} className="rounded-xl min-h-[120px] bg-slate-50 border-none shadow-inner p-4 text-sm font-light leading-relaxed" />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Experience Visual</label>
                <div className="relative h-40 w-full bg-slate-50 rounded-2xl overflow-hidden border-2 border-dashed border-slate-100 group">
                  {localSiteData?.firmSummary?.image ? (
                    <Image src={localSiteData.firmSummary.image} alt="Summary" fill className="object-cover transition-transform group-hover:scale-105" unoptimized />
                  ) : (
                    <div className="flex items-center justify-center h-full opacity-20"><ImageIcon className="h-8 w-8" /></div>
                  )}
                </div>
                <Button variant="outline" className="w-full h-10 rounded-xl border-slate-100 hover:border-primary hover:text-primary font-bold text-xs" onClick={() => { setCurrentEditingPath(`firmSummary.image`); fileInputRef.current?.click(); }}>Replace Summary Image</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Authority Profiles */}
          <TabsContent value="leadership">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="text-md font-headline font-bold text-slate-900 border-b border-slate-50 pb-3">Founder & Director</h3>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative h-32 w-32 bg-slate-50 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    {localSiteData?.leadership?.founder?.image ? (
                      <Image src={localSiteData.leadership.founder.image} alt="Founder" fill className="object-cover" unoptimized />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-200"><UserCircle className="h-12 w-12" /></div>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary font-bold hover:bg-primary/5 text-[10px]" onClick={() => { setCurrentEditingPath(`leadership.founder.image`); fileInputRef.current?.click(); }}>Update Portrait</Button>
                </div>
                <div className="space-y-3">
                  <Input value={localSiteData?.leadership?.founder?.name} onChange={(e) => setLocalSiteData({...localSiteData, leadership: {...localSiteData.leadership, founder: {...localSiteData.leadership.founder, name: e.target.value}}})} placeholder="Full Name" className="rounded-xl h-10 bg-slate-50 border-none shadow-inner text-center font-bold text-sm" />
                  <Input value={localSiteData?.leadership?.founder?.role} onChange={(e) => setLocalSiteData({...localSiteData, leadership: {...localSiteData.leadership, founder: {...localSiteData.leadership.founder, role: e.target.value}}})} placeholder="Designated Role" className="rounded-xl h-9 bg-slate-50 border-none shadow-inner text-center text-slate-400 text-[10px]" />
                </div>
              </Card>

              <Card className="p-6 border-none shadow-sm rounded-3xl bg-slate-50/30 border border-slate-100 border-dashed flex flex-col items-center justify-center">
                 <h3 className="text-sm font-headline font-bold text-slate-300 mb-4">Secondary Registry (Locked)</h3>
                 <UserCircle className="h-20 w-20 text-slate-200 opacity-20" />
              </Card>
            </div>
          </TabsContent>

          {/* Service Hub */}
          <TabsContent value="services">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {localSiteData?.services?.map((s: any, i: number) => (
                <Card key={i} className="p-4 space-y-4 border-none shadow-sm rounded-3xl bg-white group hover:ring-1 hover:ring-primary/20 transition-all">
                  <div className="flex justify-between items-center">
                    <span className="bg-primary/5 text-primary px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest">Tier {i + 1}</span>
                    <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600 h-7 w-7 rounded-lg" onClick={() => setDeleteConfirm({path: 'services', index: i})}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                   <div className="relative h-28 w-full bg-slate-50 rounded-xl overflow-hidden mb-1 group">
                    {s.image ? (
                      <Image src={s.image} alt={s.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                    ) : (
                      <div className="flex items-center justify-center h-full opacity-10"><ImageIcon className="h-6 w-6" /></div>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Button size="sm" className="bg-white text-primary hover:bg-white/90 text-[10px] h-7 px-3" onClick={() => { setCurrentEditingPath(`services.${i}.image`); fileInputRef.current?.click(); }}>Update Image</Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Input value={s.title} onChange={(e) => updateListItem('services', i, 'title', e.target.value)} className="rounded-lg font-bold border-none bg-slate-50 h-9 text-xs" />
                    <Textarea value={s.description} onChange={(e) => updateListItem('services', i, 'description', e.target.value)} className="rounded-lg text-[10px] min-h-[60px] bg-slate-50 border-none p-2" />
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="h-full min-h-[200px] border-2 border-dashed border-slate-100 rounded-3xl flex flex-col gap-3 text-slate-300 hover:text-primary hover:border-primary/50 transition-all" onClick={() => addItem('services', { title: "New Service", description: "Scholarly assistance details...", features: ["Feature 1"], image: "" })}>
                <Plus className="h-6 w-6" />
                <span className="font-bold uppercase tracking-widest text-[9px]">Add Service</span>
              </Button>
            </div>
          </TabsContent>

          {/* Pricing */}
          <TabsContent value="pricing">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {localSiteData?.pricing?.map((p: any, i: number) => (
                <Card key={i} className={cn(
                  "p-4 space-y-4 border-none shadow-sm rounded-3xl bg-white relative transition-all",
                  p.highlight ? "ring-1 ring-primary" : ""
                )}>
                  <div className="flex justify-between items-center gap-2">
                    <Input value={p.name} onChange={(e) => updateListItem('pricing', i, 'name', e.target.value)} className="font-bold h-9 border-none bg-slate-50 rounded-lg text-sm" />
                    <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-50 h-7 w-7 rounded-lg shrink-0" onClick={() => setDeleteConfirm({path: 'pricing', index: i})}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-0.5">
                      <label className="text-[8px] uppercase font-bold text-slate-300 tracking-widest ml-1">Plan Catchphrase</label>
                      <Textarea value={p.description} onChange={(e) => updateListItem('pricing', i, 'description', e.target.value)} className="text-[10px] h-16 rounded-lg bg-slate-50 border-none p-2" />
                    </div>
                    
                    <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <input type="checkbox" checked={p.highlight} onChange={(e) => updateListItem('pricing', i, 'highlight', e.target.checked)} className="h-3.5 w-3.5 rounded border-slate-300 text-primary" id={`highlight-${i}`} />
                      <label htmlFor={`highlight-${i}`} className="text-[10px] font-bold text-slate-600 cursor-pointer">Featured Tier</label>
                    </div>

                    {p.highlight && (
                      <Input value={p.badge} onChange={(e) => updateListItem('pricing', i, 'badge', e.target.value)} className="h-8 text-[9px] rounded-lg font-bold bg-primary/5 border-none text-primary uppercase" placeholder="MOST POPULAR" />
                    )}
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="h-[250px] border-2 border-dashed border-slate-100 rounded-3xl text-slate-300 hover:text-primary transition-all" onClick={() => addItem('pricing', { name: "New Plan", description: "Plan summary...", features: ["Basic Support"], highlight: false })}>
                <Plus className="h-6 w-6" />
              </Button>
            </div>
          </TabsContent>

          {/* Social Proof */}
          <TabsContent value="testimonials">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localSiteData?.testimonials?.map((t: any, i: number) => (
                <Card key={i} className="p-4 space-y-4 border-none shadow-sm rounded-3xl bg-white group hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-slate-50 border-2 border-white shadow-sm shrink-0 group">
                      {t.image ? (
                        <Image src={t.image} alt={t.name} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-200 bg-slate-50"><UserCircle className="h-6 w-6" /></div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="icon" variant="ghost" className="text-white h-full w-full rounded-none" onClick={() => { setCurrentEditingPath(`testimonials.${i}.image`); fileInputRef.current?.click(); }}><ImageIcon className="h-3 w-3" /></Button>
                      </div>
                    </div>
                    <div className="flex-grow space-y-1">
                      <div className="flex justify-between items-start">
                        <Input value={t.name} onChange={(e) => updateListItem('testimonials', i, 'name', e.target.value)} className="h-8 font-bold rounded-lg border-none bg-slate-50 text-xs" />
                        <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-50 h-7 w-7 rounded-lg ml-1" onClick={() => setDeleteConfirm({path: 'testimonials', index: i})}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                      <Input value={t.role} onChange={(e) => updateListItem('testimonials', i, 'role', e.target.value)} className="h-7 text-[9px] rounded-lg border-none bg-slate-50 text-slate-400" />
                    </div>
                  </div>
                  <Textarea value={t.content} onChange={(e) => updateListItem('testimonials', i, 'content', e.target.value)} className="min-h-[80px] text-[11px] font-light italic text-slate-600 rounded-xl bg-slate-50 border-none p-3" />
                  <div className="flex items-center gap-2 px-2">
                    <Star className="h-3 w-3 text-primary fill-primary" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Rating (1-5)</span>
                    <Input type="number" min="1" max="5" value={t.stars} onChange={(e) => updateListItem('testimonials', i, 'stars', parseInt(e.target.value))} className="h-8 w-12 rounded-lg border-none bg-slate-50 text-center font-bold text-primary text-xs" />
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="border-2 border-dashed border-slate-100 rounded-3xl h-[180px] text-slate-300 hover:text-primary transition-all" onClick={() => addItem('testimonials', { name: "Client Name", role: "Scholar", content: "Service was...", stars: 5, image: "" })}>
                <Plus className="h-8 w-8" />
              </Button>
            </div>
          </TabsContent>

          {/* FAQs */}
          <TabsContent value="faqs">
            <div className="space-y-4">
              {localSiteData?.faqs?.map((f: any, i: number) => (
                <Card key={i} className="p-4 space-y-3 border-none shadow-sm rounded-2xl bg-white relative">
                  <div className="flex justify-between items-start gap-3">
                    <div className="bg-slate-50 p-2 rounded-xl w-full flex items-center gap-2">
                      <div className="h-6 w-6 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-[8px] shrink-0">Q</div>
                      <Input value={f.question} onChange={(e) => updateListItem('faqs', i, 'question', e.target.value)} className="font-bold border-none bg-transparent shadow-none p-0 h-6 text-sm focus-visible:ring-0" />
                    </div>
                    <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-50 h-7 w-7 rounded-lg shrink-0" onClick={() => setDeleteConfirm({path: 'faqs', index: i})}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                  <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex gap-2">
                     <div className="h-6 w-6 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 font-bold text-[8px] shrink-0">A</div>
                     <Textarea value={f.answer} onChange={(e) => updateListItem('faqs', i, 'answer', e.target.value)} className="rounded-none bg-transparent border-none shadow-none h-auto min-h-[60px] text-xs text-slate-600 focus-visible:ring-0 p-0" />
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="w-full py-6 border-2 border-dashed border-slate-100 rounded-2xl text-slate-300 hover:text-primary transition-all font-bold uppercase tracking-widest text-[9px]" onClick={() => addItem('faqs', { question: "New Question?", answer: "Scholarly response..." })}>
                Add Support Resource
              </Button>
            </div>
          </TabsContent>

          {/* Blog Management */}
          <TabsContent value="blog">
             <Card className="p-6 space-y-4 border-none shadow-sm rounded-3xl bg-white mb-6">
               <h3 className="text-md font-headline font-bold text-slate-900 border-b border-slate-50 pb-3 flex items-center gap-2">
                 <Newspaper className="h-4 w-4 text-primary" /> Hub Branding
               </h3>
               <div className="grid md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Academic Hub Title</label>
                    <Input value={localSiteData?.blog?.title} onChange={(e) => setLocalSiteData({...localSiteData, blog: {...localSiteData.blog, title: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none shadow-inner font-bold text-sm" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mission Tagline</label>
                    <Input value={localSiteData?.blog?.subtitle} onChange={(e) => setLocalSiteData({...localSiteData, blog: {...localSiteData.blog, subtitle: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none shadow-inner text-sm" />
                 </div>
               </div>
             </Card>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {localSiteData?.blog?.posts?.map((p: any, i: number) => (
                 <Card key={i} className="p-4 space-y-4 border-none shadow-sm rounded-3xl bg-white group hover:ring-1 hover:ring-primary/20 transition-all overflow-hidden">
                    <div className="relative h-32 w-full bg-slate-50 rounded-xl overflow-hidden group">
                      {p.image ? (
                        <Image src={p.image} alt={p.title} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="flex items-center justify-center h-full opacity-10"><ImageIcon className="h-8 w-8" /></div>
                      )}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <Button size="sm" className="bg-white text-primary rounded-lg font-bold text-[10px] h-7" onClick={() => { setCurrentEditingPath(`blog.posts.${i}.image`); fileInputRef.current?.click(); }}>Change Image</Button>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-lg">{p.category}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <Input value={p.title} onChange={(e) => updateListItem('blog.posts', i, 'title', e.target.value)} className="font-bold border-none bg-slate-50 rounded-lg h-9 text-xs" />
                        <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-50 h-7 w-7 rounded-lg shrink-0" onClick={() => setDeleteConfirm({path: 'blog.posts', index: i})}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                      <Textarea value={p.excerpt} onChange={(e) => updateListItem('blog.posts', i, 'excerpt', e.target.value)} className="text-[10px] h-16 rounded-lg bg-slate-50 border-none p-2" />
                    </div>
                 </Card>
               ))}
               <Button variant="outline" className="h-[200px] border-2 border-dashed border-slate-100 rounded-3xl text-slate-300 hover:text-primary transition-all flex flex-col gap-2" onClick={() => addItem('blog.posts', { title: "New Publication", excerpt: "Abstract summary...", author: "Academic Team", date: "May 15, 2025", image: "", category: "Research" })}>
                 <Plus className="h-6 w-6" />
                 <span className="font-bold uppercase tracking-widest text-[9px]">New Publication</span>
               </Button>
             </div>
          </TabsContent>

          {/* Resources Hub */}
          <TabsContent value="resources">
            <div className="space-y-4">
              {localSiteData?.resources?.map((r: any, i: number) => (
                <Card key={i} className="p-4 border-none shadow-sm rounded-2xl bg-white flex flex-col md:flex-row items-center gap-4 group">
                  <div className="bg-primary/5 p-3 rounded-xl text-primary shrink-0">
                    <FileType className="h-5 w-5" />
                  </div>
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase font-bold text-slate-300">Display Name</label>
                      <Input value={r.name} onChange={(e) => updateListItem('resources', i, 'name', e.target.value)} className="h-8 text-xs font-bold border-none bg-slate-50" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase font-bold text-slate-300">Detected Format</label>
                      <Input value={r.type} readOnly className="h-8 text-[10px] border-none bg-slate-100 cursor-not-allowed text-slate-400" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase font-bold text-slate-300">File Size</label>
                      <Input value={r.size} readOnly className="h-8 text-[10px] border-none bg-slate-100 cursor-not-allowed text-slate-400" />
                    </div>
                    <div className="flex items-end pb-0.5">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full h-8 text-[10px] font-bold border-dashed border-slate-200 hover:border-primary hover:text-primary flex gap-2"
                        onClick={() => {
                          setCurrentEditingPath(i.toString());
                          resourceFileInputRef.current?.click();
                        }}
                      >
                        <FileUp className="h-3.5 w-3.5" /> {r.url ? "Replace File" : "Upload File"}
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-50 h-8 w-8 rounded-lg" onClick={() => setDeleteConfirm({path: 'resources', index: i})}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
              <Button variant="outline" className="w-full py-8 border-2 border-dashed border-slate-100 rounded-2xl text-slate-300 hover:text-primary transition-all flex flex-col gap-2" onClick={() => addItem('resources', { name: "New Resource", type: "PDF", size: "0 KB", url: "" })}>
                 <Plus className="h-6 w-6" />
                 <span className="font-bold uppercase tracking-widest text-[9px]">Add Scholarly Resource</span>
              </Button>
            </div>
          </TabsContent>

          {/* Control Center */}
          <TabsContent value="control">
            <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-50 pb-3">
                    <div className="p-2 bg-[#25D366]/10 rounded-xl text-[#25D366]"><MessageSquare className="h-5 w-5" /></div>
                    <h3 className="text-md font-headline font-bold text-slate-900">Communication Terminal</h3>
                  </div>
                  
                  <div className="space-y-3 max-w-md">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">WhatsApp Phone Number</label>
                      <Input 
                        value={localSiteData?.integrations?.whatsapp || ""} 
                        onChange={(e) => setLocalSiteData({...localSiteData, integrations: {...localSiteData.integrations, whatsapp: e.target.value}})} 
                        placeholder="e.g. 916209779365" 
                        className="rounded-xl h-10 bg-slate-50 border-none shadow-inner text-sm font-bold tracking-widest"
                      />
                      <p className="text-[9px] text-slate-400 ml-1">Include country code without '+' for optimal routing.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-50 pb-3">
                    <div className="p-2 bg-primary/10 rounded-xl text-primary"><Globe className="h-5 w-5" /></div>
                    <h3 className="text-md font-headline font-bold text-slate-900">Social Connections</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-1 gap-6 max-w-xl">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Facebook className="h-3 w-3" /> Facebook URL
                      </label>
                      <Input 
                        value={localSiteData?.integrations?.facebook || ""} 
                        onChange={(e) => setLocalSiteData({...localSiteData, integrations: {...localSiteData.integrations, facebook: e.target.value}})} 
                        placeholder="https://facebook.com/your-profile" 
                        className="rounded-xl h-10 bg-slate-50 border-none shadow-inner text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Instagram className="h-3 w-3" /> Instagram URL
                      </label>
                      <Input 
                        value={localSiteData?.integrations?.instagram || ""} 
                        onChange={(e) => setLocalSiteData({...localSiteData, integrations: {...localSiteData.integrations, instagram: e.target.value}})} 
                        placeholder="https://instagram.com/your-profile" 
                        className="rounded-xl h-10 bg-slate-50 border-none shadow-inner text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Linkedin className="h-3 w-3" /> LinkedIn URL
                      </label>
                      <Input 
                        value={localSiteData?.integrations?.linkedin || ""} 
                        onChange={(e) => setLocalSiteData({...localSiteData, integrations: {...localSiteData.integrations, linkedin: e.target.value}})} 
                        placeholder="https://linkedin.com/in/your-profile" 
                        className="rounded-xl h-10 bg-slate-50 border-none shadow-inner text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-slate-50 space-y-4">
                 <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Authority Security</h3>
                 <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 relative overflow-hidden">
                    <p className="text-[10px] font-medium text-blue-200/60 leading-relaxed max-w-sm relative z-10">
                      Access protocols are currently locked to your administrative terminal. For credential rotation, please contact technical support.
                    </p>
                    <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-primary/20 blur-2xl rounded-full" />
                 </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Image Cropper Modal */}
      <Dialog open={isCropperOpen} onOpenChange={setIsCropperOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none rounded-[32px] bg-white shadow-2xl">
          <DialogHeader className="p-6 bg-[#0a0f1c] text-white">
            <DialogTitle className="text-lg font-headline font-bold flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-primary" /> Authority Visual Alignment
            </DialogTitle>
          </DialogHeader>
          <div className="relative h-80 bg-slate-900">
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
          <div className="p-6 grid grid-cols-2 gap-4 bg-white border-t border-slate-50">
            <Button variant="ghost" className="rounded-xl h-12 font-bold text-slate-400 hover:text-slate-900 text-xs" onClick={() => setIsCropperOpen(false)}>Abort</Button>
            <Button disabled={isUploading} className="rounded-xl font-bold h-12 shadow-lg transition-all active:scale-95 text-xs" onClick={saveCroppedImage}>
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
              {isUploading ? "Processing..." : "Confirm Alignment"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="max-w-xs p-0 overflow-hidden border-none rounded-[24px] bg-white shadow-2xl">
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-2">
              <Trash2 className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-headline font-bold text-slate-900">Remove Permanently?</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed px-2">
                This action will delete the scholarly resource from the registry.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
               <Button variant="ghost" className="h-10 rounded-xl font-bold text-[10px]" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
               <Button className="h-10 rounded-xl font-bold bg-red-500 hover:bg-red-600 shadow-lg text-[10px]" onClick={executeRemoval}>Confirm</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
