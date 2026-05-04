import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Adminchat = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchChats = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/admin/getallchats");
            const loadedChats = res.data.chats || [];
            setChats(loadedChats);
            if (!selectedChat && loadedChats.length > 0) {
                setSelectedChat(loadedChats[0]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredChats = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return chats;

        return chats.filter((chat) => {
            const title = chat.job?.type?.toLowerCase() || "";
            const poster = chat.job?.userId?.fullname?.toLowerCase() || "";
            const washer = chat.job?.applicant?.fullname?.toLowerCase() || "";
            const latest = chat.messages?.[chat.messages.length - 1]?.text?.toLowerCase() || "";
            return (
                title.includes(query) ||
                poster.includes(query) ||
                washer.includes(query) ||
                latest.includes(query)
            );
        });
    }, [chats, searchTerm]);

    const formatTime = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };


    const getStatusStyle = (status) => {
        const styles = {
            "Pending": "bg-yellow-100 text-yellow-700",
            "Applied": "bg-blue-100 text-blue-700",
            "In Progress": "bg-purple-100 text-purple-700",
            "Completed": "bg-green-100 text-green-700",
            "Disputed": "bg-red-100 text-red-700",
        };

        return styles[status] || "bg-slate-100 text-slate-600";
    };
    return (
        <div className="space-y-0 p-0 animate-fade-in">
            <div className="border-none bg-card/80 p-5 shadow-sm backdrop-blur-lg">
                <div className="flex flex gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            {chats.length} total threads
                        </span>
                        <Button variant="secondary" onClick={fetchChats} className="whitespace-nowrap">
                            Refresh conversations
                        </Button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-[380px_minmax(0,1fr)] gap-2 min-h-[calc(100vh-200px)]">
                <Card className="shadow-lg shadow-slate-200/50 overflow-hidden border-none rounded-none">
                    <CardContent className="p-5 space-y-5">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold">Chat sessions</h2>
                                <p className="text-sm text-muted-foreground">
                                    Search and select a conversation to preview messages.
                                </p>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                                {filteredChats.length} visible
                            </span>
                        </div>

                        <Input
                            placeholder="Search by job, poster, washer, or message..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-50"
                        />

                        <div className="max-h-[calc(100vh-320px)] overflow-y-auto pr-1 space-y-3">
                            {loading ? (
                                <div className="rounded-2xl border border-dashed border-muted/50 p-6 text-center text-sm text-muted-foreground">
                                    Loading conversations...
                                </div>
                            ) : filteredChats.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-muted/50 p-6 text-center text-sm text-muted-foreground">
                                    No chats match your search. Try a different keyword.
                                </div>
                            ) : (
                                filteredChats.map((chat) => {
                                    const latestMessage = chat.messages?.[chat.messages.length - 1];
                                    return (
                                        <button
                                            type="button"
                                            key={chat.job?._id || chat._id}
                                            onClick={() => setSelectedChat(chat)}
                                            className={`rounded w-full text-left border border-none px-3 py-2 transition-all duration-200 ${selectedChat?.job?._id === chat.job?._id
                                                ? "border-primary/40 bg-primary/5 shadow-sm"
                                                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <p className="font-semibold text-slate-900">{chat.job?.type || "Untitled job"}</p>
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        Poster: {chat.job?.userId?.fullname || "Unknown"}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] ${getStatusStyle(
                                                        chat.job?.status
                                                    )}`}
                                                >
                                                    {chat.job?.status || "Unknown"}
                                                </span>
                                            </div>

                                            <div className="mt-1 text-sm text-slate-600 line-clamp-2">
                                                {latestMessage?.text || "No messages yet."}
                                            </div>

                                            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                                <span>{chat.messages?.length || 0} messages</span>
                                                <span>{latestMessage ? formatTime(latestMessage.createdAt) : "No timestamp"}</span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg shadow-slate-200/50 overflow-hidden flex flex-col border-none rounded-none">
                    <CardContent className="p-5 flex-1 flex flex-col">
                        {!selectedChat ? (
                            <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                                <p className="text-sm uppercase tracking-[0.24em] text-primary">No conversation selected</p>
                                <h2 className="mt-3 text-2xl font-semibold text-foreground">Choose a chat from the list</h2>
                                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                                    The selected conversation will appear here with the full message history and job details.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                <div className="rounded border border-slate-200 bg-slate-50 p-5">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Chat thread</p>
                                            <h2 className="text-2xl font-semibold text-foreground">{selectedChat.job?.type || "Job conversation"}</h2>
                                        </div>
                                        <div className="space-y-2 text-sm text-slate-600">
                                            <div>
                                                <span className="font-medium text-slate-900">Poster:</span> {selectedChat.job?.userId?.fullname || "Unknown"}
                                            </div>
                                            <div>
                                                <span className="font-medium text-slate-900">Washer:</span> {selectedChat.job?.applicant?.fullname || "Not assigned"}
                                            </div>
                                            <div>
                                                <span className="font-medium text-slate-900">Status:</span> {selectedChat.job?.status || "Pending"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 overflow-y-auto pr-2 text-sm text-slate-900" style={{ maxHeight: "calc(100vh - 420px)" }}>
                                    {selectedChat.messages?.length > 0 ? (
                                        selectedChat.messages.map((msg) => {
                                            const isPoster = msg.sender?._id === selectedChat.job?.userId?._id;
                                            return (
                                                <div key={msg._id} className={`flex ${isPoster ? "justify-start" : "justify-end"}`}>
                                                    <div className={`max-w-[85%] rounded-3xl px-4 py-3 shadow-sm ${isPoster
                                                        ? "bg-slate-100 text-slate-900"
                                                        : "bg-primary text-primary-foreground"
                                                        }`}>
                                                        <div className="flex items-center justify-between gap-3 text-xs font-semibold text-slate-500">
                                                            <span>{msg.sender?.fullname || "Unknown"}</span>
                                                            <span>{formatTime(msg.createdAt)}</span>
                                                        </div>
                                                        <p className="mt-2 whitespace-pre-line break-words text-sm leading-6">
                                                            {msg.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-muted-foreground">
                                            This conversation has no messages yet.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Adminchat;
