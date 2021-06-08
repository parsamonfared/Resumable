import React, { useState } from "react";
import { Document, Page, pdfjs} from "react-pdf";
import {StyleSheet} from '@react-pdf/renderer';
import { makeStyles } from '@material-ui/core/styles'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function SinglePage(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  const styles = StyleSheet.create({
    page: {
      border: '1px solid darkgrey',
      flexDirection: 'row',
      backgroundColor: '#fff',
      orientation:"portrait"
    }, 
    
  });


  const { pdf } = props;
  return (
    <>
    <div id="page">
      <Document
        file={pdf}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber}/>
      </Document>
      </div>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button id="button1" type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          id="button1"
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}
