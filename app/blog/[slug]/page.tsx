import { client } from "@/app/lib/contentful"

// get data based on slug
async function getBlog(slug: string) {
    const response = await client.getEntries({
        content_type: 'blog',
        'fields.slug': slug
    })

    return response.items[0]
}

export default async function BlogDetails(
    {params}:{
        params: {
            slug: string
        }
    }
){
    const blog = await getBlog(params.slug)
    console.log(blog)
    return (
        <>
        {params.slug}
        </>
    )
}