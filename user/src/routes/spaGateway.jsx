import { useEffect, useState } from "react";
import Loader from "../shared/components/loader";
import UserRoutes from "../routes/userRoutes";
import BusinessRoutes from "../routes/userBusinessRoutes";
import HostBusinessRoutes from "../routes/hostBusinessRoutes";
import HostRoutes from "../routes/hostRoutes";

export default function SpaGateway() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loader />;
  }

  return (
    <>
      <UserRoutes />
      <BusinessRoutes />
      <HostBusinessRoutes />
      <HostRoutes />
    </>
  );
}
