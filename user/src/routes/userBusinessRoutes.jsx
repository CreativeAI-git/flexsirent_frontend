import { Suspense } from "react";
import { Routes, Route } from "react-router";
import Loader from "../shared/components/loader";
import { AllBusinessRoutes } from "../business/routes";
import UserPrivateRoute from "./PrivateRoutes/UserPrivateRoute";

const BusinessRoutes = () => {

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {AllBusinessRoutes?.map((item, index) => {
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
    </Suspense>
  )
}

export default BusinessRoutes;