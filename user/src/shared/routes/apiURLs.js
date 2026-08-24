// Local / Live URLs from environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/";
export const BASE_URL = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";


// Auth :
export const signupAPI = "common/signup";
export const signinAPI = "common/login";
export const hostPermissionsAPI = "common/fetch-host-permission"
export const forgotPassAPI = "common/forgot-password";

// Profile : 
export const userProfileAPI = "user/fetch-profile";
export const hostProfileAPI = "host/fetch-profile";
export const hostAllowPermissionAPI = "host/fetch-host-permission";

export const guestBusinessProfileAPI = "host/fetch-profile";

// Update Profile :
export const updateUserProfileAPI = "user/update-profile";
export const updateHostProfileAPI = "host/update-profile";

// Change Password :
export const userPasswordChangeAPI = "user/change-password";
export const hostPasswordChangeAPI = "host/change-password";

// Dashboard
export const gustBusinessDashboardAPI = "user/get-business-dashboard-count";

// Property : 
export const webPropertiesAPI = "user/get-filtered-property";
export const propertyDetailAPI = "user/get-property-by-id/";
export const propertiesAPI = "host/get-all-my-property";
export const bookPropertyAPI = "user/property-booking";
export const bookInformationAPI = "user/get-property-booking-price";

export const createNewPropertyAPI = "host/create-new-property";
export const deletePropertyAPI = "host/delete-my-property";

export const listingForYouAPI = "host/create-property-listing";
export const editNewPropertyAPI = "host/update-my-property";

// Payment History :
export const payhistoryAPI = "user/get-payment-history"
export const payhistoryDetailsAPI = "user/get-payment-history/"

// Categories : 
export const reviewsAPI = "common/get-reviews";
export const propertyTypesAPI = "common/get-all-category";
export const amentiesAPI = "common/get-amenties";
export const bhksAPI = "common/get-bhk-property-count"
export const bedBathsAPI = "common/get-beds-bath-property-count"
export const idialsAPI = "common/get-ideal-for";
export const houseRulesAPI = "common/get-all-house-rules";
export const saftyMentiesAPI = "common/get-safety-amenties";

// Bookings : 
export const guestBusinessBookingsAPI = "user/get-guest-business-recent-booking";
export const guestBusinessDashboardDataEndPointURL = "user/get-guest-business-dashboard-count";
export const guestBusinessBookingByIdAPI = "user/get-guest-business-booking-by-id/";
export const hostBookingsAPI = "host/get-all-booking";
export const hostDashboardDataEndPointURL = "host/dashboard";
export const hostReviewsAPI = "host/reviews";
export const createHostStripeAccountAPI = "host/create-stripe-account";
export const hostStripeSetupAPI = "host/stripe-setup";
export const guestDashboardDataEndPointURL = "user/get-guest-dashboard-count";
export const userBookingsAPI = "user/get-all-my-booking";
export const userMyBookingsAPI = "user/get-my-bookings";
export const userRecentBookingsAPI = "user/get-recent-booking";
export const fetchGuestDashboardDataEndPointURL = "user/get-recent-booking";
export const payBookingAPI = "user/pay-booking-stripe";
export const hostBookingDetailAPI = "host/get-booking-by-id/";
export const hostUpdateBookingStatusAPI = "host/update-booking-status";
export const hostRequestDocumentAPI = "host/request-for-documents";
export const userUploadBookingDocumentAPI = "user/upload-booking-document/";
export const guestSingleBookingAPI = "user/get-single-booking/";

// Payments : 
export const gerGuestPaymentAPI = "user/get-guest-business-payments";
export const guestOrBusinessPaySuccessAPI = "user/success";
export const guestOrBusinessPayFailedAPI = "user/failed";

// KYC Verification : 
export const getDocTypesAPI = "common/get-document-name";
export const businessRegistrationTypesAPI = "common/fetch-business-registration-types";
export const proofOfAddressTypesAPI = "common/fetch-proof-of-address-types";
export const governmentIdTypesAPI = "common/fetch-government-id-types";
export const updateKycAPI = "user/upload-kyc-document";

export const getUserKycDocumentAPI = "user/get-kyc-document";

// Get policy
export const getPolicyDataAPI = "common/get-policy/";

// Blogs :
export const blogsAPI = "common/get-all-blog"
export const seoBySlugAPI = "user/seo/"

// contact us :
export const contactUsAPI = "common/contact-us"

export const addRatingAPI = "user/add-rating"
export const cancelBookingAPI = "user/cancel-booking"
export const addToWishlistAPI = "user/toggle-wishlist"
export const wishlistAPI = "user/get-wishlist"
export const subscriptionAPI = "host/get-subscription-plans"

// Inbox :
export const sendQueryAPI = "host/support-ticket"
export const sendReplyAPI = "host/support-ticket-reply"
export const userQueriesAPI = "host/get-support-query"
export const hostQueriesAPI = "host/get-support-ticket"
export const createNewSupportAPI = "user/support-ticket"
export const userSupportAPI = "user/get-support-ticket"

// Sub Host :
export const subHostAPI = "host/get-all-sub-host"
export const subHostDetailAPI = "host/get-sub-host-by-id/"
export const createSubHostAPI = "host/add-sub-host"
export const updateSubHostAPI = "host/update-sub-host"
export const updateSubHostStatusAPI = "host/sub-host-block-unblock/"

// cleaning & maintenance : 
export const checkoutsAPI = "host/get-todays-checkout-list"
export const cliningManageAPI = "host/get-cleaning-property-list"
export const updateCleaningStatusAPI = "host/update-property-cleaning-status"
export const makeCheckoutAPI = "host/update-booking-checkout-status/"

// User Management :

export const guestBusinessUsersAPI = "user/get-all-sub-guest"
export const createUserAPI = "user/add-sub-guest"
export const updateUserAPI = "user/update-sub-guest"
export const updateUserBlockStatusAPI = "user/update-sub-guest-block-status"

// Reports
export const hostReportsAPI = "host/my-reports"
export const userReportsAPI = "user/get-report-by-userId"
export const reportThePropertyAPI = "user/create-report"
export const createUserInquiryAPI = "user/create-user-inquiry"
export const userInquiriesAPI = "user/get-all-user-inquiry"
export const hostPropertyInquiriesAPI = "host/fetchPropertyInquiries"

// Offers
export const hostPropertiesWithoutOfferAPI = "host/host-properties-without-offer"
export const createMultipleOfferAPI = "host/create-multiple-offer"
export const hostOfferPropertiesAPI = "host/offer-properties"
export const updateOfferStatusAPI = "host/update-offer-status"

// Notifications
export const fetchUserNotificationsAPI = "user/fetchUserNotifications"
export const deleteUserNotificationAPI = "user/delete-notification"
export const fetchHostNotificationsAPI = "host/fetchHostNotifications"
export const deleteHostNotificationAPI = "host/delete-notification"
