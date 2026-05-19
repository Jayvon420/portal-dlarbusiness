import FolderCard from "./folder-card";

export default function FolderGrid({
  folders,
}: {
  folders: { id: string; name: string }[];
}) {
  if (!folders || folders.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {folders.map((folder) => (
        <FolderCard key={folder.id} folder={folder} />
      ))}
    </div>
  );
}
