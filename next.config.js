/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ocdn.eu',
        port: '',
        pathname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

// module: {
//   rules: [
//     {
//       test: /\.svg/,
//       type: 'asset/resource',
//     },
//   ],
// },

module.exports = nextConfig
