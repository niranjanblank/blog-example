import Link from "next/link"
import { client } from "../lib/contentful"
import Image from "next/image"

async function getPortfolioItems() {
    const response = await client.getEntries({
        content_type: 'portfolioProject'
    })
    return response.items
}


export default async function Portfolio() {

    const portfolio_items = await getPortfolioItems()
    // console.log(JSON.stringify(portfolio_items, null, 2))
    return (
        <>
          <div className='flex flex-col items-center'>
            <h3 className="text-3xl py-1 dark:text-white">Portfolio</h3>
            <p className="text-md py-2 leading-8 text-gray-800 text-center dark:text-gray-400 md:text-xl mb-4">Some of my works highlighting my skills are here</p>
            </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
           {
            portfolio_items.map(portfolio => {
                return (
                    <div className='shadow-lg rounded-lg p-4 relative
                    transition ease-in-out hover:-translate-y-1  hover:scale-105 dark:bg-gray-800'>
                   {/* link for github repo */}
                   <Link className="absolute text-white right-6 top-6 w-10 h-10 bg-gray-500 rounded-full flex justify-center items-center cursor-pointer
                   bg-gradient-to-r from-indigo-500 to-indigo-900
                   transition ease-in-out hover:-translate-y-1  hover:scale-105
                   " 
                   target="_blank"
                   href={portfolio.fields.link as string}
                   >
                       <button className="w-full">Github</button>
                   </Link>
                    <Image src={`https://${portfolio.fields.src.fields.file.url}`} 
                    width={1920}
                    height={1080}
                    alt={portfolio.fields.alt as string} className='rounded-md w-full'/>
                   <div>
                       <h1 className="text-3xl font-bold my-4 dark:text-white">{portfolio.fields.title as string}</h1>
                       <p className="text-black dark:text-gray-400">
                       {portfolio.fields.desc as string}
                       </p>
                       <div className="my-3 flex flex-wrap">
                           {portfolio.fields.tags.map((tag: any)=> {
                               return (
                                   <span className={`${tag.color as string} mr-2`} 
                                   key={`${portfolio.fields.title as string}-${tag.tag}`}
                                   >{`#${tag.tag}`}</span>
                               )
                           })}
           
                       </div>
                   </div>
          
                </div>
                )
            })
           }
        </div>
        </>
    )
}