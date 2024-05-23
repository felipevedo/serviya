// @ts-nocheck
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type DropzoneComponentProps = {
  setDropzoneFile: (file: File) => void;
  defaultFile: File & { preview: string };
};

const DropzoneComponent = ({
  setDropzoneFile,
  defaultFile,
}: DropzoneComponentProps) => {
  const [file, setFile] = useState(defaultFile);
  const onDrop = useCallback((acceptedFiles) => {
    const mainFile = acceptedFiles[0];

    const reader = new FileReader();
    reader.onloadend = function () {
      Object.assign(mainFile, { preview: reader.result });
      setFile(mainFile);
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
    if (file !== defaultFile) {
      console.log("new file set");
      setDropzoneFile(file);
    }
  }, [file]);

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center w-fit border-2 rounded-full overflow-clip ${
          isDragActive ? "border-orange-500" : ""
        }`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        <div className="w-[100px] h-[100px] bg-white">
          {file ? (
            <img
              className="object-cover w-[100px] h-[100px] "
              src={file.preview}
              alt={file.name}
            />
          ) : null}
        </div>
      </div>
      <p className="text-center mt-4">Toma una foto o subela de tu galeria</p>
    </>
  );
};

export default DropzoneComponent;
