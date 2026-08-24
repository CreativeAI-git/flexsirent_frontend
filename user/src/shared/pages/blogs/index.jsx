import { useEffect } from "react";
import Loader from "../../components/loader";
import WebHeader from "../../layout/WebHeader";
import WebFooter from "../../layout/WebFooter";
import WebSubHeader from "../../layout/WebSubHeader";
import { useDispatch, useSelector } from "react-redux";
import AIBar from "@/components/AIBar";
import About from "../../components/pages/blogs/About";
import LatestStories from "../../components/pages/blogs/LatestStories";
import { fetchBlogs } from "../../../redux/features/user/actions/authAction";
import { useTranslation } from "react-i18next";

import { useLoaderData } from "react-router";
import axios from "axios";
import { BASE_URL, blogsAPI, seoBySlugAPI } from "../../../shared/routes/apiURLs";
import { getFallbackBlogs } from "../../../shared/utils/mockBlogs";

export async function loader({ params }) {
  const lang = params.lang || "en";
  try {
    const [blogsRes, seoRes] = await Promise.all([
      axios.get(`${BASE_URL}${blogsAPI}`),
      axios.get(`${BASE_URL}${seoBySlugAPI}blogs`).catch(() => null),
    ]);
    let blogs = blogsRes.data?.data || [];
    if (blogs.length === 0) {
      blogs = getFallbackBlogs(lang);
    }
    return {
      blogs,
      seoData: seoRes?.data?.data || null,
    };
  } catch (error) {
    return {
      blogs: getFallbackBlogs(lang),
      seoData: null
    };
  }
}

export function meta({ data, params }) {
  const lang = params.lang || "en";
  const canonicalBase = (import.meta.env.VITE_CANONICAL_URL || "https://flexsirent.com").replace(/\/+$/, "");
  const url = `${canonicalBase}/${lang}/blogs`;
  const seo = data?.seoData;
  const title = seo?.meta_title || "Blogs | Flexsirent";
  const description = seo?.meta_description || "Stay updated with the latest articles, stories, and renting guides on Flexsirent.";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { tagName: "link", rel: "canonical", href: url }
  ];
}

const Blogs = () => {
  const { t } = useTranslation();
  const loaderData = useLoaderData();
  const dispatch = useDispatch();
  const { isLoading: reduxIsLoading, blogList: reduxBlogList } = useSelector(state => state?.guest?.auth);

  const blogList = loaderData?.blogs || reduxBlogList;
  const isLoading = loaderData ? false : reduxIsLoading;

  useEffect(() => {
    // No-op for initial load; data is loaded via server loader
  }, []);

  if (isLoading) {
    return <Loader />
  }
  return (
    <>
      {/* Header Section S */}
      <WebHeader />
      {/* <WebSubHeader
        lebel={"Blogs"}
        desc={`"Discover articles, ideas, and stories that go beyond the surface — crafted to spark curiosity and add real value."`}
      /> */}
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(252,249,249,0.8), rgba(255,255,255,0.8)), url('/assets/img/blog-banner.png')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "contain",
        }}
      >
        <About blogList={blogList} />
        <LatestStories blogList={blogList} />
        {/* <div className="ct_custom_sticky_sec" onClick={() => document.getElementById("ai-bar-section")?.scrollIntoView({ behavior: "smooth" })}>
          <div>
            <svg width="36" height="36" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.6247 10.6039C20.3018 7.29136 18.3434 2.08301 12.2914 2.08301C6.23928 2.08301 4.28093 7.29136 3.95803 10.6039C2.82522 11.0338 2.078 12.1214 2.08303 13.333V14.7914C2.08303 16.4022 3.38889 17.708 4.99968 17.708C6.61052 17.708 7.91638 16.4021 7.91638 14.7914V13.333C7.91111 12.1475 7.19138 11.0823 6.09343 10.6351C6.30178 8.71841 7.32263 4.16636 12.2914 4.16636C17.2601 4.16636 18.2705 8.71841 18.4789 10.6351C17.3832 11.0833 16.6671 12.1492 16.6664 13.333V14.7914C16.6686 15.3402 16.8251 15.8773 17.118 16.3414C17.4108 16.8056 17.8282 17.1781 18.3226 17.4164C17.8851 18.2393 16.7705 19.3539 14.0309 19.6872C13.4833 18.8556 12.4238 18.5278 11.5022 18.9048C10.5807 19.2817 10.0547 20.2582 10.2469 21.2351C10.439 22.2121 11.2957 22.9164 12.2914 22.9164C12.6772 22.9142 13.0548 22.805 13.3822 22.6008C13.7096 22.3967 13.9738 22.1056 14.1455 21.7601C18.6143 21.2497 20.0414 18.9476 20.4893 17.5934C21.7011 17.2009 22.516 16.065 22.4997 14.7914V13.333C22.5047 12.1214 21.7575 11.0338 20.6247 10.6039ZM5.83303 14.7914C5.83303 15.2516 5.45994 15.6247 4.99968 15.6247C4.53943 15.6247 4.16638 15.2516 4.16638 14.7914V13.333C4.16554 13.223 4.18647 13.114 4.22798 13.0121C4.26948 12.9103 4.33072 12.8177 4.40819 12.7396C4.48565 12.6616 4.5778 12.5996 4.67933 12.5573C4.78085 12.515 4.88973 12.4933 4.99971 12.4933C5.10968 12.4933 5.21857 12.515 5.32009 12.5573C5.42161 12.5996 5.51376 12.6616 5.59123 12.7396C5.66869 12.8177 5.72994 12.9103 5.77144 13.0121C5.81294 13.114 5.83388 13.223 5.83303 13.333V14.7914ZM18.7497 13.333C18.7497 12.8728 19.1228 12.4997 19.583 12.4997C20.0433 12.4997 20.4164 12.8728 20.4164 13.333V14.7914C20.4164 15.2516 20.0433 15.6247 19.583 15.6247C19.1228 15.6247 18.7497 15.2516 18.7497 14.7914V13.333Z" fill="#ff7f00"></path></svg>
          </div>
        </div> */}
        <section className="mb-5 pb-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <AIBar />
                <div className="d-flex flex-wrap gap-4 justify-content-center ct_mt_35">
                  <div>
                    <div className="d-flex gap-1 align-items-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.75 10.3688L7.13125 8.75L6.25 9.63125L8.75 12.1313L13.75 7.13125L12.8688 6.25L8.75 10.3688Z" fill="#FF7F00" />
                        <path d="M10 18.75L6.14 16.6919C5.0395 16.1066 4.11919 15.2325 3.4779 14.1637C2.83661 13.0948 2.49854 11.8715 2.5 10.625V2.5C2.5 2.16848 2.6317 1.85054 2.86612 1.61612C3.10054 1.3817 3.41848 1.25 3.75 1.25H16.25C16.5815 1.25 16.8995 1.3817 17.1339 1.61612C17.3683 1.85054 17.5 2.16848 17.5 2.5V10.625C17.5015 11.8715 17.1634 13.0948 16.5221 14.1637C15.8808 15.2325 14.9605 16.1066 13.86 16.6919L10 18.75ZM3.75 2.5V10.625C3.74931 11.6448 4.02618 12.6456 4.55093 13.52C5.07568 14.3945 5.82853 15.1096 6.72875 15.5887L10 17.3331L13.2713 15.5894C14.1716 15.1102 14.9245 14.3949 15.4492 13.5204C15.974 12.6458 16.2508 11.6449 16.25 10.625V2.5H3.75Z" fill="#FF7F00" />
                      </svg>
                      <span className="ct_text_707070 ct_fs_15">{t("ai_discovery_banner.verified_properties")}</span>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex gap-1 align-items-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.66699 9.99967C1.66699 6.85717 1.66699 5.28551 2.64366 4.30967C3.62033 3.33384 5.19116 3.33301 8.33366 3.33301H11.667C14.8095 3.33301 16.3812 3.33301 17.357 4.30967C18.3328 5.28634 18.3337 6.85717 18.3337 9.99967V11.6663C18.3337 14.8088 18.3337 16.3805 17.357 17.3563C16.3803 18.3322 14.8095 18.333 11.667 18.333H8.33366C5.19116 18.333 3.61949 18.333 2.64366 17.3563C1.66783 16.3797 1.66699 14.8088 1.66699 11.6663V9.99967Z" stroke="#FF7F00" />
                        <path d="M5.83398 3.33301V2.08301M14.1673 3.33301V2.08301M2.08398 7.49967H17.9173" stroke="#FF7F00" strokeLinecap="round" />
                        <path d="M15 14.1667C15 14.3877 14.9122 14.5996 14.7559 14.7559C14.5996 14.9122 14.3877 15 14.1667 15C13.9457 15 13.7337 14.9122 13.5774 14.7559C13.4211 14.5996 13.3333 14.3877 13.3333 14.1667C13.3333 13.9457 13.4211 13.7337 13.5774 13.5774C13.7337 13.4211 13.9457 13.3333 14.1667 13.3333C14.3877 13.3333 14.5996 13.4211 14.7559 13.5774C14.9122 13.7337 15 13.9457 15 14.1667ZM15 10.8333C15 11.0543 14.9122 11.2663 14.7559 11.4226C14.5996 11.5789 14.3877 11.6667 14.1667 11.6667C13.9457 11.6667 13.7337 11.5789 13.5774 11.4226C13.4211 11.2663 13.3333 11.0543 13.3333 10.8333C13.3333 10.6123 13.4211 10.4004 13.5774 10.2441C13.7337 10.0878 13.9457 10 14.1667 10C14.3877 10 14.5996 10.0878 14.7559 10.2441C14.9122 10.4004 15 10.6123 15 10.8333ZM10.8333 14.1667C10.8333 14.3877 10.7455 14.5996 10.5893 14.7559C10.433 14.9122 10.221 15 10 15C9.77899 15 9.56702 14.9122 9.41074 14.7559C9.25446 14.5996 9.16667 14.3877 9.16667 14.1667C9.16667 13.9457 9.25446 13.7337 9.41074 13.5774C9.56702 13.4211 9.77899 13.3333 10 13.3333C10.221 13.3333 10.433 13.4211 10.5893 13.5774C10.7455 13.7337 10.8333 13.9457 10.8333 14.1667ZM10.8333 10.8333C10.8333 11.0543 10.7455 11.2663 10.5893 11.4226C10.433 11.5789 10.221 11.6667 10 11.6667C9.77899 11.6667 9.56702 11.5789 9.41074 11.4226C9.25446 11.2663 9.16667 11.0543 9.16667 10.8333C9.16667 10.6123 9.25446 10.4004 9.41074 10.2441C9.56702 10.0878 9.77899 10 10 10C10.221 10 10.433 10.0878 10.5893 10.2441C10.7455 10.4004 10.8333 10.6123 10.8333 10.8333ZM6.66667 14.1667C6.66667 14.3877 6.57887 14.5996 6.42259 14.7559C6.26631 14.9122 6.05435 15 5.83333 15C5.61232 15 5.40036 14.9122 5.24408 14.7559C5.0878 14.5996 5 14.3877 5 14.1667C5 13.9457 5.0878 13.7337 5.24408 13.5774C5.40036 13.4211 5.61232 13.3333 5.83333 13.3333C6.05435 13.3333 6.26631 13.4211 6.42259 13.5774C6.57887 13.7337 6.66667 13.9457 6.66667 14.1667ZM6.66667 10.8333C6.66667 11.0543 6.57887 11.2663 6.42259 11.4226C6.26631 11.5789 6.05435 11.6667 5.83333 11.6667C5.61232 11.6667 5.40036 11.5789 5.24408 11.4226C5.0878 11.2663 5 11.0543 5 10.8333C5 10.6123 5.0878 10.4004 5.24408 10.2441C5.40036 10.0878 5.61232 10 5.83333 10C6.05435 10 6.26631 10.0878 6.42259 10.2441C6.57887 10.4004 6.66667 10.6123 6.66667 10.8333Z" fill="#FF7F00" />
                      </svg>
                      <span className="ct_text_707070 ct_fs_15">{t("ai_discovery_banner.flexible_stays")}</span>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex gap-1 align-items-center">
                      <svg className="me-1" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.41797 8.05554V5.13888C5.41797 4.10748 5.82769 3.11833 6.557 2.38903C7.28631 1.65972 8.27546 1.25 9.30686 1.25C10.3383 1.25 11.3274 1.65972 12.0567 2.38903C12.786 3.11833 13.1957 4.10748 13.1957 5.13888V8.05554" stroke="#FF7F00" strokeLinecap="round" />
                        <path d="M2.5 8.05566H16.1111V16.8056C16.1111 17.3213 15.9063 17.8159 15.5416 18.1806C15.1769 18.5452 14.6824 18.7501 14.1667 18.7501H4.44444C3.92875 18.7501 3.43417 18.5452 3.06951 18.1806C2.70486 17.8159 2.5 17.3213 2.5 16.8056V8.05566Z" stroke="#FF7F00" strokeLinejoin="round" />
                        <path d="M11.7344 13.4033H11.7427V13.4117H11.7344V13.4033Z" stroke="#61739A" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                      <span className="ct_text_707070 ct_fs_15">{t("ai_discovery_banner.secure_payments")}</span>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex gap-1 align-items-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.5003 8.48367C16.242 5.83367 14.6753 1.66699 9.83369 1.66699C4.99201 1.66699 3.42533 5.83367 3.16701 8.48367C2.26076 8.82762 1.66299 9.69769 1.66701 10.667V11.8337C1.66701 13.1223 2.7117 14.167 4.00033 14.167C5.289 14.167 6.33369 13.1223 6.33369 11.8337V10.667C6.32947 9.71859 5.75369 8.86641 4.87533 8.50867C5.04201 6.97531 5.85869 3.33367 9.83369 3.33367C13.8087 3.33367 14.617 6.97531 14.7837 8.50867C13.9071 8.86719 13.3342 9.71996 13.3337 10.667V11.8337C13.3355 12.2727 13.4607 12.7024 13.6949 13.0737C13.9292 13.4451 14.2632 13.743 14.6587 13.9337C14.3087 14.592 13.417 15.4837 11.2253 15.7503C10.7872 15.0851 9.93963 14.8228 9.20236 15.1244C8.46514 15.426 8.04432 16.2071 8.19807 16.9887C8.35182 17.7702 9.03713 18.3337 9.83369 18.3337C10.1423 18.3319 10.4444 18.2446 10.7063 18.0812C10.9682 17.9179 11.1797 17.6851 11.317 17.4087C14.892 17.0003 16.0337 15.1587 16.392 14.0753C17.3614 13.7613 18.0134 12.8526 18.0003 11.8337V10.667C18.0044 9.69769 17.4066 8.82762 16.5003 8.48367ZM4.66701 11.8337C4.66701 12.2018 4.36854 12.5003 4.00033 12.5003C3.63213 12.5003 3.33369 12.2019 3.33369 11.8337V10.667C3.33302 10.579 3.34977 10.4918 3.38297 10.4103C3.41617 10.3288 3.46517 10.2547 3.52714 10.1923C3.58911 10.1298 3.66283 10.0803 3.74405 10.0464C3.82526 10.0126 3.91237 9.99521 4.00035 9.99521C4.08833 9.99521 4.17544 10.0126 4.25666 10.0464C4.33788 10.0803 4.41159 10.1298 4.47357 10.1923C4.53554 10.2547 4.58454 10.3288 4.61774 10.4103C4.65094 10.4918 4.66769 10.579 4.66701 10.667V11.8337ZM15.0003 10.667C15.0003 10.2988 15.2988 10.0003 15.667 10.0003C16.0352 10.0003 16.3337 10.2988 16.3337 10.667V11.8337C16.3337 12.2018 16.0352 12.5003 15.667 12.5003C15.2988 12.5003 15.0003 12.2019 15.0003 11.8337V10.667Z" fill="#FF7F00" />
                      </svg>
                      <span className="ct_text_707070 ct_fs_15">{t("ai_discovery_banner.support_24_7")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* footer section S */}
        <WebFooter />
      </div>
    </>
  );
};

export default Blogs;