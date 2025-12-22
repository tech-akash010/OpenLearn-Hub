import React, { useState, useEffect } from 'react';
import { Download, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { guestDownloadService } from '../../services/guestDownloadService';

export const GuestBanner: React.FC = () => {
    const navigate = useNavigate();
    const [remaining, setRemaining] = useState(guestDownloadService.getRemainingDownloads());
    const [progress, setProgress] = useState(guestDownloadService.getProgressPercentage());

    useEffect(() => {
        // Update state when downloads change
        const updateStats = () => {
            setRemaining(guestDownloadService.getRemainingDownloads());
            setProgress(guestDownloadService.getProgressPercentage());
        };

        // Listen for storage changes (downloads from other tabs)
        window.addEventListener('storage', updateStats);

        // Custom event for same-tab updates
        window.addEventListener('guestDownloadUpdate', updateStats);

        return () => {
            window.removeEventListener('storage', updateStats);
            window.removeEventListener('guestDownloadUpdate', updateStats);
        };
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    {/* Left side - Guest status */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Download size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-black text-gray-900 text-sm">
                                    🎓 You are browsing as Guest
                                </h3>
                                <div className="flex items-center space-x-2 mt-1">
                                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${remaining === 0
                                                    ? 'bg-red-500'
                                                    : remaining <= 2
                                                        ? 'bg-amber-500'
                                                        : 'bg-green-500'
                                                }`}
                                            style={{ width: `${(5 - remaining) * 20}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-gray-600">
                                        {remaining}/5 downloads left
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - CTAs */}
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => navigate('/login')}
                            className="flex items-center space-x-2 px-5 py-2.5 bg-white text-blue-600 border-2 border-blue-200 rounded-xl font-black hover:bg-blue-50 transition-all text-sm"
                        >
                            <LogIn size={16} />
                            <span>Login</span>
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-100"
                        >
                            <UserPlus size={16} />
                            <span>Sign Up Free</span>
                        </button>
                    </div>
                </div>

                {/* Progressive CTA message */}
                {guestDownloadService.shouldShowCTA() && (
                    <div className="mt-3 bg-amber-50 border-2 border-amber-200 rounded-xl px-4 py-2">
                        <p className="text-sm font-bold text-amber-800 text-center">
                            💡 {guestDownloadService.getCTAMessage()}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
