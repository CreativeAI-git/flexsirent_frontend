import './App.css';
import { Suspense } from 'react';
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { AllAdminRoutes } from './routes/PageRoutes';
import AdminLoader from './shared/components/loader';
import AdminPrivateRoute from './routes/privateRoute';

function App() {
  return (
    <Suspense fallback={<AdminLoader />}>
       <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {AllAdminRoutes?.map((item, index) => {
          return (
            <Route
              key={index}
              exact
              path={item.path}
              element={
                item?.isPrivate ? (
                  <AdminPrivateRoute>{item?.element}</AdminPrivateRoute>
                ) : (
                  item?.element
                )
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
}

export default App;
