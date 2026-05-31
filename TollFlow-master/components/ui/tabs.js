import React, { createContext, useContext, useState } from "react";

const TabsContext = createContext(null);

export function Tabs({ children, defaultValue, className = "" }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = "" }) {
  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ children, value, className = "" }) {
  const { value: activeValue, setValue } = useContext(TabsContext);
  const isActive = activeValue === value;
  return (
    <button
      type="button"
      onClick={() => setValue(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive 
          ? "bg-white text-slate-950 shadow-sm" 
          : "hover:bg-slate-50/50 hover:text-slate-950"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, className = "" }) {
  const { value: activeValue } = useContext(TabsContext);
  if (activeValue !== value) return null;
  return <div className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 ${className}`}>{children}</div>;
}
