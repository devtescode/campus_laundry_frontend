import React, { useState, useEffect } from "react";
import axios from "axios";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ban, Eye, CheckCircle, Search } from "lucide-react";

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
import Loader from "./Loaderpage/Loader";
import { API_URLS } from "../components/utils/apiConfig";

const Adminuserdisplay = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URLS.getallusers);
      console.log(res.data);

      // adjust depending on backend response
      setUsers(res.data.users || res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Ban user
  // const handleBanUser = async (user) => {
  //   try {
  //     await axios.put(
  //       `http://localhost:5000/api/users/ban/${user._id}`
  //     );

  //     setUsers((prev) =>
  //       prev.map((u) =>
  //         u._id === user._id ? { ...u, status: "Banned" } : u
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error banning user:", error);
  //   }
  // };

  // // ✅ Unban user
  // const handleUnbanUser = async (user) => {
  //   try {
  //     await axios.put(
  //       `http://localhost:5000/api/users/unban/${user._id}`
  //     );

  //     setUsers((prev) =>
  //       prev.map((u) =>
  //         u._id === user._id ? { ...u, status: "Active" } : u
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error unbanning user:", error);
  //   }
  // };

  // ✅ Badge styling
  const getStatusBadge = (status) => {
    const styles = {
      Active: "bg-green-500/20 text-green-400 border-green-500/30",
      Warned: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      Banned: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return styles[status] || "bg-muted text-muted-foreground";
  };

  // ✅ Filter users
  const filteredUsers = users.filter((user) =>
    (user.fullname || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    (user.email || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    (user.university || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );



  // ✅ Handle view user details
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-card border-border">
        <div className="p-4 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">User Management</h2>
              <div className="text-sm text-muted-foreground sm:hidden">
                {searchQuery ? (
                  <>{filteredUsers.length} of {users.length} users</>
                ) : (
                  <>Total: {users.length}</>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative flex-1 sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search users by name, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="hidden sm:block text-sm text-muted-foreground">
                {searchQuery ? (
                  <>Showing <span className="font-medium text-foreground">{filteredUsers.length}</span> of <span className="font-medium text-foreground">{users.length}</span> users</>
                ) : (
                  <>Total Users: <span className="font-medium text-foreground">{users.length}</span></>
                )}
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>User</TableHead>
                <TableHead>isVerified</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Post</TableHead>
                <TableHead>Job</TableHead>
                {/* <TableHead>Status</TableHead> */}
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {user.fullname?.charAt(0)}
                        </span>
                      </div>

                      <div>
                        <p className="font-medium text-foreground">
                          {user.fullname}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {/* {user.university || "-"} */}
                    {user.isVerified ? (
                      <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">
                        Verified
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs text-red-700 bg-red-100 rounded-full">
                        Unverified
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {user.role || "-"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {user.jobs || "-"}
                  </TableCell>

                  <TableCell>
                    <span className="flex items-center gap-1 text-black-500">
                      {user.jobsWashed || "-"}
                    </span>
                  </TableCell>

                  {/* <TableCell>
                    <Badge className={getStatusBadge(user.status)}>
                      {user.status || "Active"}
                    </Badge>
                  </TableCell> */}

                  <TableCell className="text-muted-foreground">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "-"}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewUser(user)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      {/* <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={
                              user.status === "Banned"
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {user.status === "Banned" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Ban className="w-4 h-4" />
                            )}
                          </Button>
                        </DialogTrigger>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              {user.status === "Banned"
                                ? "Unban User"
                                : "Ban User"}
                            </DialogTitle>

                            <DialogDescription>
                              Are you sure you want to{" "}
                              {user.status === "Banned"
                                ? "unban"
                                : "ban"}{" "}
                              {user.fullName}?
                            </DialogDescription>
                          </DialogHeader>

                          <DialogFooter>
                            <Button variant="outline">
                              Cancel
                            </Button>

                            <Button
                              variant={
                                user.status === "Banned"
                                  ? "default"
                                  : "destructive"
                              }
                              onClick={() =>
                                user.status === "Banned"
                                  ? handleUnbanUser(user)
                                  : handleBanUser(user)
                              }
                            >
                              {user.status === "Banned"
                                ? "Unban"
                                : "Ban"}{" "}
                              User
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected user
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-medium text-primary">
                    {selectedUser.fullname?.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedUser.fullname}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <p className="text-sm">{selectedUser.role || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusBadge(selectedUser.status)}>
                    {selectedUser.status || "Actie"}
                  </Badge>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Post</label>
                  <p className="text-sm">{selectedUser.jobs || "-"}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Verified</label>
                  <p className="text-sm">{selectedUser.isVerified ? "Verified ✅" : "Not Verified ❌"}</p>
                </div>

                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Job</label>
                  <p className="text-sm flex items-center gap-1">
                    <span className="text-yellow-500"></span> {selectedUser.jobsWashed || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Gender</label>
                  <p className="text-sm flex items-center gap-1">
                    <span className="text-yellow-500"></span> {selectedUser.gender || "-"}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Joined Date</label>
                <p className="text-sm">
                  {selectedUser.createdAt
                    ? new Date(selectedUser.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    : "Not available"}
                </p>
              </div>

              {selectedUser.phonenumber && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                  <p className="text-sm">{selectedUser.phonenumber}</p>
                </div>
              )}

              {selectedUser.university && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">University</label>
                  <p className="text-sm">{selectedUser.university}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Adminuserdisplay;