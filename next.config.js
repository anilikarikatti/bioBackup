/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['user-and-patient-pics.s3.amazonaws.com',"user-and-patient-pics.s3-accelerate.amazonaws.com"],
  },

  // images1: {
  // domains:["user-and-patient-pics.s3-accelerate.amazonaws.com"]

  // },

}

module.exports = nextConfig

