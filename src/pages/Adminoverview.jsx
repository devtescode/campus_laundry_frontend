import React, { useState } from 'react'
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
const Adminoverview = () => {
    const stats = {
        totalUsers: 1247,
        activeUsers: 892,
        totalJobs: 3456,
        activeJobs: 234,
        totalRevenue: 2450000,
        monthlyGrowth: 12.5,
        bannedUsers: 23,
        reportedPosts: 15
    };
    
    const recentActivity = [
        { id: 1, action: "New user registered", user: "Blessing A.", time: "2 mins ago", type: "user" },
        { id: 2, action: "Job reported for spam", user: "Anonymous", time: "15 mins ago", type: "report" },
        { id: 3, action: "Payment processed", amount: "₦5,000", time: "30 mins ago", type: "payment" },
        { id: 4, action: "User banned", user: "Fake Account", time: "1 hour ago", type: "ban" },
        { id: 5, action: "New job posted", user: "Chidi M.", time: "2 hours ago", type: "job" },
    ];
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-card border-border">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Users</p>
                                <p className="text-2xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</p>
                                <p className="text-xs text-green-400">+{stats.monthlyGrowth}% this month</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Jobs</p>
                                <p className="text-2xl font-bold text-foreground">{stats.totalJobs.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">{stats.activeJobs} active</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-accent" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Revenue</p>
                                <p className="text-2xl font-bold text-foreground">₦{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                                <p className="text-xs text-green-400">+8.2% this month</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Reports</p>
                                <p className="text-2xl font-bold text-foreground">{stats.reportedPosts}</p>
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
                        <div className="h-64 flex items-end justify-between gap-2">
                            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => (
                                <div key={month} className="flex flex-col items-center gap-2 flex-1">
                                    <div
                                        className="w-full bg-primary/20 rounded-t-lg hover:bg-primary/30 transition-colors"
                                        style={{ height: `${Math.random() * 80 + 20}%` }}
                                    />
                                    <span className="text-xs text-muted-foreground">{month}</span>
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
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'user' ? 'bg-primary/20' :
                                    activity.type === 'report' ? 'bg-yellow-500/20' :
                                        activity.type === 'payment' ? 'bg-green-500/20' :
                                            activity.type === 'ban' ? 'bg-red-500/20' :
                                                'bg-accent/20'
                                    }`}>
                                    {activity.type === 'user' && <UserCheck className="w-4 h-4 text-primary" />}
                                    {activity.type === 'report' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                                    {activity.type === 'payment' && <DollarSign className="w-4 h-4 text-green-500" />}
                                    {activity.type === 'ban' && <Ban className="w-4 h-4 text-red-500" />}
                                    {activity.type === 'job' && <ShoppingBag className="w-4 h-4 text-accent" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-foreground">{activity.action}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {activity.user || activity.amount} • {activity.time}
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