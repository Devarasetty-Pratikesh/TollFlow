import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Car, Truck, Bus, Bike, Car as SUV } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

const vehicleIcons = {
  car: Car,
  truck: Truck,
  bus: Bus,
  motorcycle: Bike,
  suv: SUV
};

const vehicleColors = {
  car: "bg-blue-500",
  truck: "bg-red-500",
  bus: "bg-amber-500",
  motorcycle: "bg-green-500",
  suv: "bg-purple-500"
};

const paymentStatusColors = {
  paid: "bg-green-100 text-green-800 border-green-300",
  unpaid: "bg-red-100 text-red-800 border-red-300",
  processing: "bg-amber-100 text-amber-800 border-amber-300"
};

export default function VehicleCard({ vehicle, position, isNext = false, isProcessing = false }) {
  const VehicleIcon = vehicleIcons[vehicle.vehicle_type] || Car;
  const colorClass = vehicleColors[vehicle.vehicle_type] || "bg-slate-500";
  const paymentColor = paymentStatusColors[vehicle.payment_status] || "bg-gray-100 text-gray-800";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`p-4 transition-all duration-300 ${
        isNext ? 'ring-2 ring-blue-500 bg-blue-50/50' : 
        isProcessing ? 'ring-2 ring-amber-500 bg-amber-50/50' : 
        'bg-white/80 hover:bg-white/90'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${colorClass} rounded-full flex items-center justify-center`}>
              <VehicleIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-900 font-mono text-lg">
                {vehicle.vehicle_number}
              </div>
              <div className="text-sm text-slate-600 capitalize">
                {vehicle.vehicle_type}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {position > 0 && (
              <Badge variant="outline" className="font-semibold">
                #{position}
              </Badge>
            )}
            {isNext && (
              <Badge className="bg-blue-600 text-white">
                NEXT
              </Badge>
            )}
            {isProcessing && (
              <Badge className="bg-amber-600 text-white animate-pulse">
                PROCESSING
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
          <Badge className={paymentColor}>
            {vehicle.payment_status === 'paid' ? '✅' : vehicle.payment_status === 'processing' ? '⏳' : '❌'} 
            {vehicle.payment_status.charAt(0).toUpperCase() + vehicle.payment_status.slice(1)}
          </Badge>
          
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            {formatDistanceToNow(new Date(vehicle.entry_time), { addSuffix: true })}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}