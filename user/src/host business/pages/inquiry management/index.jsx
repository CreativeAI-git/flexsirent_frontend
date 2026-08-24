import { useEffect, useState } from "react";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../../shared/layout/PanelLayout";
import SearchInput from "../../../shared/components/form/SearchInput";
import useDebounce from "../../../shared/components/hooks/useDebounce";
import InquiryTable from "../../../shared/components/table/InquiryTable";
import InquiryDetailsModal from "../../../shared/components/modals/InquiryDetailsModal";
import { fetchPropertyInquiries } from "../../../redux/features/host/actions/inboxAction";
import { useTranslation } from "react-i18next";
import { useTableHeaders } from "../../../shared/hooks/useTableHeaders";

const InquiryManagement = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { hostInquiryHeader } = useTableHeaders();
  const user = { name: t("sidebar.inquiry_management"), role: "hostBusiness" };
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);
  const [isViewModal, setIsViewModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const { propertyInquiryList, isLoading } = useSelector(
    (state) => state.host.inbox,
  );

  const getUserName = (item = {}) => {
    return (
      `${item?.first_name || ""} ${item?.last_name || ""}`.trim() ||
      item?.name ||
      item?.full_name ||
      item?.user_name ||
      ""
    );
  };

  const filteredList =
    propertyInquiryList?.filter((item) => {
      const searchText =
        `${getUserName(item)} ${item?.property_title || ""} ${item?.message || ""} ${item?.email || ""}`.toLowerCase();
      return debouncedSearch
        ? searchText.includes(debouncedSearch?.toLowerCase())
        : true;
    }) || [];

  useEffect(() => {
    dispatch(fetchPropertyInquiries());
  }, []);

  if (isLoading) return <Loader />;

  return (
    <PanelLayout user={user}>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
            <SearchInput
              value={searchFilter}
              onChange={setSearchFilter}
              placeholder={t("search.by_user_property_email")}
            />
          </div>

          <InquiryTable
            data={filteredList}
            tableHeading={hostInquiryHeader}
            onView={(item) => {
              setSelectedData(item);
              setIsViewModal(true);
            }}
          />
        </div>
      </div>

      <InquiryDetailsModal
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
        data={selectedData}
      />
    </PanelLayout>
  );
};

export default InquiryManagement;
