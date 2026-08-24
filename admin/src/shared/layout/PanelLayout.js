import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const PanelLayout = ({ children }) => {
  const { isSideBar } = useSelector((state) => state.authReducers);
 
  return (
    <main className={isSideBar == true ? "ct_show" : ""}>
      <Sidebar />
      <div className="ct_right_panel">
        <Header />
        <div class="ct_px_30 ct_mt_30 pb-4">
          <div class="container-fluid">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default PanelLayout;
