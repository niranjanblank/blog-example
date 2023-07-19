import Link from "next/link";
import { Trending } from "./interfaces";
import Image from "next/image";



const getData = async () => {

  const headers = {
      accept: 'application/json',
      Authorization: process.env.ACCESS as string
  }

  const url = 'https://api.themoviedb.org/3/trending/movie/day';

  const data = await fetch(url , {
    headers, 
    next: {
    revalidate: 10
  }
},
    
    )
  
  return data.json()
}


export default async function Home() {
  const data: Trending = await getData()
  return (
  <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 mb:mb-6 lg:text-3xl">Trending Movies</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                    {data.results.map((item )=> {
                        return (
                            <div className="flex flex-col overflow-hidden rounded-lg border bg-white" key={item.id}>
                              <Link
                              className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
                              href={`/movie/${item.id}`}>
                                <Image src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="image movie banner" 
                                width={500} height={500}
                                className=" absolute inset-0 h-full object-cover object-center transition duration-200 group-hover:scale-110"/>
                              </Link>
                              <div className="flex flex-1 flex-col p-4 sm:p-6">
                                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                                    <Link  
                                    className="transition text-gray duration-100 hover:bg-gradient-to-r hover: from-purple-500 hover:to-blue-500 hover:text-transparent hover: bg-clip-text "
                                    href={`/movie/${item.id}`}>{item.title}</Link>
                                </h2>
                                <p 
                                className="text-gray-500 line-clamp-3">
                                  {item.overview}
                                </p>
                              </div>
                            </div>
                        )
                        }
                    )}
                </div>
          </div>
      </div>
  </div>
  )
}
