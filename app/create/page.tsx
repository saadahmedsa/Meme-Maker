"use client"
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Generate = ({searchParams}: {searchParams: {id: string; url: string ; box:Number}}) => {

 

  const [box, setbox] =  useState(searchParams.box)
  const [image,setImage] = useState<string | null>(null)
  
  
 
  let text1 = useRef<(HTMLInputElement)>(null)
  let text2 = useRef<(HTMLInputElement)>(null)
  let text3 = useRef<(HTMLInputElement)>(null)
  let text4 = useRef<(HTMLInputElement)>(null)
   
 const Create = async (event: React.FormEvent<HTMLFormElement>) =>{
  event.preventDefault();

  const data = await fetch(`https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=SaadShah1&password=helloqwerty&text0=${text1.current?.value}&text1=${text2.current?.value}&text2=${text3.current?.value}&text3=${text4.current?.value}
    `, {
    method: 'POST',
}); 
   const respone = await data.json()
   console.log(respone);
   setImage(respone.data.url)
   
 }


  useEffect(() => {
    setbox(searchParams.box);
  }, []);

  return (
    <>
    <div className='flex justify-around'>
     <h1 className='text-3xl'>Create Meme</h1>
     <button className="m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
    <Link href={"/"}>Go to Home</Link>
      </button>

    </div>
      <div className='flex justify-evenly flex-wrap mt-4 border p-5'>
        <Image src={searchParams.url} width={200} height={200} alt='no-image ' />
       <div>
        <h1 className='text-3xl'>Enter Meme Text</h1>
       {
        box == 2 ? (
          <div className='flex justify-center gap-5 mt-5 flex-wrap'>
       <form onSubmit={Create}>
       <input
              type="text"
              placeholder="Type here"
              className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" ref={text1} /> <br /> <br />
            <input
              type="text"
              placeholder="Type here"
              className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" ref={text2}  /> <br /> <br />
            <button className='m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600' type='submit'>Generate Meme</button>
       </form>
          </div>
        ) : box == 3 ? (
          <div className='flex justify-center gap-5 mt-5'> 
            <form onSubmit={Create}>
       <input
              type="text"
              placeholder="Type here"
              className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" ref={text1} /> <br /> <br />
            <input
              type="text"
              placeholder="Type here"
              className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" ref={text2}  /> <br /> <br />
            <input
              type="text"
              placeholder="Type here"
              className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" ref={text3}  /> <br /> <br />
            <button className='m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600' type='submit'>Generate Meme</button>
       </form>
          </div>
        ) : box == 4 ? (
          <div className='flex justify-center gap-5 mt-5'>
           <form onSubmit={Create}>
       <input
              type="text"
              placeholder="Type here"
              className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" ref={text1} /> <br /> <br />
            <input
              type="text"
              placeholder="Type here"
              className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" ref={text2}  /> <br /> <br />
            <input
              type="text"
              placeholder="Type here"
              className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" ref={text3}  /> <br /> <br />
            <input
              type="text"
              placeholder="Type here"
              className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" ref={text4}  /> <br /> <br />
            <button className='m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600' type='submit'>Generate Meme</button>
       </form>
          </div>
        ) : (
          <div className='text-center'>Loading...</div>
        )
      }
       </div>
      </div>
     
      <div className='flex justify-center mt-4'>
      {image ? <Image src={image} width={200} height={200} alt="loading" /> :null}

      </div>
    </>
  )
} 

export default Generate