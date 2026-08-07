import type { SeoPageTemplate } from "../types";
import { about } from "./about";
import { blog } from "./blog";
import { brands } from "./brands";
import { categories } from "./categories";
import { comparison } from "./comparison";
import { configurator } from "./configurator";
import { contact } from "./contact";
import { countries } from "./countries";
import { dashboard } from "./dashboard";
import { developerHub } from "./developer-hub";
import { faq } from "./faq";
import { home } from "./home";
import { industries } from "./industries";
import { privacy } from "./privacy";
import { products } from "./products";
import { resources } from "./resources";
import { rfq } from "./rfq";
import { services } from "./services";
import { solutions } from "./solutions";
import { technology } from "./technology";
import { terms } from "./terms";

export type StaticRoute =
  | "home"
  | "about"
  | "blog"
  | "brands"
  | "categories"
  | "services"
  | "solutions"
  | "industries"
  | "comparison"
  | "terms"
  | "privacy"
  | "products"
  | "contact"
  | "rfq"
  | "resources"
  | "faq"
  | "technology"
  | "countries"
  | "developer-hub"
  | "configurator"
  | "dashboard";

export const STATIC_PAGE_TEMPLATES: Record<StaticRoute, SeoPageTemplate> = {
  home,
  about,
  blog,
  brands,
  categories,
  services,
  solutions,
  industries,
  comparison,
  terms,
  privacy,
  products,
  contact,
  rfq,
  resources,
  faq,
  technology,
  countries,
  "developer-hub": developerHub,
  configurator,
  dashboard,
};
