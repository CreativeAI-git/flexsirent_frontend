import { useState, useEffect } from "react";
import Loader from "../../components/form/Loader";
import { useSelector, useDispatch } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import PropertyTable from "../../components/Table/PropertyTable";
import SelectDropdown from "../../components/form/SelectDropdown";

import {
  fetchProperties,
} from "../../redux/actions/hostAction";

const PropertyManagement = () => {
  const dispatch = useDispatch();
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);

  const {
    isLoading,
    propertyTableData,
    propertyTableHeading,
    filterPropertyOption,
  } = useSelector((state) => state.hostReducers);
  


  const filteredData = propertyTableData?.filter((item) => {
    const search = item?.property_title
      ?.toLowerCase()
      ?.includes(debouncedSearch?.toLowerCase());
    const status = selectedValue ? item?.status == selectedValue : true;
    const dateMatch = selectedDate
      ? item?.created_at?.slice(0, 10) === selectedDate
      : true;
    return search && status && dateMatch;
  });

  useEffect(() => {
    dispatch(fetchProperties());
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 pb-4">
        <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_black_text">
          Property Management
        </h4>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by property name"
        />
        <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 ct_w_100_767">
          <div className="form-group ct_w_100_767">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="form-control ct_input ct_light_blue_input_border ct_input_h_50"
            />
          </div>
          <div className="form-group ct_w_100_767">
            <SelectDropdown
              id="statusfilter"
              defaultOptions=""
              options={filterPropertyOption}
              selectedValue={selectedValue}
              onChange={setSelectedValue}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <PropertyTable
            data={filteredData}
            tableHeading={propertyTableHeading}
          />
        </div>
      </div>
    </PanelLayout>
  );
};

export default PropertyManagement;
