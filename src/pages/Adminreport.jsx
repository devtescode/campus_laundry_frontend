import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Trash2,
  Eye,
  
  AlertTriangle,
  CheckCircle,

} from "lucide-react";
const Adminreport = () => {
     const jobs = [
        { id: 1, type: "Washing & Ironing", poster: "Chidi M.", washer: "Adaeze N.", price: 3500, status: "In Progress", location: "UNILAG", date: "Dec 2, 2024", reported: false },
        { id: 2, type: "Washing Only", poster: "Amara K.", washer: "Tunde O.", price: 2000, status: "Completed", location: "UI", date: "Dec 1, 2024", reported: false },
        { id: 3, type: "Ironing Only", poster: "Ngozi P.", washer: null, price: 2500, status: "Pending", location: "UNN", date: "Dec 2, 2024", reported: true },
        { id: 4, type: "Washing & Folding", poster: "Emeka O.", washer: "Chidi M.", price: 4000, status: "Disputed", location: "UNIBEN", date: "Nov 30, 2024", reported: true },
        { id: 5, type: "Full Service", poster: "Tunde O.", washer: "Amara K.", price: 6000, status: "Completed", location: "OAU", date: "Nov 29, 2024", reported: false },
    ];
  return (
    <div className="space-y-6 animate-fade-in">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    Reported Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobs.filter(j => j.reported).map((job) => (
                    <div key={job.id} className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">Job #{job.id}: {job.type}</h4>
                          <p className="text-sm text-muted-foreground">Posted by {job.poster} • {job.location}</p>
                          <p className="text-sm text-yellow-400 mt-2">Reported for: Inappropriate content</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                          <Button variant="outline" size="sm" className="text-green-400 border-green-500/30">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Dismiss
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {jobs.filter(j => j.reported).length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <p className="text-foreground font-medium">All clear!</p>
                      <p className="text-sm text-muted-foreground">No reported content at the moment.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
  )
}

export default Adminreport