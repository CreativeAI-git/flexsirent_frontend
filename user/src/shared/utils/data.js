const COLOR_SUCCESS = "ct_upcoming_clr";
const COLOR_DANGER = "ct_cancle_red_clr";
const CheckINStatus = "ct_checkin_clr";

const CANCEL_BADGE = "ct_cancle_badge";
const UPCOMMING_BADGE = "ct_upcoming_clr";
const COMPLETED_BADGE = "ct_completed_clr";

export const StatusDefinitions = {
  property: {
    0: { value: "Under Review", color: CheckINStatus },
    1: { value: "Approved", color: COLOR_SUCCESS },
    2: { value: "Disaproved", color: COLOR_DANGER },
  },
  booking: {
    0: { value: "Pending", color: CheckINStatus },
    1: { value: "Approved", color: COLOR_SUCCESS },
    2: { value: "Rejected", color: COLOR_DANGER },
  },

  inbox: {
    0: { value: "Pending", color: COLOR_DANGER },
    1: { value: "Reviewed", color: COLOR_SUCCESS },
  },
  bookingBadge: {
    Upcoming: { value: "Upcoming", color: UPCOMMING_BADGE },
    Completed: { value: "Completed", color: COMPLETED_BADGE },
    Cancelled: { value: "Cancelled", color: CANCEL_BADGE },
  },
  propertyBookingStatus: {
    Upcoming: { value: "Upcoming", color: "ct_upcoming_badge" },
    Completed: { value: "Completed", color: "ct_completed_badge" },
    Ongoing: { value: "Ongoing", color: "ct_ongoing_badge" },
    Cancelled: { value: "Cancelled", color: CANCEL_BADGE },
  },
  kycBadge: {
    0: { value: "Pending", color: "ct_checking_badge" },
    1: { value: "Approved", color: "ct_paid_badge" },
    2: { value: "Rejected", color: "ct_cancle_badge" },
  },
  bookingStatus: {
    "Checked-In": { value: "Checked-In", color: CheckINStatus },
    Upcoming: { value: "Upcoming", color: COLOR_SUCCESS },
    Paid: { value: "Paid", color: COLOR_SUCCESS },
    Pending: { value: "Pending", color: CheckINStatus },
  },
  management: {
    Invited: { value: "Invited", color: "ct_checkin_clr" },
    Accept: { value: "Accept", color: "ct_upcoming_clr" },
    Rejected: { value: "Rejected", color: "ct_cancel_clr" },
  },
  payHis: {
    No: { value: "Booked", color: COLOR_SUCCESS },
    Guest: { value: "Cancelled", color: COLOR_DANGER },
    Host: { value: "Cancelled", color: COLOR_DANGER },
    Admin: { value: "Cancelled", color: COLOR_DANGER },
  },
  userAccess: {
    Active: { value: "Active", color: COLOR_SUCCESS },
  },
  payments: {
    COMPLETED: { value: "Paid", color: COLOR_SUCCESS },
    REJECTED: { value: "Failed", color: "ct_cancel_clr" },
  },
  payTans: {
    COMPLETED: { value: "Completed", color: COLOR_SUCCESS },
    REJECTED: { value: "Rejected", color: "ct_cancel_clr" },
    PENDING: { value: "Pending", color: CheckINStatus },
  },
  bookedPayments: {
    1: { value: "Paid", color: COLOR_SUCCESS },
    2: { value: "Rejected", color: COLOR_DANGER },
    0: { value: "Pay", color: COLOR_SUCCESS },
  },
  guestBusinessGuesbookedPayments: {
    1: { value: "Paid", color: COLOR_SUCCESS },
    2: { value: "Rejected", color: COLOR_DANGER },
    0: { value: "Pending", color: CheckINStatus },
  },

  support: {
    0: { value: "Pending", color: CheckINStatus },
    1: { value: "Replied", color: COLOR_SUCCESS },
  },
};

export const getAmenityIcon = (amenity) => {
  switch (amenity) {
    case "Kitchen":
      return "amenties_icon_1.svg";
    case "Air Conditioning":
    case "Air Conditioned":
      return "amenties_icon_2.svg";
    case "Free Parking on Premises":
      return "amenties_icon_3.svg";
    case "Fridge":
      return "amenties_icon_4.svg";
    case "Wi-Fi":
      return "amenties_icon_5.svg";
    case "Private Back Garden":
      return "amenties_icon_6.svg";
    case "TV":
      return "amenties_icon_7.svg";
    case "Swimming Pool":
      return "amenties_icon_8.svg";
    case "Laundry":
      return "Laundy_Icon.svg";
    default:
      return "default_icon.svg"; // fallback icon if none matched
  }
};
export const getSaftyAmenityIcon = (saftyAmenity) => {
  switch (saftyAmenity) {
    case "First Aid Kit":
      return "safety_amenties_icon_1.png";
    case "Security Cameras":
      return "safety_amenties_icon_2.png";
    case "Smoke Detector":
      return "safety_amenties_icon_3.png";
    case "Carbon Monoxide Detector":
      return "safety_amenties_icon_4.png";
    case "Fire Extinguisher":
      return "safety_amenties_icon_5.png";

    default:
      return "default_icon.svg"; // fallback icon if none matched
  }
};

export const getOtherIcon = (other) => {
  switch (other) {
    case "Apartment" || "Home":
      return "lsicon_building-outline.svg";
    case "floor":
      return "material-symbols-light_stairs-outline.svg";
    case "Families":
      return "fluent-mdl2_family.svg";
    case "Students":
      return "student.svg";
    case "Digital Nomads":
      return "digital_nomads.svg";
    case "Couples":
      return "couples.svg";
    default:
      return "default_icon.svg"; // fallback icon if none matched
  }
};

export const getHouseRulesIcon = (saftyAmenity) => {
  switch (saftyAmenity) {
    case "Check-in: 4:00 PM – 9:00 PM":
      return "house_rule_icon_1.png";
    case "No parties or events allowed.":
      return "house_rule_icon_2.png";
    case "Quiet hours: 10:00 PM – 8:00 AM.":
      return "house_rule_icon_3.png";
    case "Pets are not allowed":
    case "Pets are not allowed.":
      return "house_rule_icon_4.png";

    case "Keep shared spaces clean":
    case "Keep shared spaces clean.":
      return "house_rule_icon_5.png";
    case "Maximum of 2 visitors allowed during the day":
    case "Maximum of 2 visitors allowed during the day.":
      return "house_rule_icon_6.png";
    case "Report any damage immediately":
    case "Report any damage immediately.":
      return "house_rule_icon_7.png";

    default:
      return "default_icon.svg"; // fallback icon if none matched
  }
};

export const LANGUAGES = [
  "en", "es", "sv", "fr", "de", "it", "nl", "no", "da", "fi", "pt", "pl",
  "tr", "ru", "zh", "ja", "ko", "ar", "hi", "el", "he", "cs"
];