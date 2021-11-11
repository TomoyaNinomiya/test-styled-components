/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV == 'production';
const url = isProd ? '/demo/ninomiya/styled-components' : '';
module.exports = {
  reactStrictMode: true,
  assetPrefix: url,
  basePath: url,
  trailingSlash: true,
  env: {
    BASE_PATH: url,
    isProd: isProd
  }
}
