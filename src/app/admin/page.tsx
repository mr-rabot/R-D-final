
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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
  Briefcase,
  Crop as CropIcon
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<string> => {
  const image = new window.Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  const targetSize = 600;
  canvas.width = targetSize;
  canvas.height = targetSize;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetSize,
    targetSize
  );

  return canvas.toDataURL("image/jpeg", 0.8);
};

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("control-center");
  const { toast } = useToast();

  const [founder, setFounder] = useState({ name: "", role: "", image: "" });
  const [coFounder, setCoFounder] = useState({ name: "", role: "", image: "" });

  useEffect(() => {
    if (isLoggedIn) {
      fetch('/api/leadership')
        .then(res => res.json())
        .then(data => {
          if (data.founder) setFounder(data.founder);
          if (data.coFounder) setCoFounder(data.coFounder);
        })
        .catch(() => toast({ variant: "destructive", title: "Sync Error", description: "Could not load leadership data." }));
    }
  }, [isLoggedIn, toast]);

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [currentEditingType, setCurrentEditingType] = useState<'founder' | 'co-founder' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'founder' | 'co-founder') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result as string);
        setCurrentEditingType(type);
        setIsCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveCroppedImage = async () => {
    if (imageToCrop && croppedAreaPixels && currentEditingType) {
      const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
      if (currentEditingType === 'founder') {
        setFounder(prev => ({ ...prev, image: croppedImage }));
      } else {
        setCoFounder(prev => ({ ...prev, image: croppedImage }));
      }
      setIsCropperOpen(false);
      setImageToCrop(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const syncToWebsite = async (type: 'founder' | 'co-founder') => {
    const updatedData = {
      founder: type === 'founder' ? founder : founder,
      coFounder: type === 'co-founder' ? coFounder : coFounder
    };

    try {
      const res = await fetch('/api/leadership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        toast({ title: "Sync Successful", description: "Leadership profile updated on the website." });
      }
    } catch {
      toast({ variant: "destructive", title: "Sync Failed", description: "Failed to push updates to local storage." });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "prexani.tech@gmail.com" && password === "Admin@9343") {
      setIsLoggedIn(true);
      toast({ title: "Authenticated", description: "Welcome to R&D OPS Hub." });
    } else {
      toast({ variant: "destructive", title: "Access Denied", description: "Invalid credentials." });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
          <div className="bg-primary p-12 text-center text-white">
            <ShieldCheck className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-headline font-bold uppercase">Operations Hub</h2>
            <p className="text-blue-100/60 text-[10px] font-bold uppercase tracking-widest mt-2">Secure Staff Access</p>
          </div>
          <CardContent className="p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400">Identity</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-xl h-12 bg-slate-50 border-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400">Token</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded-xl h-12 bg-slate-50 border-none" />
              </div>
              <Button type="submit" className="w-full bg-primary h-14 rounded-xl font-bold shadow-lg">Authenticate</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, currentEditingType || 'founder')} />
      
      <aside className={cn("fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-white flex flex-col lg:relative lg:translate-x-0 transition-transform", isSidebarOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="p-10 border-b border-white/5">
          <h1 className="text-xl font-headline font-bold">R&D OPS</h1>
        </div>
        <nav className="flex-grow p-8 space-y-4">
          <div onClick={() => setActiveTab("control-center")} className={cn("p-4 rounded-xl cursor-pointer flex gap-4 items-center", activeTab === "control-center" ? "bg-primary text-white" : "text-slate-400 hover:text-white")}>
            <LayoutDashboard className="h-5 w-5" /> <span>Command</span>
          </div>
          <div onClick={() => setActiveTab("team")} className={cn("p-4 rounded-xl cursor-pointer flex gap-4 items-center", activeTab === "team" ? "bg-primary text-white" : "text-slate-400 hover:text-white")}>
            <Users className="h-5 w-5" /> <span>Leadership</span>
          </div>
        </nav>
        <div className="p-8">
          <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-white" onClick={() => setIsLoggedIn(false)}>
            <LogOut className="h-5 w-5 mr-3" /> Sign Out
          </Button>
        </div>
      </aside>

      <main className="flex-grow p-6 md:p-12 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="control-center">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
               {[{ label: "Sync Active", icon: TrendingUp }, { label: "Security", icon: ShieldCheck }].map((item, i) => (
                 <Card key={i} className="p-8 border-none shadow-sm rounded-3xl bg-white">
                   <item.icon className="h-8 w-8 text-primary mb-4" />
                   <p className="text-[10px] font-bold uppercase text-slate-400">{item.label}</p>
                   <h3 className="text-2xl font-bold">Nominal</h3>
                 </Card>
               ))}
             </div>
          </TabsContent>

          <TabsContent value="team">
            <div className="grid lg:grid-cols-2 gap-8">
              {[
                { data: founder, setData: setFounder, type: 'founder', title: "Founder Profile" },
                { data: coFounder, setData: setCoFounder, type: 'co-founder', title: "Co-Founder Profile" }
              ].map((profile) => (
                <Card key={profile.type} className="border-none shadow-xl rounded-[40px] p-10 bg-white">
                  <h3 className="text-2xl font-headline font-bold mb-6">{profile.title}</h3>
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-md">
                        {profile.data.image && <Image src={profile.data.image} alt="Profile" fill className="object-cover" />}
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl font-bold" onClick={() => { setCurrentEditingType(profile.type as any); fileInputRef.current?.click(); }}>
                        <Upload className="h-4 w-4 mr-2" /> Upload Pic
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Name</label>
                        <Input value={profile.data.name} onChange={(e) => profile.setData({ ...profile.data, name: e.target.value })} className="bg-slate-50 border-none rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Role</label>
                        <Input value={profile.data.role} onChange={(e) => profile.setData({ ...profile.data, role: e.target.value })} className="bg-slate-50 border-none rounded-xl" />
                      </div>
                    </div>
                    <Button onClick={() => syncToWebsite(profile.type as any)} className="w-full h-14 bg-primary rounded-2xl font-bold shadow-lg">Sync to Website</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isCropperOpen} onOpenChange={setIsCropperOpen}>
        <DialogContent className="max-w-xl bg-white rounded-3xl p-0 overflow-hidden border-none">
          <div className="relative h-96 bg-black">
            {imageToCrop && <Cropper image={imageToCrop} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />}
          </div>
          <div className="p-8">
            <Button className="w-full h-14 bg-primary rounded-xl font-bold" onClick={saveCroppedImage}>Apply Crop</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
