import { isValidPhoneNumber } from "libphonenumber-js";
import * as Yup from "yup";

// Common Email Validation Rule
const emailValidation = Yup.string()
  .trim()
  .email("Please enter a valid email")
  .required("Please enter email")
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
    "Please enter a valid email",
  );

// Comman First Name Validation Rule
const firstNameValidation = Yup.string()
  .required("Please enter first name")
  .min(3, "First name must be at least 3 characters long")
  .trim();

// Comman Last Name Validation Rule
const LastNameValidation = Yup.string()
  .required("Please enter last name")
  .min(3, "Last name must be at least 3 characters long")
  .trim();

// Common Password Validation Rule
const passwordValidation = Yup.string()
  .required("Please enter password")
  .min(8, "Password cannot be less than 8 characters")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
    "Strong passwords require at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.",
  );

// Sign up Schema
export const signUpSchema = Yup.object().shape({
  email: emailValidation,
  first_name: firstNameValidation,
  last_name: LastNameValidation,
  password: passwordValidation,
  confirm_password: Yup.string()
    .required("Please enter confirm password")
    .oneOf([Yup.ref("password"), null], "Your password must match"),
});
// Sign In Schema
export const signInSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

// Forgot Password Schema
export const forgotPasswordSchema = Yup.object().shape({
  email: emailValidation,
});

// Change Password Schema
export const changePasswordSchema = Yup.object().shape({
  current_password: Yup.string()
    .required("Please enter current password")
    .min(8, "Current password cannot be less than 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
      "Please enter a valid password",
    ),
  new_password: Yup.string()
    .required("Please enter new password")
    .min(8, "New password cannot be less than 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
      "Strong passwords require at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.",
    ),
  confirm_password: Yup.string()
    .required("Please enter confirm password")
    .oneOf([Yup.ref("new_password"), null], "Your password must match"),
});

// Update Profile Schema
export const updateUserProfileSchema = Yup.object().shape({
  first_name: firstNameValidation,
  last_name: LastNameValidation,
  phone: Yup.string()
    .required("Please enter a valid phone number")
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      (value) => value && isValidPhoneNumber(value),
    ),

  address: Yup.string()
    .required("Please enter address")
    .min(3, "Address must be at least 3 characters long")
    .trim(),
  nationality: Yup.string()
    .required("Please enter nationality")
    .min(3, "Nationality must be at least 3 characters long")
    .trim(),
  dob: Yup.date()
    .required("Please select your date of birth")
    .max(new Date(), "Date of birth cannot be in the future"),
  gender: Yup.string().required("Please select gender"),
});

// Dynamic Update Profile Schema with translations
export const getUpdateUserProfileSchema = (t) => Yup.object().shape({
  first_name: Yup.string()
    .required(t("validation.firstNameRequired"))
    .min(3, t("validation.firstNameMin"))
    .trim(),
  last_name: Yup.string()
    .required(t("validation.lastNameRequired"))
    .min(3, t("validation.lastNameMin"))
    .trim(),
  phone: Yup.string()
    .required(t("validation.phoneRequired"))
    .test(
      "is-valid-phone",
      t("validation.phoneInvalid"),
      (value) => value && isValidPhoneNumber(value),
    ),
  address: Yup.string()
    .required(t("validation.addressRequired"))
    .min(3, t("validation.addressMin"))
    .trim(),
  nationality: Yup.string()
    .required(t("validation.nationalityRequired"))
    .min(3, t("validation.nationalityMin"))
    .trim(),
  dob: Yup.date()
    .required(t("validation.dobRequired"))
    .max(new Date(), t("validation.dobFuture")),
  gender: Yup.string().required(t("validation.genderRequired")),
});

// Dynamic Change Password Schema with translations
export const getChangePasswordSchema = (t) => Yup.object().shape({
  current_password: Yup.string()
    .required(t("validation.currentPasswordRequired"))
    .min(8, t("validation.currentPasswordMin"))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
      t("validation.currentPasswordInvalid"),
    ),
  new_password: Yup.string()
    .required(t("validation.newPasswordRequired"))
    .min(8, t("validation.newPasswordMin"))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
      t("validation.newPasswordStrength"),
    ),
  confirm_password: Yup.string()
    .required(t("validation.confirmPasswordRequired"))
    .oneOf([Yup.ref("new_password"), null], t("validation.passwordsMustMatch")),
});
// Update Profile Schema
export const updateGuestBusinessProfileSchema = Yup.object().shape({
  first_name: firstNameValidation,
  last_name: LastNameValidation,
  business_name: Yup.string()
    .required("Please enter company name")
    .min(3, "Company name must be at least 3 characters long")
    .trim(),
  phone: Yup.string()
    .required("Please enter a valid phone number")
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      (value) => value && isValidPhoneNumber(value),
    ),
  country: Yup.string().required("Please select country"),
});

export const updateHostProfileSchema = Yup.object().shape({
  first_name: firstNameValidation,
  last_name: LastNameValidation,
  phone: Yup.string()
    .required("Please enter a valid phone number")
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      (value) => value && isValidPhoneNumber(value),
    ),
  about: Yup.string()
    .required("Please enter about")
    .min(3, "About must be at least 3 characters long")
    .trim(),
  owner_type: Yup.string().required("Please select owner_type").trim(),
});

export const updateHostBusinessProfileSchema = Yup.object().shape({
  first_name: firstNameValidation,
  last_name: LastNameValidation,
  phone:  Yup.string()
    .required("Please enter a valid phone number")
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      (value) => value && isValidPhoneNumber(value)
    ),
});

export const validationSchema = Yup.object().shape({
  country: Yup.string().required("Please select a country"),
  state: Yup.string().required("Please select a state"),
  location: Yup.string().required("Please select a city"),
  amenities: Yup.array().min(1, "Please select at least one"),
  safety_amenities: Yup.array().min(1, "Please select at least one"),
  ideal_for: Yup.array().min(1, "Please select at least one"),
  house_rules: Yup.array().min(1, "Please select at least one"),
  category_id: Yup.string().required("Please select a property type"),
  owner_type: Yup.string().required("Please select one option"),
  address: Yup.string().required("Please enter location"),
  latitude: Yup.number().nullable().required("Please select a valid location"),
  longitude: Yup.number().nullable().required("Please select a valid location"),
  post_code: Yup.string().required("Please enter post code").trim(),
  floor: Yup.string().required("Please enter apt,suite, bulding,floor").trim(),
  bedrooms: Yup.number().min(0).required("Please enter the number of bedrooms"),
  bathrooms: Yup.number()
    .min(0)
    .required("Please enter the number of bathrooms"),
  beds: Yup.number()
    .min(0)
    .required("Please enter the number of available beds"),
  square_foot: Yup.number().min(0).required("Please enter the square feet"),
  property_title: Yup.string()
    .required("Please enter the property name")
    .trim(),
  available_from: Yup.date().required("Please select a date"),
  monthly_rent: Yup.string()
    .required("Please enter the monthly rent")
    .matches(
      /^(?!0\d)(?!0$)\d+(\.\d{1,2})?$/,
      "Monthly rent must be a positive number greater than zero without leading zeros",
    ),
  cleaning_fee: Yup.string()
    .required("Please enter the cleaning fee")
    .matches(
      /^(?!0\d)(?!0$)\d+(\.\d{1,2})?$/,
      "Cleaning fee must be a positive number greater than zero without leading zeros",
    ),
  cleaning_fee_type: Yup.string().required("Please select a cleaning fee type"),
  monthly_rent_type: Yup.string().required("Please select a monthly rent type"),
  security_deposit: Yup.string()
    .required("Please enter the security seposit")
    .matches(
      /^(?!0\d)(?!0$)\d+(\.\d{1,2})?$/,
      "Security deposit must be a positive number greater than zero without leading zeros",
    ),
  min_stay_duration: Yup.string().required(
    "Please enter minimum stay duration",
  ),
  max_person: Yup.string().required(
    "Please enter the maximum number of visitors allowed",
  ),
  // .matches(
  //   /^(?!0$)([1-9]\d*)$/,
  //   "Minimum stay duration must be a whole number greater than zero"
  // ),
  property_description: Yup.string()
    .trim()
    .max(255, "Description must be at most 255 characters")
    .required("Please enter the property description"),
  check_in: Yup.string().required("Please select a check-in time"),
  check_out: Yup.string().required("Please select a check-out time"),
  videoFile: Yup.mixed()
    .test("fileOrUrl", "Please upload a valid video", (value) => {
      if (!value || typeof value === "string") return true; // Allow existing video URL or no new file
      const validVideoTypes = [
        "video/mp4",
        "video/quicktime", // .mov
        "video/x-matroska", // .mkv
        "video/webm",
      ];
      return validVideoTypes.includes(value.type);
    })
    .test(
      "fileSize",
      "File size must be less than or equal to 20MB",
      (value) => {
        if (!value || typeof value === "string") return true; // Allow existing URL or no new file
        return value.size <= 20 * 1024 * 1024;
      },
    )
    .required("Please upload a video"),
});
export const listingForYouSchema = Yup.object().shape({
  website_address: Yup.string()
    .required("Please enter the website address")
    .trim(),
  address: Yup.string().required("Please enter the location").trim(),
  post_code: Yup.string().required("Please enter post code").trim(),
  floor: Yup.string()
    .required("Please enter apt,suite, bulding,floor,etc")
    .trim(),
});

export const userKycSchema = Yup.object().shape({
  gov_doc_title: Yup.string().required("Please select Government-Issued ID"),
  gov_file: Yup.mixed()
    .test("fileType", "Please upload a valid image", (value) => {
      if (!value || typeof value === "string") return true;
      const validFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      return validFileTypes.includes(value.type);
    })
    .test(
      "fileSize",
      "File size must be less than or equal to 10MB",
      (value) => {
        if (!value || typeof value === "string") return true;
        const maxSizeInBytes = 10 * 1024 * 1024;
        return value.size <= maxSizeInBytes;
      },
    )
    .required("Please upload an image"),
  address_proof_title: Yup.string().required("Please select proof of address"),
  address_proof: Yup.mixed()
    .test("fileType", "Please upload a valid image", (value) => {
      if (!value || typeof value === "string") return true;
      const validFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      return validFileTypes.includes(value.type);
    })
    .test(
      "fileSize",
      "File size must be less than or equal to 10MB",
      (value) => {
        if (!value || typeof value === "string") return true;
        const maxSizeInBytes = 10 * 1024 * 1024;
        return value.size <= maxSizeInBytes;
      },
    )
    .required("Please upload an image"),
  driving_license: Yup.mixed()
    .test("fileType", "Please upload a valid image", (value) => {
      if (!value || typeof value === "string") return true;
      const validFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      return validFileTypes.includes(value.type);
    })
    .test(
      "fileSize",
      "File size must be less than or equal to 10MB",
      (value) => {
        if (!value || typeof value === "string") return true;
        const maxSizeInBytes = 10 * 1024 * 1024;
        return value.size <= maxSizeInBytes;
      },
    )
    .optional(),
});

export const userBusinessKycSchema = Yup.object().shape({
  gov_doc_title: Yup.string().required("Please select Government-Issued ID"),
  gov_file: Yup.mixed()
    .test("fileType", "Please upload a valid image", (value) => {
      if (!value || typeof value === "string") return true;
      const validFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      return validFileTypes.includes(value.type);
    })
    .test(
      "fileSize",
      "File size must be less than or equal to 10MB",
      (value) => {
        if (!value || typeof value === "string") return true;
        const maxSizeInBytes = 10 * 1024 * 1024;
        return value.size <= maxSizeInBytes;
      },
    )
    .required("Please upload an image"),
  address_proof_title: Yup.string().required("Please select proof of address"),
  address_proof: Yup.mixed()
    .test("fileType", "Please upload a valid image", (value) => {
      if (!value || typeof value === "string") return true;
      const validFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      return validFileTypes.includes(value.type);
    })
    .test(
      "fileSize",
      "File size must be less than or equal to 10MB",
      (value) => {
        if (!value || typeof value === "string") return true;
        const maxSizeInBytes = 10 * 1024 * 1024;
        return value.size <= maxSizeInBytes;
      },
    )
    .required("Please upload an image"),
  driving_license: Yup.mixed()
    .test("fileType", "Please upload a valid image", (value) => {
      if (!value || typeof value === "string") return true;
      const validFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      return validFileTypes.includes(value.type);
    })
    .test(
      "fileSize",
      "File size must be less than or equal to 10MB",
      (value) => {
        if (!value || typeof value === "string") return true;
        const maxSizeInBytes = 10 * 1024 * 1024;
        return value.size <= maxSizeInBytes;
      },
    )
    .optional(),

  business_reg_title: Yup.string().required(
    "Please select Business Registration / Tax Certificate (CIF / NIF – For Corporate Hosts)",
  ),
  business_reg: Yup.mixed()
    .test("fileType", "Please upload a valid image", (value) => {
      if (!value || typeof value === "string") return true;
      const validFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      return validFileTypes.includes(value.type);
    })
    .test(
      "fileSize",
      "File size must be less than or equal to 10MB",
      (value) => {
        if (!value || typeof value === "string") return true;
        const maxSizeInBytes = 10 * 1024 * 1024;
        return value.size <= maxSizeInBytes;
      },
    )
    .required("Please upload an image"),
});

export const kycSchema = Yup.object().shape({
  title: Yup.string().required("Please select document type"),
  file: Yup.mixed()
    .test("fileType", "Please upload a valid image", (value) => {
      if (!value || typeof value === "string") return true;
      const validFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      return validFileTypes.includes(value.type);
    })
    .test(
      "fileSize",
      "File size must be less than or equal to 10MB",
      (value) => {
        if (!value || typeof value === "string") return true;
        const maxSizeInBytes = 10 * 1024 * 1024;
        return value.size <= maxSizeInBytes;
      },
    )
    .required("Please upload an image"),
});

export const bookPropertySchema = Yup.object().shape({
  full_name: Yup.string()
    .required("Please enter full name")
    .min(3, "full name must be at least 3 characters long")
    .trim(),
  email: emailValidation,
  phone_number: Yup.string()
    .required("Please enter a valid phone number")
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      (value) => value && isValidPhoneNumber(value),
    ),
  nationality: Yup.string().required("Please select nationality"),
  purpose_of_stay: Yup.string().required("Please select purpose of stay"),
});
export const contactUsSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter name")
    .min(3, "name must be at least 3 characters long")
    .trim(),
  email: emailValidation,
  message: Yup.string()
    .required("Please enter message")
    .min(3, "Message must be at least 3 characters long")
    .trim(),
  accept: Yup.boolean().oneOf([true], "You must accept the terms to proceed"),
});
export const addRatingSchema = Yup.object().shape({
  rating: Yup.number()
    .required("Please select a rating")
    .min(1, "Rating must be at least 1"), // avoids 0 rating

  review: Yup.string()
    .required("Please enter comment")
    .min(3, "Comment must be at least 3 characters long")
    .trim(),
});

export const addSubHostSchema = Yup.object().shape({
  first_name: firstNameValidation,
  last_name: LastNameValidation,
  email: emailValidation,
  mobile: Yup.string()
    .required("Please enter a valid phone number")
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      (value) => value && isValidPhoneNumber(value),
    ),
  permission: Yup.array()
    .min(1, "At least one permission is required")
    .of(Yup.number()),
});

export const hostStripeSetupSchema = Yup.object().shape({
  first_name: firstNameValidation,
  last_name: LastNameValidation,
  email: emailValidation,
  phone_number: Yup.string()
    .required("Please enter phone number")
    .trim(),
  dob: Yup.string().required("Please select date of birth"),
  address: Yup.string()
    .required("Please enter address")
    .min(3, "Address must be at least 3 characters long")
    .trim(),
  city: Yup.string()
    .required("Please enter city")
    .min(2, "City must be at least 2 characters long")
    .trim(),
  state: Yup.string()
    .required("Please enter state")
    .min(2, "State must be at least 2 characters long")
    .trim(),
  postal_code: Yup.string()
    .required("Please enter postal code")
    .trim(),
  country: Yup.string().required("Please select country").trim(),
  bank_account_number: Yup.string()
    .required("Please enter bank account number")
    .trim(),
  bank_routing_number: Yup.string().when("country", {
    is: "US",
    then: (schema) =>
      schema.required("Please enter bank routing number").trim(),
    otherwise: (schema) => schema.notRequired(),
  }),
  business_profile: Yup.string()
    .required("Please select business profile")
    .trim(),
  business_url: Yup.string()
    .required("Please enter business URL")
    .url("Please enter a valid URL")
    .trim(),
  stripe_terms_accepted: Yup.boolean().oneOf(
    [true],
    "You must accept Stripe terms to continue",
  ),
  documents: Yup.mixed()
    .required("Please upload document")
    .test("fileSize", "File size must be less than or equal to 10MB", (value) => {
      if (!value || typeof value === "string") return false;
      return value.size <= 10 * 1024 * 1024;
    }),
});

export const userAddSchema = Yup.object().shape({
  email: emailValidation,
  first_name: firstNameValidation,
  last_name: LastNameValidation,
  number_of_bookings: Yup.string()
    .required("Please enter the allowed booking count")
    .matches(/^[1-9][0-9]*$/, "Allowed booking count must be a valid number"),
});

export const rejectReasonSchema = Yup.object().shape({
  cancel_reason: Yup.string()
    .trim()
    .required("Please enter reason")
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "Reason can only contain alphanumeric characters and spaces",
    ),
});

export const inquirySchema = Yup.object().shape({
  name: Yup.string().required("Please enter name").trim(),
  email: emailValidation,
  message: Yup.string().required("Please enter message").trim(),
});

export const createOfferSchema = Yup.object().shape({
  property_id: Yup.number()
    .typeError("Please select a property")
    .required("Please select a property"),
  offer_value: Yup.number()
    .typeError("Please enter a valid discount")
    .required("Please enter offer discount")
    .min(1, "Discount must be at least 1%")
    .max(100, "Discount cannot be greater than 100%"),
  start_date: Yup.date().required("Please select start date").min(
    new Date(new Date().setHours(0, 0, 0, 0)), // today (no past)
    "Start date cannot be in the past"
  ),
  end_date: Yup.date()
    .required("Please select end date")
    .min(Yup.ref("start_date"), "End date must be after start date"),
});
