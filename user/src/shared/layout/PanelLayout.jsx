import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const PanelLayout = ({ children, user }) => {
  const { isSideBar } = useSelector((state) => state.host.auth);

  return (
    <main className={isSideBar == true ? "ct_show" : ""}>
      <Sidebar role={user.role} />
      <div className="ct_right_panel" style={{ minHeight: "100vh", paddingBottom: "50px" }}>
        <Header name={user.name} role={user.role} />
        <div className="ct_px_30 mt-4 pb-4 ct_panel_bottom_clearance" style={{ paddingBottom: "50px" }}>
          <div className="container-fluid">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default PanelLayout;