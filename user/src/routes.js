import { route, index } from "@react-router/dev/routes";

export default [
  // Root Redirect
  route("/", "routes/redirect.jsx"),

  // Dynamic Sitemap Route
  route("sitemap.xml", "routes/sitemap.jsx"),

  // Language Layout
  route(":lang", "routes/langLayout.jsx", [
    // Public Pages (SSR)
    index("shared/pages/index.jsx"),
    route("become-a-host", "shared/pages/become a host/BecomeHost.jsx"),
    route("properties", "shared/pages/properties/index.jsx"),
    route("l/:listing_id", "shared/pages/properties/PropertyDetails.jsx"),
    route("c/:city_slug", "shared/pages/properties/CityPage.jsx"),
    route("c/:city_slug/:neighborhood_slug", "shared/pages/properties/NeighborhoodPage.jsx"),
    route("blogs", "shared/pages/blogs/index.jsx"),
    route("blog-details/:slug", "shared/pages/blogs/BlogDetails.jsx"),
    route("help", "shared/pages/Help.jsx"),

    // Content Management
    route("terms-and-condotions", "shared/pages/content management/TermAndConditions.jsx"),
    route("privacy-policy", "shared/pages/content management/PrivacyPolicy.jsx"),
    route("cancellation-policy", "shared/pages/content management/CancellationPolicies.jsx"),
    route("marketing/:slug", "shared/pages/LandingTemplate.jsx"),

    // All other paths are fallback SPA
    route("*", "routes/spaGateway.jsx"),
  ]),
];
