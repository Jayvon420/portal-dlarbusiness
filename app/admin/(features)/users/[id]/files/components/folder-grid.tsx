import FolderCard from "./folder-card";

export default function FolderGrid({
  folders,
  userId,
}: {
  folders: {
    id: string;
    name: string;
  }[];
  userId: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {folders.map((folder) => (
        <FolderCard key={folder.id} folder={folder} userId={userId} />
      ))}
    </div>
  );
}
