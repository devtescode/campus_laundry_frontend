import React, { useState } from 'react'
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Ban,
  Eye,  
  CheckCircle,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


const Adminuserdisplay = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const users = [
        { id: 1, name: "Chidi Mbachu", email: "chidi@unilag.edu.ng", university: "UNILAG", role: "Both", jobs: 12, rating: 4.8, status: "Active", joined: "Jan 15, 2024" },
        { id: 2, name: "Adaeze Nwosu", email: "adaeze@ui.edu.ng", university: "UI", role: "Washer", jobs: 45, rating: 4.9, status: "Active", joined: "Dec 3, 2023" },
        { id: 3, name: "Tunde Okonkwo", email: "tunde@oau.edu.ng", university: "OAU", role: "Poster", jobs: 8, rating: 4.5, status: "Warned", joined: "Feb 20, 2024" },
        { id: 4, name: "Amara Kalu", email: "amara@futa.edu.ng", university: "FUTA", role: "Both", jobs: 23, rating: 4.7, status: "Active", joined: "Nov 10, 2023" },
        { id: 5, name: "Emeka Obi", email: "emeka@uniben.edu.ng", university: "UNIBEN", role: "Washer", jobs: 67, rating: 4.6, status: "Banned", joined: "Oct 5, 2023" },
        { id: 6, name: "Ngozi Peters", email: "ngozi@unn.edu.ng", university: "UNN", role: "Poster", jobs: 15, rating: 4.4, status: "Active", joined: "Mar 1, 2024" },
    ];
    const getStatusBadge = (status) => {
        const styles = {
            Active: "bg-green-500/20 text-green-400 border-green-500/30",
            Warned: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
            Banned: "bg-red-500/20 text-red-400 border-red-500/30",
            "In Progress": "bg-primary/20 text-primary border-primary/30",
            Completed: "bg-green-500/20 text-green-400 border-green-500/30",
            Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
            Disputed: "bg-red-500/20 text-red-400 border-red-500/30"
        };
        return styles[status] || "bg-muted text-muted-foreground";
    };

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
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.university.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {stats.activeUsers} Active
                    </Badge>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        {stats.bannedUsers} Banned
                    </Badge>
                </div>
            </div>

            <Card className="bg-card border-border">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-border">
                                <TableHead>User</TableHead>
                                <TableHead>University</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Jobs</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} className="border-border">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                <span className="text-xs font-medium text-primary">{user.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{user.name}</p>
                                                <p className="text-xs text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{user.university}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-xs">
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{user.jobs}</TableCell>
                                    <TableCell>
                                        <span className="flex items-center gap-1 text-yellow-500">
                                            ★ {user.rating}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusBadge(user.status)}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{user.joined}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className={user.status === "Banned" ? "text-green-400" : "text-red-400"}
                                                    >
                                                        {user.status === "Banned" ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            {user.status === "Banned" ? "Unban User" : "Ban User"}
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Are you sure you want to {user.status === "Banned" ? "unban" : "ban"} {user.name}?
                                                            {user.status !== "Banned" && " This will prevent them from accessing the platform."}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button variant="outline">Cancel</Button>
                                                        <Button
                                                            variant={user.status === "Banned" ? "default" : "destructive"}
                                                            onClick={() => user.status === "Banned" ? handleUnbanUser(user) : handleBanUser(user)}
                                                        >
                                                            {user.status === "Banned" ? "Unban" : "Ban"} User
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default Adminuserdisplay