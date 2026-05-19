import Link from "next/link";
import { prisma } from "@/lib/prisma";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function RecentUsersCard() {
  const recentUsers = await prisma.user.findMany({
    where: {
      role: "USER",
    },
    orderBy: {
      createdAt: "desc",
    },
    // take: 5,
  });

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        {/* <div>
          <CardTitle>Client List</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            List of all registered users. Click "Open Workspace" to view
          </p>
        </div>

        <Button asChild size="sm" variant="default">
          <Link href="/admin/users">Manage Users</Link>
        </Button> */}
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="font-medium">{user.businessName}</div>
                  <div className="text-xs text-muted-foreground">
                    @{user.username}
                  </div>
                </TableCell>

                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>
                  <Badge
                    variant={user.isActive ? "outline" : "destructive"}
                    className={
                      user.isActive ? "border-green-500 text-green-600" : ""
                    }
                  >
                    {user.isActive ? "Active" : "Disabled"}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/admin/users/${user.id}/files`}>
                      Open Workspace
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {recentUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
