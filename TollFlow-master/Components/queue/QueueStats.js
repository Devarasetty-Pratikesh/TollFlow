import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

export default function QueueStats({ processedVehicles }) {
  const recentProcessed = processedVehicles
    .filter(v => v.exit_time)
    .sort((a, b) => new Date(b.exit_time) - new Date(a.exit_time))
    .slice(0, 5);

  const todayProcessed = processedVehicles.filter(v => {
    const today = new Date().toDateString();
    return v.exit_time && new Date(v.exit_time).toDateString() === today;
  });

  const avgProcessingTime = todayProcessed.length > 0 
    ? Math.round(todayProcessed.reduce((acc, v) => acc + (v.processing_time || 0), 0) / todayProcessed.length)
    : 0;

  return (
    <Card className="bg-white/90 backdrop-blur-md shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Activity className="w-5 h-5 text-green-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-700">{todayProcessed.length}</div>
            <div className="text-xs text-green-600">Today</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">{avgProcessingTime}s</div>
            <div className="text-xs text-blue-600">Avg Time</div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-3">Recently Processed</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {recentProcessed.length > 0 ? (
              recentProcessed.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {vehicle.payment_status === 'paid' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="font-mono text-sm font-medium">
                      {vehicle.vehicle_number}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {format(new Date(vehicle.exit_time), "HH:mm")}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">
                No vehicles processed yet
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}