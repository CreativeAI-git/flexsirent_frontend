import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader";
import Button from "../../components/buttons";
import PanelLayout from "../../layout/PanelLayout";
import NoRecord from "../../components/other/NoRecord";
import SearchInput from "../../components/form/SearchInput";
import TableHeader from "../../components/table/tableHeader";
import useDebounce from "../../components/hooks/useDebounce";
import ReactPagination from "../../components/table/ReactPagination";
import PaginationDropdown from "../../components/table/PaginationDropdown";
import { useTranslation } from "react-i18next";
import { useTableHeaders } from "../../hooks/useTableHeaders";
import {
  fetchSubHost,
  updateSubHostStatus,
} from "../../../redux/features/host/actions/authAction";

const SubHostManagementPage = ({ panelRole, routes }) => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { subHostHeader } = useTableHeaders();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);
  const user = { name: t("sidebar.sub_host_management"), role: panelRole };
  const { isLoading, subHostList } = useSelector(
    (state) => state.host.auth
  );

  const paginatedList = (subHostList || [])
    .filter((item) => {
      const fullName = `${item?.first_name || ""} ${item?.last_name || ""}`;
      return fullName
        .toLowerCase()
        .includes((debouncedSearch || "").toLowerCase());
    })
    .slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  useEffect(() => {
    dispatch(fetchSubHost());
  }, [dispatch]);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  const handleStatusUpdate = (id) => {
    const callback = (res) => {
      if (res?.success) {
        dispatch(fetchSubHost());
      }
    };

    dispatch(updateSubHostStatus({ payload: id, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
            <SearchInput
              value={searchFilter}
              onChange={setSearchFilter}
              placeholder={t("search.by_name")}
            />

            <Button redirectUrl={routes.AddSubHost} title={t("form.add_sub_host")} />
          </div>
          <div className="table-responsive mt-3 ct_custom_table">
            <table className="table ">
              <TableHeader data={subHostHeader} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr key={item?.host_id || i}>
                    <td>{currentPage * listPerPages + i + 1}</td>
                    <td>
                      <span className="ct_overlay_text">
                        {item?.first_name || "#N/A"}
                      </span>
                    </td>
                    <td>
                      <span className="ct_overlay_text">
                        {item?.last_name || "#N/A"}
                      </span>
                    </td>
                    <td>{item?.email || "#N/A"}</td>
                    <td>{item?.phone || "#N/A"}</td>
                    <td>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={item?.is_active}
                          onChange={() => handleStatusUpdate(item?.host_id)}
                        />
                        <div className="toggle-switch-background">
                          <div className="toggle-switch-handle"></div>
                        </div>
                      </label>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-3 justify-content-end">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(routes.SubHostDetails, {
                              state: { data: item },
                            });
                          }}
                          className="text-dark"
                        >
                          <i className="fa-regular fa-eye"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(routes.EditSubHost, {
                              state: { data: item },
                            });
                          }}
                          className="text-dark"
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {paginatedList?.length <= 0 && <NoRecord />}
          </div>
          {paginatedList?.length !== 0 && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                <PaginationDropdown
                  onChange={(val) => {
                    setListPerPages(val);
                    setCurrentPage(0);
                  }}
                />
              </div>
              <div>
                <ReactPagination
                  pageCount={Math.ceil((subHostList?.length || 0) / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </PanelLayout>
  );
};

export default SubHostManagementPage;
