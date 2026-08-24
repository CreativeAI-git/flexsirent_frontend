import { useLoaderData, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import axios from "axios";
import WebHeader from "../../layout/WebHeader";
import WebFooter from "../../layout/WebFooter";
import AIBar from "@/components/AIBar";
import { webPath } from "../../../user/routes";
import HeroBanner from "../../components/herobanner";
import Details from "../../components/pages/blogs/Details";
import { parseIdFromSlug } from "../../../shared/utils/slugs";
import { BASE_URL, blogsAPI } from "../../../shared/routes/apiURLs";
import { getFallbackBlogs } from "../../../shared/utils/mockBlogs";

export async function loader({ params }) {
  const { slug } = params;
  const lang = params.lang || "en";
  const blogId = parseIdFromSlug(slug);
  if (!blogId) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    let blogs = [];
    try {
      const res = await axios.get(`${BASE_URL}${blogsAPI}`);
      blogs = res.data?.data || [];
    } catch (apiErr) {
      console.warn("[BLOG DETAILS] API failed, using fallback blogs:", apiErr);
    }
    const allBlogs = [...blogs, ...getFallbackBlogs(lang)];
    const blogData = allBlogs.find(b => String(b.blog_id) === String(blogId));
    if (!blogData) {
      throw new Response("Not Found", { status: 404 });
    }
    return { blogData };
  } catch (error) {
    throw new Response("Not Found", { status: 404 });
  }
}

export function meta({ data, params }) {
  if (!data || !data.blogData) {
    return [{ title: "Blog Details | Flexsirent" }];
  }
  const blog = data.blogData;
  const lang = params.lang || "en";
  const url = `https://flexsirent.com/${lang}/blog-details/${params.slug}`;
  const plainTextDescription = blog.blog_content?.replace(/<[^>]*>/g, '').substring(0, 150) || "Read blog post on Flexsirent.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "url": url,
    "datePublished": blog.created_at || "",
    "description": plainTextDescription,
    "image": blog.blogImage?.[0]?.image || "",
    "author": {
      "@type": "Organization",
      "name": "Flexsirent"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Flexsirent",
      "logo": {
        "@type": "ImageObject",
        "url": "https://flexsirent.com/assets/img/logo.svg"
      }
    }
  };

  return [
    { title: `${blog.title} | Flexsirent` },
    { name: "description", content: plainTextDescription },
    { property: "og:title", content: blog.title },
    { property: "og:description", content: plainTextDescription },
    { property: "og:image", content: blog.blogImage?.[0]?.image || "" },
    { property: "og:url", content: url },
    { tagName: "link", rel: "canonical", href: url },
    { "script:ld+json": jsonLd }
  ];
}

const BlogDetails = () => {
  const { t } = useTranslation();
  const loaderData = useLoaderData();
  const blogData = loaderData?.blogData || {};

  return (
    <>
      {/* Header Section S */}
      <WebHeader />

      <HeroBanner
        data={blogData}
        title={blogData?.title || t("properties_page.blog_details")}
        breadcrumb={[
          { label: t("properties_page.breadcrumbs.home"), link: webPath?.Home },
          { label: t("properties_page.blog_details"), isCurrent: true },
        ]}
      />

      <Details blogData={blogData} />

      {/* <div className="ct_custom_sticky_sec" onClick={() => document.getElementById("ai-bar-section")?.scrollIntoView({ behavior: "smooth" })}>
        <div>
          <svg width="36" height="36" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.6247 10.6039C20.3018 7.29136 18.3434 2.08301 12.2914 2.08301C6.23928 2.08301 4.28093 7.29136 3.95803 10.6039C2.82522 11.0338 2.078 12.1214 2.08303 13.333V14.7914C2.08303 16.4022 3.38889 17.708 4.99968 17.708C6.61052 17.708 7.91638 16.4021 7.91638 14.7914V13.333C7.91111 12.1475 7.19138 11.0823 6.09343 10.6351C6.30178 8.71841 7.32263 4.16636 12.2914 4.16636C17.2601 4.16636 18.2705 8.71841 18.4789 10.6351C17.3832 11.0833 16.6671 12.1492 16.6664 13.333V14.7914C16.6686 15.3402 16.8251 15.8773 17.118 16.3414C17.4108 16.8056 17.8282 17.1781 18.3226 17.4164C17.8851 18.2393 16.7705 19.3539 14.0309 19.6872C13.4833 18.8556 12.4238 18.5278 11.5022 18.9048C10.5807 19.2817 10.0547 20.2582 10.2469 21.2351C10.439 22.2121 11.2957 22.9164 12.2914 22.9164C12.6772 22.9142 13.0548 22.805 13.3822 22.6008C13.7096 22.3967 13.9738 22.1056 14.1455 21.7601C18.6143 21.2497 20.0414 18.9476 20.4893 17.5934C21.7011 17.2009 22.516 16.065 22.4997 14.7914V13.333C22.5047 12.1214 21.7575 11.0338 20.6247 10.6039ZM5.83303 14.7914C5.83303 15.2516 5.45994 15.6247 4.99968 15.6247C4.53943 15.6247 4.16638 15.2516 4.16638 14.7914V13.333C4.16554 13.223 4.18647 13.114 4.22798 13.0121C4.26948 12.9103 4.33072 12.8177 4.40819 12.7396C4.48565 12.6616 4.5778 12.5996 4.67933 12.5573C4.78085 12.515 4.88973 12.4933 4.99971 12.4933C5.10968 12.4933 5.21857 12.515 5.32009 12.5573C5.42161 12.5996 5.51376 12.6616 5.59123 12.7396C5.66869 12.8177 5.72994 12.9103 5.77144 13.0121C5.81294 13.114 5.83388 13.223 5.83303 13.333V14.7914ZM18.7497 13.333C18.7497 12.8728 19.1228 12.4997 19.583 12.4997C20.0433 12.4997 20.4164 12.8728 20.4164 13.333V14.7914C20.4164 15.2516 20.0433 15.6247 19.583 15.6247C19.1228 15.6247 18.7497 15.2516 18.7497 14.7914V13.333Z" fill="#ff7f00"></path></svg>
        </div>
      </div> */}
      <section className="mb-5 ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <AIBar placeholder={t("ai_discovery_banner.placeholder")} />
            </div>
          </div>
        </div>
      </section>

      {/* footer section S */}
      <WebFooter />
    </>
  );
};

export default BlogDetails;
