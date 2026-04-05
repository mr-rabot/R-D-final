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
  Save,
  Rocket,
  Menu,
  X,
  Beaker,
  Settings,
  Loader2,
  Image as ImageIcon,
  GalleryVertical,
  Users,
  BookOpen,
  MessageSquare
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

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => {
      const index = parseInt(part);
      return acc && (!isNaN(index) ? acc[index] : acc[part]);
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
          toast({ title: "Asset Uploaded", description: "Image saved to root folder. Push live to finalize." });
        }
      } catch (err) {
        toast({ variant: "destructive", title: "Upload Error", description: "Failed to save image." });
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
        toast({ title: "Live Update Successful", description: "Content persisted to root folder database." });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Sync Error", description: "Failed to save changes." });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "prexani.tech@gmail.com" && password === "Admin@9343") {
      setIsLoggedIn(true);
      localStorage.setItem("rd_admin_session", "active");
      toast({ title: "Authenticated", description: "Admin access granted." });
    } else {
      toast({ variant: "destructive", title: "Access Denied", description: "Invalid credentials." });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("rd_admin_session");
    toast({ title: "Signed Out", description: "Session ended." });
  };

  if (isLoadingData) return <div className="min-h-screen flex items-center justify-center font-headline font-bold text-2xl">Loading R&DOPS...</div>;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[30px] overflow-hidden bg-white">
          <div className="bg-primary p-8 text-center text-white">
            <ShieldCheck className="h-10 w-10 mx-auto mb-4" />
            <h2 className="text-xl font-headline font-bold uppercase tracking-tight">R&DOPS</h2>
          </div>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border p-3 rounded-xl h-12" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border p-3 rounded-xl h-12" />
              <Button type="submit" className="w-full h-14 rounded-xl font-bold shadow-lg">Authenticate</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const navigationItems = [
    { id: "media", icon: GalleryVertical, label: "Media Hub" },
    { id: "hero", icon: Rocket, label: "Hero & Stats" },
    { id: "leadership", icon: Users, label: "Leadership" },
    { id: "services", icon: Zap, label: "Services" },
    { id: "settings", icon: Settings, label: "Integrations" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row relative">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, currentEditingPath || '')} />
      
      <aside className={cn(
        "fixed inset-0 z-[90] bg-slate-900 text-white flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-72",
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 border-b border-white/5">
          <h1 className="text-xl font-headline font-bold">R&DOPS</h1>
        </div>
        <nav className="flex-grow p-4 space-y-2">
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
        <div className="p-4 border-t border-white/5">
          <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-white" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-3" /> Sign Out
          </Button>
        </div>
      </aside>

      <main className="flex-grow p-6 md:p-12 overflow-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-headline font-bold text-slate-900 uppercase">{activeTab}</h2>
          <Button disabled={isSyncing} onClick={saveToSite} className="bg-primary rounded-xl font-bold shadow-xl px-8 h-12 flex gap-2">
            {isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isSyncing ? "Syncing..." : "Push Live"}
          </Button>
        </div>

        <Tabs value={activeTab} className="space-y-8">
          <TabsContent value="media">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8 space-y-4">
                <h3 className="text-xl font-bold">Brand Logo</h3>
                <div className="relative h-32 w-full bg-slate-100 rounded-xl flex items-center justify-center">
                  {localSiteData?.brand?.logo && <Image src={localSiteData.brand.logo} alt="Logo" fill className="object-contain p-4" unoptimized />}
                </div>
                <Button variant="outline" className="w-full" onClick={() => { setCurrentEditingPath(`brand.logo`); fileInputRef.current?.click(); }}>Replace Logo</Button>
              </Card>
              <Card className="p-8 space-y-4">
                <h3 className="text-xl font-bold">Hero Image</h3>
                <div className="relative h-32 w-full bg-slate-100 rounded-xl">
                  {localSiteData?.hero?.image && <Image src={localSiteData.hero.image} alt="Hero" fill className="object-cover rounded-xl" unoptimized />}
                </div>
                <Button variant="outline" className="w-full" onClick={() => { setCurrentEditingPath(`hero.image`); fileInputRef.current?.click(); }}>Change Hero</Button>
              </Card>
             </div>
          </TabsContent>

          <TabsContent value="hero">
            <Card className="p-8 space-y-6">
              <Input value={localSiteData?.hero?.title} onChange={(e) => setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, title: e.target.value}})} placeholder="Hero Title" />
              <Textarea value={localSiteData?.hero?.subtitle} onChange={(e) => setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, subtitle: e.target.value}})} placeholder="Hero Subtitle" />
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <div className="grid md:grid-cols-2 gap-6">
              {localSiteData?.services?.map((s: any, i: number) => (
                <Card key={i} className="p-6 space-y-4">
                  <Input value={s.title} onChange={(e) => {
                    const newServices = [...localSiteData.services];
                    newServices[i].title = e.target.value;
                    setLocalSiteData({...localSiteData, services: newServices});
                  }} />
                  <Textarea value={s.description} onChange={(e) => {
                    const newServices = [...localSiteData.services];
                    newServices[i].description = e.target.value;
                    setLocalSiteData({...localSiteData, services: newServices});
                  }} />
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-8 space-y-4">
              <h3 className="text-xl font-bold">WhatsApp</h3>
              <Input 
                value={localSiteData?.integrations?.whatsapp || ""} 
                onChange={(e) => setLocalSiteData({...localSiteData, integrations: {...localSiteData.integrations, whatsapp: e.target.value}})} 
                placeholder="WhatsApp Number" 
              />
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isCropperOpen} onOpenChange={setIsCropperOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden">
          <div className="relative h-96 bg-black">
            {imageToCrop && (
              <Cropper 
                image={imageToCrop} 
                crop={crop} 
                zoom={zoom} 
                aspect={currentEditingPath?.includes('logo') ? 600/260 : (currentEditingPath?.includes('hero') ? 4/5 : 16/9)} 
                onCropChange={setCrop} 
                onZoomChange={setZoom} 
                onCropComplete={onCropComplete} 
              />
            )}
          </div>
          <div className="p-8 grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => setIsCropperOpen(false)}>Cancel</Button>
            <Button disabled={isUploading} onClick={saveCroppedImage}>
              {isUploading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Save to Server"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
