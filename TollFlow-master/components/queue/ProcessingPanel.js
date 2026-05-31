import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ProcessingPanel({ onProcessVehicle, onClearQueue, isProcessing, queueLength }) {
  return (
    <Card className="bg-white/90 backdrop-blur-md shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Queue Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Button
            onClick={onProcessVehicle}
            disabled={isProcessing || queueLength === 0}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
            size="lg"
          >
            {isProcessing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 mr-2"
              >
                ⚙️
              </motion.div>
            ) : (
              <Play className="w-5 h-5 mr-2" />
            )}
            {isProcessing ? "Processing..." : "Process Next Vehicle"}
          </Button>

          <Button
            onClick={onClearQueue}
            disabled={isProcessing || queueLength === 0}
            variant="destructive"
            className="w-full"
            size="lg"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Clear Queue
          </Button>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Queue Length:</span>
            <span className="font-semibold text-slate-900">{queueLength} vehicles</span>
          </div>
          
          {queueLength === 0 && (
            <div className="mt-3 p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <AlertTriangle className="w-4 h-4" />
                No vehicles in queue
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}