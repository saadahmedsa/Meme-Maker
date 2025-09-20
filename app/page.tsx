"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [memes, setMemes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes", {
          cache: "no-store",
        });
        const data = await res.json();
        setMemes(data.data.memes.filter((item: any) => item.box_count === 2));
      } catch (err) {
        setError("Failed to load memes 😢. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMemes();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-5xl md:text-6xl font-extrabold mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Meme Maker 🎭
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="h-72 w-full rounded-xl bg-gray-200 animate-pulse"
            ></div>
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {memes.map((item: any) => (
            <div
              key={item.id}
              className="group bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Meme Image */}
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Meme Info */}
              <div className="p-4 flex flex-col justify-between">
                <h2 className="text-lg font-bold text-gray-800 truncate group-hover:text-purple-600 transition">
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
                  className="mt-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 text-center"
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
