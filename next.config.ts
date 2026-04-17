import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const isUserSite = repoName.endsWith(".github.io");
const basePath = isGithubActions && repoName && !isUserSite ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      new URL("https://picsum.photos/**"),
    ],
  },
  output: "export",
  basePath,
  trailingSlash: true,
};

export default nextConfig;
