import React from "react";

export function Badge({ children, className = "", variant = "default" }) {
  const variants = {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/80",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    destructive: "bg-red-500 text-slate-50 hover:bg-red-500/80",
    outline: "text-slate-950 border border-slate-200 hover:bg-slate-100"
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
