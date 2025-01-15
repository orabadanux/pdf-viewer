import logo from './logo.svg';
import './App.css';
import PdfViewer from './PdfViewer';
import imgpdf from './imgpdf.png';

const samplePDF = process.env.PUBLIC_URL + "/sample.pdf";
function App() {
  return (
    <div className="mt-40 max-w-2xl mx-auto sm:mb-24 px-4 xl:px-0">
      <PdfViewer
            pdfFile={samplePDF}
            imageUrl={imgpdf}
            title="Title text"
            readingTime="7"
          />
    </div>
  );
}

export default App;
