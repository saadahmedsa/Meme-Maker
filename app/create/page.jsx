// "use client"
// import React, { useState, useEffect, useRef } from 'react'
// import Image from 'next/image';
// import Link from 'next/link';

// const Generate = ({searchParams})=> {

 

//   const [image,setImage] = useState(null)
//   const [load,setload] = useState(false)
  
  
 
//   let text1 = useRef()
//   let text2 = useRef()

//  const Create = async (event) =>{
//   event.preventDefault();
//   setload(true)

//   const data = await fetch(`https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=SaadShah1&password=helloqwerty&text0=${text1.current.value}&text1=${text2.current.value}
//     `, {
//     method: 'POST',
// }); 
//    const respone = await data.json()
//    console.log(respone);
//    setImage(respone.data.url)
//    setload(false)
   
//  }


 

//   return (
//     <>
//     <div className='flex justify-around'>
//      <h1 className='text-3xl'>Create Meme</h1>
//      <button className="m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
//     <Link href={"/"}>Go to Home</Link>
//       </button>

//     </div>
//       <div className='flex justify-evenly flex-wrap mt-4 border p-5'>
//         <Image src={searchParams.url} width={200} height={200} alt='no-image ' />
//        <div>
//         <h1 className='text-3xl'>Enter Meme Text</h1>
//        {
//          (
//           <div className='flex justify-center gap-5 mt-5 flex-wrap'>
//        <form onSubmit={Create}>
//        <input
//               type="text"
//               placeholder="Type here"
//               className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" ref={text1} /> <br /> <br />
//             <input
//               type="text"
//               placeholder="Type here"
//               className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" ref={text2}  /> <br /> <br />
//             <button className='m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600' type='submit'>{load ? "loading" : "Generate"}</button>
//        </form>
//           </div>
//         ) 
//       }
//        </div>
//       </div>
     
//       <div className='flex justify-center mt-4'>
//       {image ? <Image src={image} width={400} height={400} alt="loading" /> :null}

//       </div>
//     </>
//   )
// } 

// export default Generate

"use client"
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Generate = ({ searchParams }) => {
  const [image, setImage] = useState(null);
  const [load, setLoad] = useState(false);

  let text1 = useRef();
  let text2 = useRef();

  // Function to create the meme
  const Create = async (event) => {
    event.preventDefault();
    setLoad(true);

    // API request to generate meme
    const data = await fetch(
      `https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=SaadShah1&password=helloqwerty&text0=${text1.current.value}&text1=${text2.current.value}`,
      {
        method: 'POST',
      }
    );
    const response = await data.json();
    console.log(response);
    setImage(response.data.url);
    setLoad(false);
  };

  // Function to download the image
  const downloadImage = () => {
    if (image) {
      // Create an anchor tag dynamically
      const link = document.createElement('a');
      link.href = image; // Set the image URL as the href
      link.download = 'generated_meme.jpg'; // Specify the default download file name
      link.click(); // Trigger the download by simulating a click
    }
  };

  return (
    <>
      <div className="flex justify-around">
        <h1 className="text-3xl">Create Meme</h1>
        <button className="m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
          <Link href={"/"}>Go to Home</Link>
        </button>
      </div>
      <div className="flex justify-evenly flex-wrap mt-4 border p-5">
        <Image src={searchParams.url} width={200} height={200} alt="no-image" />
        <div>
          <h1 className="text-3xl">Enter Meme Text</h1>

          <div className="flex justify-center gap-5 mt-5 flex-wrap">
            <form onSubmit={Create}>
              <input
                type="text"
                placeholder="Type here"
                className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ref={text1}
              />
              <br />
              <br />
              <input
                type="text"
                placeholder="Type here"
                className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ref={text2}
              />
              <br />
              <br />
              <button
                className="m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                type="submit"
              >
                {load ? "loading" : "Generate"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Display generated meme image */}
      <div className="flex justify-center mt-4">
        {image ? <Image src={image} width={400} height={400} alt="generated meme" /> : null}
      </div>

      {/* Download Button */}
      {image && (
        <div className="flex justify-center mt-4">
          <button
            className="m-2 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
            onClick={downloadImage}
          >
            Download Meme
          </button>
        </div>
      )}
    </>
  );
};

export default Generate;
