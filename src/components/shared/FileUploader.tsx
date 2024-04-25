import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "../ui/button";

const FileUploader = () => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState("");

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".svg", ".jpeg"] }
  })

  return (
    <div {...getRootProps()} className="flex flex-col flex-center bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer" />
      {
        fileUrl ? (
          <div></div>
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