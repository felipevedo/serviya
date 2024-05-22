// @ts-nocheck
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type DropzoneComponentProps = {
  setDropzoneFile: (file: File) => void;
};

const DropzoneComponent = ({ setDropzoneFile }: DropzoneComponentProps) => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    const mainFile = acceptedFiles[0];

    const reader = new FileReader();
    reader.onloadend = function () {
      console.log("RESULT", reader.result);

      Object.assign(mainFile, { preview: reader.result });
      setFiles([mainFile]);
    };

    reader.readAsDataURL(mainFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 1024 * 1024 * 5,
    maxFiles: 3,
  });

  useEffect(() => {
    setDropzoneFile(files[0]);
  }, [files]);

  // console.log("isDragActive", isDragActive); // ### wil be used for styling

  const fileList = files.map((file) => (
    <li key={file.name}>
      <img src={file.preview} alt={file.name} />
      <span>{file.name}</span>
    </li>
  ));

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag and drop your files here, or click to select files</p>
      <ul>{fileList}</ul>
    </div>
  );
};

export default DropzoneComponent;
