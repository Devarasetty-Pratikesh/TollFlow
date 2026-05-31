import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function TollBoothSelector({ selectedBooth, onBoothChange, queueCounts }) {
  const booths = [
    { id: "booth_1", name: "Booth 1", color: "bg-blue-500" },
    { id: "booth_2", name: "Booth 2", color: "bg-green-500" },
    { id: "booth_3", name: "Booth 3", color: "bg-purple-500" },
    { id: "booth_4", name: "Booth 4", color: "bg-orange-500" }
  ];

  return (
    <Card className="bg-white/90 backdrop-blur-md shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Building2 className="w-5 h-5 text-blue-600" />
          Toll Booth Selection
        </CardTitle>
        <p className="text-slate-600 text-sm">
          Select a toll booth to manage its queue
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {booths.map((booth) => {
            const count = queueCounts[booth.id] || 0;
            const isSelected = selectedBooth === booth.id;

            return (
              <motion.div
                key={booth.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => onBoothChange(booth.id)}
                  className={`w-full h-auto p-4 flex flex-col items-center gap-2 ${
                    isSelected 
                      ? `bg-blue-600 hover:bg-blue-700 text-white border-blue-600` 
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className={`w-8 h-8 ${booth.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-semibold text-sm">
                      {booth.id.split('_')[1]}
                    </span>
                  </div>
                  <span className="font-medium">{booth.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    {count}
                  </Badge>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}