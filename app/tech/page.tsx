import Image from "next/image";
import { client } from "../lib/contentful";

async function getBlogItems() {
    const response = await client.getEntries({
        content_type: 'blog'
    })

    return response.items
}


async function getTechItems() {
    const response = await client.getEntries({
        content_type: 'tech'
    }
    )

    return response.items
}

export default async function Tech() {

    const tech_items = await getTechItems()


    return (
        <div className="flex flex-col items-center" >
        <h3 className="text-3xl py-1 mt-10">Tech I Use</h3>
        <div className="flex flex-wrap justify-center items-center max-w-4xl">
            {tech_items.map(tech => {
                return (

                    <div className="text-center shadow-lg p-10 rounded-xl my-10 w-fit m-2  bg-gray-800"  key={tech.sys.id}>
                        <div className="w-24 h-24 relative">
                            <Image src={`https://${tech.fields.image.fields.file.url}` as string} fill 
                            sizes="33vw"
                            className="object-contain" alt={tech.fields.alt as string} />
                        </div>
                        <h1 className="text-white">{tech.fields.label as string}</h1>
                    </div> 
                    

                );
            })}
            
        </div>
    </div>
    )
}