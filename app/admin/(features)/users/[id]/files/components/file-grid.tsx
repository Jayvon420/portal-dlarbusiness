import FileCard from "./file-card";

export default function FileGrid({
  files,
}: {
  files: {
    id: string;
    name: string;
    url: string;
  }[];
}) {
  return (
    <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
      {files.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
}
