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

export default async function AdminPage() {
  const [totalUsers, activeUsers, disabledUsers, recentUsers] =
    await Promise.all([
      prisma.user.count({
        where: {
          role: "USER",
        },
      }),

      prisma.user.count({
        where: {
          role: "USER",
          isActive: true,
        },
      }),

      prisma.user.count({
        where: {
          role: "USER",
          isActive: false,
        },
      }),

      prisma.user.findMany({
        where: {
          role: "USER",
        },

        orderBy: {
          createdAt: "desc",
        },

        take: 5,
      }),
    ]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

          <p className="text-muted-foreground">
            Monitor users, business activity, and platform overview.
          </p>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">{totalUsers}</div>

            <p className="text-xs text-muted-foreground mt-1">
              Registered business accounts
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Active Users
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {activeUsers}
            </div>

            <p className="text-xs text-muted-foreground mt-1">
              Currently enabled accounts
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Disabled Users
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {disabledUsers}
            </div>

            <p className="text-xs text-muted-foreground mt-1">
              Accounts currently disabled
            </p>
          </CardContent>
        </Card>
      </div>

      {/* RECENT USERS */}
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Users</CardTitle>

            <p className="text-sm text-muted-foreground mt-1">
              Latest registered business accounts
            </p>
          </div>

          <Button asChild size="sm" variant="default">
            <Link href="/admin/users">Manage Users</Link>
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                {/* <TableHead className="text-right">Action</TableHead> */}
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

                  {/* <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/users/${user.id}/files`}>
                        Open Workspace
                      </Link>
                    </Button>
                  </TableCell> */}
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
    </div>
  );
}
