import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTableHeaders } from "../../../shared/hooks/useTableHeaders";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../../shared/layout/PanelLayout";
import SearchInput from "../../../shared/components/form/SearchInput";
import PaymentHistoryList from "../../components/Tables/PaymentHistoryList";
import { fetchPayHistory } from "../../../redux/features/user/actions/inboxAction";

const PaymentHistory = () => {
  const { t } = useTranslation();
  const { paymentHisTableHeader } = useTableHeaders();
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const [searchFilter, setSearchFilter] = useState("");
  const { payementHisTableHeader, payHisList, isLoading } = useSelector(
    (state) => state.guest.inbox
  );

  const user = { name: "Payment History", role: "guest" };

  const filteredData = payHisList?.filter((item) => {
    const fullName = `${item?.host_first_name} ${item?.host_last_name}`
    const search = fullName
      ?.toLowerCase()
      ?.includes(searchFilter?.toLowerCase());

    return search;
  });

  useEffect(() => {
    dispatch(fetchPayHistory());
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="row">
        <div className="col-md-12 mt-4">
          <div className="d-flex align-items-center justify-content-between gap-3 mb-3 ct_flex_col_575">
            <h4 className="ct_fs_20 ct_fw_600 mb-0">Payment Information</h4>
            <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
              <SearchInput
                value={searchFilter}
                onChange={setSearchFilter}
                placeholder={t("search.by_host")}
              />
            </div>
          </div>

          <div className="mt-4">
            <PaymentHistoryList
              data={filteredData}
              tableHeading={paymentHisTableHeader}
            />
          </div>
        </div>
      </div>

      {/* <!-- business Modal S --> */}
    </PanelLayout>
  );
};

export default PaymentHistory;
