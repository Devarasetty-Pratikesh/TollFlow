import React, { useState, useEffect } from "react";
import { Vehicle } from "@/entities/Vehicle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Plus, Play, Trash2, Download, Users, Clock, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import AddVehicleForm from "../components/queue/AddVehicleForm";
import VehicleQueue from "../components/queue/VehicleQueue";
import ProcessingPanel from "../components/queue/ProcessingPanel";
import TollBoothSelector from "../components/queue/TollBoothSelector";
import QueueStats from "../components/queue/QueueStats";

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [processedVehicles, setProcessedVehicles] = useState([]);
  const [selectedBooth, setSelectedBooth] = useState("booth_1");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadVehicles();
    loadProcessedVehicles();
  }, []);

  const loadVehicles = async () => {
    const data = await Vehicle.filter({ status: "queued" }, "created_date");
    setVehicles(data);
  };

  const loadProcessedVehicles = async () => {
    const data = await Vehicle.filter({ status: "processed" }, "-exit_time", 50);
    setProcessedVehicles(data);
  };

  const handleAddVehicle = async (vehicleData) => {
    const newVehicle = {
      ...vehicleData,
      toll_booth: selectedBooth,
      entry_time: new Date().toISOString(),
      status: "queued"
    };
    
    await Vehicle.create(newVehicle);
    await loadVehicles();
    setShowAddForm(false);
  };

  const handleProcessVehicle = async () => {
    const queuedVehicles = vehicles.filter(v => v.toll_booth === selectedBooth && v.status === "queued");
    if (queuedVehicles.length === 0) return;

    setIsProcessing(true);
    const frontVehicle = queuedVehicles[0];
    
    // Update vehicle status to processing
    await Vehicle.update(frontVehicle.id, {
      status: "processing",
      payment_status: "processing"
    });

    // Simulate processing time
    setTimeout(async () => {
      const processingTime = Math.floor(Math.random() * 30) + 15; // 15-45 seconds
      const exitTime = new Date().toISOString();
      
      await Vehicle.update(frontVehicle.id, {
        status: "processed",
        payment_status: "paid",
        exit_time: exitTime,
        processing_time: processingTime
      });
      
      await loadVehicles();
      await loadProcessedVehicles();
      setIsProcessing(false);
    }, 2000);
  };

  const handleClearQueue = async () => {
    const queuedVehicles = vehicles.filter(v => v.toll_booth === selectedBooth);
    for (const vehicle of queuedVehicles) {
      await Vehicle.update(vehicle.id, {
        status: "processed",
        payment_status: "cancelled",
        exit_time: new Date().toISOString(),
        processing_time: 0
      });
    }
    await loadVehicles();
    await loadProcessedVehicles();
  };

  const exportData = () => {
    const exportVehicles = [...vehicles, ...processedVehicles];
    const dataStr = JSON.stringify(exportVehicles, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `toll-booth-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const currentQueueLength = vehicles.filter(v => v.toll_booth === selectedBooth && v.status === "queued").length;
  const todayProcessed = processedVehicles.filter(v => {
    const today = new Date().toDateString();
    return new Date(v.exit_time).toDateString() === today;
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Toll Booth Management
            </h1>
            <p className="text-slate-600 mt-2">Real-time vehicle queue management system</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={exportData}
              className="flex-1 md:flex-none"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Vehicle
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Current Queue
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{currentQueueLength}</div>
              <Badge variant="secondary" className="mt-2">
                {selectedBooth.replace('_', ' ').toUpperCase()}
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Processed Today
              </CardTitle>
              <Car className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{todayProcessed}</div>
              <p className="text-xs text-slate-500 mt-1">
                Total vehicles processed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Avg. Processing Time
              </CardTitle>
              <Clock className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {processedVehicles.length > 0 
                  ? Math.round(processedVehicles.reduce((acc, v) => acc + (v.processing_time || 0), 0) / processedVehicles.length)
                  : 0}s
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Average wait time
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Revenue
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                ${processedVehicles.filter(v => v.payment_status === 'paid').length * 5}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Estimated daily revenue
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add Vehicle Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AddVehicleForm 
                onSubmit={handleAddVehicle}
                onCancel={() => setShowAddForm(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <TollBoothSelector 
              selectedBooth={selectedBooth}
              onBoothChange={setSelectedBooth}
              queueCounts={vehicles.reduce((acc, v) => {
                if (v.status === "queued") {
                  acc[v.toll_booth] = (acc[v.toll_booth] || 0) + 1;
                }
                return acc;
              }, {})}
            />
            
            <VehicleQueue 
              vehicles={vehicles.filter(v => v.toll_booth === selectedBooth)}
              isProcessing={isProcessing}
            />
          </div>

          <div className="space-y-6">
            <ProcessingPanel
              onProcessVehicle={handleProcessVehicle}
              onClearQueue={handleClearQueue}
              isProcessing={isProcessing}
              queueLength={currentQueueLength}
            />

            <QueueStats 
              processedVehicles={processedVehicles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}