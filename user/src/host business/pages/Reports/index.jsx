import { useEffect, useState } from "react";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../../shared/layout/PanelLayout";
import ReportTable from "../../../shared/components/table/ReportTable";
import SearchInput from "../../../shared/components/form/SearchInput";
import useDebounce from "../../../shared/components/hooks/useDebounce";
import { fetchReports } from "../../../redux/features/host/actions/inboxAction";
import { useTranslation } from "react-i18next";
import { useTableHeaders } from "../../../shared/hooks/useTableHeaders";

const Reports = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { hostReportHeader } = useTableHeaders();

  const user = { name: t("sidebar.reports"), role: "hostBusiness" };
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);

  const { reportList, isLoading } = useSelector((state) => state.host.inbox);
  const filterList = reportList?.filter((item) => {
    const search = debouncedSearch
      ? item?.property_title
          ?.toLowerCase()
          ?.includes(debouncedSearch?.toLowerCase())
      : true;
    return search;
  }) || [];

  useEffect(()=>{
    dispatch(fetchReports())
  },[])
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
              placeholder={t("search.by_property")}
            />
          </div>
          <ReportTable
            data={filterList}
            tableHeading={hostReportHeader}
          />
        </div>
      </div>
    </PanelLayout>
  );
};

export default Reports;
