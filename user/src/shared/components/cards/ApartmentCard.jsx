import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { webPath } from "../../../user/routes";
import { Rating } from "react-simple-star-rating";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation, useParams } from "react-router";
import { curSym, getAnyActiveToken } from "../../utils/pip";
import {
  addToWishlist,
  fetchMyWishlist,
  fetchProperties,
} from "../../../redux/features/user/actions/bookingAction";
const ApartmentCard = ({
  item,
  navigateURL = webPath?.Appartments,
  onClick,
  href,
}) => {
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const { pathname } = useLocation();
  const { lang } = useParams();
  const avgRating =
    typeof item?.rating?.average_rating === "number"
      ? item.rating.average_rating
      : 0;

  const handleWishlist = (item) => {
    const callback = (res) => {
      if (res?.success) {
        const isHome = pathname === `/${lang}` || pathname === `/${lang}/` || pathname === "/";
        const isWishlist = pathname.includes(webPath?.WishList);
        if (isHome) dispatch(fetchProperties());
        else if (isWishlist) dispatch(fetchMyWishlist());
      }
    };

    const { token, role } = getAnyActiveToken() || {};
    if (role === "guest" && token) {
      dispatch(
        addToWishlist({
          payload: { property_id: item?.property_id },
          callback,
        }),
      );
    } else {
      toast.error(
        "Please log in with a guest account to add this property to your wishlist.",
      );
    }
  };

  // if(wishListLoading){
  //   return <Loader/>
  // }
  return (
    <figure className="ct_apartmen_card d-grid h-100">
      <div>
        <div className="ct_aprtment_img">
          <img
            loading="lazy"
            src={
              item?.propertyImage?.length ? item?.propertyImage[0]?.image : ""
            }
            alt=""
          />
          <div
            className="ct_like_icon"
            onClick={() => {
              handleWishlist(item);
            }}
          >
            <i
              className={`fa-${item?.is_wishlist ? "solid text-danger" : "regular"} fa-heart`}
            ></i>
          </div>

          <div className="ct_bottom_overlay">
            {item?.isVerified && (
              <div className="ct_white_op_bg">
                <p className="mb-0">
                  Verified by guest
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.12426 8.02264L6.05693 6.95888..."
                      fill="#3FFC7E"
                    />
                  </svg>
                </p>
              </div>
            )}

            <div className="ct_black_op_bg">
              <div className="mb-0 ct_white_nowrap d-flex align-items-center gap-1">
                {avgRating.toFixed(2)}
                <Rating
                  className="rating-stars"
                  initialValue={avgRating}
                  allowFraction
                  readonly
                />
              </div>
            </div>
          </div>
        </div>

        <figcaption className="mt-3">
          <h4 className="ct_fs_16 ct_fw_600 mb-2">{item?.property_title}</h4>
          <p className="ct_fs_14 mb-0 prop-card-para">
            <img
              loading="lazy"
              src="https://app.flexsirent.com/assets/img/weui_location-outlined.svg"
              alt=""
            />
            {item?.address}
          </p>

          {item?.features?.length && (
            <ul className="d-flex align-items-center gap-2 flex-wrap mt-2">
              {item?.features?.map((feature, i) => (
                <li key={i}>
                  <p className="ct_fs_14 mb-0 ct_text_op_6 ">
                    <img loading="lazy" src={feature.icon} alt="" />
                    {feature.label}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </figcaption>
      </div>
      <div className="ct_card_bottom mt-auto px-3 pb-3">
        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mt-0 ct_border_top_1 pt-3">
          <div>
            <h5 className="ct_fs_16 ct_fw_600 mt-2 mb-1">
              <span className="ct_fw_700">
                {" "}
                {/* From */}
                {curSym}
                {(
                  Number(item?.monthly_rent || 0) -
                  (Number(item?.monthly_rent || 0) * Number(item?.offer_value || 0)) / 100
                ).toFixed(2)}
              </span>
              /Month
            </h5>
            {Number(item?.offer_value) > 0 && (
              <div className="mb-1">
                <del className="text-muted ct_fs_16 ms-1">
                  {curSym}
                  {Number(item?.monthly_rent || 0).toFixed(2)}
                </del>
                <span className="ms-1 ct_orange_text ct_fs_14">
                  ({item.offer_value}% OFF)
                </span>
              </div>
            )}
          </div>
          <div className="text-end">
            <a
              href={href || navigateURL || "#"}
              onClick={(e) => {
                e.preventDefault();
                if (onClick) return onClick();
                navigate(navigateURL);
              }}
              className="ct_fs_16 ct_fw_600 mb-0 ct_orange_text"
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    </figure>
  );
};

export default ApartmentCard;
