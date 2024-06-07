/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"],
    // vercelで画像を正しく表示するために必要
    disableStaticImages: true,
  },
}

module.exports = nextConfig
