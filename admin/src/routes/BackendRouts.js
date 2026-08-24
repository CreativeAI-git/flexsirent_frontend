// Base API & Socket URL from Environment Variables:
export const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://app.flexsirent.com/api/";
export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || BASE_URL.replace(/\/api\/?$/, "");

export const loginAPI = "admin/login";
export const getMyProfileAPI = "admin/fetch-profile";
export const fetchAdminNotificationsAPI = "admin/fetchAdminNotifications";
export const deleteNotificationAPI = "admin/delete-notification";
export const forgotPasswordAPI = "admin/forgot-password";
export const ChangePasswordAPI = "admin/change-password";
export const updateMyProfileAPI = "admin/update-profile";

export const dashboardAPI = "admin/fetch-dashboard-data";
export const bookingsAPI = "admin/booking-overview";
export const bookingDetailAPI = "admin/bookings/";

// property management :
export const propertiesAPI = "admin/get-all-property";
export const propertyStatusUpdateAPI = "admin/update-property-status";

// Listing request :
export const listingsAPI = "admin/get-property-listing";
export const listingCardsAPI = "admin/get-all-listing-request-count";
export const updatePropertyListingAPI = "admin/update-property-listing";

// sub admin :
export const permissionsAPI = "common/get-sub-admin-permissions"
export const subAdminsAPI = "admin/get-all-sub-admin";
export const addSubAdminAPI = "admin/add-sub-admin";
export const updateSubAdminAPI = "admin/update-sub-admin";
export const subAdminStatusUpdateAPI = "admin/update-sub-admin-status";
export const cardDataAPI = "admin/get-all-sub-admin-count";


// Categories : 
export const propertyTypesAPI = "common/get-all-category";
export const amentiesAPI = "common/get-amenties";
export const idialsAPI = "common/get-ideal-for";
export const houseRulesAPI = "common/get-all-house-rules";
export const saftyMentiesAPI = "common/get-safety-amenties";

// Host Management :
export const hostsAPI = "admin/fetch-host-management";
export const addHostAPI = "admin/add-host";
export const hostPropertiesAPI = "admin/get-host-property-listed";
export const hostStatusUpdateAPI = "admin/update-host-block-status";

// Host Business :
export const hostBusinessAPI = "admin/fetch-host-business-management"
export const hostBusinessDetailsAPI = "admin/get-host-business-by-id/"
export const updateHostBusinessStatusAPI = "admin/get-host-business-by-id/"
export const hostBusinessSubHostsAPI = "admin/get-sub-host/"

// Business Management :
export const addBusinessAPI = "admin/add-guest-business"
export const businessAPI = "admin/get-user-business-management";
export const businessStatusUpdateAPI = "admin/update-user-block-status";
export const businessUsersAPI = "admin/get-user-by-business-id";
export const UserBookingsAPI = "admin/get-user-property-booked-data";

// User Management : 
export const usersAPI = "admin/fetch-user-management";
export const addUserAPI = "admin/add-guest"

// Policy Management :
export const getPolicyAPI = "admin/get-policy-terms?content_type=";
export const updatePolicyAPI = "admin/update-policy-terms";
export const getCancellationPolicySettingsAPI = "admin/cancellation-policy-settings";
export const updateCancellationPolicySettingsAPI = "admin/cancellation-policy-settings";

// SEO Management :
export const getSeoManagementAPI = "admin/seo-management";
export const updateSeoManagementAPI = "admin/update-seo-management";

// Blog Management : 
export const blogsAPI = "admin/get-blog-management"
export const deleteBlogAPI = "admin/delete-blog/"
export const createBlogAPI = "admin/add-blog"
export const updateBlogAPI = "admin/update-blog"

// Contact us :
export const contactUsAPI = "admin/get-contact-us"

// Support :
export const supportsAPI = "admin/get-support-ticket"
export const sendReplyAPI = "admin/support-ticket-reply"

// Kyc Management :
export const varificationRequestsAPI = "admin/get-all-documents"
export const getAllKYCDocumentAPI = "admin/get-all-documents";
export const UpdateKYCStatusAPI = "admin/update-document-status";
export const kycDeatilAPI = "admin/get-document";

// service fee management :
export const serviceFeeAPI = "admin/get-service-fee"
export const createServiceFeeAPI = "admin/add-service-fee"
export const updateServiceFeeAPI = "admin/update-service-fee/"
export const deleteSeriveFeeAPI = "admin/delete-service-fee/"

// reviews :
export const reviewsAPI = "admin/reviews"
export const updateReviewsAPI = "admin/update-admin-review"
export const PropertyForReviewAPI = "admin/reviews/property-options"
export const deleteReviewAPI = "admin/reviews/"

// reports
export const reportsAPI = "admin/reports"

// manage payout :
export const payoutAPI = "admin/property-commission-report-all"
export const payoutCardDataAPI = "admin/payout-dashboard"

// manage inquiry :
export const inquiriesAPI = "admin/getAllInquiries"

// offers :
export const offersAPI = "admin/get-all-offers"

