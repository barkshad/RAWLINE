
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadToCloudinary, getCloudinaryUrl } from "../../services/cloudinaryService";
import { createProduct, fetchAllProducts, removeProduct, updateProduct } from "../../services/productService";
import { fetchSiteContent, updateSiteContent, SiteContent } from "../../services/contentService";
import { Product } from "../../types";
import { AnimatedButton } from "../ui/AnimatedButton";
import { GlassPanel } from "../ui/GlassPanel";
import { STAGGER_CONTAINER, FADE_UP } from "../../constants/motion";

type AdminTab = "inventory" | "content";

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("inventory");
  const [products, setProducts] = useState<Product[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    fit: "",
    fabric: "",
    care: "",
    sizes: "S,M,L,XL",
    images: [] as string[]
  });

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    setIsLoading(true);
    const [p, s] = await Promise.all([fetchAllProducts(), fetchSiteContent()]);
    setProducts(p);
    setSiteContent(s);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("rawline_admin");
    window.location.reload();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    try {
      const id = await uploadToCloudinary(e.target.files[0]);
      setForm(prev => ({ ...prev, images: [...prev.images, id] }));
    } catch (err) {
      alert("Asset sync failed");
    }
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const handle = form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const data = {
        title: form.title, handle, price: parseFloat(form.price),
        description: form.description, fit: form.fit, fabric: form.fabric,
        care: form.care, images: form.images, sizes: form.sizes.split(',').map(s => s.trim())
      };
      if (editingId) await updateProduct(editingId, data);
      else await createProduct(data);
      setForm({ title: "", price: "", description: "", fit: "", fabric: "", care: "", sizes: "S,M,L,XL", images: [] });
      setEditingId(null);
      refresh();
    } catch {
      alert("Sync failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-48 px-6 md:px-12 pb-48 max-w-[1600px] mx-auto bg-bone">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-12">
        <motion.div variants={STAGGER_CONTAINER} initial="initial" animate="animate" className="space-y-4">
          <motion.h1 variants={FADE_UP} className="text-5xl font-bold uppercase tracking-tightest">Archive Studio</motion.h1>
          <motion.div variants={FADE_UP} className="flex space-x-12 pt-2">
            {(["inventory", "content"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[11px] uppercase tracking-[0.4em] font-bold border-b transition-all pb-2 ${activeTab === tab ? 'border-black opacity-100' : 'border-transparent opacity-20'}`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </motion.div>
        <button onClick={logout} className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 hover:opacity-100 transition-opacity pb-2">Terminate Session</button>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'inventory' ? (
          <motion.div 
            key="inventory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-24"
          >
            <div className="lg:col-span-5 space-y-16">
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] opacity-40">Entry Creation</h2>
              <form onSubmit={saveProduct} className="space-y-12">
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold opacity-30">Descriptor</label>
                    <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-black transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold opacity-30">Valuation</label>
                    <input value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-4 text-xs font-bold outline-none focus:border-black transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold opacity-30">Architecture Notes</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-transparent border border-black/5 p-6 text-xs font-light leading-relaxed outline-none focus:border-black transition-colors h-40 resize-none" />
                </div>
                
                <div className="space-y-6">
                  <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Visual Assets</p>
                  <div className="flex flex-wrap gap-6">
                    {form.images.map((id, i) => (
                      <div key={i} className="w-20 aspect-[3/4] bg-charcoal/5 relative group overflow-hidden shadow-sm">
                        <img src={getCloudinaryUrl(id, { width: 200 })} className="w-full h-full object-cover grayscale" />
                        <button 
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                          className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-[8px] uppercase font-bold tracking-widest transition-opacity"
                        >
                          Erase
                        </button>
                      </div>
                    ))}
                    <label className="w-20 aspect-[3/4] border-2 border-dashed border-black/5 flex flex-col items-center justify-center cursor-pointer hover:bg-black/5 transition-all">
                      <span className="text-3xl font-thin">+</span>
                      <input type="file" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>

                <AnimatedButton className="w-full">
                  {editingId ? 'Update Record' : 'Commit Entry'}
                </AnimatedButton>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-16">
               <h2 className="text-sm font-bold uppercase tracking-[0.4em] opacity-40">Digital Repository</h2>
               <div className="space-y-6 max-h-[1000px] overflow-y-auto pr-8">
                  {products.map(p => (
                    <GlassPanel key={p.id} className="p-8 border border-black/5 flex items-center justify-between group">
                      <div className="flex items-center space-x-10">
                        <div className="w-16 h-24 bg-charcoal/5 shadow-sm">
                          {p.images?.[0] && <img src={getCloudinaryUrl(p.images[0], { width: 200 })} className="w-full h-full object-cover grayscale" />}
                        </div>
                        <div className="space-y-1">
                          <p className="text-[13px] font-bold uppercase tracking-[0.3em]">{p.title}</p>
                          <p className="text-[10px] opacity-30 uppercase tracking-[0.2em] font-medium">{p.handle}</p>
                          <p className="text-[11px] font-bold pt-1">${p.price}</p>
                        </div>
                      </div>
                      <div className="flex space-x-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                        <button onClick={() => { setEditingId(p.id); setForm({ ...p, price: p.price.toString(), sizes: p.sizes.join(',') }); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-[10px] uppercase font-bold tracking-widest hover:tracking-[0.4em] transition-all">Revise</button>
                        <button onClick={() => confirm('Delete product?') && removeProduct(p.id).then(refresh)} className="text-[10px] uppercase font-bold tracking-widest text-red-500 hover:tracking-[0.4em] transition-all">Delete</button>
                      </div>
                    </GlassPanel>
                  ))}
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-32"
          >
            <GlassPanel className="p-20 text-center">
               <p className="text-[11px] uppercase tracking-[0.5em] font-bold opacity-30">Global Site Content Management Interface</p>
               <p className="text-[10px] mt-4 opacity-20">Editorial blocks are synchronized with high-availability archive documents.</p>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
