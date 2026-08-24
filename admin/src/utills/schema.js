import * as Yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";
// Common Email Validation Rule
const emailValidation = Yup.string()
  .trim()
  .email("Please enter a valid email")
  .required("Please enter email")
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
    "Please enter a valid email"
  );

// Common Password Validation Rule
const passwordValidation = Yup.string()
  .required("Please enter password")
  .min(8, "Password cannot be less than 8 characters")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
    "Strong passwords require at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
  );

// Sign In Schema
export const signInSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export const changePasswordSchema = Yup.object().shape({
  current_password: Yup.string()
    .required("Please enter current password")
    .min(8, "Current password cannot be less than 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
      "Please enter a valid password"
    ),
  new_password: Yup.string()
    .required("Please enter new password")
    .min(8, "New password cannot be less than 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
      "Strong passwords require at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
    ),
  confirm_password: Yup.string()
    .required("Please enter confirm password")
    .oneOf([Yup.ref("new_password"), null], "Your password must match"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: emailValidation,
});
export const addRatingSchema = Yup.object().shape({
  rating: Yup.number()
    .required("Please select a rating")
    .min(1, "Rating must be at least 1"), // avoids 0 rating

  review: Yup.string()
    .required("Please enter review")
    .min(3, "Review must be at least 3 characters long")
    .trim(),
     first_name: Yup.string()
    .required("Please enter user's first name")
    .min(3, "User's first name must be at least 3 characters long")
    .trim(),
  last_name: Yup.string()
    .required("Please enter user's last name")
    .min(3, "User's last name must be at least 3 characters long")
    .trim(),
    property_id  : Yup.string()
    .required("Please select property"),
    file: Yup.mixed().required("Please upload image"),

});

export const addSubAdminSchema = Yup.object().shape({
  full_name: Yup.string()
    .required("Please enter full name")
    .min(3, "Full name must be at least 3 characters long")
    .trim(),
  email: emailValidation,
  mobile: Yup.string()
    .required("Please enter a valid mobile number")
    .test(
      "is-valid-phone",
      "Please enter a valid mobile number",
      (value) => value && isValidPhoneNumber(value)
    ),
  permission: Yup.array()
    .min(1, "At least one permission is required")
    .of(Yup.number()),
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

  address: Yup.string().required("Please enter the location").trim(),
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
      "Monthly rent must be a positive number greater than zero without leading zeros"
    ),
     cleaning_fee: Yup.string()
        .required("Please enter the cleaning fee")
        .matches(
          /^(?!0\d)(?!0$)\d+(\.\d{1,2})?$/,
          "Cleaning fee must be a positive number greater than zero without leading zeros"
        ),
      cleaning_fee_type: Yup.string().required("Please select a cleaning fee type"),
      monthly_rent_type: Yup.string().required("Please select a monthly rent type"),
  security_deposit: Yup.string()
    .required("Please enter the security seposit")
    .matches(
      /^(?!0\d)(?!0$)\d+(\.\d{1,2})?$/,
      "Security deposit must be a positive number greater than zero without leading zeros"
    ),
  min_stay_duration: Yup.string().required(
    "Please enter minimum stay duration"
  ),
  max_person: Yup.string().required(
    "Please enter the maximum number of visitors allowed"
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
      }
    )
    .required("Please upload a video"),
});

export const updateProfileSchema = Yup.object().shape({
  full_name: Yup.string()
    .required("Please enter full name")
    .min(3, "Full name must be at least 3 characters long")
    .trim(),
});

export const acountAddSchema = Yup.object().shape({
  email: emailValidation,
  first_name: Yup.string()
    .required("Please enter first name")
    .min(3, "First name must be at least 3 characters long")
    .trim(),
  last_name: Yup.string()
    .required("Please enter last name")
    .min(3, "Last name must be at least 3 characters long")
    .trim(),
});

export const addBlokSchema = Yup.object().shape({
  title: Yup.string().required("Please enter title").trim(),
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
      }
    )
    .required("Please upload an image"),
});

export const serviceFeeSchema = Yup.object().shape({
  country: Yup.string().required("Please select a country"),
  state: Yup.string().required("Please select a state"),
  location: Yup.string().required("Please select a city"),
commission: Yup.string()
  .required("Please enter the fee amount (%)")
  .matches(
    /^(100(\.0{1,2})?|([1-9]\d?)(\.\d{1,2})?)$/,
    "Fee amount (%) must be between 1 and 100, with up to 2 decimal places"
  ),


});

export const cancellationPolicySettingsSchema = Yup.object().shape({
  thirty_days: Yup.string()
    .optional()
    .matches(/^\d+(\.\d{1,2})?$/, {
      message: "Please enter a valid percentage",
      excludeEmptyString: true,
    }),
  ten_days: Yup.string()
    .optional()
    .matches(/^\d+(\.\d{1,2})?$/, {
      message: "Please enter a valid percentage",
      excludeEmptyString: true,
    }),
  seven_days: Yup.string()
    .optional()
    .matches(/^\d+(\.\d{1,2})?$/, {
      message: "Please enter a valid percentage",
      excludeEmptyString: true,
    }),
  same_day: Yup.string()
    .optional()
    .matches(/^\d+(\.\d{1,2})?$/, {
      message: "Please enter a valid percentage",
      excludeEmptyString: true,
    }),
});
