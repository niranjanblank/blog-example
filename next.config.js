/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["image.tmdb.org", "images.ctfassets.net"]
    },
    experimental :{
        serverActions: true
    }
}

module.exports = nextConfig
