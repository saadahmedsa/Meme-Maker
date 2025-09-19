// "use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async () => {
  let memes = [];
  let error = null;

  try {
    const res = await fetch("https://api.imgflip.com/get_memes", {
      cache: "no-store", // ensures fresh data
    });
    const data = await res.json();
    memes = data.data.memes.filter((item: any) => item.box_count === 2);
  } catch (err) {
    error = "Failed to load memes 😢. Please try again later.";
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-5xl md:text-6xl font-bold mb-10">
         Meme Maker
      </h1>

      {error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {memes.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              {/* Meme Image */}
              <div className="relative h-60 w-full">
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Meme Name */}
              <div className="p-4 flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {item.name}
                </h2>

                <Link
                  href={{
                    pathname: "/create",
                    query: {
                      id: item.id,
                      url: item.url,
                      box: item.box_count,
                    },
                  }}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-center"
                >
                  Create Meme
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
