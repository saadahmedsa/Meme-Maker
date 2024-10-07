// "use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = async() => {

  const data = await fetch("https://api.imgflip.com/get_memes"
  )
const response = await data.json()
// console.log(response.data.memes);


return (
  <div>
    <h1 className='text-center text-6xl m-4 font-bold'>Meme Maker</h1>
    <div className='flex flex-wrap justify-between gap-10'>
      {response.data.memes.map((item :any) => {
        return (
          <div key={item.id} >
              <Image src={item.url} alt={item.name} width={300} height={300}  style={{height:300}}/>
            <button className="m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
              <Link href={
                {
                  pathname:"/create",
                  query:{
                    id :item.id,
                    url :item.url,
                    box : item.box_count,
                  }
                }
              }>Create Meme</Link>
            </button>
          </div>
        );
      })}
    </div>
  </div>
);
}

export default Page