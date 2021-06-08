import React, {useEffect, useState, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import PdfDisplay from '../PdfDisplay/PdfDisplay'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  height: 150,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};
const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  padding: 0,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  // maxWidth: 500,
  // maxHeight: 100,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


function DropZone(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles} = useDropzone({
          // image/* // for accepting images as well, 
        accept: 'application/pdf',
        onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        {/* <img
          src={file.preview}
          style={img}
        /> */}
        <PdfDisplay url={file.preview} width={0.3} ></PdfDisplay>
      </div>
    </div>
  ));
  const Droped = files.map(file => (
      props.onImageDrop(file)
    ));
  
  // useEffect(() => () => {
  //   // Make sure to revoke the data uris to avoid memory leaks
  //   files.forEach(file => URL.revokeObjectURL(file.preview));
  // }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop your Resume pdf in here, or click to select it</p>
      </div>
      <aside style={thumbsContainer}>
        <ul>{acceptedFileItems}</ul>
        {thumbs}
      </aside>
    </section>
  );
}

export default DropZone