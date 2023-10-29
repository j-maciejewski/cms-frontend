/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '10.0.10.2',
        port: '3001',
        pathname: '/images/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
          },
        },
      ],
    })
    return config
  },
  rewrites: () => {
    return [
      {
        source: '/api',
        destination: 'http://10.0.10.2:3001',
      },
      {
        source: '/api/:path*',
        destination: 'http://10.0.10.2:3001/:path*',
      },
    ]
  },
}

module.exports = nextConfig
