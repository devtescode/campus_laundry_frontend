// import React, { useState } from 'react'
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//     Ban,
//     Eye,
//     CheckCircle,
//     Trash2,
//     AlertTriangle
// } from "lucide-react";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";

// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";


// const Adminjobdisplay = () => {
//     const [searchQuery, setSearchQuery] = useState("");
//     const jobs = [
//         { id: 1, type: "Washing & Ironing", poster: "Chidi M.", washer: "Adaeze N.", price: 3500, status: "In Progress", location: "UNILAG", date: "Dec 2, 2024", reported: false },
//         { id: 2, type: "Washing Only", poster: "Amara K.", washer: "Tunde O.", price: 2000, status: "Completed", location: "UI", date: "Dec 1, 2024", reported: false },
//         { id: 3, type: "Ironing Only", poster: "Ngozi P.", washer: null, price: 2500, status: "Pending", location: "UNN", date: "Dec 2, 2024", reported: true },
//         { id: 4, type: "Washing & Folding", poster: "Emeka O.", washer: "Chidi M.", price: 4000, status: "Disputed", location: "UNIBEN", date: "Nov 30, 2024", reported: true },
//         { id: 5, type: "Full Service", poster: "Tunde O.", washer: "Amara K.", price: 6000, status: "Completed", location: "OAU", date: "Nov 29, 2024", reported: false },
//     ];
//     const filteredJobs = jobs.filter(job =>
//         job.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         job.poster.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         job.location.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const getStatusBadge = (status) => {
//         const styles = {
//             Active: "bg-green-500/20 text-green-400 border-green-500/30",
//             Warned: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
//             Banned: "bg-red-500/20 text-red-400 border-red-500/30",
//             "In Progress": "bg-primary/20 text-primary border-primary/30",
//             Completed: "bg-green-500/20 text-green-400 border-green-500/30",
//             Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
//             Disputed: "bg-red-500/20 text-red-400 border-red-500/30"
//         };
//         return styles[status] || "bg-muted text-muted-foreground";
//     };

//     const stats = {
//         totalUsers: 1247,
//         activeUsers: 892,
//         totalJobs: 3456,
//         activeJobs: 234,
//         totalRevenue: 2450000,
//         monthlyGrowth: 12.5,
//         bannedUsers: 23,
//         reportedPosts: 15
//     };
//     return (
//         <div className="space-y-6 animate-fade-in">
//             <div className="flex items-center gap-4">
//                 <Badge className="bg-primary/20 text-primary border-primary/30">
//                     {stats.activeJobs} Active
//                 </Badge>
//                 <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
//                     {jobs.filter(j => j.reported).length} Reported
//                 </Badge>
//             </div>

//             <Card className="bg-card border-border">
//                 <CardContent className="p-0">
//                     <Table>
//                         <TableHeader>
//                             <TableRow className="border-border">
//                                 <TableHead>ID</TableHead>
//                                 <TableHead>Type</TableHead>
//                                 <TableHead>Poster</TableHead>
//                                 <TableHead>Washer</TableHead>
//                                 <TableHead>Price</TableHead>
//                                 <TableHead>Location</TableHead>
//                                 <TableHead>Status</TableHead>
//                                 <TableHead>Date</TableHead>
//                                 <TableHead className="text-right">Actions</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {filteredJobs.map((job) => (
//                                 <TableRow key={job.id} className={`border-border ${job.reported ? 'bg-red-500/5' : ''}`}>
//                                     <TableCell className="font-mono text-muted-foreground">#{job.id}</TableCell>
//                                     <TableCell className="text-foreground">{job.type}</TableCell>
//                                     <TableCell className="text-muted-foreground">{job.poster}</TableCell>
//                                     <TableCell className="text-muted-foreground">{job.washer || "—"}</TableCell>
//                                     <TableCell className="text-foreground font-medium">₦{job.price.toLocaleString()}</TableCell>
//                                     <TableCell className="text-muted-foreground">{job.location}</TableCell>
//                                     <TableCell>
//                                         <div className="flex items-center gap-2">
//                                             <Badge className={getStatusBadge(job.status)}>
//                                                 {job.status}
//                                             </Badge>
//                                             {job.reported && (
//                                                 <AlertTriangle className="w-4 h-4 text-yellow-500" />
//                                             )}
//                                         </div>
//                                     </TableCell>
//                                     <TableCell className="text-muted-foreground">{job.date}</TableCell>
//                                     <TableCell className="text-right">
//                                         <div className="flex items-center justify-end gap-2">
//                                             <Button variant="ghost" size="icon">
//                                                 <Eye className="w-4 h-4" />
//                                             </Button>
//                                             <Dialog>
//                                                 <DialogTrigger asChild>
//                                                     <Button variant="ghost" size="icon" className="text-red-400">
//                                                         <Trash2 className="w-4 h-4" />
//                                                     </Button>
//                                                 </DialogTrigger>
//                                                 <DialogContent>
//                                                     <DialogHeader>
//                                                         <DialogTitle>Delete Job</DialogTitle>
//                                                         <DialogDescription>
//                                                             Are you sure you want to delete job #{job.id}? This action cannot be undone.
//                                                         </DialogDescription>
//                                                     </DialogHeader>
//                                                     <DialogFooter>
//                                                         <Button variant="outline">Cancel</Button>
//                                                         <Button variant="destructive" onClick={() => handleDeleteJob(job)}>
//                                                             Delete Job
//                                                         </Button>
//                                                     </DialogFooter>
//                                                 </DialogContent>
//                                             </Dialog>
//                                         </div>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }

// export default Adminjobdisplay

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, AlertTriangle } from "lucide-react";

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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const Adminjobdisplay = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    const fetchJobs = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/admin/getalljobsdetails"
            );
            setJobs(res.data.jobs || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const getStatusBadge = (status) => {
        const styles = {
            "In Progress": "bg-primary/20 text-primary border-primary/30",
            Completed: "bg-green-500/20 text-green-400 border-green-500/30",
            Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
            Disputed: "bg-red-500/20 text-red-400 border-red-500/30",
        };
        return styles[status] || "bg-muted text-muted-foreground";
    };

    return (
        <div className="space-y-6 animate-fade-in">

            <Card>
                <CardContent className="p-0">
                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Poster</TableHead>
                                <TableHead>Washer</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {jobs.map((job, i) => (
                                <TableRow key={job._id || i}>

                                    <TableCell>#{i + 1}</TableCell>
                                    <TableCell>{job.type}</TableCell>

                                    {/* POSTER */}
                                    <TableCell>
                                        {job.userId?.fullname || "Unknown"}
                                    </TableCell>

                                    {/* WASHER */}
                                    <TableCell>
                                        {job.applicant?.fullname || "—"}
                                    </TableCell>

                                    <TableCell>₦{job.price}</TableCell>

                                    <TableCell>
                                        <Badge className={getStatusBadge(job.status)}>
                                            {job.status}
                                        </Badge>
                                    </TableCell>

                                    {/* ACTIONS */}
                                    <TableCell>
                                        <div className="flex gap-2">

                                            {/* VIEW DETAILS */}
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => setSelectedJob(job)}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </DialogTrigger>

                                                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">

                                                    <DialogHeader className="pb-4 border-b">
                                                        <DialogTitle className="text-2xl">
                                                            Job Details - Job #{selectedJob?.id}
                                                        </DialogTitle>
                                                    </DialogHeader>

                                                    {selectedJob && (
                                                        <div className="space-y-6">

                                                            {/* JOB INFO SECTION */}
                                                            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 space-y-3">
                                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                                                    📋 Job Information
                                                                </h3>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Service Type</p>
                                                                        <p className="text-slate-900 dark:text-slate-100 font-semibold">{selectedJob.type}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Price</p>
                                                                        <p className="text-slate-900 dark:text-slate-100 font-semibold">₦{selectedJob.price?.toLocaleString()}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Status</p>
                                                                        <Badge className={getStatusBadge(selectedJob.status)} style={{width: 'fit-content'}}>
                                                                            {selectedJob.status}
                                                                        </Badge>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Quantity</p>
                                                                        <p className="text-slate-900 dark:text-slate-100 font-semibold">{selectedJob.quantity || "—"}</p>
                                                                    </div>
                                                                    <div className="col-span-2">
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Description</p>
                                                                        <p className="text-slate-700 dark:text-slate-300">{selectedJob.description || "No description provided"}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* PICKUP & DELIVERY SECTION */}
                                                            <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 space-y-3">
                                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                                                    🚚 Pickup & Delivery
                                                                </h3>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Pickup Date</p>
                                                                        <p className="text-slate-900 dark:text-slate-100 font-semibold">
                                                                            {selectedJob.pickupDate
                                                                                ? new Date(selectedJob.pickupDate).toLocaleDateString("en-US", {
                                                                                    year: "numeric",
                                                                                    month: "short",
                                                                                    day: "numeric",
                                                                                })
                                                                                : "—"}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Pickup Time</p>
                                                                        <p className="text-slate-900 dark:text-slate-100 font-semibold">
                                                                            {selectedJob.pickupTime
                                                                                ? new Date(`1970-01-01T${selectedJob.pickupTime}`).toLocaleTimeString("en-US", {
                                                                                    hour: "2-digit",
                                                                                    minute: "2-digit",
                                                                                    hour12: true,
                                                                                })
                                                                                : "—"}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Delivery Date</p>
                                                                        <p className="text-slate-900 dark:text-slate-100 font-semibold">
                                                                            {selectedJob.deliveryDate
                                                                                ? new Date(selectedJob.deliveryDate).toLocaleDateString("en-US", {
                                                                                    year: "numeric",
                                                                                    month: "short",
                                                                                    day: "numeric",
                                                                                })
                                                                                : "—"}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Delivery Time</p>
                                                                        <p className="text-slate-900 dark:text-slate-100 font-semibold">
                                                                            {selectedJob.deliveryTime
                                                                                ? new Date(`1970-01-01T${selectedJob.deliveryTime}`).toLocaleTimeString("en-US", {
                                                                                    hour: "2-digit",
                                                                                    minute: "2-digit",
                                                                                    hour12: true,
                                                                                })
                                                                                : "—"}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* LOCATION SECTION */}
                                                            <div className="bg-amber-50 dark:bg-amber-950 rounded-lg p-4 space-y-3">
                                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                                                    📍 Location
                                                                </h3>
                                                                <div className="grid grid-cols-3 gap-4">
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Hostel</p>
                                                                        <p className="text-slate-900 dark:text-slate-100 font-semibold">{selectedJob.hostel || "—"}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Block</p>
                                                                        <p className="text-slate-900 dark:text-slate-100 font-semibold">{selectedJob.block || "—"}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Room</p>
                                                                        <p className="text-slate-900 dark:text-slate-100 font-semibold">{selectedJob.room || "—"}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* POSTER SECTION */}
                                                            <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4 space-y-3">
                                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                                                    👤 Job Poster
                                                                </h3>
                                                                <div className="space-y-2">
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Name</p>
                                                                        <p className="text-slate-900 dark:text-slate-100 font-semibold">{selectedJob.userId?.fullname || "—"}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Email</p>
                                                                        <p className="text-slate-900 dark:text-slate-100">{selectedJob.userId?.email || "—"}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Phone</p>
                                                                        <p className="text-slate-900 dark:text-slate-100">{selectedJob.userId?.phone || "—"}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* WASHER SECTION */}
                                                            <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4 space-y-3">
                                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                                                    🧺 Assigned Washer
                                                                </h3>
                                                                <div className="space-y-2">
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Name</p>
                                                                        <p className="text-slate-900 dark:text-slate-100 font-semibold">{selectedJob.applicant?.fullname || "Not Assigned Yet"}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Email</p>
                                                                        <p className="text-slate-900 dark:text-slate-100">{selectedJob.applicant?.email || "—"}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Phone</p>
                                                                        <p className="text-slate-900 dark:text-slate-100">{selectedJob.applicant?.phone || "—"}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )}

                                                </DialogContent>
                                            </Dialog>

                                            {/* DELETE */}
                                            {/* <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </Button> */}

                                        </div>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </CardContent>
            </Card>

        </div>
    );
};

export default Adminjobdisplay;