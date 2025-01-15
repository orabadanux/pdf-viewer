import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { themePlugin } from '@react-pdf-viewer/theme';
import { FiX, FiDownload, FiChevronLeft, FiChevronRight, FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

const PdfViewer = ({ pdfFile, imageUrl, title, readingTime }) => {
  const [isViewerOpen, setViewerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [zoomLevelIndex, setZoomLevelIndex] = useState(null);

  const dragControls = useDragControls();

  const zoomSteps = [10, 20, 25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const themePluginInstance = themePlugin({ theme: 'dark' });

  const { CurrentPageLabel, NumberOfPages, jumpToNextPage, jumpToPreviousPage } = pageNavigationPluginInstance;

  useEffect(() => {
    const updateDeviceType = () => {
      setIsMobile(window.innerWidth < 768); // Mobile if width < 768px
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);

    setInitialScale();

    if (isViewerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', updateDeviceType);
    };
  }, [isViewerOpen]);

  const setInitialScale = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1920) setZoomLevelIndex(5);
    else if (screenWidth >= 1024) setZoomLevelIndex(4);
    else if (screenWidth >= 768) setZoomLevelIndex(3);
    else setZoomLevelIndex(1);
  };

  const handleCardClick = () => setViewerOpen(true);
  const handleCloseViewer = () => setViewerOpen(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfFile;
    link.download = pdfFile.split('/').pop();
    link.click();
  };

  const handleZoomIn = () => {
    setZoomLevelIndex((prevIndex) => Math.min(prevIndex + 1, zoomSteps.length - 1));
  };

  const handleZoomOut = () => {
    setZoomLevelIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const pageLayout = {
    transformSize: ({ size }) => ({
      height: size.height + 20,
      width: size.width,
    }),
    transformPage: ({ pageElement }) => {
      pageElement.style.marginBottom = '20px';
      return pageElement;
    },
  };

  return (
    <div className="relative flex items-center justify-center">
        <div className="relative w-full h-auto overflow-hidden">
          <div onClick={handleCardClick} className="cursor-pointer transition-transform,shadow duration-300 ease-in-out transform md:hover:scale-95 bg-white border border-slate-200 rounded-2xl   md:hover:border-slate-950 md:hover:transition-transform md:hover:duration-300 overflow-hidden">
            <img src={imageUrl} alt="Case Study Preview" className="w-full h-auto object-cover rounded-2xl" />
          </div>
          <div className="mt-4">
            <p className="text-left text-base text-slate-900 font-medium">{title}</p>
            <p className="text-left text-sm text-slate-600">Reading time: {readingTime} min</p>
          </div>
        </div>


      <AnimatePresence>
        {isViewerOpen && (
          <>
            {/* Overlay Background */}
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-40"
            />

            {/* Modal Container */}
            <motion.div
              className={`fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-start bg-white overflow-hidden ${
                isMobile ? 'rounded-t-2xl' : 'rounded-none'
              }`}
              initial={isMobile ? { y: '100%' } : {  }}
              animate={isMobile ? { y: '0%' } : { }}
              exit={isMobile ? { y: '100%' } : {  }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              drag={isMobile ? 'y' : false}
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={isMobile ? { top: 0, bottom: 100 } : {}}
              onDragEnd={(event, info) => {
                if (info.offset.y > 100 && isMobile) {
                  handleCloseViewer();
                }
              }}
            >
              {/* Draggable Top Bar (Mobile Only) */}
              {isMobile && (
                <motion.div
                  className="w-full h-12 flex items-center justify-center bg-white cursor-pointer"
                  onPointerDown={(e) => dragControls.start(e)}
                >
                  <div className="w-20 h-1 bg-slate-400 rounded-full" />
                </motion.div>
              )}

              {/* PDF Viewer Container */}
              <div className="w-full h-full flex-1 overflow-y-auto bg-white">
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <Viewer
                    key={zoomSteps[zoomLevelIndex]}
                    fileUrl={pdfFile}
                    plugins={[pageNavigationPluginInstance, themePluginInstance]}
                    defaultScale={zoomSteps[zoomLevelIndex] / 100}
                    pageLayout={pageLayout}
                  />
                </Worker>
              </div>

              {/* Bottom Control Bar */}
              <div className="fixed bottom-4 left-0 right-0 md:mx-auto mx-2 max-w-4xl flex justify-between items-center bg-white p-2 rounded-full border-solid border border-slate-200 z-10">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={jumpToPreviousPage}
                    className="p-2 bg-slate-200 text-slate-900 rounded-full hover:bg-slate-100"
                    aria-label="Previous Page"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <span className="text-slate-900 text-sm">
                    <CurrentPageLabel /> / <NumberOfPages />
                  </span>
                  <button
                    onClick={jumpToNextPage}
                    className="p-2 bg-slate-200 text-slate-900 rounded-full hover:bg-slate-100"
                    aria-label="Next Page"
                  >
                    <FiChevronRight size={20} />
                  </button>
                </div>

                {/* Zoom controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 bg-slate-200 text-slate-900 rounded-full hover:bg-slate-100"
                    aria-label="Zoom Out"
                    disabled={zoomLevelIndex === 0}
                  >
                    <FiZoomOut size={20} />
                  </button>
                  <span className="text-slate-900 text-sm">{zoomSteps[zoomLevelIndex]}%</span>
                  <button
                    onClick={handleZoomIn}
                    className="p-2 bg-slate-200 text-slate-900 rounded-full hover:bg-slate-100"
                    aria-label="Zoom In"
                    disabled={zoomLevelIndex === zoomSteps.length - 1}
                  >
                    <FiZoomIn size={20} />
                  </button>
                </div>

                {/* Download and close buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDownload}
                    className="p-2 bg-slate-200 text-slate-900 rounded-full hover:bg-slate-100"
                    aria-label="Download PDF"
                  >
                    <FiDownload size={20} />
                  </button>
                  <button
                    onClick={handleCloseViewer}
                    className="p-2 bg-slate-200 text-slate-900 rounded-full hover:bg-slate-100"
                    aria-label="Close Viewer"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PdfViewer;
