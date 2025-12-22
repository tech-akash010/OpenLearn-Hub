import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Globe, BookOpen, LogIn, UserPlus, Menu } from 'lucide-react';

export const GuestNav: React.FC = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-black text-xl">O</span>
                        </div>
                        <span className="font-black text-xl text-gray-900 hidden sm:block">
                            OpenLearn Hub
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            to="/search"
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl font-bold transition-colors"
                        >
                            <Search size={18} />
                            <span>Search</span>
                        </Link>
                        <Link
                            to="/community"
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl font-bold transition-colors"
                        >
                            <Globe size={18} />
                            <span>Community</span>
                        </Link>
                        <Link
                            to="/courses-preview"
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl font-bold transition-colors"
                        >
                            <BookOpen size={18} />
                            <span>Courses</span>
                        </Link>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        <button
                            onClick={() => navigate('/login')}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl font-bold transition-colors"
                        >
                            <LogIn size={18} />
                            <span>Login</span>
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700 transition-colors"
                        >
                            <UserPlus size={18} />
                            <span>Sign Up</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-2">
                            <Link
                                to="/search"
                                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-bold"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Search size={18} />
                                <span>Search</span>
                            </Link>
                            <Link
                                to="/community"
                                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-bold"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Globe size={18} />
                                <span>Community</span>
                            </Link>
                            <Link
                                to="/courses-preview"
                                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-bold"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <BookOpen size={18} />
                                <span>Courses</span>
                            </Link>
                            <div className="border-t border-gray-200 my-2" />
                            <button
                                onClick={() => {
                                    navigate('/login');
                                    setMobileMenuOpen(false);
                                }}
                                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-bold"
                            >
                                <LogIn size={18} />
                                <span>Login</span>
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/signup');
                                    setMobileMenuOpen(false);
                                }}
                                className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700"
                            >
                                <UserPlus size={18} />
                                <span>Sign Up</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
