import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/demo"],
      },
    ],
    sitemap: "https://www.radheyramansteelsuppliers.in/sitemap.xml",
    host: "https://www.radheyramansteelsuppliers.in",
  };
}
