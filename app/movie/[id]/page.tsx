export const dynamic = "force-dynamic";


import { db } from "@/app/db"
import { revalidatePath } from "next/cache";


async function getData(id: string) {
    const data = await db.comment.findMany({
        where: {
            movieId: id
        },
        orderBy: {
            createdAt: "desc",
        }
    })

    return data
}

async function postData(formData: FormData){
    "use server";

    const data = await db.comment.create({
        data: {
            message: formData.get('comment') as string,
            movieId: formData.get("id") as string,
        }
    })

    revalidatePath('/movie/[id]')
}


export default async function Page({
    params
}:{
    params: {
        id: string
    }
}) {

    const data = await getData(params.id)

    return (
        <div className="rounded-lg border p-3">
            <h1 className="text-xl font-semibold mb-5">Your Opinion</h1>
            <div>
                <form action={postData}>
                    <textarea 
                    name="comment" 
                    placeholder="Your Comment"
                    className="w-full border-teal-500 rounded-lg p-2">
                    </textarea>
                    <input type="hidden" name="id" value={params.id}/>
                    <button type="submit" className="bg-teal-500 px-4 py-2 rounded-lg text-white">Add Comment</button>
                </form>
            <div className="mt-5 flex flex-col gap-y-3"> 
            {
                data.map(post=>{
                    return (
                            <p>
                                {post.message}
                            </p>
                    )
                })
            }
            </div>
            </div>
        </div>
    )
}
