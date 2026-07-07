import type { Configuration } from "lint-staged";

const config: Configuration = {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md}": ["prettier --write"],
};

export default config;
