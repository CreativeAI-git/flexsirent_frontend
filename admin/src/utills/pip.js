import moment from "moment";
// Currency Symbol
export const curSym = "€";
export const WebURL = process.env.REACT_APP_WEB_URL || "";

// Date View Format
export const pipViewDate = (date) => {
  if (!date) return;
  return moment(date).format("DD-MM-YYYY");
};

// Date Time View Format
export const pipViewDateTime = (date) => {
  if (!date) return;
  return moment.utc(date).local().format("DD-MM-YYYY HH:mm");
};

export const getSubstring = (str, len = "15", appendStr = "...") => {
  if (!str) return "";
  if (str?.length <= len) return str;
  return str?.substring(0, len) + appendStr;
};

export const rentData = [
  {
    title: "APARTMENTS",
    img: "assets/img/home/rent_1.jpg",
    description:
      "Discover beautifully curated rental apartments across Europe’s top cities — designed for every lifestyle,taste, and budget",
  },
  {
    title: "ROOMS",
    img: "assets/img/home/rent_2.png",
    description:
      "Explore flexible and stylish living spaces throughout Europe — from cozy studios to spacious homes, all in prime locations",
  },
  {
    title: "APARTMENTS",
    img: "assets/img/home/rent_1.jpg",
    description:
      "Discover beautifully curated rental apartments across Europe’s top cities — designed for every lifestyle,taste, and budget",
  },
  {
    title: "ROOMS",
    img: "assets/img/home/rent_2.png",
    description:
      "Explore flexible and stylish living spaces throughout Europe — from cozy studios to spacious homes, all in prime locations",
  },
  {
    title: "APARTMENTS",
    img: "assets/img/home/rent_1.jpg",
    description:
      "Discover beautifully curated rental apartments across Europe’s top cities — designed for every lifestyle,taste, and budget",
  },
  {
    title: "ROOMS",
    img: "assets/img/home/rent_2.png",
    description:
      "Explore flexible and stylish living spaces throughout Europe — from cozy studios to spacious homes, all in prime locations",
  },
];

export const apartmentData = [
  {
    id: 1,
    img: "assets/img/house_rent.png",
    title: "One-bedroom apartment",
    location: "One-bedroom apartment",
    rating: 5,
    isVerified: true,
    features: [
      {
        icon: "assets/img/weui_location-outlined.svg",
        label: "Wi fi",
      },
      {
        icon: "assets/img/thunder_icon.png",
        label: "Bills Included",
      },
      {
        icon: "assets/img/wokspace_icon.png",
        label: "Workspace",
      },
    ],
    price: "850",
    detailLink: "apartment-detail.html",
  },
  {
    id: 1,
    img: "assets/img/house_rent.png",
    title: "One-bedroom apartment",
    location: "One-bedroom apartment",
    rating: 5,
    isVerified: true,
    features: [
      {
        icon: "assets/img/weui_location-outlined.svg",
        label: "Wi fi",
      },
      {
        icon: "assets/img/thunder_icon.png",
        label: "Bills Included",
      },
      {
        icon: "assets/img/wokspace_icon.png",
        label: "Workspace",
      },
    ],
    price: "850",
    detailLink: "apartment-detail.html",
  },
  // {
  //   id: 1,
  //   img: "assets/img/house_rent.png",
  //   title: "One-bedroom apartment",
  //   location: "One-bedroom apartment",
  //   rating: 5,
  //   isVerified: true,
  //   features: [
  //     {
  //       icon: "assets/img/weui_location-outlined.svg",
  //       label: "Wi fi",
  //     },
  //     {
  //       icon: "assets/img/thunder_icon.png",
  //       label: "Bills Included",
  //     },
  //     {
  //       icon: "assets/img/wokspace_icon.png",
  //       label: "Workspace",
  //     },
  //   ],
  //   price: "850",
  //   detailLink: "apartment-detail.html",
  // },
  // {
  //   id: 1,
  //   img: "assets/img/house_rent.png",
  //   title: "One-bedroom apartment",
  //   location: "One-bedroom apartment",
  //   rating: 5,
  //   isVerified: true,
  //   features: [
  //     {
  //       icon: "assets/img/weui_location-outlined.svg",
  //       label: "Wi fi",
  //     },
  //     {
  //       icon: "assets/img/thunder_icon.png",
  //       label: "Bills Included",
  //     },
  //     {
  //       icon: "assets/img/wokspace_icon.png",
  //       label: "Workspace",
  //     },
  //   ],
  //   price: "850",
  //   detailLink: "apartment-detail.html",
  // },
  // {
  //   id: 1,
  //   img: "assets/img/house_rent.png",
  //   title: "One-bedroom apartment",
  //   location: "One-bedroom apartment",
  //   rating: 5,
  //   isVerified: true,
  //   features: [
  //     {
  //       icon: "assets/img/weui_location-outlined.svg",
  //       label: "Wi fi",
  //     },
  //     {
  //       icon: "assets/img/thunder_icon.png",
  //       label: "Bills Included",
  //     },
  //     {
  //       icon: "assets/img/wokspace_icon.png",
  //       label: "Workspace",
  //     },
  //   ],
  //   price: "850",
  //   detailLink: "apartment-detail.html",
  // },
  // {
  //   id: 1,
  //   img: "assets/img/house_rent.png",
  //   title: "One-bedroom apartment",
  //   location: "One-bedroom apartment",
  //   rating: 5,
  //   isVerified: true,
  //   features: [
  //     {
  //       icon: "assets/img/weui_location-outlined.svg",
  //       label: "Wi fi",
  //     },
  //     {
  //       icon: "assets/img/thunder_icon.png",
  //       label: "Bills Included",
  //     },
  //     {
  //       icon: "assets/img/wokspace_icon.png",
  //       label: "Workspace",
  //     },
  //   ],
  //   price: "850",
  //   detailLink: "apartment-detail.html",
  // },
  // Add more objects here as needed
];

export const testimonialData = [
  {
    id: 1,
    name: "Hattie Bradley",
    role: "Happy User",
    image: "assets/img/home/client_1.jpg",
    quote:
      "My first time using the platform was a breeze – really polished and user friendly. One of their team even got in touch to guide me through the necessary steps. I highly recommend them!",
    quoteIcon: "assets/img/quote.png",
  },
  {
    id: 2,
    name: "Luise Aymar",
    role: "Happy User",
    image: "assets/img/home/client_2.jpg",
    quote:
      "My first time using the platform was a breeze – really polished and user friendly. One of their team even got in touch to guide me through the necessary steps. I highly recommend them!",
    quoteIcon: "assets/img/quote.png",
  },
  {
    id: 1,
    name: "Hattie Bradley",
    role: "Happy User",
    image: "assets/img/home/client_1.jpg",
    quote:
      "My first time using the platform was a breeze – really polished and user friendly. One of their team even got in touch to guide me through the necessary steps. I highly recommend them!",
    quoteIcon: "assets/img/quote.png",
  },
  {
    id: 2,
    name: "Luise Aymar",
    role: "Happy User",
    image: "assets/img/home/client_2.jpg",
    quote:
      "My first time using the platform was a breeze – really polished and user friendly. One of their team even got in touch to guide me through the necessary steps. I highly recommend them!",
    quoteIcon: "assets/img/quote.png",
  },
  // Add more testimonials as needed
];

export const services = [
  {
    title: "Web Development",
    description:
      "We build modern and responsive websites tailored to your business needs.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.53784 10.488L12.9557 13.0519C13.1675 13.2108 13.4314 13.2837 13.6946 13.256C13.9579 13.2284 14.2009 13.1023 14.3751 12.903L21.0776 5.24268"
          stroke="#000066"
          strokeWidth="0.74053"
          stroke-linecap="round"
        />
        <path
          d="M22.1271 12.5855C22.1272 14.5583 21.5093 16.4816 20.3602 18.0852C19.2111 19.6887 17.5885 20.8921 15.7204 21.5262C13.8523 22.1604 11.8325 22.1934 9.94462 21.6207C8.05678 21.048 6.39575 19.8983 5.19482 18.3332C3.9939 16.768 3.31341 14.866 3.24894 12.8942C3.18447 10.9225 3.73925 8.98006 4.83536 7.33979C5.93147 5.69952 7.51385 4.4438 9.36025 3.74899C11.2066 3.05419 13.2243 2.9552 15.1299 3.46594"
          stroke="#000066"
          strokeWidth="0.74053"
          stroke-linecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Profitable & Sustainable",
    description:
      "Earn steady income with long-term stays while minimizing turnover and operational hassle — a hosting model that lasts.",
    icon: (
      <svg
        width="22"
        height="24"
        viewBox="0 0 22 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.9825 12.5023C13.8102 12.0148 13.4909 11.5927 13.0687 11.2942C12.6465 10.9956 12.1421 10.8354 11.625 10.8354V10.2104H10.375V10.8354C9.71196 10.8354 9.07607 11.0988 8.60723 11.5677C8.13839 12.0365 7.875 12.6724 7.875 13.3354C7.875 13.9985 8.13839 14.6344 8.60723 15.1032C9.07607 15.5721 9.71196 15.8354 10.375 15.8354V18.3354C9.83125 18.3354 9.36813 17.9886 9.19563 17.5023C9.17003 17.4228 9.12875 17.3492 9.07421 17.2858C9.01967 17.2225 8.95298 17.1708 8.8781 17.1337C8.80322 17.0966 8.72165 17.0749 8.63824 17.0699C8.55482 17.0648 8.47124 17.0766 8.39245 17.1044C8.31365 17.1323 8.24124 17.1756 8.1795 17.2319C8.11775 17.2883 8.06792 17.3564 8.03297 17.4323C7.99801 17.5082 7.97863 17.5903 7.97597 17.6739C7.97331 17.7574 7.98744 17.8406 8.0175 17.9186C8.18982 18.4061 8.50908 18.8282 8.9313 19.1267C9.35351 19.4253 9.85791 19.5855 10.375 19.5854V20.2104H11.625V19.5854C12.288 19.5854 12.9239 19.3221 13.3928 18.8532C13.8616 18.3844 14.125 17.7485 14.125 17.0854C14.125 16.4224 13.8616 15.7865 13.3928 15.3177C12.9239 14.8488 12.288 14.5854 11.625 14.5854V12.0854C11.8835 12.0854 12.1357 12.1655 12.3468 12.3147C12.5579 12.4639 12.7175 12.6749 12.8038 12.9186C12.8589 13.0749 12.974 13.2029 13.1235 13.2744C13.1976 13.3098 13.2779 13.3302 13.3599 13.3346C13.4418 13.339 13.5239 13.3272 13.6013 13.2998C13.6786 13.2725 13.7499 13.2302 13.811 13.1753C13.872 13.1204 13.9216 13.0541 13.957 12.98C13.9924 12.906 14.0129 12.8257 14.0173 12.7437C14.0217 12.6617 14.0098 12.5797 13.9825 12.5023ZM10.375 12.0854C10.0435 12.0854 9.72554 12.2171 9.49112 12.4516C9.2567 12.686 9.125 13.0039 9.125 13.3354C9.125 13.667 9.2567 13.9849 9.49112 14.2193C9.72554 14.4538 10.0435 14.5854 10.375 14.5854V12.0854ZM11.625 18.3354C11.9565 18.3354 12.2745 18.2038 12.5089 17.9693C12.7433 17.7349 12.875 17.417 12.875 17.0854C12.875 16.7539 12.7433 16.436 12.5089 16.2016C12.2745 15.9671 11.9565 15.8354 11.625 15.8354V18.3354Z"
          fill="#000066"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.22061 2.47357C5.75436 1.72295 8.27061 0.835449 11.0244 0.835449C13.7206 0.835449 16.1706 1.68607 17.6962 2.4267L17.7825 2.46857C18.2425 2.69607 18.6137 2.91107 18.875 3.08545L16.5662 6.46045C21.8887 11.9017 26 23.3336 11.0244 23.3336C-3.95126 23.3336 0.0493628 12.1092 5.41811 6.46045L3.12436 3.08545C3.30124 2.96982 3.52561 2.83545 3.79311 2.69295C3.92561 2.6217 4.06811 2.54816 4.22061 2.47357ZM15.0825 6.41607L16.9306 3.7142C15.2119 3.83795 13.1669 4.2417 11.1981 4.8117C9.79186 5.21795 8.22936 5.15607 6.78249 4.8892C6.41786 4.82169 6.05576 4.74122 5.69686 4.64795L6.89686 6.41482C9.46874 7.33045 12.51 7.33045 15.0825 6.41607ZM6.17499 7.4792C9.18436 8.6417 12.8012 8.6417 15.8106 7.47795C17.0665 8.8024 18.1172 10.3072 18.9281 11.9423C19.7731 13.6661 20.2331 15.3892 20.1581 16.8742C20.0856 18.3073 19.5219 19.5317 18.2344 20.4417C16.8925 21.3898 14.6356 22.0836 11.0237 22.0836C7.40811 22.0836 5.14061 21.4017 3.78624 20.4642C2.48936 19.5661 1.91999 18.358 1.83936 16.9442C1.75499 15.4754 2.20499 13.7611 3.04686 12.0254C3.84999 10.3704 4.97061 8.77732 6.17499 7.4792ZM5.45624 3.28295C5.95624 3.4317 6.47874 3.56107 7.00874 3.6592C8.35249 3.9067 9.69999 3.94295 10.85 3.60982C12.1901 3.21926 13.5531 2.91222 14.9312 2.69045C13.7812 2.3442 12.4362 2.08545 11.0237 2.08545C8.87061 2.08545 6.86249 2.68607 5.45624 3.28295Z"
          fill="#000066"
        />
      </svg>
    ),
  },
  {
    title: "Economic & Long Lasting",
    description:
      "Reduce vacancy rates and enjoy stable earnings through mid-term rentals designed for consistent, long-lasting occupancy.",
    icon: (
      <svg
        width="19"
        height="20"
        viewBox="0 0 19 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.61451 16.6224C1.78951 15.7891 1.14743 14.8361 0.688262 13.7636C0.229095 12.6911 -0.000488281 11.5824 -0.000488281 10.4374C-0.000488281 9.28488 0.221595 8.13613 0.665762 6.99113C1.10993 5.84613 1.82243 4.78363 2.80326 3.80363C3.59576 3.00947 4.60076 2.3803 5.81826 1.91613C7.03493 1.45113 8.35785 1.11155 9.78701 0.897383C11.2162 0.683217 12.697 0.5653 14.2295 0.543633C15.762 0.521967 17.2383 0.558634 18.6583 0.653634C18.7608 2.02863 18.8008 3.47863 18.7783 5.00363C18.7558 6.5303 18.632 8.0103 18.407 9.44363C18.182 10.877 17.8383 12.207 17.3758 13.4336C16.9133 14.6603 16.2912 15.6645 15.5095 16.4461C14.5495 17.4228 13.5137 18.1345 12.402 18.5811C11.2912 19.027 10.1758 19.2499 9.05576 19.2499C7.88243 19.2499 6.72201 19.0203 5.57451 18.5611C4.42701 18.102 3.44035 17.4557 2.61451 16.6224ZM4.72076 16.7111C5.37326 17.1461 6.08118 17.4695 6.84451 17.6811C7.60784 17.8936 8.34701 17.9999 9.06201 17.9999C10.0312 17.9999 10.9895 17.8111 11.937 17.4336C12.8862 17.0561 13.7795 16.4324 14.617 15.5624C14.9895 15.1874 15.3666 14.6611 15.7483 13.9836C16.1299 13.3061 16.4608 12.4211 16.7408 11.3286C17.0208 10.2361 17.2328 8.91322 17.377 7.35988C17.5212 5.80655 17.557 3.95738 17.4845 1.81238C16.4637 1.77072 15.3049 1.76322 14.0083 1.78988C12.7116 1.81655 11.4158 1.92738 10.1208 2.12238C8.82493 2.31822 7.60826 2.61655 6.47076 3.01738C5.33243 3.41738 4.42284 3.95822 3.74201 4.63988C2.82034 5.56072 2.17451 6.51572 1.80451 7.50488C1.43451 8.49405 1.24951 9.41572 1.24951 10.2699C1.24951 11.4024 1.47576 12.4603 1.92826 13.4436C2.38076 14.427 2.92868 15.194 3.57201 15.7449C4.09451 14.2707 4.90201 12.8561 5.99451 11.5011C7.08784 10.1461 8.61701 8.8828 10.582 7.71113C9.14534 8.95947 7.93784 10.2878 6.95951 11.6961C5.98118 13.1045 5.23493 14.7761 4.72076 16.7111Z"
          fill="#000066"
        />
      </svg>
    ),
  },
  {
    title: "Safe & Trustworthy",
    description:
      "Host with confidence — every guest is verified, and our secure platform ensures full transparency at every step.",
    icon: (
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.1082 0.00102881C12.5175 0.00102881 12.9207 0.0275913 13.2957 0.0900913C13.6651 0.137684 14.0296 0.218213 14.3847 0.330716C14.7389 0.436966 15.0899 0.573946 15.4378 0.741654C15.7769 0.902591 16.1253 1.09947 16.4738 1.31353C17.0628 1.68853 17.6425 1.99165 18.2332 2.23384C19.3956 2.70016 20.6252 2.97711 21.8753 3.05415C22.5076 3.10103 23.1623 3.12499 23.8394 3.12603V9.37603C23.8394 10.5625 23.6878 11.6906 23.3847 12.7604C23.0935 13.817 22.6797 14.8359 22.1519 15.7963C21.6264 16.7555 21.0044 17.6586 20.2957 18.4917C19.5765 19.344 18.7975 20.144 17.9644 20.8854C17.1196 21.6281 16.2311 22.3194 15.3035 22.9557C14.3743 23.6015 13.4399 24.1969 12.5003 24.7417L12.1253 24.9651L11.7503 24.7417C10.7865 24.1838 9.84516 23.588 8.92847 22.9557C7.99592 22.3263 7.10692 21.6346 6.26754 20.8854C5.43503 20.1439 4.65649 19.344 3.93785 18.4917C3.23152 17.6547 2.60681 16.7522 2.07222 15.7963C1.55388 14.8314 1.14058 13.8136 0.839412 12.7604C0.536384 11.658 0.386024 10.5193 0.392537 9.37603V3.12603C1.06962 3.12499 1.72483 3.10103 2.35816 3.05415C2.98273 3.0117 3.60323 2.92238 4.21441 2.78697C4.81285 2.65259 5.41129 2.47447 6.00035 2.23384C6.61145 1.98682 7.19747 1.68178 7.75035 1.3229C8.43785 0.876029 9.13472 0.546341 9.82222 0.329154C10.5627 0.102419 11.3338 -0.00826829 12.1082 0.00102881ZM22.2675 4.66197C21.0848 4.60408 19.9131 4.40635 18.7769 4.0729C17.6471 3.73501 16.5708 3.23895 15.58 2.59947C15.066 2.26292 14.5082 1.99847 13.9222 1.81353C13.3366 1.6369 12.7277 1.54946 12.116 1.55415C11.4997 1.5504 10.8863 1.6378 10.2957 1.81353C9.70903 1.99296 9.15202 2.25778 8.64254 2.59947C7.64968 3.2418 6.57069 3.73999 5.43785 4.07915C4.33056 4.40103 3.16962 4.5979 1.95504 4.66978V9.38384C1.95504 10.4182 2.08941 11.412 2.35816 12.3651C2.63219 13.3114 3.00946 14.2247 3.48316 15.0885C3.96273 15.9613 4.52802 16.7841 5.17066 17.5448C5.82222 18.312 6.51754 19.026 7.26754 19.7042C8.01754 20.3823 8.80347 21.0104 9.62535 21.5885C10.4556 22.1677 11.2858 22.6974 12.116 23.1776C12.9659 22.6836 13.7943 22.1535 14.5988 21.5885C15.4271 21.012 16.2173 20.3826 16.9644 19.7042C17.7144 19.026 18.4113 18.312 19.0628 17.5448C19.7055 16.7841 20.2708 15.9613 20.7503 15.0885C21.2217 14.2256 21.5933 13.312 21.8582 12.3651C22.1354 11.3958 22.2732 10.392 22.2675 9.38384V4.66197Z"
          fill="#000066"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.9341 7.35869L17.2466 6.76807L16.6123 6.82275L9.79976 14.8665L7.47944 11.554L6.85444 11.4478L6.13101 11.9649L6.02319 12.5899L9.00601 16.8493L9.34507 17.0368L10.0591 17.0806L10.4248 16.9212L17.9794 7.9915L17.9341 7.35869Z"
          fill="#000066"
        />
      </svg>
    ),
  },
  {
    title: "National & International",
    description:
      "Reach both local tenants and global travelers — expand your visibility across borders effortlessly.",
    icon: (
      <svg
        width="28"
        height="27"
        viewBox="0 0 28 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.2795 4.2284C22.0629 2.99978 20.6155 2.02365 19.0206 1.35609C17.4256 0.688519 15.7145 0.342674 13.9854 0.338419C12.2564 0.334163 10.5436 0.671581 8.94533 1.33129C7.3471 1.991 5.89496 2.95999 4.67235 4.1826C3.44974 5.40522 2.48074 6.85735 1.82103 8.45558C1.16133 10.0538 0.823909 11.7667 0.828165 13.4957C0.83242 15.2247 1.17827 16.9359 1.84583 18.5308C2.5134 20.1258 3.48953 21.5731 4.71815 22.7897C5.93473 24.0183 7.38207 24.9945 8.97704 25.662C10.572 26.3296 12.2832 26.6755 14.0122 26.6797C15.7412 26.684 17.4541 26.3465 19.0523 25.6868C20.6505 25.0271 22.1027 24.0581 23.3253 22.8355C24.5479 21.6129 25.5169 20.1608 26.1766 18.5625C26.8363 16.9643 27.1737 15.2515 27.1695 13.5224C27.1652 11.7934 26.8194 10.0823 26.1518 8.4873C25.4842 6.89233 24.5081 5.44498 23.2795 4.2284ZM2.74881 13.5091C2.74837 12.5134 2.88039 11.5221 3.14139 10.5612C3.57147 11.487 4.19607 12.2868 4.62088 13.2366C5.1699 14.4577 6.64412 14.119 7.2951 15.1889C7.87283 16.1388 7.25584 17.3399 7.68826 18.3337C8.00233 19.055 8.74295 19.2126 9.25389 19.7399C9.77596 20.272 9.76482 21.0009 9.84451 21.6946C9.93437 22.5097 10.0802 23.3177 10.281 24.1128C10.281 24.1186 10.281 24.1251 10.2857 24.1309C5.90115 22.5911 2.74881 18.4116 2.74881 13.5091ZM13.9988 24.7591C13.3705 24.7589 12.7434 24.7064 12.1238 24.602C12.1303 24.4432 12.1332 24.295 12.149 24.1919C12.2914 23.2602 12.7578 22.3491 13.3871 21.6518C14.0088 20.9639 14.8607 20.4987 15.3857 19.7182C15.9002 18.9565 16.0543 17.9311 15.8422 17.0411C15.5299 15.7263 13.7433 15.2874 12.7801 14.5743C12.2263 14.1641 11.7336 13.5302 11.0064 13.4786C10.6713 13.4552 10.3906 13.5272 10.0584 13.4417C9.75369 13.3626 9.51463 13.1985 9.19002 13.2413C8.58357 13.321 8.20096 13.969 7.54939 13.8811C6.93123 13.7985 6.29432 13.0749 6.15369 12.486C5.97322 11.729 6.57205 11.4835 7.21365 11.4161C7.48143 11.388 7.78201 11.3575 8.03924 11.4559C8.37791 11.5813 8.53787 11.913 8.84197 12.0805C9.41209 12.3934 9.52752 11.8936 9.44022 11.3874C9.30955 10.6292 9.15721 10.3204 9.83338 9.79832C10.3021 9.43856 10.7029 9.1784 10.6279 8.53211C10.5834 8.15242 10.3754 7.98074 10.5693 7.60281C10.7164 7.31512 11.1201 7.05555 11.3832 6.88387C12.0623 6.4409 14.2924 6.47371 13.3812 5.23387C13.1135 4.87 12.6195 4.21961 12.1508 4.13055C11.5648 4.01981 11.3047 4.67371 10.8963 4.96199C10.4744 5.26024 9.65291 5.59891 9.23045 5.13777C8.66209 4.51727 9.60721 4.31395 9.81639 3.88035C9.91307 3.6782 9.81639 3.39754 9.6535 3.13328C9.86482 3.04422 10.0797 2.9616 10.298 2.88543C10.4349 2.9865 10.5972 3.04738 10.7668 3.06121C11.1588 3.08699 11.5285 2.87488 11.8707 3.14207C12.2504 3.43504 12.524 3.80535 13.0279 3.89676C13.5154 3.98524 14.0316 3.70106 14.1523 3.20184C14.2256 2.89832 14.1523 2.57781 14.082 2.26434C16.2734 2.27695 18.4128 2.93323 20.2344 4.15164C20.1172 4.10711 19.9771 4.11238 19.8043 4.19266C19.4486 4.35789 18.9447 4.77859 18.9031 5.19578C18.8556 5.66922 19.5541 5.73602 19.8857 5.73602C20.3838 5.73602 20.8883 5.51336 20.7277 4.93797C20.658 4.68836 20.5631 4.42879 20.4101 4.27176C20.7778 4.52682 21.13 4.80348 21.4648 5.10027C21.4596 5.10555 21.4543 5.11024 21.449 5.11609C21.1115 5.46766 20.7195 5.74598 20.4887 6.17371C20.3258 6.47488 20.1424 6.61785 19.8125 6.69578C19.6308 6.73856 19.4234 6.75438 19.2711 6.87625C18.8469 7.21023 19.0883 8.01297 19.4902 8.25379C19.9982 8.55789 20.7517 8.41492 21.1349 7.98074C21.4344 7.6409 21.6107 7.05086 22.1492 7.05145C22.3863 7.05095 22.614 7.14377 22.7832 7.30984C23.0058 7.5407 22.9619 7.75633 23.0094 8.04461C23.0931 8.55672 23.5449 8.27899 23.8197 8.02059C24.02 8.37708 24.2008 8.74422 24.3611 9.12039C24.0588 9.55574 23.8185 10.0304 23.0914 9.52293C22.656 9.21883 22.3883 8.77762 21.8416 8.64051C21.364 8.52332 20.8748 8.6452 20.4031 8.72664C19.867 8.81981 19.2312 8.86082 18.8246 9.26688C18.4314 9.65828 18.2234 10.1821 17.8051 10.5753C16.9959 11.337 16.6543 12.1684 17.1781 13.2454C17.682 14.2807 18.7361 14.8427 19.8734 14.7688C20.9908 14.6944 22.1515 14.0464 22.1193 15.67C22.1076 16.2448 22.2277 16.6427 22.4041 17.1764C22.5676 17.6686 22.5564 18.1456 22.5939 18.6536C22.6296 19.2485 22.7226 19.8385 22.8717 20.4155C21.8214 21.7677 20.476 22.862 18.9382 23.6148C17.4005 24.3676 15.711 24.759 13.9988 24.7591Z"
          fill="#000066"
        />
      </svg>
    ),
  },
  {
    title: "Dynamic & Flexible",
    description:
      "Easily adapt your listings, availability, and pricing to match your evolving hosting goals and market demand.",
    icon: (
      <svg
        width="30"
        height="31"
        viewBox="0 0 30 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.3754 8.94921L9.63916 11.6836C9.44914 11.7933 9.29135 11.9511 9.18164 12.1411C9.07193 12.3311 9.01417 12.5467 9.01416 12.7661V18.2348C9.01406 18.4544 9.07176 18.67 9.18148 18.8602C9.2912 19.0503 9.44905 19.2082 9.63916 19.318L14.3754 22.0523C14.5654 22.162 14.781 22.2198 15.0004 22.2198C15.2198 22.2198 15.4354 22.162 15.6254 22.0523L20.3617 19.318C20.5518 19.2082 20.7096 19.0503 20.8193 18.8602C20.9291 18.67 20.9868 18.4544 20.9867 18.2348V12.7661C20.9867 12.5467 20.9289 12.3311 20.8192 12.1411C20.7095 11.9511 20.5517 11.7933 20.3617 11.6836L15.6254 8.94921C15.4354 8.8395 15.2198 8.78174 15.0004 8.78174C14.781 8.78174 14.5654 8.8395 14.3754 8.94921Z"
          stroke="#000066"
          strokeWidth="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.01393 12.863L3.1958 16.2223M20.9864 18.138L26.8046 14.7786M14.3752 2.23046L3.8208 8.32421C3.63078 8.43391 3.47299 8.59171 3.36328 8.78172C3.25357 8.97174 3.19581 9.18729 3.1958 9.40671V21.5942C3.19581 21.8136 3.25357 22.0292 3.36328 22.2192C3.47299 22.4092 3.63078 22.567 3.8208 22.6767L14.3752 28.7705C14.5652 28.8802 14.7808 28.9379 15.0002 28.9379C15.2196 28.9379 15.4352 28.8802 15.6252 28.7705L26.1796 22.6767C26.3696 22.567 26.5274 22.4092 26.6371 22.2192C26.7468 22.0292 26.8045 21.8136 26.8046 21.5942V9.40671C26.8045 9.18729 26.7468 8.97174 26.6371 8.78172C26.5274 8.59171 26.3696 8.43391 26.1796 8.32421L15.6252 2.23046C15.4352 2.12075 15.2196 2.06299 15.0002 2.06299C14.7808 2.06299 14.5652 2.12075 14.3752 2.23046Z"
          stroke="#000066"
          strokeWidth="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  // Add more services here...
];

export const checkStatus = (data) => {
  switch (data) {
    case 1:
      return "ct_green_light_status";
    case 0:
      return "ct_red_light_status";
    case "Active":
      return "ct_green_light_status";
    case "Suspended":
      return "ct_red_light_status";
    case "Confirmed":
      return "ct_green_light_status";
    case "Upcoming":
      return "ct_blue_light_status";
    case "Cancelled":
      return "ct_red_light_status";
    case "Checked-In":
    case "Pending":
      return "ct_brown_light_status";
    case "Completed":
      return "ct_green_light_status";
  }
};

export const changeStatusColor = (data) => {
  switch (data) {
    case "Active":
      return "ct_green_clr";
    case "Pending":
      return "ct_brown_clr";
    case 1:
      return "ct_green_clr";
    case 0:
      return "ct_red_clr";
    case "Suspended":
      return "ct_red_clr";
    case "Confirmed":
      return "ct_green_clr";
    case "Upcoming":
      return "ct_blue_clr";
    case "Cancelled":
      return "ct_red_clr";
    case "Checked-In":
      return "ct_brown_clr";
    case "Completed":
      return "ct_green_clr";
  }
};

export const StatusDefinitions = {
  booking: {
    0: {
      value: "Pending",
      color: "ct_brown_clr",
      table: "ct_brown_light_status",
    },
    1: {
      value: "Active",
      color: "ct_green_clr",
      table: "ct_green_light_status",
    },
    2: { value: "Reject", color: "ct_red_clr", table: "ct_red_light_status" },
  },
  support: {
    0: { value: "Pending", color: "ct_brown_clr" },
    1: { value: "Replied", color: "ct_green_clr" },
  },
  offer: {
    1: { value: "Active", color: "ct_green_clr" },
    0: { value: "Inactive", color: "ct_red_clr" },
  },
};

// Set token
export const setToken = (panel, token) => {
  const key = `${panel}_token`;
  if (key) localStorage.setItem(key, token);
};

// Get token
export const getToken = (panel) => {
  const key = `${panel}_token`;
  return key ? localStorage.getItem(key) : null;
};

export const pip_TimeAgo = (timestamp) => {
  if (!timestamp) return "";

  const now = new Date();
  const past = new Date(timestamp);
  let diffMs = now - past;

  if (diffMs < 0) diffMs = 0;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${years} year${years > 1 ? "s" : ""} ago`;
};

export const getMessageDate = (message) => {
  const raw =
    message?.created_at ||
    message?.updated_at ||
    message?.sent_at ||
    message?.timestamp ||
    message?.date;

  if (!raw) return null;

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const getTimeLabel = (message) => {
  const date = getMessageDate(message);
  if (!date) return "";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getDateLabel = (date) => {
  if (!date) return "";

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const dayDiff = Math.floor((todayStart - targetStart) / 86400000);

  if (dayDiff === 0) return "Today";
  if (dayDiff === 1) return "Yesterday";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Set profile
export const setProfile = (panel, profile) => {
  const key = `${panel}_profile`;
  localStorage.setItem(key, JSON.stringify(profile));
};

export const clearAuth = (panel) => {
  const key = `${panel}_token`;
  const profile = `${panel}_profile`;
  localStorage.removeItem(key);
  localStorage.removeItem(profile);
};

// Get Profile
export const getProfile = (panel) => {
  if (!panel) return;
  const key = `${panel}_profile`;
  const stored = localStorage.getItem(key);
  if (!stored) return {};

  const parsed = JSON.parse(stored || "{}");
  return typeof parsed === "object" ? parsed : {};
};

export const getAmenityIcon = (amenity) => {
  switch (amenity) {
    case "Kitchen":
      return "amenties_icon_1.svg";
    case "Air Conditioning":
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
