const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://magnetic-rattler-52.clerk.accounts.dev https://challenges.cloudflare.com https://lottie.host https://assets.lottiefiles.com;
  connect-src 'self' https://magnetic-rattler-52.clerk.accounts.dev https://lottie.host https://assets.lottiefiles.com;
  img-src * data: blob: https://lottie.host https://assets.lottiefiles.com;
  worker-src 'self' blob:;
  style-src 'self' 'unsafe-inline';
  frame-src 'self' https://challenges.cloudflare.com https://lottie.host https://assets.lottiefiles.com;
  form-action 'self';
`;

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["png.pngtree.com", "img.clerk.com"], // add all external sources you use
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
