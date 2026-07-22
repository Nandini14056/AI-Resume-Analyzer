import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Upload from "./pages/Upload/Upload";
import Report from "./pages/Report/Report";
import History from "./pages/History/History";
import Admin from "./pages/Admin/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/report/:id" element={<Report />} />
      <Route path="/history" element={<History />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;