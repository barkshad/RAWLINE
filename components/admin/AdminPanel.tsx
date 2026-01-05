
import React, { useEffect, useState } from "react";
import { uploadToCloudinary, getCloudinaryUrl } from "../../services/cloudinaryService";
import { createProduct, fetchAllProducts, removeProduct, updateProduct } from "../../services/productService";
import { fetchSiteContent, updateSiteContent, SiteContent } from "../../services/contentService";
import { Product } from "../../types";

type AdminTab = "products" | "site";

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [productForm, setProductForm] = useState({
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
    refreshData();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    const [prods, content] = await Promise.all([fetchAllProducts(), fetchSiteContent()]);
    setProducts(prods);
    setSiteContent(content);
    setIsLoading(false);
  };

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setIsUploading(true);
    try {
      const publicId = await uploadToCloudinary(e.target.files[0]);
      setProductForm(prev => ({ ...prev, images: [...prev.images, publicId] }));
    } catch (err) {
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSiteImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "home.heroImageId" | "about.studioImageId") => {
    if (!e.target.files?.[0] || !siteContent) return;
    setIsUploading(true);
    try {
      const publicId = await uploadToCloudinary(e.target.files[0]);
      const newContent = { ...siteContent };
      if (field === "home.heroImageId") newContent.home.heroImageId = publicId;
      if (field === "about.studioImageId") newContent.about.studioImageId = publicId;
      setSiteContent(newContent);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const startEditProduct = (p: Product) => {
    setEditingId(p.id);
    setProductForm({
      title: p.title,
      price: p.price.toString(),
      description: p.description,
      fit: p.fit,
      fabric: p.fabric,
      care: p.care,
      sizes: p.sizes.join(","),
      images: p.images
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price || productForm.images.length === 0) {
      alert("Missing required fields");
      return;
    }

    setIsLoading(true);
    try {
      const handle = productForm.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const payload = {
        title: productForm.title,
        handle,
        price: parseFloat(productForm.price),
        description: productForm.description,
        fit: productForm.fit,
        fabric: productForm.fabric,
        care: productForm.care,
        images: productForm.images,
        sizes: productForm.sizes.split(",").map(s => s.trim())
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        alert("Product updated");
      } else {
        await createProduct(payload);
        alert("Product created");
      }
      
      resetProductForm();
      refreshData();
    } catch (err) {
      alert("Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSiteContent = async () => {
    if (!siteContent) return;
    setIsLoading(true);
    try {
      await updateSiteContent(siteContent);
      alert("Site content updated successfully");
    } catch (err) {
      alert("Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const resetProductForm = () => {
    setEditingId(null);
    setProductForm({
      title: "",
      price: "",
      description: "",
      fit: "",
      fabric: "",
      care: "",
      sizes: "S,M,L,XL",
      images: []
    });
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await removeProduct(id);
    refreshData();
  };

  const logout = () => {
    localStorage.removeItem("rawline_admin");
    window.location.reload();
  };

  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-tightest">RAWLINE CMS</h1>
          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => setActiveTab("products")}
              className={`text-[11px] uppercase tracking-widest font-bold pb-1 border-b-2 transition-all ${activeTab === "products" ? "border-black" : "border-transparent opacity-30"}`}
            >
              Inventory
            </button>
            <button 
              onClick={() => setActiveTab("site")}
              className={`text-[11px] uppercase tracking-widest font-bold pb-1 border-b-2 transition-all ${activeTab === "site" ? "border-black" : "border-transparent opacity-30"}`}
            >
              Site Content
            </button>
          </div>
        </div>
        <button onClick={logout} className="text-[10px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 transition-opacity">Logout</button>
      </div>

      {activeTab === "products" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Creation/Editing Form */}
          <section className="space-y-12">
            <header className="flex justify-between items-center border-b border-black/10 pb-4">
              <h2 className="text-lg font-bold uppercase tracking-tighter">
                {editingId ? `Edit Product: ${productForm.title}` : "New Entry"}
              </h2>
              {editingId && <button onClick={resetProductForm} className="text-[10px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100">Cancel Edit</button>}
            </header>

            <form onSubmit={handleProductSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Product Title</label>
                  <input 
                    value={productForm.title}
                    onChange={e => setProductForm({ ...productForm, title: e.target.value })}
                    placeholder="e.g. RAWLINE TEE 02" 
                    className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Price (USD)</label>
                  <input 
                    type="number"
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="65" 
                    className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Description</label>
                <textarea 
                  value={productForm.description}
                  onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Details of construction..." 
                  className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-sm resize-none h-24"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Fabric</label>
                  <input 
                    value={productForm.fabric}
                    onChange={e => setProductForm({ ...productForm, fabric: e.target.value })}
                    placeholder="240gsm Cotton" 
                    className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Fit</label>
                  <input 
                    value={productForm.fit}
                    onChange={e => setProductForm({ ...productForm, fit: e.target.value })}
                    placeholder="Boxy fit" 
                    className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Care Instructions</label>
                <input 
                  value={productForm.care}
                  onChange={e => setProductForm({ ...productForm, care: e.target.value })}
                  placeholder="Cold wash, dry flat" 
                  className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Sizes (Comma separated)</label>
                <input 
                  value={productForm.sizes}
                  onChange={e => setProductForm({ ...productForm, sizes: e.target.value })}
                  placeholder="S,M,L,XL" 
                  className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-sm"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 block">Visual Assets</label>
                <div className="flex flex-wrap gap-4">
                  {productForm.images.map((id, i) => (
                    <div key={i} className="relative w-24 aspect-[3/4] bg-charcoal/5 group">
                      <img src={getCloudinaryUrl(id, { width: 200 })} className="w-full h-full object-cover grayscale" />
                      <button 
                        type="button"
                        onClick={() => setProductForm(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                        className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] uppercase font-bold transition-opacity"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <label className={`w-24 aspect-[3/4] border-2 border-dashed border-black/10 flex flex-col items-center justify-center cursor-pointer hover:border-black/40 transition-colors ${isUploading ? 'animate-pulse' : ''}`}>
                    <span className="text-2xl font-light">+</span>
                    <span className="text-[8px] uppercase font-bold tracking-widest">Add Image</span>
                    <input type="file" className="hidden" onChange={handleProductImageUpload} disabled={isUploading} />
                  </label>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-black text-bone text-xs uppercase tracking-[0.2em] font-bold hover:bg-black/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : editingId ? 'Update Archive' : 'Publish to Archive'}
              </button>
            </form>
          </section>

          {/* List Section */}
          <section className="space-y-12">
            <header>
              <h2 className="text-lg font-bold uppercase tracking-tighter border-b border-black/10 pb-4">Digital Warehouse</h2>
            </header>

            <div className="space-y-4 max-h-[1000px] overflow-y-auto pr-4">
              {products.map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 border border-black/5 bg-white/50 group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-charcoal/5 flex-shrink-0">
                      {p.images?.[0] && <img src={getCloudinaryUrl(p.images[0], { width: 100 })} className="w-full h-full object-cover grayscale" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest">{p.title}</p>
                      <p className="text-[10px] opacity-40 uppercase tracking-widest font-medium">${p.price}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => startEditProduct(p)}
                      className="text-[10px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(p.id)}
                      className="text-[10px] uppercase font-bold tracking-widest text-red-500 opacity-40 hover:opacity-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === "site" && siteContent && (
        <div className="max-w-4xl space-y-20">
          <section className="space-y-10">
            <h2 className="text-2xl font-bold uppercase tracking-tightest border-b border-black/10 pb-4">Home View</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-40">Headline</label>
                <textarea 
                  value={siteContent.home.headline}
                  onChange={e => setSiteContent({ ...siteContent, home: { ...siteContent.home, headline: e.target.value } })}
                  className="w-full bg-transparent border border-black/10 focus:border-black outline-none p-4 text-3xl font-bold uppercase tracking-tightest leading-none min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-40">Body Text</label>
                <textarea 
                  value={siteContent.home.subheadline}
                  onChange={e => setSiteContent({ ...siteContent, home: { ...siteContent.home, subheadline: e.target.value } })}
                  className="w-full bg-transparent border border-black/10 focus:border-black outline-none p-4 text-lg font-light leading-relaxed min-h-[150px]"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-40">Hero Asset</label>
                <div className="relative aspect-[16/9] bg-charcoal/5 border border-black/5 overflow-hidden group">
                  <img src={getCloudinaryUrl(siteContent.home.heroImageId, { width: 1200 })} className="w-full h-full object-cover grayscale" />
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-bone">
                    <span className="text-sm uppercase tracking-widest font-bold">Swap Hero Image</span>
                    <input type="file" className="hidden" onChange={e => handleSiteImageUpload(e, "home.heroImageId")} disabled={isUploading} />
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-10">
            <h2 className="text-2xl font-bold uppercase tracking-tightest border-b border-black/10 pb-4">About View</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-40">Philosophy Heading</label>
                <input 
                  value={siteContent.about.heading}
                  onChange={e => setSiteContent({ ...siteContent, about: { ...siteContent.about, heading: e.target.value } })}
                  className="w-full bg-transparent border border-black/10 focus:border-black outline-none p-4 text-2xl font-bold uppercase tracking-tightest"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-40">Content Paragraphs (Line breaks for new para)</label>
                <textarea 
                  value={siteContent.about.paragraphs.join("\n\n")}
                  onChange={e => setSiteContent({ ...siteContent, about: { ...siteContent.about, paragraphs: e.target.value.split("\n\n").filter(p => p.trim()) } })}
                  className="w-full bg-transparent border border-black/10 focus:border-black outline-none p-4 text-sm font-light leading-relaxed min-h-[250px]"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-40">Studio Asset</label>
                <div className="relative aspect-[21/9] bg-charcoal/5 border border-black/5 overflow-hidden group">
                  <img src={getCloudinaryUrl(siteContent.about.studioImageId, { width: 1200 })} className="w-full h-full object-cover grayscale" />
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-bone">
                    <span className="text-sm uppercase tracking-widest font-bold">Swap Studio Image</span>
                    <input type="file" className="hidden" onChange={e => handleSiteImageUpload(e, "about.studioImageId")} disabled={isUploading} />
                  </label>
                </div>
              </div>
            </div>
          </section>

          <button 
            onClick={handleSaveSiteContent}
            disabled={isLoading}
            className="w-full py-6 bg-black text-bone text-sm uppercase tracking-[0.3em] font-bold hover:bg-black/90 transition-colors sticky bottom-10 shadow-2xl disabled:opacity-50"
          >
            {isLoading ? "Synchronizing Site Assets..." : "Confirm Global Changes"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
