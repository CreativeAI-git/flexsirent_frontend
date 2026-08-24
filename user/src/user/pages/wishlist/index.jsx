import { useEffect } from "react";
import { webPath } from "../../routes";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../shared/components/loader";
import { apartmentData } from "../../../shared/utils/pip";
import PanelLayout from "../../../shared/layout/PanelLayout";
import NoRecord from "../../../shared/components/other/NoRecord";
import ApartmentCard from "../../../shared/components/cards/ApartmentCard";
import {
  fetchMyWishlist,
  fetchProperties,
} from "../../../redux/features/user/actions/bookingAction";

const WishList = () => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const user = { name: "Wishlist", role: "guest" };
  const { isLoading, wishlistData } = useSelector(
    (state) => state.guest.booking,
  );
  useEffect(() => {
    dispatch(fetchMyWishlist());
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout user={user}>
      <div className="row mt-5">
        {wishlistData?.length > 0 ? (
          wishlistData?.map((item) => {
            return (
              <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                <ApartmentCard
                  item={item}
                  onClick={() => {
                    navigate(`l/${item?.property_id}`);
                  }}
                />
              </div>
            );
          })
        ) : (
          <NoRecord />
        )}
      </div>
    </PanelLayout>
  );
};

export default WishList;
