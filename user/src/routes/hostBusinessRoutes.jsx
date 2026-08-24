import { Suspense } from "react";
import { Routes, Route } from "react-router";
import Loader from "../shared/components/loader";
import UserPrivateRoute from "./PrivateRoutes/UserPrivateRoute";
import { AllHostBusinessRoutes } from "../host business/routes";
import HostStripeSetupGate from "../shared/components/guards/HostStripeSetupGate";


const HostBusinessRoutes = () => {

  return (
    <Suspense fallback={<Loader />}>
      <HostStripeSetupGate panel="hostBusiness">
      <Routes>
        {AllHostBusinessRoutes?.map((item, index) => {
          return (
            <Route
              key={index}
              exact
              path={item.path}
              element={
                item?.isPrivate ? (
                  <UserPrivateRoute>{item?.element}</UserPrivateRoute>
                ) : (
                  item?.element
                )
              }
            />
          );
        })}
      </Routes>
      </HostStripeSetupGate>
    </Suspense>
  )
}

export default HostBusinessRoutes;
