import BlogCard from "../components/blog/BlogCard"
import { client } from "../lib/contentful"


async function getBlogItems() {
    const response = await client.getEntries({
        content_type: 'blog'
    })

    return response.items
}

export default async function Blog() {

    const blogData = await getBlogItems()
    // console.log(JSON.stringify(blogData, null, 2))
   

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {
            blogData.map(blog => (
                <BlogCard blog={blog} key={blog.sys.id} />
            ))
            
            }
            </div>
        </div>
    )
}
