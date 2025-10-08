"use client";

import { useState, useEffect } from "react";
import SuccessAlert from "@/components/SuccessAlert";
import ErrorAlert from "@/components/ErrorAlert";
import LoaderComponent from "@/components/ClipLoader";

type Link = {
  id: string;
  url: string;
  music_title: string;
  img_url: string;
  img_alt: string;
  createdAt: string;
};

export default function RecommendPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<Link[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
    fetch("/api/links")
      .then((res) => res.json())
      .then((data) => {
        setLinks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Failed to save link");
        setUrl("");
        return;
      }

      const newLink = await res.json();
      setLinks((prev) => [newLink, ...prev]);
      setUrl("");
      setSuccess("The song has been successfully added!");
    } catch (e) {
      setError("Server error occurred");
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const totalPages = Math.ceil(links.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = links.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
      <div className="max-w-2xl mx-auto p-0 space-y-4 md:p-6">
        <h1 className="text-2xl font-bold mb-4 text-center justify-center">
          Song Recommendations
        </h1>

        {error && <ErrorAlert message={error} />}
        {success && <SuccessAlert message={success} />}

        <div className="flex gap-2">
          <input
            type="url"
            placeholder="Enter the song URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      {loading ? (
        <LoaderComponent />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto w-full mt-6">
            {currentData.map((link, index) => (
              <div key={link.id ?? index} className="flex-1 w-full">
                <iframe
                  title={link.music_title}
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  src={link.url}
                  className="w-full rounded-lg shadow"
                />
                <p className="mt-2 font-medium">{link.music_title}</p>
                <p className="text-sm text-gray-500">
                  Added: {new Date(link.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-1.5 py-1 sm:px-3 sm:py-1 md:px-3 md:py-1 rounded bg-gray-200 disabled:opacity-50 text-black dark:text-black"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-1.5 py-1 sm:px-3 sm:py-1 md:px-3 md:py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black dark:text-black"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-1.5 py-1 sm:px-3 sm:py-1 md:px-3 md:py-1 rounded bg-gray-200 disabled:opacity-50 text-black dark:text-black"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
