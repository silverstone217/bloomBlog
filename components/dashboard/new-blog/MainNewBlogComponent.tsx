"use client";
import React, { useEffect, useState } from "react";
import Tiptap from "./TipTap";
import Image from "next/image";
import { genreData } from "@/utils/data";

const MainNewBlogComponent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [genre, setGenre] = useState("");
  const [tags, setTags] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleContentChange = (reason: any) => {
    setContent(reason);
  };

  return (
    <form className="w-full pb-4">
      <h1 className="text-3xl font-light tracking-wide">New Blog Post</h1>

      {/* separators */}
      <div className="py-4" />
      {/* title */}
      <div className="grid gap-1.5">
        <label htmlFor="title" className="block font-medium text-gray-700">
          Title
        </label>
        <input
          className=" focus:ring-blue-500  focus:border-blue-500 block w-full 
           border-gray-700 border rounded-md h-12 px-2 bg-transparent"
          type="text"
          placeholder="Enter title..."
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          pattern="[A-Za-z0-9\s]+"
          title="Title should only contain alphanumeric characters and spaces"
          minLength={3}
          maxLength={200}
        />
      </div>

      {/* separators */}
      <div className="py-4" />
      {/* image */}
      <p className="block font-medium text-gray-700 mb-1.5">Cover blog</p>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 
          border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 
           dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {!image ? (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  Click to upload cover image
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                JPEG, PNG, JPG or GIF (MAX. 1200x1400px)
              </p>
            </div>
          ) : (
            <Image
              className="object-cover w-full h-full rounded-lg"
              src={URL.createObjectURL(image)}
              alt="Uploaded image"
              width={1400}
              height={1200}
              priority
            />
          )}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".jpg,.png,.gif, .jpeg"
            onChange={(e) => {
              const file = e.target.files;
              if (file) setImage(file[0]);
              else setImage(null);
            }}
          />
        </label>
      </div>

      {/* separators */}
      <div className="py-4" />

      {/* content tiptap */}
      <Tiptap content={content} onChange={handleContentChange} />

      {/* separators */}
      <div className="py-4" />

      {/* genre */}
      <div className="grid gap-1.5">
        <label htmlFor="genre" className="block font-medium text-gray-700">
          Genre
        </label>
        <select
          className="focus:ring-blue-500 focus:border-blue-500 block w-full 
           border-gray-700 border rounded-md h-12 px-2 bg-transparent overflow-x-hidden overflow-y-auto"
          id="genre"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
          title="Select Genre of post"
          disabled={isLoading}
        >
          <option disabled value="" className="text-gray-500">
            Select genre
          </option>
          {genreData.map((gnr, i) => (
            <option key={gnr} value={gnr} className="capitalize">
              {gnr}
            </option>
          ))}
        </select>
      </div>
      {/* separators */}
      <div className="py-4" />
      {/* tags */}
      <div className="grid gap-1.5">
        <label
          htmlFor="tags"
          className="block font-medium line-clamp-1 text-gray-700"
        >
          Tags{" "}
          <span className="opacity-65 text-sm">
            #football #dragonBallZ #MCU #spiderman
          </span>
        </label>
        <input
          className="focus:ring-blue-500 focus:border-blue-500 block w-full 
               border-gray-700 border rounded-md h-12 px-2 bg-transparent"
          type="text"
          placeholder="Enter #tag separated by space..."
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
          title="Enter #tag separated by space..."
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default MainNewBlogComponent;
