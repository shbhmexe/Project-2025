"use client";

import { useState, useEffect } from "react";

interface Stats {
    totalNotes: number;
    pendingNotes: number;
    totalProjects: number;
    pendingProjects: number;
    totalUsers: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        totalNotes: 0,
        pendingNotes: 0,
        totalProjects: 0,
        pendingProjects: 0,
        totalUsers: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/admin/stats");
            const data = await res.json();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: "Total Notes",
            value: stats.totalNotes,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            color: "emerald",
            href: "/admin/notes",
        },
        {
            title: "Pending Notes",
            value: stats.pendingNotes,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "yellow",
            href: "/admin/notes?status=pending",
        },
        {
            title: "Total Projects",
            value: stats.totalProjects,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            color: "blue",
            href: "/admin/projects",
        },
        {
            title: "Pending Projects",
            value: stats.pendingProjects,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "orange",
            href: "/admin/projects?status=pending",
        },
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            color: "purple",
            href: "/admin/users",
        },
    ];

    const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
        emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
        yellow: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" },
        blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
        orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
        purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
                        <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                        <div className="h-8 bg-gray-700 rounded w-1/3"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div>
                <h2 className="text-2xl font-bold text-white">Welcome back! 👋</h2>
                <p className="text-gray-400 mt-1">Here's what's happening with your platform today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((card) => (
                    <a
                        key={card.title}
                        href={card.href}
                        className={`bg-gray-800 rounded-xl p-6 border ${colorClasses[card.color].border} hover:bg-gray-750 transition group`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                                <p className={`text-3xl font-bold mt-2 ${colorClasses[card.color].text}`}>
                                    {card.value}
                                </p>
                            </div>
                            <div className={`p-3 rounded-xl ${colorClasses[card.color].bg}`}>
                                <span className={colorClasses[card.color].text}>{card.icon}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <a
                        href="/admin/notes"
                        className="flex flex-col items-center gap-2 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition"
                    >
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        <span className="text-gray-300 text-sm">Manage Notes</span>
                    </a>
                    <a
                        href="/admin/projects"
                        className="flex flex-col items-center gap-2 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition"
                    >
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="text-gray-300 text-sm">Manage Projects</span>
                    </a>
                    <a
                        href="/admin/users"
                        className="flex flex-col items-center gap-2 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition"
                    >
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-gray-300 text-sm">View Users</span>
                    </a>
                    <a
                        href="/admin/settings"
                        className="flex flex-col items-center gap-2 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition"
                    >
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-300 text-sm">Settings</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
