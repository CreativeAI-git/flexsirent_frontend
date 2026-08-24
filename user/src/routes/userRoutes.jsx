import { Suspense } from "react";
import { Routes, Route } from "react-router";
import { AllGuestRoutes } from "../user/routes";
import Loader from "../shared/components/loader";
import UserPrivateRoute from "./PrivateRoutes/UserPrivateRoute";

const UserRoutes = () => {

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {AllGuestRoutes?.map((item, index) => {
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

export default UserRoutes;