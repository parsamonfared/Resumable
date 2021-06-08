import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PdfDisplay.css';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PdfDisplay extends React.Component{
    state = {
        pdf: null,
        textSelection: null
    };

    documentRef = React.createRef();

    componentDidMount() {
        const url = this.props.url;
        let loadingTask =  pdfjs.getDocument(url);
        loadingTask.promise.then(pdf => {
            this.setState({ pdf });
        });
    }

	render(){
        const pageWidth = this.props.width * window.innerWidth;
		return(
            <div className="pdf-container" onClick={this.getTextSelection}>
                <Document
                    file={this.props.url}
                > 
                <Page 
                    className="page" 
                    pageNumber={1} 
                    renderTextLayer={true} 
                    width={pageWidth}
                   />
                </Document>
            </div>
		);
	}
}

export default PdfDisplay;