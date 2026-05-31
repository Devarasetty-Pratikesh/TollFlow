import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Car as CarIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";

import VehicleCard from "./VehicleCard";

export default function VehicleQueue({ vehicles, isProcessing }) {
  const queuedVehicles = vehicles.filter(v => v.status === "queued").sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
  const processingVehicles = vehicles.filter(v => v.status === "processing");

  return (
    <Card className="bg-white/90 backdrop-blur-md shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CarIcon className="w-5 h-5 text-blue-600" />
            Vehicle Queue
          </div>
          <Badge variant="secondary" className="text-sm">
            {queuedVehicles.length} in queue
          </Badge>
        </CardTitle>
        <p className="text-slate-600 text-sm">
          FIFO (First In, First Out) processing order
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Processing Section */}
        {processingVehicles.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
              Currently Processing
            </h3>
            <AnimatePresence>
              {processingVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <VehicleCard 
                    vehicle={vehicle} 
                    position={-1}
                    isProcessing={true}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Queue Section */}
        {queuedVehicles.length > 0 ? (
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Waiting Queue
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {queuedVehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <VehicleCard 
                      vehicle={vehicle} 
                      position={index + 1}
                      isNext={index === 0}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <CarIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Queue is Empty</h3>
            <p className="text-slate-500">No vehicles waiting in the queue</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}