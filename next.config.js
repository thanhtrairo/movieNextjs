/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'demofree.sirv.com', 'www.gravatar.com', 'encrypted-tbn0.gstatic.com', 'lamvt.vn'],
  },
  i18n,
}
