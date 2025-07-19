// src/pages/ReadBook.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const ReadBook = () => {
  const [book, setBook] = useState(null);
const { id } = useParams();

useEffect(() => {
  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/books/${id}`);
      setBook(res.data);
    } catch (error) {
      console.error('Failed to fetch book:', error);
    }
  };

  fetchBook();
}, [id]);

  if (!book) return <p className="text-center mt-10">🔄 Loading book...</p>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">{book.title}</h2>
      <div className="flex justify-center">
        <iframe
  src={`https://docs.google.com/gview?url=${book.contentURL}&embedded=true`}
  title={book.title}
  width="90%"
  height="800px"
  className="border rounded shadow-lg"
/>
      </div>
    </div>
  );
};

export default ReadBook;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import '../pdf-worker';
// import { Document, Page } from 'react-pdf';
// // import 'pdfjs-dist/web/pdf_viewer.css';


// const ReadBook = () => {
//   const [book, setBook] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3000/api/books/${id}`);
//         setBook(res.data);
//       } catch (error) {
//         console.error('Failed to fetch book:', error);
//       }
//     };
//     fetchBook();
//   }, [id]);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   if (!book) return <p className="text-center mt-10">🔄 Loading book...</p>;

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold text-center mb-4">{book.title}</h2>
//       <div className="flex justify-center flex-col items-center">
//         <Document
//           file={book.contentURL}
//           onLoadSuccess={onDocumentLoadSuccess}
//           className="shadow-md"
//         >
//           <Page pageNumber={pageNumber} />
//         </Document>
//         <p className="mt-2 text-sm">Page {pageNumber} of {numPages}</p>
//         <div className="mt-2 space-x-2">
//           <button
//             disabled={pageNumber <= 1}
//             onClick={() => setPageNumber(pageNumber - 1)}
//             className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <button
//             disabled={pageNumber >= numPages}
//             onClick={() => setPageNumber(pageNumber + 1)}
//             className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReadBook;
