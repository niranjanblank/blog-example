
import { Movie } from "@/app/interfaces"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

async function getData(id:string) {
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const data = await  fetch(url,{headers: 
        {
        accept: 'application/json',
        Authorization: process.env.ACCESS as string
    },
    next: {
        revalidate: 10,
    }
})
    return data.json()
}



export default async function Movie({params, children}:
    {
        params: {id: string},
        children: ReactNode
    }){
    const data: Movie = await getData(params.id)

    return (
        <div className="min-h-screen p-10">
            <div className="h-[40vh] relative">
                <Image
                alt="Image of movie"
                className="object-cover w-full rounded-lg"
                src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
                fill
                />
            </div>
            <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>
            <div className="flex gap-x-10 mt-10">
                <div className="w-1/2 font-medium bg-gray-100 p-5">
                <h1>
                    <span >Homepage:
                    <Link href={data.homepage}
                    target="_blank"
                    className="underline italic pl-2"
                    >Link</Link></span>
                </h1>
                <h1>
                    <span>Original Language: {data.original_language}</span>
                </h1>
                <hr className="my-2"/>
                <p>{data.overview}</p>
                <hr className="my-2"/>
                <h1>
                    <span>Release Date: {data.release_date}</span>
                </h1>
                </div>
                <div className="w-1/2 font-medium bg-gray-100 p-5"> 
                {children}
                </div>
            </div>
        </div>
    )
}