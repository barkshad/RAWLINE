
import React, { useState } from 'react';

interface AdminLoginProps {
  onSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "12345") {
      localStorage.setItem("rawline_admin", "true");
      onSuccess();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold uppercase tracking-tightest">Admin Access</h1>
          <p className="mt-2 text-xs uppercase tracking-widest opacity-40 font-medium">Restricted Area</p>
        </header>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-black/20 focus:border-black outline-none py-4 text-center text-lg tracking-widest placeholder:opacity-20 transition-colors"
            />
            {error && <p className="text-[10px] text-red-500 uppercase tracking-widest text-center animate-pulse">{error}</p>}
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-black text-bone text-xs uppercase tracking-[0.2em] font-bold hover:bg-black/90 transition-colors"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
