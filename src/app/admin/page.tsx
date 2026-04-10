
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
  Send,
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
  Globe,
  Settings2,
  FileType,
  FileUp,
  Facebook,
  Instagram,
  Linkedin,
  ListTodo,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Download,
  Lock,
  Mail,
  ArrowLeft,
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
  DialogTitle
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select as UISelect, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

  // Lockout State
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);

  // Forgot Password State
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isSendingForgot, setIsSendingForgot] = useState(false);

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [currentEditingPath, setCurrentEditingPath] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{path: string, index: number} | null>(null);

  // Account settings temporary state
  const [currentPasswordConfirm, setCurrentPasswordConfirm] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resourceFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check lockout first
    const storedLockout = localStorage.getItem("rd_admin_lockout_until");
    if (storedLockout) {
      const until = parseInt(storedLockout);
      if (until > Date.now()) {
        setLockoutUntil(until);
      } else {
        localStorage.removeItem("rd_admin_lockout_until");
      }
    }

    fetch('/api/leadership')
      .then(res => res.json())
      .then(data => {
        setLocalSiteData(data);
        setIsLoadingData(false);

        // Session Validation Logic
        const session = localStorage.getItem("rd_admin_session");
        const sessionTime = localStorage.getItem("rd_admin_session_time");
        const lastChanged = data.adminCredentials?.lastChanged || 0;

        if (session === "active" && sessionTime && parseInt(sessionTime) > lastChanged) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          if (session === "active") {
            localStorage.removeItem("rd_admin_session");
            localStorage.removeItem("rd_admin_session_time");
            toast({ variant: "destructive", title: "Session Expired", description: "Security settings updated. Please log in again." });
          }
        }
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
            toast({ title: "Resource Uploaded", description: `File linked: ${formatBytes(file.size)}` });
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
        toast({ title: "Sync Successful", description: "All changes are now live." });
      } else {
        throw new Error("Sync failed");
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Persistence Error", description: "Failed to save data." });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lockoutUntil && lockoutUntil > Date.now()) {
      toast({ variant: "destructive", title: "Device Blocked", description: `Too many attempts. Try again later.` });
      return;
    }

    const storedCreds = localSiteData?.adminCredentials || { email: "prexani.tech@gmail.com", password: "Admin@9343" };
    
    if (email === storedCreds.email && password === storedCreds.password) {
      setIsLoggedIn(true);
      localStorage.setItem("rd_admin_session", "active");
      localStorage.setItem("rd_admin_session_time", Date.now().toString());
      localStorage.removeItem("rd_login_attempts");
      localStorage.removeItem("rd_admin_lockout_until");
      toast({ title: "Access Granted", description: "Welcome back." });
    } else {
      const attempts = parseInt(localStorage.getItem("rd_login_attempts") || "0") + 1;
      localStorage.setItem("rd_login_attempts", attempts.toString());
      
      if (attempts >= 3) {
        const until = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem("rd_admin_lockout_until", until.toString());
        setLockoutUntil(until);
        toast({ variant: "destructive", title: "Device Locked", description: "3 failed attempts. Blocked for 24 hours." });
      } else {
        toast({ variant: "destructive", title: "Login Failed", description: `Invalid credentials. ${3 - attempts} attempts remaining.` });
      }
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    
    setIsSendingForgot(true);
    try {
      // Send recovery request to configured support email
      const response = await fetch("https://formsubmit.co/ajax/support.rdservices@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail,
          _subject: "Admin Password Recovery Request",
          message: `A password recovery request has been initiated for the admin account: ${forgotEmail}. Please verify this request manually.`
        }),
      });
      
      if (response.ok) {
        toast({ title: "Recovery Requested", description: "A link and instructions have been sent to your primary email address." });
        setShowForgot(false);
      } else {
        throw new Error("API rejection");
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Request Failed", description: "Could not reach the security desk. Try WhatsApp support." });
    } finally {
      setIsSendingForgot(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("rd_admin_session");
    localStorage.removeItem("rd_admin_session_time");
    toast({ title: "Signed Out", description: "Session ended." });
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
    toast({ title: "Entry Created", description: `Added item to ${path}.` });
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

  const addFormField = () => {
    const newData = JSON.parse(JSON.stringify(localSiteData));
    if (!newData.contactForm) newData.contactForm = { fields: [] };
    newData.contactForm.fields.push({
      id: `field_${Date.now()}`,
      label: "New Field",
      type: "text",
      placeholder: "Enter details",
      required: true
    });
    setLocalSiteData(newData);
    toast({ title: "Field Added", description: "New registry field created." });
  };

  const updateFormField = (index: number, updates: any) => {
    const newData = JSON.parse(JSON.stringify(localSiteData));
    newData.contactForm.fields[index] = { ...newData.contactForm.fields[index], ...updates };
    setLocalSiteData(newData);
  };

  const deleteFormField = (index: number) => {
    const newData = JSON.parse(JSON.stringify(localSiteData));
    newData.contactForm.fields.splice(index, 1);
    setLocalSiteData(newData);
    toast({ title: "Field Removed", description: "Registry field deleted." });
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    const newData = JSON.parse(JSON.stringify(localSiteData));
    const fields = newData.contactForm.fields;
    if (direction === 'up' && index > 0) {
      [fields[index], fields[index - 1]] = [fields[index - 1], fields[index]];
    } else if (direction === 'down' && index < fields.length - 1) {
      [fields[index], fields[index + 1]] = [fields[index + 1], fields[index]];
    }
    setLocalSiteData(newData);
  };

  const addFieldOption = (fieldIndex: number) => {
    const newData = JSON.parse(JSON.stringify(localSiteData));
    if (!newData.contactForm.fields[fieldIndex].options) {
      newData.contactForm.fields[fieldIndex].options = [];
    }
    newData.contactForm.fields[fieldIndex].options.push("New Option");
    setLocalSiteData(newData);
  };

  const updateFieldOption = (fieldIndex: number, optionIndex: number, value: string) => {
    const newData = JSON.parse(JSON.stringify(localSiteData));
    newData.contactForm.fields[fieldIndex].options[optionIndex] = value;
    setLocalSiteData(newData);
  };

  const removeFieldOption = (fieldIndex: number, optionIndex: number) => {
    const newData = JSON.parse(JSON.stringify(localSiteData));
    newData.contactForm.fields[fieldIndex].options.splice(optionIndex, 1);
    setLocalSiteData(newData);
  };

  const updateAdminAccount = () => {
    const storedPass = localSiteData?.adminCredentials?.password;
    
    if (currentPasswordConfirm !== storedPass) {
      toast({ variant: "destructive", title: "Verification Failed", description: "Current password is incorrect." });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      toast({ variant: "destructive", title: "Security Error", description: "New passwords do not match." });
      return;
    }

    const newData = JSON.parse(JSON.stringify(localSiteData));
    if (newPassword) {
      newData.adminCredentials.password = newPassword;
      newData.adminCredentials.lastChanged = Date.now();
    }
    
    setLocalSiteData(newData);
    setCurrentPasswordConfirm("");
    setNewPassword("");
    setConfirmPassword("");
    toast({ title: "Security Staged", description: "Credentials updated. Click 'Push Live' to finalize and invalidate all sessions." });
  };

  if (isLoadingData) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <div className="font-headline font-bold text-lg text-slate-900 tracking-tight uppercase">Initializing Dashboard...</div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center p-4 relative overflow-hidden">
        <Card className="w-full max-w-sm border-none shadow-2xl rounded-[32px] overflow-hidden bg-white z-10 transition-all duration-500">
          <div className="bg-primary p-8 text-center text-white relative">
            {showForgot ? <Mail className="h-10 w-10 mx-auto mb-3" /> : <ShieldCheck className="h-10 w-10 mx-auto mb-3" />}
            <h2 className="text-xl font-headline font-bold uppercase tracking-tight">
              {showForgot ? "Access Recovery" : "R&DServices Ops"}
            </h2>
          </div>
          <CardContent className="p-6 lg:p-8">
            {lockoutUntil && lockoutUntil > Date.now() ? (
              <div className="text-center space-y-4 py-4">
                <div className="bg-red-50 text-red-500 p-4 rounded-2xl flex flex-col items-center gap-2">
                  <AlertCircle className="h-10 w-10" />
                  <p className="font-bold text-sm uppercase">Device Blocked</p>
                </div>
                <p className="text-xs text-slate-500 italic">This device has been locked out for 24 hours due to multiple failed login attempts. Contact support if this was an error.</p>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">
                  Unlocks: {new Date(lockoutUntil).toLocaleString()}
                </div>
              </div>
            ) : showForgot ? (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400 tracking-widest ml-1">Admin Email</label>
                  <Input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="Enter registered email" className="rounded-xl h-12 bg-slate-50 border-none" required />
                </div>
                <div className="pt-2">
                  <Button type="submit" disabled={isSendingForgot} className="w-full h-14 rounded-xl font-bold text-md flex gap-2">
                    {isSendingForgot ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {isSendingForgot ? "Requesting..." : "Send Recovery Link"}
                  </Button>
                  <Button variant="ghost" type="button" onClick={() => setShowForgot(false)} className="w-full h-12 mt-2 text-slate-400 font-bold text-xs rounded-xl">
                    <ArrowLeft className="h-3 w-3 mr-2" /> Back to Login
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400 tracking-widest ml-1">Admin Email</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-xl h-12 bg-slate-50 border-none" required />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">Key Password</label>
                    <button type="button" onClick={() => setShowForgot(true)} className="text-[9px] font-bold text-primary uppercase tracking-widest hover:underline">Forgot?</button>
                  </div>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded-xl h-12 bg-slate-50 border-none" required />
                </div>
                <Button type="submit" className="w-full h-14 rounded-xl font-bold text-md">Authenticate</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const navigationItems = [
    { id: "media", icon: GalleryVertical, label: "Brand Assets" },
    { id: "settings", icon: Settings2, label: "Architecture" },
    { id: "account", icon: ShieldCheck, label: "Security Hub" },
    { id: "hero", icon: Rocket, label: "Landing" },
    { id: "summary", icon: Layout, label: "Synthesis" },
    { id: "leadership", icon: Users, label: "Profiles" },
    { id: "services", icon: Zap, label: "Services" },
    { id: "pricing", icon: DollarSign, label: "Pricing" },
    { id: "testimonials", icon: Star, label: "Testimonials" },
    { id: "faqs", icon: HelpCircle, label: "FAQs" },
    { id: "blog", icon: Newspaper, label: "Blog" },
    { id: "resources", icon: Download, label: "Hub" },
    { id: "form", icon: ListTodo, label: "Form Architect" },
    { id: "control", icon: Settings, label: "Control" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row relative">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, currentEditingPath || '')} />
      <input type="file" ref={resourceFileInputRef} className="hidden" onChange={(e) => handleResourceFileChange(e, parseInt(currentEditingPath || '0'))} />
      
      <aside className={cn(
        "fixed inset-0 z-[100] bg-[#0a0f1c] text-white flex flex-col transition-transform duration-500 lg:relative lg:translate-x-0 lg:w-64 border-r border-white/5",
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-headline text-2xl font-bold tracking-tight">R&DServices</h1>
            <Button variant="ghost" size="icon" className="lg:hidden text-slate-400" onClick={() => setIsMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 space-y-1">
          {navigationItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
              className={cn(
                "p-3 rounded-xl cursor-pointer flex gap-3 items-center transition-all",
                activeTab === item.id ? "bg-primary text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="h-4 w-4" /> 
              <span className="font-bold text-xs">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="p-4 mt-auto space-y-2">
          <Link href="/" target="_blank" className="flex items-center gap-2 p-3 rounded-xl bg-white/5 text-slate-300 hover:text-white transition-colors">
            <ExternalLink className="h-3 w-3" />
            <span className="text-[10px] font-bold">Live Site</span>
          </Link>
          <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-red-400 rounded-xl p-3" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> <span className="font-bold text-xs">Sign Out</span>
          </Button>
        </div>
      </aside>

      <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-auto relative">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden bg-white shadow-sm" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="text-xl lg:text-2xl font-headline font-bold text-slate-900 uppercase tracking-tight">
              {navigationItems.find(n => n.id === activeTab)?.label || activeTab}
            </h2>
          </div>
          <Button disabled={isSyncing} onClick={saveToSite} className="bg-primary rounded-xl font-bold px-6 h-12 flex gap-2">
            {isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isSyncing ? "Syncing..." : "Push Live"}
          </Button>
        </header>

        <Tabs value={activeTab} className="space-y-8">
          <TabsContent value="media">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 space-y-4 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="text-sm font-bold text-slate-900">Brand Logo</h3>
                <div className="relative h-32 w-full bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-100">
                  {localSiteData?.brand?.logo ? (
                    <Image src={localSiteData.brand.logo} alt="Logo" fill className="object-contain p-4" unoptimized />
                  ) : <ImageIcon className="h-8 w-8 opacity-20" />}
                </div>
                <Button variant="outline" className="w-full h-10 rounded-xl" onClick={() => { setCurrentEditingPath(`brand.logo`); fileInputRef.current?.click(); }}>Replace</Button>
              </Card>
              <Card className="p-4 space-y-4 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="text-sm font-bold text-slate-900">Hero Visual</h3>
                <div className="relative h-32 w-full bg-slate-50 rounded-2xl overflow-hidden border-2 border-dashed border-slate-100">
                  {localSiteData?.hero?.image ? (
                    <Image src={localSiteData.hero.image} alt="Hero" fill className="object-cover" unoptimized />
                  ) : <ImageIcon className="h-8 w-8 opacity-20" />}
                </div>
                <Button variant="outline" className="w-full h-10 rounded-xl" onClick={() => { setCurrentEditingPath(`hero.image`); fileInputRef.current?.click(); }}>Replace</Button>
              </Card>
             </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
               <div className="grid md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Brand Name</label>
                    <Input value={localSiteData?.brand?.name} onChange={(e) => setLocalSiteData({...localSiteData, brand: {...localSiteData.brand, name: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Tagline</label>
                    <Input value={localSiteData?.brand?.tagline} onChange={(e) => setLocalSiteData({...localSiteData, brand: {...localSiteData.brand, tagline: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none" />
                 </div>
               </div>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Identification</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Primary Admin Email</label>
                    <Input 
                      value={localSiteData?.adminCredentials?.email} 
                      onChange={(e) => setLocalSiteData({...localSiteData, adminCredentials: {...localSiteData.adminCredentials, email: e.target.value}})} 
                      className="rounded-xl h-12 bg-slate-50 border-none font-medium" 
                    />
                  </div>
                  <p className="text-[10px] italic text-slate-400 leading-relaxed">
                    Note: Changes to email take effect immediately upon sync.
                  </p>
                </div>
              </Card>

              <Card className="lg:col-span-2 p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="p-2 bg-red-50 rounded-lg text-red-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Security Key Overhaul</h3>
                    <p className="text-[10px] text-slate-400">Update credentials and invalidate all sessions.</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-red-500 uppercase">Current Security Key *</label>
                      <Input 
                        type="password"
                        value={currentPasswordConfirm} 
                        onChange={(e) => setCurrentPasswordConfirm(e.target.value)} 
                        placeholder="Verify identity"
                        className="rounded-xl h-12 bg-red-50/30 border-red-100" 
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase">New Key Password</label>
                      <Input 
                        type="password"
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        placeholder="Leave blank to keep current"
                        className="rounded-xl h-12 bg-slate-50 border-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase">Confirm New Key</label>
                      <Input 
                        type="password"
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Repeat new key"
                        className="rounded-xl h-12 bg-slate-50 border-none" 
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t flex flex-col md:flex-row items-center gap-4">
                  <Button 
                    onClick={updateAdminAccount} 
                    className="w-full md:w-auto px-8 rounded-xl font-bold bg-slate-900 hover:bg-black h-12"
                  >
                    Authorize Security Change
                  </Button>
                  <p className="text-[10px] text-slate-400 italic">Changing the password will automatically log out all devices globally.</p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hero">
            <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Badge</label>
                  <Input value={localSiteData?.hero?.badge} onChange={(e) => setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, badge: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Title</label>
                  <Input value={localSiteData?.hero?.title} onChange={(e) => setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, title: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Subtitle</label>
                <Textarea value={localSiteData?.hero?.subtitle} onChange={(e) => setLocalSiteData({...localSiteData, hero: {...localSiteData.hero, subtitle: e.target.value}})} className="rounded-xl min-h-[100px] bg-slate-50 border-none" />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="summary">
            <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Summary Title</label>
                  <Input value={localSiteData?.firmSummary?.title} onChange={(e) => setLocalSiteData({...localSiteData, firmSummary: {...localSiteData.firmSummary, title: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Description</label>
                  <Textarea value={localSiteData?.firmSummary?.description} onChange={(e) => setLocalSiteData({...localSiteData, firmSummary: {...localSiteData.firmSummary, description: e.target.value}})} className="rounded-xl min-h-[100px] bg-slate-50 border-none" />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-900 border-b pb-2">Synthesis Stats</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {localSiteData?.firmSummary?.stats?.map((stat: any, i: number) => (
                    <div key={i} className="flex gap-2">
                      <Input value={stat.label} onChange={(e) => {
                        const newData = JSON.parse(JSON.stringify(localSiteData));
                        newData.firmSummary.stats[i].label = e.target.value;
                        setLocalSiteData(newData);
                      }} placeholder="Label" className="rounded-xl bg-slate-50 border-none" />
                      <Input value={stat.value} onChange={(e) => {
                        const newData = JSON.parse(JSON.stringify(localSiteData));
                        newData.firmSummary.stats[i].value = e.target.value;
                        setLocalSiteData(newData);
                      }} placeholder="Value" className="rounded-xl bg-slate-50 border-none" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="leadership">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="text-md font-headline font-bold text-slate-900 border-b pb-3">Founder Profile</h3>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative h-24 w-24 bg-slate-50 rounded-full overflow-hidden shadow-md">
                    {localSiteData?.leadership?.founder?.image ? (
                      <Image src={localSiteData.leadership.founder.image} alt="Founder" fill className="object-cover" unoptimized />
                    ) : <UserCircle className="h-12 w-12 text-slate-200" />}
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary font-bold" onClick={() => { setCurrentEditingPath(`leadership.founder.image`); fileInputRef.current?.click(); }}>Update Photo</Button>
                </div>
                <div className="space-y-3">
                  <Input value={localSiteData?.leadership?.founder?.name} onChange={(e) => setLocalSiteData({...localSiteData, leadership: {...localSiteData.leadership, founder: {...localSiteData.leadership.founder, name: e.target.value}}})} placeholder="Name" className="rounded-xl h-10 bg-slate-50 border-none" />
                  <Input value={localSiteData?.leadership?.founder?.role} onChange={(e) => setLocalSiteData({...localSiteData, leadership: {...localSiteData.leadership, founder: {...localSiteData.leadership.founder, role: e.target.value}}})} placeholder="Role" className="rounded-xl h-10 bg-slate-50 border-none" />
                </div>
              </Card>
              <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="text-md font-headline font-bold text-slate-900 border-b pb-3">Co-Founder Profile</h3>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative h-24 w-24 bg-slate-50 rounded-full overflow-hidden shadow-md">
                    {localSiteData?.leadership?.coFounder?.image ? (
                      <Image src={localSiteData.leadership.coFounder.image} alt="Co-Founder" fill className="object-cover" unoptimized />
                    ) : <UserCircle className="h-12 w-12 text-slate-200" />}
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary font-bold" onClick={() => { setCurrentEditingPath(`leadership.coFounder.image`); fileInputRef.current?.click(); }}>Update Photo</Button>
                </div>
                <div className="space-y-3">
                  <Input value={localSiteData?.leadership?.coFounder?.name} onChange={(e) => setLocalSiteData({...localSiteData, leadership: {...localSiteData.leadership, coFounder: {...localSiteData.leadership.coFounder, name: e.target.value}}})} placeholder="Name" className="rounded-xl h-10 bg-slate-50 border-none" />
                  <Input value={localSiteData?.leadership?.coFounder?.role} onChange={(e) => setLocalSiteData({...localSiteData, leadership: {...localSiteData.leadership, coFounder: {...localSiteData.leadership.coFounder, role: e.target.value}}})} placeholder="Role" className="rounded-xl h-10 bg-slate-50 border-none" />
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {localSiteData?.services?.map((s: any, i: number) => (
                <Card key={i} className="p-4 space-y-4 border-none shadow-sm rounded-3xl bg-white group">
                  <div className="flex justify-between items-center">
                    <span className="bg-primary/5 text-primary px-2 py-0.5 rounded-full text-[8px] font-bold uppercase">Service {i + 1}</span>
                    <Button variant="ghost" size="icon" className="text-red-400 h-7 w-7" onClick={() => setDeleteConfirm({path: 'services', index: i})}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                  <div className="space-y-3">
                    <Input value={s.title} onChange={(e) => updateListItem('services', i, 'title', e.target.value)} className="rounded-lg font-bold border-none bg-slate-50 h-9 text-xs" />
                    <Textarea value={s.description} onChange={(e) => updateListItem('services', i, 'description', e.target.value)} className="rounded-lg text-[10px] min-h-[60px] bg-slate-50 border-none" />
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="h-full min-h-[150px] border-2 border-dashed border-slate-100 rounded-3xl flex flex-col gap-3" onClick={() => addItem('services', { title: "New Service", description: "Details...", features: ["Expert Analysis"], image: "" })}>
                <Plus className="h-6 w-6" />
                <span className="font-bold text-[9px] uppercase">Add Service</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="pricing">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localSiteData?.pricing?.map((p: any, i: number) => (
                <Card key={i} className={cn("p-6 space-y-4 border-none shadow-sm rounded-3xl bg-white", p.highlight && "ring-2 ring-primary")}>
                  <div className="flex justify-between items-center">
                    <Checkbox checked={p.highlight} onCheckedChange={(val) => updateListItem('pricing', i, 'highlight', !!val)} id={`highlight-${i}`} />
                    <label htmlFor={`highlight-${i}`} className="text-[10px] font-bold text-primary uppercase ml-2 flex-grow">Highlighted</label>
                    <Button variant="ghost" size="icon" className="text-red-400" onClick={() => setDeleteConfirm({path: 'pricing', index: i})}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                  <Input value={p.name} onChange={(e) => updateListItem('pricing', i, 'name', e.target.value)} placeholder="Plan Name" className="font-bold h-10 rounded-xl bg-slate-50 border-none" />
                  <Input value={p.badge} onChange={(e) => updateListItem('pricing', i, 'badge', e.target.value)} placeholder="Badge (e.g. Popular)" className="text-xs h-8 rounded-lg bg-slate-50 border-none" />
                  <Textarea value={p.description} onChange={(e) => updateListItem('pricing', i, 'description', e.target.value)} placeholder="Description" className="text-xs min-h-[60px] rounded-xl bg-slate-50 border-none" />
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Features</label>
                    {p.features?.map((f: string, fIdx: number) => (
                      <div key={fIdx} className="flex gap-2">
                        <Input value={f} onChange={(e) => {
                          const newData = JSON.parse(JSON.stringify(localSiteData));
                          newData.pricing[i].features[fIdx] = e.target.value;
                          setLocalSiteData(newData);
                        }} className="h-8 rounded-lg text-xs bg-slate-50 border-none" />
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-300" onClick={() => {
                          const newData = JSON.parse(JSON.stringify(localSiteData));
                          newData.pricing[i].features.splice(fIdx, 1);
                          setLocalSiteData(newData);
                        }}><X className="h-3 w-3" /></Button>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" onClick={() => {
                      const newData = JSON.parse(JSON.stringify(localSiteData));
                      newData.pricing[i].features.push("New Feature");
                      setLocalSiteData(newData);
                    }} className="text-[9px] font-bold uppercase text-primary">Add Feature</Button>
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="h-full min-h-[300px] border-2 border-dashed border-slate-100 rounded-3xl flex flex-col gap-3" onClick={() => addItem('pricing', { name: "New Tier", description: "Details...", features: [], highlight: false, badge: "" })}>
                <Plus className="h-6 w-6" />
                <span className="font-bold text-[9px] uppercase">Add Pricing Plan</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localSiteData?.testimonials?.map((t: any, i: number) => (
                <Card key={i} className="p-6 space-y-4 border-none shadow-sm rounded-3xl bg-white">
                  <div className="flex justify-between items-center">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-slate-50">
                      {t.image ? <Image src={t.image} alt={t.name} fill className="object-cover" unoptimized /> : <UserCircle className="h-full w-full text-slate-200" />}
                    </div>
                    <Button variant="ghost" size="icon" className="text-red-400" onClick={() => setDeleteConfirm({path: 'testimonials', index: i})}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                  <Input value={t.name} onChange={(e) => updateListItem('testimonials', i, 'name', e.target.value)} placeholder="Client Name" className="font-bold rounded-xl bg-slate-50 border-none" />
                  <Input value={t.role} onChange={(e) => updateListItem('testimonials', i, 'role', e.target.value)} placeholder="Role/Affiliation" className="text-xs rounded-xl bg-slate-50 border-none" />
                  <Textarea value={t.content} onChange={(e) => updateListItem('testimonials', i, 'content', e.target.value)} placeholder="Testimonial Quote" className="text-xs min-h-[100px] rounded-xl bg-slate-50 border-none" />
                  <div className="flex items-center gap-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Rating</label>
                    <Input type="number" min="1" max="5" value={t.stars || 5} onChange={(e) => updateListItem('testimonials', i, 'stars', parseInt(e.target.value))} className="w-16 h-8 rounded-lg bg-slate-50 border-none" />
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="h-full min-h-[250px] border-2 border-dashed border-slate-100 rounded-3xl flex flex-col gap-3" onClick={() => addItem('testimonials', { name: "New Client", role: "PhD Scholar", content: "Great support.", stars: 5, image: "" })}>
                <Plus className="h-6 w-6" />
                <span className="font-bold text-[9px] uppercase">Add Testimonial</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="faqs">
            <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
              <div className="space-y-4">
                {localSiteData?.faqs?.map((faq: any, i: number) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl space-y-3 relative group">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100" onClick={() => setDeleteConfirm({path: 'faqs', index: i})}><Trash2 className="h-4 w-4" /></Button>
                    <Input value={faq.question} onChange={(e) => updateListItem('faqs', i, 'question', e.target.value)} placeholder="Question" className="font-bold rounded-xl bg-white border-none h-10" />
                    <Textarea value={faq.answer} onChange={(e) => updateListItem('faqs', i, 'answer', e.target.value)} placeholder="Answer" className="text-sm rounded-xl bg-white border-none min-h-[80px]" />
                  </div>
                ))}
                <Button variant="outline" className="w-full border-2 border-dashed border-slate-100 h-14 rounded-2xl flex gap-2" onClick={() => addItem('faqs', { question: "New Question?", answer: "Answer details." })}>
                  <Plus className="h-4 w-4" /> Add FAQ Entry
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Hub Title</label>
                  <Input value={localSiteData?.blog?.title} onChange={(e) => setLocalSiteData({...localSiteData, blog: {...localSiteData.blog, title: e.target.value}})} className="rounded-xl bg-slate-50 border-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Hub Subtitle</label>
                  <Input value={localSiteData?.blog?.subtitle} onChange={(e) => setLocalSiteData({...localSiteData, blog: {...localSiteData.blog, subtitle: e.target.value}})} className="rounded-xl bg-slate-50 border-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {localSiteData?.blog?.posts?.map((post: any, i: number) => (
                  <Card key={i} className="p-4 space-y-4 border border-slate-100 rounded-2xl relative group">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-400" onClick={() => setDeleteConfirm({path: 'blog.posts', index: i})}><Trash2 className="h-4 w-4" /></Button>
                    <div className="relative h-32 w-full bg-slate-50 rounded-xl overflow-hidden mb-2">
                      {post.image ? <Image src={post.image} alt={post.title} fill className="object-cover" unoptimized /> : <ImageIcon className="h-8 w-8 text-slate-200 m-auto mt-12" />}
                    </div>
                    <Input value={post.title} onChange={(e) => updateListItem('blog.posts', i, 'title', e.target.value)} placeholder="Post Title" className="font-bold rounded-xl bg-slate-50 border-none" />
                    <Input value={post.category} onChange={(e) => updateListItem('blog.posts', i, 'category', e.target.value)} placeholder="Category" className="text-xs rounded-xl bg-slate-50 border-none" />
                    <Textarea value={post.excerpt} onChange={(e) => updateListItem('blog.posts', i, 'excerpt', e.target.value)} placeholder="Excerpt" className="text-xs rounded-xl bg-slate-50 border-none min-h-[60px]" />
                  </Card>
                ))}
                <Button variant="outline" className="h-full min-h-[200px] border-2 border-dashed border-slate-100 rounded-2xl flex flex-col gap-3" onClick={() => addItem('blog.posts', { title: "New Publication", excerpt: "Summary...", author: "Expert Team", date: new Date().toLocaleDateString(), category: "Research", image: "" })}>
                  <Plus className="h-6 w-6" />
                  <span className="font-bold text-[9px] uppercase">Add Publication</span>
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localSiteData?.resources?.map((res: any, i: number) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl space-y-3 relative group">
                    <div className="flex justify-between items-center">
                      <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        <FileType className="h-5 w-5" />
                      </div>
                      <Button variant="ghost" size="icon" className="text-red-400" onClick={() => setDeleteConfirm({path: 'resources', index: i})}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                    <Input value={res.name} onChange={(e) => updateListItem('resources', i, 'name', e.target.value)} placeholder="Resource Name" className="font-bold rounded-xl bg-white border-none" />
                    <div className="flex gap-2">
                      <Input value={res.type} readOnly className="text-[10px] uppercase font-bold text-slate-400 bg-white border-none w-20" />
                      <Input value={res.size} readOnly className="text-[10px] uppercase font-bold text-slate-400 bg-white border-none w-20" />
                    </div>
                    <Button variant="outline" className="w-full h-10 rounded-xl bg-white text-primary text-xs font-bold" onClick={() => { setCurrentEditingPath(`${i}`); resourceFileInputRef.current?.click(); }}>
                      <FileUp className="h-4 w-4 mr-2" /> Upload Protocol
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="h-full min-h-[150px] border-2 border-dashed border-slate-100 rounded-2xl flex flex-col gap-3" onClick={() => addItem('resources', { name: "New Blueprint", type: "PDF", size: "0 KB", url: "#" })}>
                  <Plus className="h-6 w-6" />
                  <span className="font-bold text-[9px] uppercase">Add Resource</span>
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="form">
            <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-headline font-bold text-slate-900">Registry Architect</h3>
                <Button onClick={addFormField} className="rounded-xl h-10 px-4 bg-primary text-white font-bold text-xs flex gap-2">
                  <Plus className="h-4 w-4" /> Add Field
                </Button>
              </div>

              <div className="space-y-4">
                {localSiteData?.contactForm?.fields?.map((field: any, i: number) => (
                  <div key={field.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-6 relative group/field">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <GripVertical className="h-5 w-5 text-slate-300 cursor-grab" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Field #{i + 1}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400" onClick={() => moveField(i, 'up')} disabled={i === 0}>
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400" onClick={() => moveField(i, 'down')} disabled={i === localSiteData.contactForm.fields.length - 1}>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-red-400 hover:bg-red-50" onClick={() => deleteFormField(i)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Label</label>
                        <Input value={field.label} onChange={(e) => updateFormField(i, { label: e.target.value })} className="h-10 rounded-xl bg-white border-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Placeholder</label>
                        <Input value={field.placeholder} onChange={(e) => updateFormField(i, { placeholder: e.target.value })} className="h-10 rounded-xl bg-white border-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Type</label>
                        <UISelect value={field.type} onValueChange={(val) => updateFormField(i, { type: val })}>
                          <SelectTrigger className="h-10 rounded-xl bg-white border-none">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="text">Short Text</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="tel">Phone</SelectItem>
                            <SelectItem value="select">Dropdown</SelectItem>
                            <SelectItem value="textarea">Narrative</SelectItem>
                          </SelectContent>
                        </UISelect>
                      </div>
                      <div className="flex flex-col justify-center gap-2">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Options</label>
                        <div className="flex items-center gap-2">
                          <Checkbox checked={field.required} onCheckedChange={(val) => updateFormField(i, { required: !!val })} id={`req-${field.id}`} />
                          <label htmlFor={`req-${field.id}`} className="text-xs font-medium text-slate-600">Required</label>
                        </div>
                      </div>
                    </div>

                    {field.type === 'select' && (
                      <div className="pt-4 border-t border-slate-100">
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-[9px] font-bold text-primary uppercase">Menu Options</label>
                          <Button variant="ghost" size="sm" onClick={() => addFieldOption(i)} className="h-7 text-[10px] bg-primary/5 text-primary rounded-lg">
                            <Plus className="h-3.5 w-3.5 mr-1" /> Add Option
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {field.options?.map((opt: string, optIdx: number) => (
                            <div key={optIdx} className="flex items-center gap-2">
                              <Input value={opt} onChange={(e) => updateFieldOption(i, optIdx, e.target.value)} className="h-8 rounded-lg bg-white border-none text-xs" />
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-red-400" onClick={() => removeFieldOption(i, optIdx)}>
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="control">
            <Card className="p-6 space-y-6 border-none shadow-sm rounded-3xl bg-white">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 border-b pb-2">Communications</h4>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">WhatsApp Number</label>
                    <Input value={localSiteData?.integrations?.whatsapp} onChange={(e) => setLocalSiteData({...localSiteData, integrations: {...localSiteData.integrations, whatsapp: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 border-b pb-2">Social Protocols</h4>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">LinkedIn URL</label>
                    <Input value={localSiteData?.integrations?.linkedin} onChange={(e) => setLocalSiteData({...localSiteData, integrations: {...localSiteData.integrations, linkedin: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Facebook URL</label>
                    <Input value={localSiteData?.integrations?.facebook} onChange={(e) => setLocalSiteData({...localSiteData, integrations: {...localSiteData.integrations, facebook: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Instagram URL</label>
                    <Input value={localSiteData?.integrations?.instagram} onChange={(e) => setLocalSiteData({...localSiteData, integrations: {...localSiteData.integrations, instagram: e.target.value}})} className="rounded-xl h-10 bg-slate-50 border-none" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isCropperOpen} onOpenChange={setIsCropperOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none rounded-[32px] bg-white shadow-2xl">
          <div className="relative h-80 bg-slate-900">
            {imageToCrop && (
              <Cropper 
                image={imageToCrop} 
                crop={crop} 
                zoom={zoom} 
                aspect={currentEditingPath?.includes('logo') ? 600/260 : 1} 
                onCropChange={setCrop} 
                onZoomChange={setZoom} 
                onCropComplete={onCropComplete} 
              />
            )}
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Button variant="ghost" className="rounded-xl h-12" onClick={() => setIsCropperOpen(false)}>Abort</Button>
            <Button disabled={isUploading} className="rounded-xl font-bold h-12" onClick={saveCroppedImage}>
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Alignment"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="max-w-xs p-8 text-center bg-white rounded-3xl">
          <Trash2 className="h-10 w-10 mx-auto text-red-500 mb-4" />
          <h3 className="font-bold text-lg mb-2">Delete Permanently?</h3>
          <div className="grid grid-cols-2 gap-3 mt-6">
             <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
             <Button className="bg-red-500 hover:bg-red-600" onClick={executeRemoval}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
