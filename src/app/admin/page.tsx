
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  Users, 
  LogOut, 
  ShieldCheck, 
  Zap, 
  Plus, 
  Trash2, 
  Upload, 
  UserCircle,
  FileText,
  CreditCard,
  MessageSquare,
  HelpCircle,
  Save,
  Rocket
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
  DialogDescription 
} from "@/components/ui/dialog";

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
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("hero");
  const { toast } = useToast();

  const [siteData, setSiteData] = useState<any>(null);

  // Auth Persistence
  useEffect(() => {
    const session = localStorage.getItem("rd_admin_session");
    if (session === "active") {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/leadership');
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
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

  // Image Cropping Logic
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
      const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
      const newData = { ...siteData };
      
      // Handle nested paths like 'leadership.founder.image'
      const parts = currentEditingPath.split('.');
      let current = newData;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = croppedImage;

      setSiteData(newData);
      setIsCropperOpen(false);
      setImageToCrop(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const saveToSite = async () => {
    try {
      const res = await fetch('/api/leadership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteData)
      });
      if (res.ok) {
        toast({ title: "Sync Successful", description: "Website content updated successfully." });
      } else {
        throw new Error("Sync Failed");
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to sync updates." });
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

  if (!siteData) return <div className="p-20 text-center font-bold">Initializing Data...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, currentEditingPath || '')} />
      
      <aside className="w-full lg:w-72 bg-slate-900 text-white flex flex-col">
        <div className="p-8 border-b border-white/5">
          <h1 className="text-xl font-headline font-bold">R&D OPS HUB</h1>
          <p className="text-[9px] text-blue-400 font-bold uppercase tracking-widest mt-1">Management Portal</p>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {[
            { id: "hero", icon: Rocket, label: "Hero & Stats" },
            { id: "leadership", icon: Users, label: "Leadership" },
            { id: "summary", icon: FileText, label: "Firm Summary" },
            { id: "services", icon: Zap, label: "Services" },
            { id: "pricing", icon: CreditCard, label: "Pricing" },
            { id: "faq", icon: HelpCircle, label: "FAQ" }
          ].map((item) => (
            <div 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
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
        <div className="p-4 mt-auto">
          <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-white hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-3" /> Sign Out
          </Button>
        </div>
      </aside>

      <main className="flex-grow p-6 md:p-12 overflow-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-headline font-bold text-slate-900 uppercase tracking-tight">
              {activeTab.replace("-", " ")}
            </h2>
            <p className="text-sm text-slate-400">Manage your website content in real-time</p>
          </div>
          <Button onClick={saveToSite} className="bg-primary rounded-xl font-bold shadow-xl px-8 h-12 flex gap-2">
            <Save className="h-4 w-4" /> Push Updates to Site
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          
          <TabsContent value="hero">
            <Card className="border-none shadow-xl rounded-[40px] p-10 bg-white space-y-8">
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
                <Card key={type} className="border-none shadow-xl rounded-[40px] p-10 bg-white">
                  <h3 className="text-2xl font-headline font-bold mb-6 capitalize">{type === 'founder' ? 'Founder (Om Prakash Sinha)' : 'Co-Founder'} Profile</h3>
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-md bg-slate-100">
                        {siteData.leadership[type].image ? (
                          <Image src={siteData.leadership[type].image} alt="Profile" fill className="object-cover" />
                        ) : (
                          <UserCircle className="h-full w-full text-slate-300" />
                        )}
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl font-bold" onClick={() => { setCurrentEditingPath(`leadership.${type}.image`); fileInputRef.current?.click(); }}>
                        <Upload className="h-4 w-4 mr-2" /> Change Photo
                      </Button>
                    </div>
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
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="summary">
            <Card className="border-none shadow-xl rounded-[40px] p-10 bg-white space-y-8">
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
                      <Input value={stat.value} placeholder="Value (e.g. 500+)" onChange={(e) => {
                        const newStats = [...siteData.firmSummary.stats];
                        newStats[i].value = e.target.value;
                        setSiteData({...siteData, firmSummary: {...siteData.firmSummary, stats: newStats}});
                      }} className="bg-white border-none rounded-lg h-10 font-bold mb-2" />
                      <Input value={stat.label} placeholder="Label (e.g. Papers)" onChange={(e) => {
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
                  <Card key={i} className="p-8 border-none shadow-lg rounded-3xl bg-white relative group">
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

          <TabsContent value="faq">
            <Card className="p-10 border-none shadow-xl rounded-[40px] bg-white">
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

          <TabsContent value="pricing">
             <div className="grid lg:grid-cols-3 gap-8">
               {siteData.pricing.map((plan: any, i: number) => (
                 <Card key={i} className={cn("p-8 border-none shadow-xl rounded-[40px] bg-white relative", plan.highlight && "ring-4 ring-primary/20")}>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Plan Name</label>
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] uppercase font-bold text-slate-400">Highlight</span>
                           <input type="checkbox" checked={plan.highlight} onChange={(e) => {
                             const newPricing = [...siteData.pricing];
                             newPricing[i].highlight = e.target.checked;
                             setSiteData({...siteData, pricing: newPricing});
                           }} />
                        </div>
                      </div>
                      <Input value={plan.name} onChange={(e) => {
                        const newPricing = [...siteData.pricing];
                        newPricing[i].name = e.target.value;
                        setSiteData({...siteData, pricing: newPricing});
                      }} className="bg-slate-50 border-none font-bold" />
                      
                      <label className="text-[10px] font-bold uppercase text-slate-400">Description</label>
                      <Textarea value={plan.description} onChange={(e) => {
                        const newPricing = [...siteData.pricing];
                        newPricing[i].description = e.target.value;
                        setSiteData({...siteData, pricing: newPricing});
                      }} className="bg-slate-50 border-none h-20 text-sm" />
                      
                      <label className="text-[10px] font-bold uppercase text-slate-400">Features</label>
                      <Textarea 
                        value={plan.features.join('\n')} 
                        onChange={(e) => {
                          const newPricing = [...siteData.pricing];
                          newPricing[i].features = e.target.value.split('\n');
                          setSiteData({...siteData, pricing: newPricing});
                        }}
                        className="bg-slate-50 border-none h-40 text-xs" 
                      />
                    </div>
                 </Card>
               ))}
             </div>
          </TabsContent>

        </Tabs>
      </main>

      <Dialog open={isCropperOpen} onOpenChange={setIsCropperOpen}>
        <DialogContent className="max-w-xl bg-white rounded-3xl p-0 overflow-hidden border-none">
          <DialogHeader className="sr-only">
            <DialogTitle>Crop Image</DialogTitle>
            <DialogDescription>
              Adjust the crop area for the selected profile image.
            </DialogDescription>
          </DialogHeader>
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
