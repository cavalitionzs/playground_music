"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

type Song = {
  id: string;
  music_title: string;
  url: string;
  img_url: string;
  img_alt: string;
  createdAt: string;
};

export default function SoundCloudEmbed() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    function updateItemsPerPage() {
      if (window.innerWidth < 640) {
        setItemsPerPage(3);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(9);
      }
    }

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    fetch("/api/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);

  const maxVisiblePages = 7;
  const totalPages = Math.ceil(songs.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = songs.slice(startIndex, startIndex + itemsPerPage);
  if (songs.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <ClipLoader color="#ffffff" size={50} />
      </div>
    );
  }

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-2 md:gap-4 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {currentData.map((song) => (
          <div key={song.id} className="flex items-start gap-4 p-4 w-auto">
            <div className="relative w-[100px] h-[100px] flex-shrink-0 md:w-[150px] md:h-[150px]">
              <Image
                src={song.img_url}
                alt={song.img_alt}
                fill
                className="rounded-lg object-cover"
              />
            </div>

            <div className="flex-1">
              <iframe
                title={song.music_title}
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                src={song.url}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-1.5 py-1 sm:px-3 sm:py-1 md:px-3 md:py-1 rounded bg-white disabled:opacity-50 text-black"
        >
          Prev
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const pageNumber = startPage + i;
          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={` px-1.5 py-1 sm:px-3 sm:py-1 md:px-3 md:py-1 rounded text-black ${
                currentPage === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-1.5 py-1 sm:px-3 sm:py-1 md:px-3 md:py-1 rounded bg-white disabled:opacity-50 text-black"
        >
          Next
        </button>
      </div>
      <Link
        href="/recommend"
        className="self-center mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition text-center justify-center"
      >
        Add new songs based on your recommendations!
      </Link>
    </div>
  );
}
