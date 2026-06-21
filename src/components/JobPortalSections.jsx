import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const categories = [
    { icon: "</>", label: "Technology", count: "3542 jobs available", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
    { icon: "🎨", label: "Design", count: "1432 jobs available", color: "text-pink-600", bg: "bg-pink-50 border-pink-100" },
    { icon: "💼", label: "Business", count: "1926 jobs available", color: "text-green-600", bg: "bg-green-50 border-green-100" },
    { icon: "📈", label: "Marketing", count: "867 jobs available", color: "text-orange-500", bg: "bg-orange-50 border-orange-100" },
    { icon: "💲", label: "Sales", count: "1274 jobs available", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
    { icon: "👥", label: "HR", count: "703 jobs available", color: "text-violet-600", bg: "bg-violet-50 border-violet-100" },
];

const steps = [
    { icon: "👤", title: "Create Account", desc: "Sign up and complete your profile to finish." },
    { icon: "🔍", title: "Search Jobs", desc: "Browse thousands of job opportunities." },
    { icon: "✅", title: "Apply & Get Hired", desc: "Apply with one click and land your dream job." },
];

const companies = [
    { name: "TechVision", emoji: "🚀", jobs: "45 Jobs" },
    { name: "Creative Studios", emoji: "🎨", jobs: "31 Jobs" },
    { name: "AI Innovations", emoji: "🤖", jobs: "18 Jobs" },
    { name: "CloudTech Inc", emoji: "☁️", jobs: "55 Jobs" },
    { name: "DataCorp", emoji: "📊", jobs: "7 Jobs" },
    { name: "StartupLab", emoji: "⚡", jobs: "18 Jobs" },
];

const testimonials = [
    {
        text: "Found my dream job in 2 weeks. The platform made the process so easy and efficient.",
        name: "Sarah Johnson",
        role: "Software Engineer at TechVision",
        stars: 5,
    },
    {
        text: "Amazing platform with great job opportunities. Highly recommend for job seekers!",
        name: "Michael Chen",
        role: "Product Designer at Creative Studios",
        stars: 5,
    },
    {
        text: "The best job portal I have used. Professional companies and smooth application process.",
        name: "Emily Davis",
        role: "Marketing Manager at MarketPro",
        stars: 5,
    },
];

const footerLinks = {
    "For Job Seekers": ["Browse Jobs", "Career Advice", "Resume Builder"],
    "For Employers": ["Post a Job", "Browse Candidates", "Pricing"],
    Company: ["About Us", "Contact", "Privacy Policy"],
};

// ─── STAR RATING ─────────────────────────────────────────────────────────────

function Stars({ count }) {
    return (
        <div className="flex gap-0.5 mb-3">
            {Array.from({ length: count }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
            ))}
        </div>
    );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function PopularCategories() {
    return (
        <section className="py-14 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
                    <p className="text-gray-500 mt-1 text-sm">Explore jobs by category</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.label}
                            className={`${cat.bg} border rounded-xl p-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
                        >
                            <span className={`text-2xl ${cat.color} font-bold block mb-2`}>{cat.icon}</span>
                            <p className={`font-semibold ${cat.color}`}>{cat.label}</p>
                            <p className="text-gray-400 text-xs mt-0.5">{cat.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function HowItWorks() {
    return (
        <section className="py-14 px-4 bg-linear-to-br from-blue-600 to-blue-500">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-white">Simple steps to find your dream job</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    {steps.map((step, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-3xl mb-4 border border-white/30">
                                {step.icon}
                            </div>
                            <h3 className="text-white font-semibold text-base">{step.title}</h3>
                            <p className="text-blue-100 text-sm mt-1 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TopCompanies() {
    return (
        <section className="py-14 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-900">Top Companies</h2>
                    <p className="text-gray-500 mt-1 text-sm">Leading companies hiring now</p>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {companies.map((c) => (
                        <div
                            key={c.name}
                            className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                        >
                            <div className="text-3xl mb-2">{c.emoji}</div>
                            <p className="text-xs font-semibold text-gray-800 text-center leading-tight">{c.name}</p>
                            <p className="text-xs text-gray-400 mt-1">{c.jobs}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    return (
        <section className="py-14 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-900">What Our Users Say</h2>
                    <p className="text-gray-500 mt-1 text-sm">Success stories from our community</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                            <Stars count={t.stars} />
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                                    {t.name[0]}
                                </div>
                                <div>
                                    <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
                                    <p className="text-gray-400 text-xs">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTA() {
    return (
        <section className="py-16 px-4 bg-linear-to-br from-blue-700 to-blue-500 text-center">
            <div className="max-w-lg mx-auto">
                <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
                <p className="text-blue-100 mt-2 text-sm">
                    Join thousands of job seekers finding their dream careers
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all">
                        Create Free Account
                    </button>
                    <button className="border-2 border-white/60 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all">
                        Post a Job
                    </button>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">J</div>
                        <span className="text-white font-bold text-sm">JobPortal</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Your trusted partner in finding the perfect career opportunity.
                    </p>
                </div>
                {/* Links */}
                {Object.entries(footerLinks).map(([title, links]) => (
                    <div key={title}>
                        <h4 className="text-white font-semibold text-sm mb-3">{title}</h4>
                        <ul className="space-y-2">
                            {links.map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="max-w-4xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center">
                <p className="text-xs text-gray-600">© 2025 JobPortal. All rights reserved.</p>
            </div>
        </footer>
    );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function JobPortalSections() {
    return (
        <div className="font-sans">
            <PopularCategories />
            <HowItWorks />
            <TopCompanies />
            <Testimonials />
            <CTA />
            <Footer />
        </div>
    );
}
