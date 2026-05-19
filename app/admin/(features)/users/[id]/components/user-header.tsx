import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type UserHeaderProps = {
  name: string;
  email: string;
  role: string;
};

export default function UserHeader({ name, email, role }: UserHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-1">
        <div className="text-xl font-semibold">{name}</div>
        <div className="text-sm text-muted-foreground">{email}</div>
        <div className="text-sm">Role: {role}</div>
      </CardContent>
    </Card>
  );
}
