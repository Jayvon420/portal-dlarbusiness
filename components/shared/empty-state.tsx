export function EmptyState({
  title = "No data found",
  description = "Try adding a new record",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="text-center py-10 text-muted-foreground">
      <p className="font-medium">{title}</p>
      <p className="text-sm">{description}</p>
    </div>
  );
}
