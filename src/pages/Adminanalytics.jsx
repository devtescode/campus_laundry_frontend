import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Briefcase, 
  TrendingUp,  
  Activity
} from "lucide-react";

const Adminanalytics = () => {
    
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-card border-border">
                    <CardContent className="p-4 text-center">
                        <Activity className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">89%</p>
                        <p className="text-sm text-muted-foreground">Job Completion Rate</p>
                    </CardContent>
                </Card>
                <Card className="bg-card border-border">
                    <CardContent className="p-4 text-center">
                        <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">₦3,200</p>
                        <p className="text-sm text-muted-foreground">Avg. Job Value</p>
                    </CardContent>
                </Card>
                <Card className="bg-card border-border">
                    <CardContent className="p-4 text-center">
                        <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">4.7</p>
                        <p className="text-sm text-muted-foreground">Avg. User Rating</p>
                    </CardContent>
                </Card>
                <Card className="bg-card border-border">
                    <CardContent className="p-4 text-center">
                        <Briefcase className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">2.3hrs</p>
                        <p className="text-sm text-muted-foreground">Avg. Job Duration</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle>Monthly Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-end justify-between gap-2">
                            {[180, 220, 195, 280, 310, 290, 350, 420, 380, 450, 520, 580].map((value, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                    <div
                                        className="w-full bg-green-500/20 rounded-t-lg hover:bg-green-500/30 transition-colors"
                                        style={{ height: `${(value / 580) * 100}%` }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>Jan</span>
                            <span>Dec</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-end justify-between gap-2">
                            {[50, 80, 120, 180, 250, 340, 420, 520, 650, 800, 980, 1247].map((value, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                    <div
                                        className="w-full bg-primary/20 rounded-t-lg hover:bg-primary/30 transition-colors"
                                        style={{ height: `${(value / 1247) * 100}%` }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>Jan</span>
                            <span>Dec</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Adminanalytics