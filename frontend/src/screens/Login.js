import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk, signupThunk } from "../redux/authSlice";
import { Mail, Lock, User, Eye, EyeOff, Wallet, ArrowRight, ShieldCheck } from 'lucide-react';

// Reusable Input Component
const InputField = ({ icon: Icon, type, placeholder, value, onChange, isPassword }) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Icon size={18} />
            </div>
            <input
                type={inputType}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-emerald-500 transition-colors"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            )}
        </div>
    );
};

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(isLogin ? 'Logging in...' : 'Signing up...', formData);
        if (isLogin) {
            dispatch(loginThunk(formData)).then((res) => {
                if (res?.payload?.status == 'success') {
                    navigate("/dashboard");
                }
                else {
                    alert(res?.payload?.msg);
                }
            });
        } else {
            dispatch(signupThunk(formData)).then((res) => {
                if (res.payload.status) {
                    navigate("/dashboard");
                }
            });
        }
    };
    useEffect(() => {
        if (localStorage.getItem('JWTToken')) {
            navigate('/dashboard');
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans selection:bg-emerald-500 selection:text-white">
            {/* Main Container */}
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                {/* Left Side - Branding & Illustration (Hidden on mobile) */}
                <div className="hidden md:flex md:w-1/2 bg-emerald-600 p-12 flex-col justify-between relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
                        </svg>
                    </div>

                    <div className="relative z-10 text-white">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                <Wallet size={24} className="text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-wide">ExpenseFlow</span>
                        </div>
                        <h1 className="text-4xl font-extrabold leading-tight mb-4">
                            Control your <br /> finances today.
                        </h1>
                        <p className="text-emerald-100 text-lg max-w-sm">
                            Track your spending, set budgets, and achieve your financial goals with our intuitive platform.
                        </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-4 text-emerald-100/80 text-sm">
                        <ShieldCheck size={20} />
                        <span>Bank-level security & encryption</span>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    {/* Mobile Logo */}
                    <div className="flex items-center gap-2 mb-8 md:hidden text-emerald-600">
                        <Wallet size={28} />
                        <span className="text-2xl font-bold tracking-wide text-slate-800">ExpenseFlow</span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">
                            {isLogin ? 'Welcome back' : 'Create an account'}
                        </h2>
                        <p className="text-slate-500">
                            {isLogin
                                ? 'Enter your details to access your dashboard.'
                                : 'Start your journey to financial freedom.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <InputField
                                icon={User}
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => handleChange(e, 'name')}
                            />
                        )}

                        <InputField
                            icon={Mail}
                            type="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={(e) => handleChange(e, 'email')}
                        />

                        <InputField
                            icon={Lock}
                            type="password"
                            placeholder="Password"
                            isPassword={true}
                            value={formData.password}
                            onChange={(e) => handleChange(e, 'password')}
                        />

                        {!isLogin && (
                            <InputField
                                icon={Lock}
                                type="password"
                                placeholder="Confirm Password"
                                isPassword={true}
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange(e, 'confirmPassword')}
                            />
                        )}

                        {false && (
                            <div className="flex items-center justify-between mb-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500" />
                                    <span className="text-sm text-slate-600 hover:text-slate-800">Remember me</span>
                                </label>
                                <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-emerald-500/30 mt-6"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    {/*<div className="mt-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                            Or continue with
                        </span>
                    </div>

                    <div className="mt-6">
                        <button className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors duration-300">
                            <GoogleIcon />
                            Google
                        </button>
                    </div>*/}

                    <p className="mt-8 text-center text-sm text-slate-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                            }}
                            className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors focus:outline-none"
                        >
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}