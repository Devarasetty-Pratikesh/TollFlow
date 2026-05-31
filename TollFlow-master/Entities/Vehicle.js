const getTodayAtHour = (hour) => {
  const d = new Date();
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

const initialVehicles = [
  {
    id: "v-1",
    vehicle_number: "KA-01-ME-1234",
    vehicle_type: "car",
    payment_status: "paid",
    entry_time: new Date(Date.now() - 10 * 60000).toISOString(),
    toll_booth: "booth_1",
    status: "queued",
    created_date: new Date(Date.now() - 10 * 60000).toISOString()
  },
  {
    id: "v-2",
    vehicle_number: "MH-02-AB-5678",
    vehicle_type: "truck",
    payment_status: "unpaid",
    entry_time: new Date(Date.now() - 5 * 60000).toISOString(),
    toll_booth: "booth_1",
    status: "queued",
    created_date: new Date(Date.now() - 5 * 60000).toISOString()
  },
  {
    id: "v-3",
    vehicle_number: "DL-03-TC-9012",
    vehicle_type: "suv",
    payment_status: "unpaid",
    entry_time: new Date(Date.now() - 2 * 60000).toISOString(),
    toll_booth: "booth_1",
    status: "queued",
    created_date: new Date(Date.now() - 2 * 60000).toISOString()
  },
  {
    id: "v-4",
    vehicle_number: "AP-09-DE-5432",
    vehicle_type: "motorcycle",
    payment_status: "paid",
    entry_time: new Date(Date.now() - 1 * 60000).toISOString(),
    toll_booth: "booth_2",
    status: "queued",
    created_date: new Date(Date.now() - 1 * 60000).toISOString()
  },
  // Processed vehicles
  {
    id: "p-1",
    vehicle_number: "KA-03-HA-8822",
    vehicle_type: "car",
    payment_status: "paid",
    entry_time: getTodayAtHour(9),
    exit_time: getTodayAtHour(9),
    toll_booth: "booth_1",
    status: "processed",
    processing_time: 20,
    created_date: getTodayAtHour(9)
  },
  {
    id: "p-2",
    vehicle_number: "KA-04-MM-9911",
    vehicle_type: "car",
    payment_status: "paid",
    entry_time: getTodayAtHour(9),
    exit_time: getTodayAtHour(9),
    toll_booth: "booth_2",
    status: "processed",
    processing_time: 25,
    created_date: getTodayAtHour(9)
  },
  {
    id: "p-3",
    vehicle_number: "MH-12-PQ-4567",
    vehicle_type: "truck",
    payment_status: "paid",
    entry_time: getTodayAtHour(10),
    exit_time: getTodayAtHour(10),
    toll_booth: "booth_1",
    status: "processed",
    processing_time: 45,
    created_date: getTodayAtHour(10)
  },
  {
    id: "p-4",
    vehicle_number: "MH-14-ZA-3029",
    vehicle_type: "truck",
    payment_status: "paid",
    entry_time: getTodayAtHour(10),
    exit_time: getTodayAtHour(10),
    toll_booth: "booth_3",
    status: "processed",
    processing_time: 50,
    created_date: getTodayAtHour(10)
  },
  {
    id: "p-5",
    vehicle_number: "DL-01-CA-1122",
    vehicle_type: "bus",
    payment_status: "paid",
    entry_time: getTodayAtHour(11),
    exit_time: getTodayAtHour(11),
    toll_booth: "booth_1",
    status: "processed",
    processing_time: 40,
    created_date: getTodayAtHour(11)
  },
  {
    id: "p-6",
    vehicle_number: "DL-02-CB-3344",
    vehicle_type: "bus",
    payment_status: "paid",
    entry_time: getTodayAtHour(11),
    exit_time: getTodayAtHour(11),
    toll_booth: "booth_2",
    status: "processed",
    processing_time: 35,
    created_date: getTodayAtHour(11)
  },
  {
    id: "p-7",
    vehicle_number: "HR-26-AS-7777",
    vehicle_type: "suv",
    payment_status: "paid",
    entry_time: getTodayAtHour(12),
    exit_time: getTodayAtHour(12),
    toll_booth: "booth_1",
    status: "processed",
    processing_time: 30,
    created_date: getTodayAtHour(12)
  },
  {
    id: "p-8",
    vehicle_number: "HR-26-DF-1212",
    vehicle_type: "suv",
    payment_status: "paid",
    entry_time: getTodayAtHour(12),
    exit_time: getTodayAtHour(12),
    toll_booth: "booth_4",
    status: "processed",
    processing_time: 28,
    created_date: getTodayAtHour(12)
  },
  {
    id: "p-9",
    vehicle_number: "TN-07-JK-9080",
    vehicle_type: "motorcycle",
    payment_status: "paid",
    entry_time: getTodayAtHour(13),
    exit_time: getTodayAtHour(13),
    toll_booth: "booth_1",
    status: "processed",
    processing_time: 15,
    created_date: getTodayAtHour(13)
  },
  {
    id: "p-10",
    vehicle_number: "TN-09-PL-7766",
    vehicle_type: "motorcycle",
    payment_status: "paid",
    entry_time: getTodayAtHour(13),
    exit_time: getTodayAtHour(13),
    toll_booth: "booth_3",
    status: "processed",
    processing_time: 18,
    created_date: getTodayAtHour(13)
  },
  {
    id: "p-11",
    vehicle_number: "KA-51-EF-4455",
    vehicle_type: "car",
    payment_status: "paid",
    entry_time: getTodayAtHour(14),
    exit_time: getTodayAtHour(14),
    toll_booth: "booth_2",
    status: "processed",
    processing_time: 22,
    created_date: getTodayAtHour(14)
  },
  {
    id: "p-12",
    vehicle_number: "MH-02-GH-8877",
    vehicle_type: "suv",
    payment_status: "paid",
    entry_time: getTodayAtHour(14),
    exit_time: getTodayAtHour(14),
    toll_booth: "booth_1",
    status: "processed",
    processing_time: 29,
    created_date: getTodayAtHour(14)
  }
];

export class Vehicle {
  static getStorage() {
    const data = localStorage.getItem("tollflow_vehicles");
    if (!data) {
      localStorage.setItem("tollflow_vehicles", JSON.stringify(initialVehicles));
      return initialVehicles;
    }
    return JSON.parse(data);
  }

  static setStorage(vehicles) {
    localStorage.setItem("tollflow_vehicles", JSON.stringify(vehicles));
  }

  static async list() {
    return this.getStorage();
  }

  static async filter(filterObj = {}, sortBy = "", limit = null) {
    let list = this.getStorage();
    
    // Apply filter
    list = list.filter(item => {
      for (const [key, value] of Object.entries(filterObj)) {
        if (item[key] !== value) return false;
      }
      return true;
    });

    // Apply sorting
    if (sortBy) {
      const desc = sortBy.startsWith("-");
      const field = desc ? sortBy.slice(1) : sortBy;
      
      list.sort((a, b) => {
        const valA = a[field];
        const valB = b[field];
        
        if (valA === undefined || valA === null) return desc ? 1 : -1;
        if (valB === undefined || valB === null) return desc ? -1 : 1;
        
        if (typeof valA === "string") {
          return desc 
            ? valB.localeCompare(valA)
            : valA.localeCompare(valB);
        } else {
          return desc ? valB - valA : valA - valB;
        }
      });
    }

    // Apply limit
    if (limit) {
      list = list.slice(0, limit);
    }

    return list;
  }

  static async create(vehicleData) {
    const list = this.getStorage();
    const newVehicle = {
      ...vehicleData,
      id: "v-" + Math.random().toString(36).substr(2, 9),
      created_date: new Date().toISOString(),
      entry_time: vehicleData.entry_time || new Date().toISOString(),
      status: vehicleData.status || "queued",
      payment_status: vehicleData.payment_status || "unpaid"
    };
    list.push(newVehicle);
    this.setStorage(list);
    return newVehicle;
  }

  static async update(id, updateData) {
    const list = this.getStorage();
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updateData };
      this.setStorage(list);
      return list[index];
    }
    return null;
  }
}
