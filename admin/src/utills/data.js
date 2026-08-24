export const modules = [
  "Dashboard",
  "User Management",
  "Host Management",
  "Property Management",
  "Booking Overview",
  "Blog Management",
  "Reviews",
  "Support Tickets",
  "Booking Calendar",
  "Chat Management",
  "Policy Management",
  "SEO Management",
  "Manage Listing",
  "Listing Request",
  "Manage Reservation",
  "Manage Inquiry",
  "Report Management",
  "Manage Service Fee",
  "Manage Payout",
  "KYC Management",
  "Business Management",
];
export const permissionTypeMap = {
  Dashboard: 2,
  "User Management": 3,
  "Host Management": 4,
  "Property Management": 5,
  "Booking Overview": 6,
  "Blog Management": 7,
  Reviews: 8,
  "Support Tickets": 9,
  "Booking Calendar": 10,
  "Chat Management": 11,
  "Policy Management": 12,
  "SEO Management": 13,
  "Manage Listing": 14,
  "Listing Request": 15,
  "Manage Reservation": 16,
  "Manage Inquiry": 17,
  "Report Management": 18,
  "Manage Service Fee": 19,
  "Manage Payout": 20,
  "KYC Management": 21,
  "Business Management": 22,
};

// Permission mapping
export const permissionMap = {
  2: "Dashboard",
  3: "User Management",
  4: "Host Management",
  5: "Property Management",
  6: "Booking Overview",
  7: "Blog Management",
  8: "Reviews",
  9: "Support Tickets",
  10: "Booking Calendar",
  11: "Chat Management",
  12: "Policy Management",
  13: "SEO Management",
  14: "Manage Listing",
  15: "Listing Request",
  16: "Manage Reservation",
  17: "Manage Inquiry",
  18: "Report Management",
  19: "Manage Service Fee",
  20: "Manage Payout",
  21: "KYC Management",
  22: "Business Management",
};

export const permissionTypes = ["add", "view", "edit", "delete"];

 export const tableClass = (status, type = "col") => {
    switch (status) {
      case "Rejected":
        return type == "row" ? "ct_red_light_status" : "ct_red_clr";
      case "Resolved":
        return type == "row" ? "ct_green_light_status" : "ct_green_clr";
      case "pending":
        return type == "row" ? "ct_brown_light_status" : "ct_brown_clr";
    }
  };