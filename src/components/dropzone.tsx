import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export type FileType = File & { preview: string };

export default function Dropzone({
  initialImages,
  onImgesSelected,
}: {
  initialImages?: FileType[];
  onImgesSelected?: (imageUrl: FileType[]) => void;
}) {
  const [files, setFiles] = useState<FileType[]>(initialImages ?? []);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      let files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ) as FileType[];

      onImgesSelected!(files);
      setFiles(files);
     
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const thumbs = files.map((file) => (
    <div
      className="inline-flex
        rounded-sm border-white
         border border-solid mb-2 mr-2 w-[100px] h-[100px] p-1 box-border"
      // @ts-ignore
      key={file.name}
    >
      <div className="flex min-w-0 overflow-hidden">
        <img
          src={file.preview}
          className="block w-auto h-full"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <div className="col-span-full">
      <div className="flex flex-nowrap flex-col gap-2 ">
        <div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop images here</p>
            <button
              type="button"
              onClick={open}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Select Images
            </button>
          </div>
        </div>
        <div className="mt-2">
          <h4>Images</h4>
          <aside className="flex flex-row flex-wrap mt-2">
            <ul>{thumbs}</ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
