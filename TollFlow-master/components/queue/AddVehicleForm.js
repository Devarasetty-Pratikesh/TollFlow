import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, X, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function AddVehicleForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    vehicle_number: "",
    vehicle_type: "car",
    payment_status: "unpaid"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.vehicle_number.trim()) return;
    
    onSubmit(formData);
    setFormData({
      vehicle_number: "",
      vehicle_type: "car", 
      payment_status: "unpaid"
    });
  };

  const vehicleTypes = [
    { value: "car", label: "Car", icon: "🚗" },
    { value: "truck", label: "Truck", icon: "🚛" },
    { value: "bus", label: "Bus", icon: "🚌" },
    { value: "motorcycle", label: "Motorcycle", icon: "🏍️" },
    { value: "suv", label: "SUV", icon: "🚙" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white/90 backdrop-blur-md shadow-xl border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Car className="w-5 h-5 text-blue-600" />
            Add New Vehicle
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="vehicle_number" className="text-slate-700 font-medium">
                  Vehicle Number
                </Label>
                <Input
                  id="vehicle_number"
                  value={formData.vehicle_number}
                  onChange={(e) => setFormData({...formData, vehicle_number: e.target.value.toUpperCase()})}
                  placeholder="ABC-1234"
                  className="font-mono text-center text-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle_type" className="text-slate-700 font-medium">
                  Vehicle Type
                </Label>
                <Select
                  value={formData.vehicle_type}
                  onValueChange={(value) => setFormData({...formData, vehicle_type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <span>{type.icon}</span>
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment_status" className="text-slate-700 font-medium">
                Payment Status
              </Label>
              <Select
                value={formData.payment_status}
                onValueChange={(value) => setFormData({...formData, payment_status: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">✅ Paid</SelectItem>
                  <SelectItem value="unpaid">❌ Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add to Queue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}