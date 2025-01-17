import nextra from "nextra";
import type { NextConfig } from "next";
import i18nConfig from "./src/config/i18n";

const withNextra = nextra({
  defaultShowCopyCode: true,
  latex: true,
  contentDirBasePath: "/",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: i18nConfig.map((x) => x.locale),
    defaultLocale: i18nConfig[0].locale,
  },
  webpack(config) {
    // rule.exclude doesn't work starting from Next.js 15
    const { test: _test, ...imageLoaderOptions } = config.module.rules.find(
      (rule: any) => rule.test?.test?.(".svg"),
    );
    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /svgr/,
          use: ["@svgr/webpack"],
        },
        imageLoaderOptions,
      ],
    });
    return config;
  },
};

export default withNextra(nextConfig);
