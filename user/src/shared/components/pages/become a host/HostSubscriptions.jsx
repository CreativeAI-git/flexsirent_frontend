import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { webPath } from "../../../../user/routes";
import { curSym } from "../../../utils/pip";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscription } from "../../../../redux/features/user/actions/bookingAction";
import Loader from "../../loader";

const HostSubscriptions = () => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const {isLoading,
    plans
  } = useSelector(state=>state.guest.booking)
  // const plans = [
  //   {
  //     title: "Basic Plan",
  //     price: "Free",
  //     subTitle: "Perfect for new hosts",
  //     features: ["1 Active Listing", "Basic Support", "Standard Visibility"],
  //     buttonText: "Get Started Free",
  //     buttonClass: "ct_orange_btn ct_black_btn",
  //     isPopular: false,
  //   },
  //   {
  //     title: "Pro Plan",
  //     price: `${curSym}29`,
  //     per: "/Month",
  //     subTitle: "For growing hosts",
  //     features: [
  //       "Up to 10 Listings",
  //       "Analytics Dashboard",
  //       "Boosted Visibility",
  //       "Featured Placements",
  //     ],
  //     buttonText: "Start Pro Trial",
  //     buttonClass: "ct_orange_btn",
  //     isPopular: true,
  //     badge: "Most Popular",
  //   },
  //   {
  //     title: "Business Plan",
  //     price: `${curSym}69`,
  //     per: "/Month",
  //     subTitle: "For property managers",
  //     features: [
  //       "Unlimited Listings",
  //       "Advanced Analytics",
  //       "API Access",
  //       "Dedicated Support",
  //     ],
  //     buttonText: "Get Started Free",
  //     buttonClass: "ct_orange_btn ct_black_btn",
  //     isPopular: false,
  //   },
  // ];

  useEffect(() => {
    dispatch(fetchSubscription());
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="ct_py_70 ct_pricing_bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="ct_fs_35 ct_fw_700 text-center">
              Choose the Hosting Plan That Fits You Best
            </h2>
          </div>
        </div>
        <div className="row ct_mt_60">
          {plans?.map((plan, index) => (
            <div className="col-lg-4 mb-4 mb-lg-0" key={index}>
              <div
                className={`ct_pricing_card ${index == 1 ? "active" : ""}`}
              >
                {plan.is_popular == 1 && (
                  <span className="ct_pricing_badge">Most Popular</span>
                )}
                <div>
                  <p className="mb-0 ct_fs_24 text-center mb-3">{plan.plan_name}</p>
                  <div className="ct_pricing_title">
                    <h4 className="ct_fs_35 text-center mb-0 ct_fw_600">
                      {plan?.price == "0.00" ?  "Free" : `${curSym}${plan?.price}`}
                      {plan.duration && <span className="ct_fs_20">/{plan.duration}</span>}
                    </h4>
                    <p className="mb-0 text-center mt-2">{plan.headline}</p>
                  </div>
                  <ul className="ct_mt_30 mb-4">
                    {plan?.content?.map((feature, idx) => (
                      <li key={idx}>
                        <i className="fa-solid fa-check"></i> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto">
                  <a
                    href="#"
                    className={index == 1 ? "ct_orange_btn" : "ct_orange_btn ct_black_btn"}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(webPath.BecomeHostProcess);
                    }}
                  >
                    {plan.button_text}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostSubscriptions;
