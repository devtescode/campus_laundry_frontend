import React, { useState, useEffect } from "react";
import axios from "axios";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Eye, CheckCircle } from "lucide-react";

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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/getallusers");
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
  const handleBanUser = async (user) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/ban/${user._id}`
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, status: "Banned" } : u
        )
      );
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  // ✅ Unban user
  const handleUnbanUser = async (user) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/unban/${user._id}`
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, status: "Active" } : u
        )
      );
    } catch (error) {
      console.error("Error unbanning user:", error);
    }
  };

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
    (user.fullName || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    (user.email || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    (user.university || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>User</TableHead>
                {/* <TableHead>University</TableHead> */}
                <TableHead>Role</TableHead>
                <TableHead>Jobs</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
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

                  {/* <TableCell className="text-muted-foreground">
                    {user.university || "-"}
                  </TableCell> */}

                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {user.role || "-"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {user.jobs || 0}
                  </TableCell>

                  <TableCell>
                    <span className="flex items-center gap-1 text-yellow-500">
                      ★ {user.rating || 0}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Badge className={getStatusBadge(user.status)}>
                      {user.status || "Active"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "-"}
                  </TableCell>

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
  );
};

export default Adminuserdisplay;