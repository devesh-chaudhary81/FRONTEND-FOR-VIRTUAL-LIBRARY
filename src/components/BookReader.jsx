import React, { useEffect, useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';
import FlipSound from '../assets/page-flip.mp3';
import Navbar from './sidebar';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

const BookReader = ({ pdfUrl }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState({});
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);
  const flipBookRef = useRef(null);

  const INITIAL_LOAD_COUNT = 4;
  const PRELOAD_AHEAD = 2;

  useEffect(() => {
    const loadPdfMeta = async () => {
      setLoading(true);
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      setTotalPages(pdf.numPages);
      await loadPages(pdf, 1, INITIAL_LOAD_COUNT);
      setLoading(false);

      // Preload remaining in background slowly
      preloadRemainingPages(pdf);
    };

    loadPdfMeta();
  }, [pdfUrl]);

  const loadPages = async (pdf, startPage, count) => {
    const newPages = {};
    const endPage = Math.min(startPage + count - 1, pdf.numPages);

    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
      if (pages[pageNum]) continue; // Skip if already loaded
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.2 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
      newPages[pageNum] = canvas.toDataURL();
    }

    setPages((prev) => ({ ...prev, ...newPages }));
  };

  const preloadRemainingPages = async (pdf) => {
    for (let i = INITIAL_LOAD_COUNT + 1; i <= pdf.numPages; i += PRELOAD_AHEAD) {
      await loadPages(pdf, i, PRELOAD_AHEAD);
    }
  };

  const handleFlip = async (e) => {
    const currentPage = e.data + 1; // pageflip index starts at 0
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;

    // Preload next 2 pages if not loaded
    const nextPages = [currentPage + 1, currentPage + 2];
    for (let p of nextPages) {
      if (p <= pdf.numPages && !pages[p]) {
        await loadPages(pdf, p, 1);
      }
    }
  };

  const goToPrevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const goToNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black relative">
      {loading ? (
        <>
          <Navbar />
          <div className="flex flex-col items-center justify-center text-white animate-pulse">
            <div className="loader mb-4"></div>
            <h2 className="text-2xl font-bold">Loading Book...</h2>
            <p className="text-sm mt-2">Please wait while we prepare your reading experience 📖✨</p>
          </div>
        </>
      ) : (
        <>
          <HTMLFlipBook
            ref={flipBookRef}
            width={500}
            height={600}
            size="stretch"
            minWidth={250}
            maxWidth={700}
            minHeight={360}
            maxHeight={600}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={handleFlip}
            className="shadow-lg"
          >
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNum = index + 1;
              return (
                <div key={pageNum} className="page bg-white flex items-center justify-center">
                  {pages[pageNum] ? (
                    <img
                      src={pages[pageNum]}
                      alt={`Page ${pageNum}`}
                      className="object-contain max-h-full max-w-full"
                    />
                  ) : (
                    <span className="text-gray-500 animate-pulse">Loading Page {pageNum}...</span>
                  )}
                </div>
              );
            })}
          </HTMLFlipBook>

          {/* Control Buttons */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-6">
            <button
              onClick={goToPrevPage}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              ⬅ Prev
            </button>
            <button
              onClick={goToNextPage}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Next ➡
            </button>
          </div>
        </>
      )}

      <audio ref={audioRef} src={FlipSound} preload="auto" />

      {/* Loader CSS */}
      <style jsx>{`
        .loader {
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BookReader;
