import { curSym } from "../../utills/pip";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../../components/form/Loader";
import { pageRoutes } from "../../routes/PageRoutes";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import DeleteModal from "../../components/modal/DeleteModal";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";
import {
  deleteSeriveFee,
  fetchServiceFee,
} from "../../redux/actions/serviceFeeAction";

const ManageServiceFee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [isViewModal, setIsViewModal] = useState(false);
  const debouncedSearch = useDebounce(searchFilter, 500);
  const { tableHeader, list, isLoading } = useSelector(
    (state) => state?.serviceFeeReducers
  );

  const paginatedList = list
    ?.filter((item) => {
      const search = debouncedSearch
        ? item?.country
            ?.toLowerCase()
            ?.includes(debouncedSearch?.toLowerCase()) ||
          item?.state
            ?.toLowerCase()
            ?.includes(debouncedSearch?.toLowerCase()) ||
          item?.location
            ?.toLowerCase()
            ?.includes(debouncedSearch?.toLowerCase())
        : true;

      return search;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  useEffect(() => {
    dispatch(fetchServiceFee());
  }, []);

  const handleDeleteFee = () => {
    const callback = (res) => {
      if (res?.success) {
        setIsViewModal(false);
        dispatch(fetchServiceFee());
      }
    };
    dispatch(deleteSeriveFee({ payload: id, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout>
      <SubHeader
        label="Manage Service Fee"
        isBtn={true}
        paddingClass="pb-0"

        btnRoute={pageRoutes.addServiceFeeDetail}
        btnName="+ Add Service Fee"
      />

      <div class="d-flex align-items-center justify-content-end gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search..."
        />
        
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table">
              <TableHeader data={tableHeader} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>

                    <td>{item?.country || "#N/A"}</td>
                    <td>{item?.state || "#N/A"}</td>
                    <td>{item?.location || "#N/A"}</td>
                    <td>
                      {curSym}
                      {item?.commission || "0"}
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(pageRoutes.serviceFeeDetail, {
                              state: { data: item },
                            });
                          }}
                          className="ct_text_39A1FF"
                        >
                          <i className="fa-solid fa-eye fs-5"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(pageRoutes.editServiceFeeDetail, {
                              state: { data: item },
                            });
                          }}
                          className="text-dark"
                        >
                          <i className="fa-solid fa-pencil fs-5"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setId(item?.fee_id);
                            setIsViewModal(true);
                          }}
                          className="ct_red_clr"
                        >
                          <i className="fa-solid fa-trash-can fs-5"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {paginatedList?.length <= 0 && <NoRecord />}
          </div>
          {paginatedList?.length != 0 && (
            <div className="d-flex ct_flex_col_575 gap-3 justify-content-between align-items-center mt-4">
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
                  pageCount={Math.ceil(list?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <DeleteModal
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
        heading="Delete Service Fee"
        value="Are you sure you want to delete this service fee?"
        handleDelete={handleDeleteFee}
      />
    </PanelLayout>
  );
};

export default ManageServiceFee;
