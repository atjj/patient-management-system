"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (filese: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border border-dashed border-[#363A3D] rounded-[8px] bg-[#1A1D21] flex flex-col items-center justify-center gap-3 cursor-pointer text-[12px] px-[24px] py-[20px]"
    >
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={URL.createObjectURL(files[0])}
          height={1000}
          width={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image src="/assets/upload.svg" width={40} height={40} alt="upload" />
          <div className="text-center text-[#76828D]">
            <p>
              <span className="text-[#24AE7C] font-bold">Click to upload</span>{" "}
              or drag and drop
            </p>
            <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
        </>
      )}
    </div>
  );
};
export default FileUploader;
