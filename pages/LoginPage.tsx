
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Sparkles, Chrome, ArrowRight, Loader2 } from 'lucide-react';
import { authService } from '../services/authService';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    authService.login(email);
    setIsLoading(false);
    navigate('/');
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      authService.login('google_user@gmail.com');
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-1/3 h-1/3 bg-blue-100/50 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-1/3 h-1/3 bg-indigo-100/50 rounded-full blur-[120px]" />

      <div className="w-full max-w-lg animate-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-[2rem] text-white font-black text-4xl mb-6 shadow-2xl shadow-blue-200">
            O
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">OpenLearn Hub</h1>
          <p className="text-gray-500 font-medium">Empowering universal education through community.</p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    className="w-full pl-14 pr-6 py-4 bg-gray-900 text-white border-none rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium placeholder:text-gray-500"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    className="w-full pl-14 pr-6 py-4 bg-gray-900 text-white border-none rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium placeholder:text-gray-500"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm font-bold ml-2 animate-in fade-in slide-in-from-top-2">{error}</p>
              )}

              <div className="flex items-center justify-between px-2">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-200 text-blue-600 focus:ring-blue-100 transition-all" />
                  <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700">Remember me</span>
                </label>
                <button type="button" className="text-sm font-bold text-blue-600 hover:text-blue-700">Forgot Password?</button>
              </div>

              <button
                disabled={isLoading}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:translate-y-0"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    <span>Sign In to Hub</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase font-black text-gray-400 tracking-widest">
                <span className="bg-white px-4">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-black hover:bg-gray-50 transition-all flex items-center justify-center space-x-3"
            >
              <Chrome size={20} className="text-blue-500" />
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="bg-gray-50 p-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 font-medium">
              Don't have an account? <button className="text-blue-600 font-black hover:underline">Join the Community</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
