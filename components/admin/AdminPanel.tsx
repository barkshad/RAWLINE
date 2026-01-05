
import React, { useEffect, useState } from "react";
import { uploadToCloudinary, getCloudinaryUrl } from "../../services/cloudinaryService";
import { createProduct, fetchAllProducts, removeProduct } from "../../services/productService";
import { Product } from "../../types";

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
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
    refreshProducts();
  }, []);

  const refreshProducts = async () => {
    const data = await fetchAllProducts();
    setProducts(data);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setIsUploading(true);
    try {
      const publicId = await uploadToCloudinary(e.target.files[0]);
      setForm(prev => ({ ...prev, images: [...prev.images, publicId] }));
    } catch (err) {
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price || form.images.length === 0) {
      alert("Missing required fields");
      return;
    }

    setIsCreating(true);
    try {
      const handle = form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      await createProduct({
        title: form.title,
        handle,
        price: parseFloat(form.price),
        description: form.description,
        fit: form.fit,
        fabric: form.fabric,
        care: form.care,
        images: form.images,
        sizes: form.sizes.split(",").map(s => s.trim())
      });
      
      alert("Product created");
      setForm({
        title: "",
        price: "",
        description: "",
        fit: "",
        fabric: "",
        care: "",
        sizes: "S,M,L,XL",
        images: []
      });
      refreshProducts();
    } catch (err) {
      alert("Creation failed");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await removeProduct(id);
    refreshProducts();
  };

  const logout = () => {
    localStorage.removeItem("rawline_admin");
    window.location.reload();
  };

  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 pb-20 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-tightest">RAWLINE CMS</h1>
          <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold mt-1">Management Interface</p>
        </div>
        <button onClick={logout} className="text-[10px] uppercase font-bold tracking-widest hover:underline">Logout</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Creation Form */}
        <section className="space-y-12">
          <header>
            <h2 className="text-lg font-bold uppercase tracking-tighter border-b border-black/10 pb-4">New Document</h2>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Product Title</label>
                <input 
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. RAWLINE TEE 02" 
                  className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Price (USD)</label>
                <input 
                  type="number"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  placeholder="65" 
                  className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Description</label>
              <textarea 
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Details of construction..." 
                className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-sm resize-none h-24"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Fabric</label>
                <input 
                  value={form.fabric}
                  onChange={e => setForm({ ...form, fabric: e.target.value })}
                  placeholder="240gsm Cotton" 
                  className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Fit</label>
                <input 
                  value={form.fit}
                  onChange={e => setForm({ ...form, fit: e.target.value })}
                  placeholder="Boxy fit" 
                  className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Sizes (Comma separated)</label>
              <input 
                value={form.sizes}
                onChange={e => setForm({ ...form, sizes: e.target.value })}
                placeholder="S,M,L,XL" 
                className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-sm"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 block">Visuals</label>
              <div className="flex flex-wrap gap-4">
                {form.images.map((id, i) => (
                  <div key={i} className="relative w-24 aspect-[3/4] bg-charcoal/5 group">
                    <img src={getCloudinaryUrl(id, { width: 200 })} className="w-full h-full object-cover grayscale" />
                    <button 
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                      className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] uppercase font-bold transition-opacity"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <label className={`w-24 aspect-[3/4] border-2 border-dashed border-black/10 flex flex-col items-center justify-center cursor-pointer hover:border-black/40 transition-colors ${isUploading ? 'animate-pulse' : ''}`}>
                  <span className="text-2xl font-light">+</span>
                  <span className="text-[8px] uppercase font-bold tracking-widest">Upload</span>
                  <input type="file" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                </label>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isCreating}
              className="w-full py-5 bg-black text-bone text-xs uppercase tracking-[0.2em] font-bold hover:bg-black/90 transition-colors disabled:opacity-50"
            >
              {isCreating ? 'Synchronizing...' : 'Create Product Entry'}
            </button>
          </form>
        </section>

        {/* Existing Products List */}
        <section className="space-y-12">
          <header>
            <h2 className="text-lg font-bold uppercase tracking-tighter border-b border-black/10 pb-4">Live Archive</h2>
          </header>

          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4">
            {products.length === 0 ? (
              <p className="text-[10px] uppercase opacity-30 text-center py-20">Archive empty</p>
            ) : (
              products.map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 border border-black/5 hover:bg-black/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-charcoal/5 flex-shrink-0">
                      {p.images?.[0] && <img src={getCloudinaryUrl(p.images[0], { width: 100 })} className="w-full h-full object-cover grayscale" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest">{p.title}</p>
                      <p className="text-[10px] opacity-40 uppercase tracking-widest">${p.price} — {p.handle}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="text-[10px] uppercase font-bold tracking-widest text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
