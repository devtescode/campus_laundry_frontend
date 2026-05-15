import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    Briefcase,
    DollarSign,
    Ban,
    AlertTriangle,
    UserCheck,
    ShoppingBag,
} from "lucide-react";
import axios from 'axios';
import { API_URLS } from '../components/utils/apiConfig';
const Adminoverview = () => {



    const [recentActivity, setRecentActivity] = useState([]);

    const fetchActivity = async () => {
        try {
            const res = await axios.get(API_URLS.recentactivity);
            setRecentActivity(res.data.activity || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchActivity();
    }, []);


    const [stats, setStats] = useState({
        totalUsers: 0,
        totalJobs: 0,
        activeJobs: 0,
        totalRevenue: 0,
        reportedPosts: 0,
        monthlyGrowth: 0,
    });


    const fetchStats = async () => {
        try {
            const res = await axios.get(API_URLS.dashboardstats);
            setStats(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {/* USERS */}
                <Card className="bg-card border-border">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Users</p>
                                <p className="text-2xl font-bold text-foreground">
                                    {stats.totalUsers.toLocaleString()}
                                </p>
                                <p className="text-xs text-green-400">
                                    +{stats.monthlyGrowth}% this month
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* JOBS */}
                <Card className="bg-card border-border">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Jobs</p>
                                <p className="text-2xl font-bold text-foreground">
                                    {stats.totalJobs.toLocaleString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {stats.activeJobs} active
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-accent" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* REVENUE */}
                <Card className="bg-card border-border">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Revenue</p>

                                <p className="text-2xl font-bold text-foreground">
                                    ₦{stats.totalRevenue.toLocaleString()}
                                </p>

                                {/* optional fancy format */}
                                {/* ₦{(stats.totalRevenue / 1000000).toFixed(1)}M */}

                                <p className="text-xs text-green-400">+8.2% this month</p>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">

                                {/* <p className="text-2xl text-green-500 font-bold">₦</p> */}
                                <div className="w-10 h-10 flex items-center justify-center text-green-500 text-xl font-bold">
                                    ₦
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* REPORTS */}
                <Card className="bg-card border-border">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Reports</p>
                                <p className="text-2xl font-bold text-foreground">
                                    {stats.reportedPosts}
                                </p>
                                <p className="text-xs text-yellow-400">Needs attention</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <Card className="bg-card border-border lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Platform Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex flex-wrap sm:flex-nowrap items-end gap-2">
                            {[
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "May",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec",
                            ].map((month) => (
                                <div
                                    key={month}
                                    className="flex flex-col items-center gap-2 w-8 sm:flex-1"
                                >
                                    <div
                                        className="w-full bg-primary/20 rounded-t-lg hover:bg-primary/30 transition-colors"
                                        style={{
                                            height: `${Math.floor(Math.random() * 80 + 20)}%`,
                                        }}
                                    />

                                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                                        {month}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3">

                                {/* ICON BACKGROUND */}
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === "user"
                                        ? "bg-primary/20"
                                        : activity.type === "report"
                                            ? "bg-yellow-500/20"
                                            : activity.type === "payment"
                                                ? "bg-green-500/20"
                                                : activity.type === "ban"
                                                    ? "bg-red-500/20"
                                                    : activity.type === "washer"
                                                        ? "bg-blue-500/20"
                                                        : "bg-accent/20"
                                        }`}
                                >
                                    {/* ICONS */}
                                    {activity.type === "user" && (
                                        <UserCheck className="w-4 h-4 text-primary" />
                                    )}

                                    {activity.type === "report" && (
                                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                    )}

                                    {activity.type === "payment" && (
                                        <DollarSign className="w-4 h-4 text-green-500" />
                                    )}

                                    {activity.type === "ban" && (
                                        <Ban className="w-4 h-4 text-red-500" />
                                    )}

                                    {activity.type === "job" && (
                                        <ShoppingBag className="w-4 h-4 text-accent" />
                                    )}

                                    {/* 🧼 NEW: WASHER */}
                                    {activity.type === "washer" && (
                                        <UserCheck className="w-4 h-4 text-blue-500" />
                                    )}
                                </div>

                                {/* TEXT */}
                                <div className="flex-1">
                                    <p className="text-sm text-foreground">
                                        {activity.action}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {activity.user || activity.amount} •{" "}
                                        {new Date(activity.time).toLocaleString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle>Top Universities</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { name: "UNILAG", users: 342, percentage: 27 },
                            { name: "UI", users: 289, percentage: 23 },
                            { name: "OAU", users: 198, percentage: 16 },
                            { name: "FUTA", users: 156, percentage: 13 },
                            { name: "UNN", users: 134, percentage: 11 },
                        ].map((uni) => (
                            <div key={uni.name} className="flex items-center gap-4">
                                <span className="text-sm text-foreground w-20">{uni.name}</span>
                                <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full"
                                        style={{ width: `${uni.percentage}%` }}
                                    />
                                </div>
                                <span className="text-sm text-muted-foreground w-16 text-right">{uni.users}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle>Job Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { name: "Washing & Ironing", count: 1456, percentage: 42 },
                            { name: "Washing Only", count: 987, percentage: 29 },
                            { name: "Ironing Only", count: 543, percentage: 16 },
                            { name: "Full Service", count: 321, percentage: 9 },
                            { name: "Dry Cleaning", count: 149, percentage: 4 },
                        ].map((cat) => (
                            <div key={cat.name} className="flex items-center gap-4">
                                <span className="text-sm text-foreground w-32 truncate">{cat.name}</span>
                                <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-accent rounded-full"
                                        style={{ width: `${cat.percentage}%` }}
                                    />
                                </div>
                                <span className="text-sm text-muted-foreground w-16 text-right">{cat.count}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Adminoverview