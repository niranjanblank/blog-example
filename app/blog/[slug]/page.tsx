import { client } from "@/app/lib/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from '@contentful/rich-text-types';
import Image from "next/image"

// get data based on slug
async function getBlog(slug: string) {
    const response = await client.getEntries({
        content_type: 'blog',
        'fields.slug': slug
    })

    return response.items[0]
}

   // Add render options for unordered and ordered lists
const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        return (
          <img
            src={node.data.target.fields.file.url}
            alt={node.data.target.fields.title}
          />
        );
      },
      [BLOCKS.UL_LIST]: (node: any, children: any) => <ul >{children}</ul>,
      [BLOCKS.OL_LIST]: (node: any, children: any) => <ol >{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li >{children}</li>,
      [BLOCKS.QUOTE]: (node: any, children: any) => <blockquote >{children}</blockquote>,
      // Add additional node types as needed
    },
  };

export default async function BlogDetails(
    {params}:{
        params: {
            slug: string
        }
    }
){
    const blog = await getBlog(params.slug)
    const {thumbnail, title, content} = blog.fields


    return (
        <div className="flex flex-col items-center p-10">
            <Image src={`https:${thumbnail.fields.file.url}`}
            width={thumbnail.fields.file.details.image.width}
            height={400}
            alt="image of blog"
            className="rounded-lg w-3/4 h-2/4"
            />
            <div className="w-3/4 prose">
                {documentToReactComponents(content, options)}
            </div>
            
        </div>
    )
}