import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
