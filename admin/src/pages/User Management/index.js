import { useEffect, useState } from "react";
import Loader from "../../components/form/Loader";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../../components/Table/UserTable";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import { fetchUsers } from "../../redux/actions/userAction";
import useDebounce from "../../components/hooks/useDebounce";
import SelectDropdown from "../../components/form/SelectDropdown";
import AccountActionModal from "../../components/modal/AccountActionModal";

const UserManagement = () => {
  const dispatch = useDispatch();
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);
  const [isViewModal, setIsViewModal] = useState(false);
  const { userTableHeading, userList, filterOption,isLoading } = useSelector(
    (state) => state.userReducers
  );

  const filteredData = userList?.filter((item) => {
    const fullName = `${item?.first_name} ${item?.last_name}`;
    const search = debouncedSearch
      ? fullName?.toLowerCase()?.includes(debouncedSearch?.toLowerCase())
      : true;
    const status = selectedValue ? item?.is_active == selectedValue : true;
    return search && status;
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if(isLoading){
    return <Loader/>
  }
  return (
    <PanelLayout>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 pb-4">
        <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_black_text">
          User Management
        </h4>
        <div className="ct_w_100_575">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsViewModal(true);
            }}
            className="ct_orange_btn"
          >
            + Add User
          </a>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by user name"
        />
        <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 ct_w_100_767">
          <div className="form-group ct_w_100_767">
            <SelectDropdown
              id="statusfilter"
              defaultOptions=""
              options={filterOption}
              selectedValue={selectedValue}
              onChange={setSelectedValue}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <UserTable data={filteredData} tableHeading={userTableHeading} />
        </div>
      </div>
      
      <AccountActionModal title={"Add User"} isViewModal={isViewModal} setIsViewModal={setIsViewModal} />
    
    </PanelLayout>
  );
};

export default UserManagement;
