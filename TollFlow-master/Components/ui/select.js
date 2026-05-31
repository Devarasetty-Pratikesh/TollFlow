import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const SelectContext = createContext(null);

export function Select({ children, value, onValueChange }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState({});
  const containerRef = useRef(null);

  const registerItem = (val, node) => {
    setItems((prev) => {
      if (prev[val] === node) return prev;
      return { ...prev, [val]: node };
    });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen, items, registerItem }}>
      <div ref={containerRef} className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children, className = "" }) {
  const { open, setOpen } = useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus:ring-slate-300 ${className}`}
    >
      {children}
      <span className="ml-2 text-slate-500 text-xs">▼</span>
    </button>
  );
}

export function SelectValue({ placeholder, className = "" }) {
  const { value, items } = useContext(SelectContext);
  return (
    <span className={`block truncate ${className}`}>
      {items[value] || value || placeholder}
    </span>
  );
}

export function SelectContent({ children, className = "" }) {
  const { open } = useContext(SelectContext);
  if (!open) return null;
  return (
    <div className={`absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-200 bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${className}`}>
      {children}
    </div>
  );
}

export function SelectItem({ children, value, className = "" }) {
  const { value: selectedValue, onValueChange, setOpen, registerItem } = useContext(SelectContext);
  const isSelected = selectedValue === value;
  
  useEffect(() => {
    if (registerItem) {
      registerItem(value, children);
    }
  }, [value, children]);
  
  return (
    <div
      onClick={() => {
        onValueChange(value);
        setOpen(false);
      }}
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100 ${
        isSelected ? "bg-slate-100 font-semibold" : ""
      } ${className}`}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          ✓
        </span>
      )}
      {children}
    </div>
  );
}
