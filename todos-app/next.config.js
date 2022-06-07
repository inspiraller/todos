/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/todos',
        permanent: false
      }
    ];
  }
};
