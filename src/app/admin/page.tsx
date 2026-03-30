"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { 
  LogOut, 
  ShieldCheck, 
  Zap, 
  Plus, 
  Trash2, 
  Upload, 
  UserCircle,
  FileText,
  HelpCircle,
  Save,
  Rocket,
  Star,
  Menu,
  X,
  Beaker,
  Settings,
  Mail,
  Loader2,
  Image as ImageIcon,
  GalleryVertical,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Cropper from "react-easy-crop";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
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

  return canvas.toDataURL("image/jpeg", 0.9);
};

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("media");
  const { toast } = useToast();

  const [siteData, setSiteData] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem("rd_admin_session");
    if (session === "active") {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/leadership', { cache: 'no-store' });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      if (!data.brand) data.brand = { logo: "" };
      setSiteData(data);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to load site data." });
    }
  }, [toast]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, fetchData]);

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [currentEditingPath, setCurrentEditingPath] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const saveCroppedImage = async () => {
    if (imageToCrop && croppedAreaPixels && currentEditingPath) {
      setIsUploading(true);
      try {
        const croppedBase64 = await getCroppedImg(imageToCrop, croppedAreaPixels);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            image: croppedBase64, 
            name: currentEditingPath.replace(/\./g, '_') 
          })
        });

        if (!uploadRes.ok) throw new Error("Upload failed");
        const { url } = await uploadRes.json();

        const newData = { ...siteData };
        const parts = currentEditingPath.split('.');
        let current = newData;
        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          const index = parseInt(part);
          if (!isNaN(index)) {
             current = (current as any)[index];
          } else {
             if (!(current as any)[part]) (current as any)[part] = {};
             current = (current as any)[part];
          }
        }
        (current as any)[parts[parts.length - 1]] = url;

        setSiteData(newData);
        setIsCropperOpen(false);
        setImageToCrop(null);
        toast({ title: "Asset Updated", description: "Image saved to site gallery." });
      } catch (err) {
        toast({ variant: "destructive", title: "Upload Error", description: "Failed to save image." });
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  const saveToSite = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/leadership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteData)
      });
      if (res.ok) {
        toast({ title: "Sync Successful", description: "Website assets updated." });
      } else {
        throw new Error("Sync Failed");
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to sync updates." });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "prexani.tech@gmail.com" && password === "Admin@9343") {
      setIsLoggedIn(true);
      localStorage.setItem("rd_admin_session", "active");
      toast({ title: "Authenticated", description: "Welcome back, Om Prakash Sinha." });
    } else {
      toast({ variant: "destructive", title: "Access Denied", description: "Invalid credentials." });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("rd_admin_session");
    toast({ title: "Signed Out", description: "Operations session terminated." });
  };

  if (isLoading) return null;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[30px] md:rounded-[40px] overflow-hidden bg-white animate-in fade-in zoom-in duration-500">
          <div className="bg-primary p-8 md:p-12 text-center text-white">
            <ShieldCheck className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl font-headline font-bold uppercase tracking-tight">Operations Hub</h2>
            <p className="text-blue-100/60 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mt-2">Secure Staff Access</p>
          </div>
          <CardContent className="p-6 md:p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Identity</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-xl h-12 bg-slate-50 border-none shadow-sm focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Token</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded-xl h-12 bg-slate-50 border-none shadow-sm focus:ring-2 focus:ring-primary/20" />
              </div>
              <Button type="submit" className="w-full bg-primary h-14 rounded-xl font-bold shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:scale-95">Authenticate</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!siteData) return <div className="p-20 text-center font-bold">Initializing Data...</div>;

  const navigationItems = [
    { id: "media", icon: GalleryVertical, label: "Media Hub" },
    { id: "hero", icon: Rocket, label: "Hero & Stats" },
    { id: "leadership", icon: Users, label: "Leadership" },
    { id: "summary", icon: FileText, label: "Firm Summary" },
    { id: "services", icon: Zap, label: "Services" },
    { id: "testimonials", icon: Star, label: "Testimonials" },
    { id: "faq", icon: HelpCircle, label: "FAQ" },
    { id: "settings", icon: Settings, label: "Integrations" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row relative">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, currentEditingPath || '')} />
      
      <header className="lg:hidden h-20 bg-slate-900 text-white flex items-center justify-between px-6 sticky top-0 z-[100] shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1.5 rounded-lg">
            <Beaker className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg font-headline font-bold leading-none">R&D OPS</h1>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-white/10 rounded-xl">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      <aside className={cn(
        "fixed inset-0 z-[90] bg-slate-900 text-white flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-72 lg:z-auto",
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 border-b border-white/5 hidden lg:block">
          <h1 className="text-xl font-headline font-bold">R&D OPS HUB</h1>
          <p className="text-[9px] text-blue-400 font-bold uppercase tracking-widest mt-1">Management Portal</p>
        </div>
        
        <nav className="flex-grow p-6 lg:p-4 space-y-2 mt-20 lg:mt-0">
          {navigationItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
              className={cn(
                "p-4 rounded-xl cursor-pointer flex gap-4 items-center transition-all",
                activeTab === item.id ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="h-5 w-5" /> 
              <span className="font-bold text-sm">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="p-6 lg:p-4 mt-auto border-t border-white/5 lg:border-none">
          <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-white h-12 rounded-xl" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-3" /> Sign Out
          </Button>
        </div>
      </aside>

      <main className="flex-grow p-6 md:p-12 overflow-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-headline font-bold text-slate-900 uppercase tracking-tight">
              {activeTab === 'media' ? 'Media Hub' : activeTab.replace("-", " ")}
            </h2>
            <p className="text-sm text-slate-400">Manage all site-wide images and branding</p>
          </div>
          <Button 
            disabled={isSyncing}
            onClick={saveToSite} 
            className="w-full md:w-auto bg-primary rounded-xl font-bold shadow-xl px-8 h-12 flex gap-2"
          >
            {isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isSyncing ? "Syncing..." : "Push Changes Live"}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          
          <TabsContent value="media">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-none shadow-xl rounded-[40px] p-6 md:p-10 bg-white space-y-6">
                <div className="flex items-center gap-3 text-primary mb-2">
                  <ImageIcon className="h-6 w-6" />
                  <h3 className="text-xl font-headline font-bold">Official Brand Logo</h3>
                </div>
                <div className="relative h-32 w-full rounded-2xl overflow-hidden border-4 border-slate-50 shadow-md bg-slate-100 flex items-center justify-center p-4">
                  {siteData.brand?.logo ? (
                    <Image src={siteData.brand.logo} alt="Brand Logo" fill className="object-contain p-4" />
                  ) : (
                    <div className="text-center text-slate-300">
                      <Beaker className="h-10 w-10 mx-auto mb-1" />
                      <p className="text-[10px] font-bold uppercase">No Logo</p>
                    </div>
                  )}
                </div>
                <Button variant="outline" className="w-full rounded-xl font-bold" onClick={() => { setCurrentEditingPath(`brand.logo`); fileInputRef.current?.click(); }}>
                  <Upload className="h-4 w-4 mr-2" /> Replace Logo
                </Button>
              </Card>

              <Card className="border-none shadow-xl rounded-[40px] p-6 md:p-10 bg-white space-y-6">
                <div className="flex items-center gap-3 text-primary mb-2">
                  <Rocket className="h-6 w-6" />
                  <h3 className="text-xl font-headline font-bold">Hero Banner</h3>
                </div>
                <div className="relative h-32 w-full rounded-2xl overflow-hidden border-4 border-slate-50 shadow-md bg-slate-100">
                  {siteData.hero.image ? (
                    <Image src={siteData.hero.image} alt="Hero" fill className="object-cover" />
                  ) : (
                    <Rocket className="h-full w-full text-slate-300 p-8" />
                  )}
                </div>
                <Button variant="outline" className="w-full rounded-xl font-bold" onClick={() => { setCurrentEditingPath(`hero.image`); fileInputRef.current?.click(); }}>
                  <Upload className="h-4 w-4 mr-2" /> Change Hero Image
                </Button>
              </Card>

              <Card className="border-none shadow-xl rounded-[40px] p-6 md:p-10 bg-white space-y-6">
                <div className="flex items-center gap-3 text-primary mb-2">
                  <Users className="h-6 w-6" />
                  <h3 className="text-xl font-headline font-bold">Founder Photo</h3>
                </div>
                <div className="flex items-center gap-6">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-md bg-slate-100">
                    {siteData.leadership.founder.image ? (
                      <Image src={siteData.leadership.founder.image} alt="Founder" fill className="object-cover" />
                    ) : (
                      <UserCircle className="h-full w-full text-slate-300" />
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl font-bold" onClick={() => { setCurrentEditingPath(`leadership.founder.image`); fileInputRef.current?.click(); }}>
                    <Upload className="h-4 w-4 mr-2" /> Change Photo
                  </Button>
                </div>
              </Card>

              <Card className="border-none shadow-xl rounded-[40px] p-6 md:p-10 bg-white space-y-6">
                <div className="flex items-center gap-3 text-primary mb-2">
                  <FileText className="h-6 w-6" />
                  <h3 className="text-xl font-headline font-bold">Firm Summary Visual</h3>
                </div>
                <div className="relative h-32 w-full rounded-2xl overflow-hidden border-4 border-slate-50 shadow-md bg-slate-100">
                  {siteData.firmSummary.image ? (
                    <Image src={siteData.firmSummary.image} alt="Firm Summary" fill className="object-cover" />
                  ) : (
                    <FileText className="h-full w-full text-slate-300 p-8" />
                  )}
                </div>
                <Button variant="outline" className="w-full rounded-xl font-bold" onClick={() => { setCurrentEditingPath(`firmSummary.image`); fileInputRef.current?.click(); }}>
                  <Upload className="h-4 w-4 mr-2" /> Change Summary Image
                </Button>
              </Card>

              <div className="md:col-span-2 pt-10 border-t border-slate-200">
                <div className="flex items-center gap-3 text-primary mb-8">
                  <Zap className="h-6 w-6" />
                  <h3 className="text-2xl font-headline font-bold">Service Specific Images</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {siteData.services.map((service: any, i: number) => (
                    <Card key={i} className="border-none shadow-md rounded-3xl p-6 bg-white space-y-4">
                      <h4 className="font-bold text-sm truncate">{service.title}</h4>
                      <div className="relative h-28 w-full rounded-xl overflow-hidden border-2 border-slate-50 shadow-sm bg-slate-50">
                        {service.image ? (
                          <Image src={service.image} alt={service.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-200">
                             <ImageIcon className="h-8 w-8" />
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm" className="w-full rounded-lg text-xs" onClick={() => { setCurrentEditingPath(`services.${i}.image`); fileInputRef.current?.click(); }}>
                        <Upload className="h-3 w-3 mr-2" /> Update Image
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hero">
            <Card className="border-none shadow-xl rounded-[40px] p-6 md:p-10 bg-white space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Hero Badge</label>
                  <Input value={siteData.hero.badge} onChange={(e) => setSiteData({...siteData, hero: {...siteData.hero, badge: e.target.value}})} className="bg-slate-50 border-none rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Hero Title</label>
                  <Input value={siteData.hero.title} onChange={(e) => setSiteData({...siteData, hero: {...siteData.hero, title: e.target.value}})} className="bg-slate-50 border-none rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Hero Subtitle</label>
                  <Textarea value={siteData.hero.subtitle} onChange={(e) => setSiteData({...siteData, hero: {...siteData.hero, subtitle: e.target.value}})} className="bg-slate-50 border-none rounded-xl min-h-[100px]" />
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t">
                <label className="text-[10px] font-bold uppercase text-slate-400">Global Stats</label>
                <div className="grid md:grid-cols-3 gap-6">
                  {siteData.hero.stats.map((stat: any, i: number) => (
                    <div key={i} className="bg-slate-50 p-6 rounded-2xl space-y-3">
                      <Input value={stat.value} onChange={(e) => {
                        const newStats = [...siteData.hero.stats];
                        newStats[i].value = e.target.value;
                        setSiteData({...siteData, hero: {...siteData.hero, stats: newStats}});
                      }} className="bg-white border-none rounded-lg h-10 font-bold" />
                      <Input value={stat.label} onChange={(e) => {
                        const newStats = [...siteData.hero.stats];
                        newStats[i].label = e.target.value;
                        setSiteData({...siteData, hero: {...siteData.hero, stats: newStats}});
                      }} className="bg-white border-none rounded-lg h-8 text-xs" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="leadership">
            <div className="grid lg:grid-cols-2 gap-8">
              {['founder', 'coFounder'].map((type) => (
                <Card key={type} className="border-none shadow-xl rounded-[40px] p-6 md:p-10 bg-white">
                  <h3 className="text-2xl font-headline font-bold mb-6 capitalize">{type === 'founder' ? 'Founder' : 'Co-Founder'} Profile</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-slate-400">Full Name</label>
                      <Input value={siteData.leadership[type].name} onChange={(e) => {
                        const newData = {...siteData};
                        newData.leadership[type].name = e.target.value;
                        setSiteData(newData);
                      }} className="bg-slate-50 border-none rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-slate-400">Designation / Role</label>
                      <Input value={siteData.leadership[type].role} onChange={(e) => {
                        const newData = {...siteData};
                        newData.leadership[type].role = e.target.value;
                        setSiteData(newData);
                      }} className="bg-slate-50 border-none rounded-xl h-12" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="summary">
            <Card className="border-none shadow-xl rounded-[40px] p-6 md:p-10 bg-white space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400">Section Title</label>
                <Input value={siteData.firmSummary.title} onChange={(e) => setSiteData({...siteData, firmSummary: {...siteData.firmSummary, title: e.target.value}})} className="bg-slate-50 border-none rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400">Main Description</label>
                <Textarea value={siteData.firmSummary.description} onChange={(e) => setSiteData({...siteData, firmSummary: {...siteData.firmSummary, description: e.target.value}})} className="bg-slate-50 border-none rounded-xl min-h-[150px]" />
              </div>
              
              <div className="space-y-4 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Impact Metrics</label>
                  <Button variant="ghost" size="sm" onClick={() => setSiteData({...siteData, firmSummary: {...siteData.firmSummary, stats: [...siteData.firmSummary.stats, {label: "", value: ""}]}})} className="text-primary rounded-lg">
                    <Plus className="h-4 w-4 mr-2" /> Add Metric
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {siteData.firmSummary.stats.map((stat: any, i: number) => (
                    <div key={i} className="bg-slate-50 p-6 rounded-2xl relative group">
                      <Button variant="ghost" size="sm" onClick={() => {
                        const newStats = siteData.firmSummary.stats.filter((_: any, idx: number) => idx !== i);
                        setSiteData({...siteData, firmSummary: {...siteData.firmSummary, stats: newStats}});
                      }} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      <Input value={stat.value} placeholder="Value" onChange={(e) => {
                        const newStats = [...siteData.firmSummary.stats];
                        newStats[i].value = e.target.value;
                        setSiteData({...siteData, firmSummary: {...siteData.firmSummary, stats: newStats}});
                      }} className="bg-white border-none rounded-lg h-10 font-bold mb-2" />
                      <Input value={stat.label} placeholder="Label" onChange={(e) => {
                        const newStats = [...siteData.firmSummary.stats];
                        newStats[i].label = e.target.value;
                        setSiteData({...siteData, firmSummary: {...siteData.firmSummary, stats: newStats}});
                      }} className="bg-white border-none rounded-lg h-8 text-xs" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <div className="space-y-6">
              <div className="flex justify-end">
                <Button onClick={() => setSiteData({...siteData, services: [...siteData.services, {title: "New Service", description: "", features: []}]})} className="bg-primary rounded-xl">
                  <Plus className="h-4 w-4 mr-2" /> Add New Service
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {siteData.services.map((service: any, i: number) => (
                  <Card key={i} className="p-6 md:p-8 border-none shadow-lg rounded-3xl bg-white relative group">
                    <Button variant="ghost" onClick={() => {
                      const newServices = siteData.services.filter((_: any, idx: number) => idx !== i);
                      setSiteData({...siteData, services: newServices});
                    }} className="absolute top-4 right-4 text-destructive opacity-0 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></Button>
                    <div className="space-y-4">
                      <Input value={service.title} onChange={(e) => {
                        const newServices = [...siteData.services];
                        newServices[i].title = e.target.value;
                        setSiteData({...siteData, services: newServices});
                      }} className="bg-slate-50 border-none font-bold text-lg" />
                      <Textarea value={service.description} onChange={(e) => {
                        const newServices = [...siteData.services];
                        newServices[i].description = e.target.value;
                        setSiteData({...siteData, services: newServices});
                      }} className="bg-slate-50 border-none text-sm h-24" />
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase text-slate-400">Features (one per line)</label>
                        <Textarea 
                          value={service.features.join('\n')} 
                          onChange={(e) => {
                            const newServices = [...siteData.services];
                            newServices[i].features = e.target.value.split('\n');
                            setSiteData({...siteData, services: newServices});
                          }}
                          className="bg-slate-50 border-none text-xs h-32" 
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="space-y-6">
              <div className="flex justify-end">
                <Button onClick={() => setSiteData({...siteData, testimonials: [...siteData.testimonials, {name: "Client Name", role: "Designation", content: "", stars: 5, image: ""}]})} className="bg-primary rounded-xl">
                  <Plus className="h-4 w-4 mr-2" /> Add Testimonial
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {siteData.testimonials.map((t: any, i: number) => (
                  <Card key={i} className="p-6 md:p-8 border-none shadow-lg rounded-3xl bg-white relative group">
                    <Button variant="ghost" onClick={() => {
                      const newT = siteData.testimonials.filter((_: any, idx: number) => idx !== i);
                      setSiteData({...siteData, testimonials: newT});
                    }} className="absolute top-4 right-4 text-destructive opacity-0 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></Button>
                    <div className="space-y-6">
                      <div className="flex items-center gap-6">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-slate-50 shadow-md bg-slate-100">
                          {t.image ? (
                            <Image src={t.image} alt="Client" fill className="object-cover" />
                          ) : (
                            <UserCircle className="h-full w-full text-slate-300" />
                          )}
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl font-bold h-8 text-[10px]" onClick={() => { setCurrentEditingPath(`testimonials.${i}.image`); fileInputRef.current?.click(); }}>
                          <Upload className="h-3 w-3 mr-2" /> Update Photo
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-slate-400">Name</label>
                          <Input value={t.name} onChange={(e) => {
                            const newT = [...siteData.testimonials];
                            newT[i].name = e.target.value;
                            setSiteData({...siteData, testimonials: newT});
                          }} className="bg-slate-50 border-none font-bold" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-slate-400">Role</label>
                          <Input value={t.role} onChange={(e) => {
                            const newT = [...siteData.testimonials];
                            newT[i].role = e.target.value;
                            setSiteData({...siteData, testimonials: newT});
                          }} className="bg-slate-50 border-none font-bold" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Review Content</label>
                        <Textarea value={t.content} onChange={(e) => {
                          const newT = [...siteData.testimonials];
                          newT[i].content = e.target.value;
                          setSiteData({...siteData, testimonials: newT});
                        }} className="bg-slate-50 border-none text-sm h-32" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <Card className="p-6 md:p-10 border-none shadow-xl rounded-[40px] bg-white">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-headline font-bold">Frequently Asked Questions</h3>
                <Button onClick={() => setSiteData({...siteData, faqs: [...siteData.faqs, {question: "New Question", answer: ""}]})} variant="outline" className="rounded-xl">
                  <Plus className="h-4 w-4 mr-2" /> Add FAQ
                </Button>
              </div>
              <div className="space-y-6">
                {siteData.faqs.map((faq: any, i: number) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-2xl relative group">
                    <Button variant="ghost" onClick={() => {
                      const newFaqs = siteData.faqs.filter((_: any, idx: number) => idx !== i);
                      setSiteData({...siteData, faqs: newFaqs});
                    }} className="absolute top-4 right-4 text-destructive opacity-0 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></Button>
                    <div className="space-y-4">
                      <Input value={faq.question} placeholder="Question" onChange={(e) => {
                        const newFaqs = [...siteData.faqs];
                        newFaqs[i].question = e.target.value;
                        setSiteData({...siteData, faqs: newFaqs});
                      }} className="bg-white border-none font-bold" />
                      <Textarea value={faq.answer} placeholder="Answer" onChange={(e) => {
                        const newFaqs = [...siteData.faqs];
                        newFaqs[i].answer = e.target.value;
                        setSiteData({...siteData, faqs: newFaqs});
                      }} className="bg-white border-none text-sm min-h-[100px]" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-none shadow-xl rounded-[40px] p-6 md:p-10 bg-white space-y-8">
                <div className="flex items-center gap-3 text-primary mb-2">
                  <Mail className="h-6 w-6" />
                  <h3 className="text-2xl font-headline font-bold">WhatsApp Settings</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-slate-400">WhatsApp Number</label>
                    <Input 
                      value={siteData.integrations?.whatsapp || ""} 
                      onChange={(e) => setSiteData({...siteData, integrations: {...siteData.integrations, whatsapp: e.target.value}})} 
                      placeholder="e.g. 916209779365"
                      className="bg-slate-50 border-none rounded-xl h-12" 
                    />
                  </div>
                </div>
              </Card>

              <Card className="border-none shadow-xl rounded-[40px] p-6 md:p-10 bg-white space-y-8">
                <div className="flex items-center gap-3 text-primary mb-2">
                  <Mail className="h-6 w-6" />
                  <h3 className="text-2xl font-headline font-bold">SMTP Settings</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-slate-400">SMTP User</label>
                    <Input 
                      value={siteData.integrations?.smtp?.user || ""} 
                      onChange={(e) => setSiteData({...siteData, integrations: {...siteData.integrations, smtp: {...siteData.integrations.smtp, user: e.target.value}}})} 
                      placeholder="user@example.com"
                      className="bg-slate-50 border-none rounded-xl h-12" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-slate-400">SMTP Password</label>
                    <Input 
                      type="password"
                      value={siteData.integrations?.smtp?.password || ""} 
                      onChange={(e) => setSiteData({...siteData, integrations: {...siteData.integrations, smtp: {...siteData.integrations.smtp, password: e.target.value}}})} 
                      className="bg-slate-50 border-none rounded-xl h-12" 
                    />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

        </Tabs>
      </main>

      <Dialog open={isCropperOpen} onOpenChange={setIsCropperOpen}>
        <DialogContent className="max-w-xl bg-white rounded-3xl p-0 overflow-hidden border-none">
          <DialogHeader className="p-8 pb-0">
            <DialogTitle className="text-2xl font-headline font-bold text-slate-900 uppercase tracking-tight">Adjust Image</DialogTitle>
          </DialogHeader>
          <div className="relative h-96 bg-black">
            {imageToCrop && (
              <Cropper 
                image={imageToCrop} 
                crop={crop} 
                zoom={zoom} 
                aspect={
                  currentEditingPath?.includes('logo') ? 600/260 : 
                  (currentEditingPath?.includes('hero') ? 4/5 : 
                  (currentEditingPath?.includes('firmSummary') ? 16/10 : 
                  (currentEditingPath?.includes('services') ? 16/9 : 1)))
                } 
                onCropChange={setCrop} 
                onZoomChange={setZoom} 
                onCropComplete={onCropComplete} 
              />
            )}
          </div>
          <div className="p-8">
            <Button disabled={isUploading} className="w-full h-14 bg-primary rounded-xl font-bold" onClick={saveCroppedImage}>
              {isUploading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Apply & Update Gallery"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}