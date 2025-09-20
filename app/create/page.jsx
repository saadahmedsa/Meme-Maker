"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const Generate = ({ searchParams }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  let text1 = useRef();
  let text2 = useRef();

  // Function to create the meme
  const Create = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=SaadShah1&password=helloqwerty&text0=${encodeURIComponent(
          text1.current?.value || ""
        )}&text1=${encodeURIComponent(text2.current?.value || "")}`,
        { method: "POST" }
      );

      const data = await res.json();
      if (data.success) {
        setImage(data.data.url);
      } else {
        setError("⚠️ Failed to generate meme. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  // Function to download the image
  const downloadImage = () => {
    if (image) {
      const link = document.createElement("a");
      link.href = image;
      link.download = "generated_meme.jpg";
      link.click();
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          🎨 Meme Generator
        </h1>
        <Link
          href={"/"}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition"
        >
          ⬅️ Go Home
        </Link>
      </div>

      {/* Template + Form */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Template Image */}
        <div className="flex justify-center">
          <div className="p-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
            <Image
              src={searchParams.url}
              width={350}
              height={350}
              alt="Template"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Meme Form */}
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            ✍️ Enter Meme Text
          </h2>
          <form onSubmit={Create} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Top Text
              </label>
              <input
                type="text"
                placeholder="Enter top text"
                ref={text1}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Bottom Text
              </label>
              <input
                type="text"
                placeholder="Enter bottom text"
                ref={text2}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-md hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
              ) : (
                "🚀 Generate Meme"
              )}
            </button>
          </form>

          {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}
        </div>
      </div>

      {/* Generated Meme */}
      {image && (
        <div className="flex flex-col items-center mt-12">
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              🎉 Your Meme
            </h2>
            <Image
              src={image}
              width={400}
              height={400}
              alt="Generated Meme"
              className="rounded-lg shadow-md"
            />
            <button
              onClick={downloadImage}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition"
            >
              ⬇️ Download Meme
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Generate;
