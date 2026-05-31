import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <div className="flex min-h-screen w-full">{children}</div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({ children, className = "" }) {
  const { open } = useContext(SidebarContext);
  return (
    <aside className={`flex flex-col h-screen w-64 shrink-0 transition-all duration-300 border-r border-slate-200 bg-white/80 backdrop-blur-md ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-0 overflow-hidden"} ${className}`}>
      {children}
    </aside>
  );
}

export function SidebarTrigger({ className = "" }) {
  const { open, setOpen } = useContext(SidebarContext);
  return (
    <button
      onClick={() => setOpen(!open)}
      className={`p-2 hover:bg-slate-100 rounded-lg ${className}`}
    >
      ☰
    </button>
  );
}

export function SidebarHeader({ children, className = "" }) {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
}

export function SidebarContent({ children, className = "" }) {
  return <div className={`flex-1 overflow-y-auto ${className}`}>{children}</div>;
}

export function SidebarGroup({ children, className = "" }) {
  return <div className={`py-2 ${className}`}>{children}</div>;
}

export function SidebarGroupLabel({ children, className = "" }) {
  return <div className={`text-slate-500 font-semibold px-4 py-2 ${className}`}>{children}</div>;
}

export function SidebarGroupContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function SidebarMenu({ children, className = "" }) {
  return <ul className={`space-y-1 ${className}`}>{children}</ul>;
}

export function SidebarMenuItem({ children, className = "" }) {
  return <li className={className}>{children}</li>;
}

export function SidebarMenuButton({ children, asChild, className = "", ...props }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${children.props.className || ""} ${className}`.trim(),
      ...props
    });
  }
  return (
    <button className={`w-full flex items-center ${className}`} {...props}>
      {children}
    </button>
  );
}

export function SidebarFooter({ children, className = "" }) {
  return <div className={`mt-auto ${className}`}>{children}</div>;
}
