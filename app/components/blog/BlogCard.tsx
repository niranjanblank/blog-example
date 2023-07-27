import Image from "next/image"
import Link from "next/link"

interface BlogProp {
    blog: any

}

const BlogCard:React.FC<BlogProp> = (props) => {
    const {title, thumbnail, slug} = props.blog.fields
    return (
        <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
        <Link
        className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
        href="#">
          <Image src={`https:${thumbnail.fields.file.url}`} alt="image movie banner" 
          width={500} height={500}
          className=" absolute inset-0 h-full object-cover object-center transition duration-200 group-hover:scale-110"/>
        </Link>
        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
              <Link  
              className="transition text-gray duration-100 hover:bg-gradient-to-r hover: from-purple-500 hover:to-blue-500 hover:text-transparent hover: bg-clip-text "
              href={`/blog/${slug}`}>{title}</Link>
          </h2>
          <p 
          className="text-gray-500 line-clamp-3">
          </p>
        </div>
      </div>
    )
}

export default BlogCard