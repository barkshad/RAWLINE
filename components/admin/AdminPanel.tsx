
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { uploadToCloudinary, getCloudinaryUrl } from "../../services/cloudinaryService";
import { createProduct, fetchAllProducts, removeProduct, updateProduct } from "../../services/productService";
import { fetchSiteContent, updateSiteContent, SiteContent } from "../../services/contentService";
import { Product } from "../../types";
import { AnimatedButton } from "../ui/AnimatedButton";
import { Reveal } from "../ui/Reveal";

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
    <div className="min-h-screen pt-40 px-6 md:px-12 pb-32 max-w-[1400px] mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-8">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-tightest mb-4">Management Console</h1>
          <div className="flex space-x-8">
            {(["inventory", "content"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold border-b-2 transition-all pb-1 ${activeTab === tab ? 'border-black opacity-100' : 'border-transparent opacity-20'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <button onClick={logout} className="text-[10px] uppercase tracking-widest font-bold opacity-30 hover:opacity-100 transition-opacity">Exit Terminal</button>
      </header>

      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <Reveal className="lg:col-span-5 space-y-12">
            <h2 className="text-xl font-bold uppercase tracking-tighter border-b border-black/5 pb-6">Product Entry</h2>
            <form onSubmit={saveProduct} className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <input placeholder="LABEL" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="bg-transparent border-b border-black/10 py-3 text-xs outline-none focus:border-black transition-colors" />
                <input placeholder="VALUATION" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="bg-transparent border-b border-black/10 py-3 text-xs outline-none focus:border-black transition-colors" />
              </div>
              <textarea placeholder="ARCHITECTURAL NOTES" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-transparent border border-black/10 p-4 text-xs outline-none focus:border-black transition-colors h-32 resize-none" />
              
              <div className="grid grid-cols-2 gap-8">
                <input placeholder="FABRIC" value={form.fabric} onChange={e => setForm({...form, fabric: e.target.value})} className="bg-transparent border-b border-black/10 py-3 text-xs outline-none focus:border-black transition-colors" />
                <input placeholder="STRUCTURE" value={form.fit} onChange={e => setForm({...form, fit: e.target.value})} className="bg-transparent border-b border-black/10 py-3 text-xs outline-none focus:border-black transition-colors" />
              </div>

              <div className="space-y-4">
                <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Visual Assets</p>
                <div className="flex flex-wrap gap-4">
                  {form.images.map((id, i) => (
                    <div key={i} className="w-16 aspect-[3/4] bg-charcoal/5 relative group">
                      <img src={getCloudinaryUrl(id, { width: 200 })} className="w-full h-full object-cover grayscale" />
                    </div>
                  ))}
                  <label className="w-16 aspect-[3/4] border border-dashed border-black/20 flex items-center justify-center cursor-pointer hover:border-black transition-colors">
                    <span className="text-xl font-light">+</span>
                    <input type="file" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              <AnimatedButton className="w-full">
                {editingId ? 'Update Document' : 'Publish Entry'}
              </AnimatedButton>
            </form>
          </Reveal>

          <div className="lg:col-span-7 space-y-12">
             <h2 className="text-xl font-bold uppercase tracking-tighter border-b border-black/5 pb-6">Digital Vault</h2>
             <div className="space-y-4 max-h-[800px] overflow-y-auto pr-6">
                {products.map(p => (
                  <motion.div whileHover={{ x: 10 }} key={p.id} className="flex items-center justify-between p-6 glass border border-black/5 group">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-16 bg-charcoal/5">
                        <img src={getCloudinaryUrl(p.images[0], { width: 100 })} className="w-full h-full object-cover grayscale" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em]">{p.title}</p>
                        <p className="text-[10px] opacity-30 uppercase tracking-widest">{p.handle}</p>
                      </div>
                    </div>
                    <div className="flex space-x-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setEditingId(p.id); setForm({ ...p, price: p.price.toString(), sizes: p.sizes.join(',') }); }} className="text-[9px] uppercase font-bold tracking-widest">Update</button>
                      <button onClick={() => removeProduct(p.id).then(refresh)} className="text-[9px] uppercase font-bold tracking-widest text-red-500">Remove</button>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
