# PDF Viewer

A simple and interactive PDF Viewer built using React, React-PDF-Viewer, and Tailwind CSS. This PDF viewer allows you to open, view, and interact with PDFs directly on your website. Key features include:

- **Open PDFs:** Embed and view PDF files directly in the browser.
- **Zoom Controls:** Easily zoom in and out of the document.
- **Pagination:** Navigate through the pages with intuitive controls.
- **Download Option:** Download the PDF file with a single click.
- **Responsive Styling:** Styled with Tailwind CSS for a clean and responsive design.

---

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/your-username/pdf-viewer.git
   cd pdf-viewer
```

2. Install dependencies:

```bash
   npm install
```

3. Start the development server:

```bash
   npm start
```

4. Open your browser and navigate to:

```bash
   http://localhost:3000
```
## Usage

### File Structure

```plaintext
src/
├── App.js           # Main application component
├── PdfViewer.js     # PDF Viewer component
├── index.css        # Tailwind CSS imports
├── App.css          # Additional styles
├── assets/          # Place your PDF and image assets here
└── ...
```

### Adding a PDF

To display a PDF file:

1. Place your PDF in the public/ folder.
2. Update the pdfFile property in App.js with the relative path to the PDF file:
```javascript
    const samplePDF = process.env.PUBLIC_URL + "/sample.pdf";
```

### Customizing Viewer Properties

- **PDF File:** Pass the PDF file URL as a prop to the PdfViewer component.
- **Zoom Levels:** Modify the zoomSteps array in PdfViewer.js to define custom zoom levels.
- **Pagination:** The pageNavigationPlugin enables smooth page navigation.
- **Styling:** Tailwind CSS provides an easy way to customize the design with utility classes.

## Dependencies

The project uses the following libraries:
- @react-pdf-viewer/core: Core library for rendering PDFs in React.
- @react-pdf-viewer/page-navigation: Plugin for pagination controls.
- @react-pdf-viewer/theme: Theme plugin for a modern dark mode.
- react-icons: Provides scalable vector icons.
- framer-motion: Adds animations for a smoother user experience.
- Tailwind CSS: Utility-first CSS framework for responsive and modern styling.