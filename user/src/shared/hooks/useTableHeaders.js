import { useTranslation } from "react-i18next";

/**
 * Central hook to provide all translated table headers and dashboard card titles.
 * Use this instead of reading static strings from Redux state.
 */
export const useTableHeaders = () => {
  const { t } = useTranslation();

  // ── User / Guest ──────────────────────────────────────────────────────────
  const userBookingHeader = [
    t("table.sno"),
    t("table.property_title"),
    t("table.host"),
    t("table.booked_date"),
    t("table.booking_status"),
    t("table.payment_status"),
    t("table.action"),
  ];

  const inboxBookingHeader = [
    t("table.sno"),
    t("table.property_name"),
    t("table.message"),
    t("table.date"),
    t("table.status"),
    t("table.action"),
  ];

  const inboxOtherHeader = [
    t("table.sno"),
    t("table.message"),
    t("table.date"),
    t("table.status"),
    t("table.action"),
  ];

  const paymentHisTableHeader = [
    t("table.sno"),
    t("table.host"),
    t("table.property_name"),
    t("table.address"),
    t("table.booked_on"),
    t("table.status"),
    t("table.action"),
  ];

  const paymentHisDetailTableHeader = [
    t("table.sno"),
    t("table.duration"),
    t("table.amount"),
    t("table.payment_date"),
    t("table.payment_method"),
    t("table.payment_status"),
  ];

  const reportHeader = [
    t("table.sno"),
    t("table.property_title"),
    t("table.report_title"),
    t("table.description"),
    t("table.reported_date"),
    t("table.action"),
  ];

  const inquiryHeader = [
    t("table.sno"),
    t("table.user_name"),
    t("table.email"),
    t("table.property_title"),
    t("table.message"),
    t("table.date"),
    t("table.action"),
  ];

  // ── Host ──────────────────────────────────────────────────────────────────
  const hostRecentBookingHeader = [
    t("table.sno"),
    t("table.property_title"),
    t("table.guest"),
    t("table.booked_date"),
    t("table.status"),
    t("table.action"),
  ];

  const hostPaymentDetailsHeader = [
    t("table.sno"),
    t("table.month"),
    t("table.amount"),
    t("table.payment_date"),
    t("table.payment_status"),
    t("table.payment_method"),
    t("table.action"),
  ];

  const hostPropertyHeader = [
    t("table.sno"),
    t("table.property_name"),
    t("table.property_type"),
    t("table.location"),
    t("table.price_month"),
    t("table.listed_on"),
    t("table.status"),
    t("table.actions"),
  ];

  const hostListingHeader = [
    t("table.sno"),
    t("table.website_address"),
    t("table.post_code"),
    t("table.location"),
    t("table.submission_date"),
  ];

  const hostCheckoutHeader = [
    t("table.sno"),
    t("table.property_title"),
    t("table.guest"),
    t("table.booked_date"),
    t("table.checkout_date"),
    t("table.action"),
  ];

  const hostReviewsHeader = [
    t("table.sno"),
    t("table.user_name"),
    t("table.property_name"),
    t("table.rating"),
    t("table.review"),
    t("table.date"),
    t("table.action"),
  ];

  const subHostHeader = [
    t("table.sno"),
    t("table.first_name"),
    t("table.last_name"),
    t("table.email"),
    t("table.phone_number"),
    t("table.status"),
    t("table.action"),
  ];

  const hostInboxGuestHeader = [
    t("table.sno"),
    t("table.guest"),
    t("table.message"),
    t("table.date"),
    t("table.status"),
    t("table.action"),
  ];

  const hostInboxHeader = [
    t("table.sno"),
    t("table.message"),
    t("table.date"),
    t("table.status"),
    t("table.action"),
  ];

  const hostInquiryHeader = [
    t("table.sno"),
    t("table.user_name"),
    t("table.email"),
    t("table.property_title"),
    t("table.message"),
    t("table.date"),
    t("table.action"),
  ];

  const hostReportHeader = [
    t("table.sno"),
    t("table.property_title"),
    t("table.reported_by"),
    t("table.report_title"),
    t("table.description"),
    t("table.reported_date"),
    t("table.action"),
  ];

  // ── Business ──────────────────────────────────────────────────────────────
  const businessRecentBookingHeader = [
    t("table.sno"),
    t("table.property_title"),
    t("table.guest"),
    t("table.booked_date"),
    t("table.status"),
    t("table.action"),
  ];

  const businessPaymentDetailsHeader = [
    t("table.sno"),
    t("table.month"),
    t("table.amount"),
    t("table.payment_date"),
    t("table.payment_status"),
    t("table.payment_method"),
    t("table.action"),
  ];

  const businessPaymentsHeader = [
    t("table.sno"),
    t("table.host"),
    t("table.property_name"),
    t("table.address"),
    t("table.booked_on"),
    t("table.status"),
    t("table.action"),
  ];

  const businessManagementHeader = [
    t("table.sno"),
    t("table.user_name"),
    t("table.email"),
    t("table.phone_number"),
    t("table.status"),
    t("table.action"),
  ];

  const businessReviewsHeader = [
    t("table.sno"),
    t("table.user_name"),
    t("table.property_name"),
    t("table.rating"),
    t("table.review"),
    t("table.date"),
    t("table.action"),
  ];

  // ── Dashboard Card Titles ─────────────────────────────────────────────────
  const guestDashboardTitles = {
    total_bookings: t("dashboard_cards.total_booking"),
    approved_bookings: t("dashboard_cards.approved_booking"),
    pending_bookings: t("dashboard_cards.pending_booking"),
    rejected_bookings: t("dashboard_cards.rejected_booking"),
  };

  const hostDashboardTitles = {
    total_properties: t("dashboard_cards.total_properties"),
    total_bookings: t("dashboard_cards.total_bookings"),
    total_revenue: t("dashboard_cards.total_revenue"),
    pending_listings: t("dashboard_cards.pending_listings"),
  };

  return {
    // user/guest
    userBookingHeader,
    inboxBookingHeader,
    inboxOtherHeader,
    paymentHisTableHeader,
    paymentHisDetailTableHeader,
    reportHeader,
    inquiryHeader,
    // host
    hostRecentBookingHeader,
    hostPaymentDetailsHeader,
    hostPropertyHeader,
    hostListingHeader,
    hostCheckoutHeader,
    hostReviewsHeader,
    subHostHeader,
    hostInboxGuestHeader,
    hostInboxHeader,
    hostInquiryHeader,
    hostReportHeader,
    // business
    businessRecentBookingHeader,
    businessPaymentDetailsHeader,
    businessPaymentsHeader,
    businessManagementHeader,
    businessReviewsHeader,
    // dashboard cards
    guestDashboardTitles,
    hostDashboardTitles,
  };
};
