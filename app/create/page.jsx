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
          text1.current.value
        )}&text1=${encodeURIComponent(text2.current.value)}`,
        { method: "POST" }
      );

      const data = await res.json();
      if (data.success) {
        setImage(data.data.url);
      } else {
        setError("Failed to generate meme. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">🎨 Create Meme</h1>
        <Link
          href={"/"}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Go Home
        </Link>
      </div>

      {/* Template + Form */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Template Image */}
        <div className="flex justify-center">
          <Image
            src={searchParams.url}
            width={300}
            height={300}
            alt="Template"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Meme Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Enter Meme Text</h2>
          <form onSubmit={Create} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Top Text
              </label>
              <input
                type="text"
                placeholder="Enter top text"
                ref={text1}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition w-full flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
              ) : (
                "Generate Meme"
              )}
            </button>
          </form>

          {error && (
            <p className="text-red-500 mt-3 font-medium">{error}</p>
          )}
        </div>
      </div>

      {/* Generated Meme */}
      {image && (
        <div className="flex flex-col items-center mt-10">
          <h2 className="text-xl font-bold mb-4">Your Meme</h2>
          <Image
            src={image}
            width={400}
            height={400}
            alt="Generated Meme"
            className="rounded-lg shadow-lg"
          />
          <button
            onClick={downloadImage}
            className="mt-5 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            ⬇️ Download Meme
          </button>
        </div>
      )}
    </div>
  );
};

export default Generate;
