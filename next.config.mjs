const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.com https://*.clerk.dev https://*.clerk.accounts.dev https://challenges.cloudflare.com https://lottie.host https://assets.lottiefiles.com;
  connect-src 'self' https://*.clerk.com https://*.clerk.dev https://*.clerk.accounts.dev https://*.clerk.services https://lottie.host https://assets.lottiefiles.com wss://*.clerk.com wss://*.clerk.dev;
  img-src * data: blob: https://img.clerk.com https://lottie.host https://assets.lottiefiles.com;
  style-src 'self' 'unsafe-inline';
  font-src 'self' data: blob:;
  frame-src 'self' https://*.clerk.com https://*.clerk.dev https://*.clerk.accounts.dev https://challenges.cloudflare.com https://lottie.host https://assets.lottiefiles.com;
  media-src 'self' data: blob:;
  worker-src 'self' blob:;
  form-action 'self';
`;

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["png.pngtree.com", "img.clerk.com"],
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
