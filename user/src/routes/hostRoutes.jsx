import { Suspense } from "react";
import { Routes, Route } from "react-router";
import { AllHostsRoutes } from "../host/routes";
import Loader from "../shared/components/loader";
import HostPrivateRoute from "./PrivateRoutes/HostPrivateRoute";
import HostStripeSetupGate from "../shared/components/guards/HostStripeSetupGate";

const HostRoutes = () => {

    return (
        <Suspense fallback={<Loader />}>
          <HostStripeSetupGate panel="host">
            <Routes>
                {AllHostsRoutes?.map((item, index) => {
                    return (
                        <Route
                            key={index}
                            exact
                            path={item.path}
                            element={
                                item?.isPrivate ? (
                                    <HostPrivateRoute>{item?.element}</HostPrivateRoute>
                                ) : (
                                    item?.element
                                )
                            }
                        />
                    );
                })}
                {/* <Route exact path="*" element={<PageNotFound />} /> */}
            </Routes>
          </HostStripeSetupGate>
        </Suspense>
    )
}

export default HostRoutes;
