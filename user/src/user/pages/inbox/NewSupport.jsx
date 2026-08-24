import toast from "react-hot-toast";
import { webPath } from "../../routes";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useEffect, useState } from "react";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../../shared/layout/PanelLayout";
import {
  createNewSupport,
  fetchUserBookings,
} from "../../../redux/features/user/actions/inboxAction";

const NewSupport = () => {
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const user = { name: "New Support", role: "guest" };
  const { userBookingList, isLoading } = useSelector(
    (state) => state.guest.inbox
  );
  const filterOption =
    userBookingList?.filter(
      (item, index, self) =>
        index === self.findIndex((obj) => obj.property_id === item.property_id)
    ) || [];

  const tabs = [
    { label: "Booking", value: "Booking" },
    { label: "Other", value: "Other" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]?.value);
  const [comment, setComment] = useState("");
  const [property_id, setpropertyId] = useState("");

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, []);

  useEffect(() => {
    setComment("");
    setpropertyId("");
  }, [activeTab]);

  const handleCreateSupport = () => {
    if (activeTab == tabs[0]?.value) {
      if (!property_id) {
        toast.error("Please select a booked property.");
        return;
      }
    }

    if (!comment || comment.trim() === "") {
      toast.error("Please enter a message.");
      return;
    }

    const callback = (res) => {
      if (res?.success) {
        navigate(webPath?.Inbox);
      }
    };

    let data = {
      message: comment,
    };

    if (activeTab == tabs[0]?.value) {
      const [selectedProperty] = filterOption?.filter(
        (item) => item?.property_id == property_id
      );

      data = {
        ...data,
        property_id: selectedProperty?.property_id,
        host_id: selectedProperty?.host_id,
      };
    }

    dispatch(createNewSupport({ payload: data, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout user={user}>
      <div className="col-md-12">
        <div className="row mt-5">
          <div className="col-md-12">
            <ul
              className="nav nav-pills mb-5 ct_custom_tabs justify-content-start "
              id="pills-tab"
              role="tablist"
            >
              {tabs?.map((item, index) => (
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ct_fw_500 ${item?.value == activeTab ? "active" : ""
                      }`}
                    onClick={() => setActiveTab(item?.value)}
                    type="button"
                    role="tab"
                  >
                    {item?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form className="ct_light_blue_outline ct_p_30 shadow-none h-auto">
          {activeTab == tabs[0]?.value && (
            <div className="form-group mb-4">
              <label className="mb-2 ct_fw_600">Booked Properties</label>
              <select
                id="title"
                className="form-control ct_input"
                value={property_id}
                onChange={(e) => {
                  setpropertyId(e.target.value);
                }}
              >
                <option value={""}>Select Booked Property</option>
                {filterOption?.map((item, index) => (
                  <option key={index} value={item?.property_id}>
                    {item?.property_title}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="form-group mb-4">
            <label className="mb-2 ct_fw_600">Message</label>
            <textarea
              className="form-control ct_input h-auto"
              rows={4}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="Enter message"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={handleCreateSupport}
            className="ct_orange_btn ms-auto mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </PanelLayout>
  );
};

export default NewSupport;
