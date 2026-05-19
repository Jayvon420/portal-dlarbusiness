import RecentUsersCard from "@/components/admin/recent-users-card";

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Files</h1>

          <p className="text-muted-foreground">
            Upload files to the system and manage your workspace. Supported file
          </p>
        </div>
      </div>

      {/* reuse the recent users card */}
      <RecentUsersCard />
    </div>
  );
}
