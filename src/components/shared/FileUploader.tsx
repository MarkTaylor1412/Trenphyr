import React, { useCallback, useState } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { Button } from "../ui/button";

type UploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: UploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    fieldChange(acceptedFiles);
  }, [file])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".svg", ".jpeg"] }
  })

  return (
    <div {...getRootProps()} className="flex flex-col flex-center bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer" />
      {
        fileUrl ? (
          <>
            <div className="flex flex-1 justify-center w-full p-4">
              <img
                src={fileUrl}
                alt="image"
                className="file_uploader-img"
              />
            </div>

            <p className="file_uploader-label">Drag and drop photo to replace</p>
          </>
        ) : (
          <div className="file_uploader-box">
            <img
              src="/assets/icons/file-upload.svg"
              height={70}
              width={90}
              alt="file-upload"
            />

            <h3 className="base-medium text-light-2 mb-2 mt-5">Drag and drop photo here</h3>
            <p className="small-regular text-light-4 mb-5">PNG, JPG, SVG, etc.</p>

            <Button className="shad-button_dark_4">
              Select from device
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default FileUploader