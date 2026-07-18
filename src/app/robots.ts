import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://servchip.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/configurator/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
