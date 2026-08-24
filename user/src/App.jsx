import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import BusinessRoutes from "./routes/userBusinessRoutes";
import HostRoutes from "./routes/hostRoutes";
import UserRoutes from "./routes/userRoutes";
import HostBusinessRoutes from "./routes/hostBusinessRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Navigate to="/en/" replace />} />
        <Route path="/:lang/*" element={
          <>
            <UserRoutes />
            <BusinessRoutes />
            <HostBusinessRoutes />
            <HostRoutes />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
