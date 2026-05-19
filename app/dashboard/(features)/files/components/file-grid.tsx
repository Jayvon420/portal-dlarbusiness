import FileCard from "./file-card";

export default function FileGrid({
  files,
}: {
  files: { id: string; name: string; url: string }[];
}) {
  if (!files || files.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
}
