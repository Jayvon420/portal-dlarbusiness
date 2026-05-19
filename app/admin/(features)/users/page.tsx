import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AddUserDialog from "./add-user-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ActionButton } from "./action-button";
import { EditUserDialog } from "./edit-user-dialog";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>

          <p className="text-muted-foreground">
            Manage platform users by viewing, adding, editing, disabling, or
            deleting accounts.
          </p>
        </div>
      </div>
      <Card>
        {/* <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader> */}
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Users</CardTitle>

          <AddUserDialog
            onCreate={async (data) => {
              "use server";

              const { createUser } = await import("./actions");

              return createUser(data); // ✅ IMPORTANT FIX
            }}
          />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.businessName}</div>

                    <div className="text-xs text-muted-foreground">
                      @{user.firstName} {user.lastName}
                    </div>
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

                  <TableCell className="text-right space-x-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/users/${user.id}`}>View</Link>
                    </Button>

                    <EditUserDialog user={user} />

                    <ActionButton
                      variant={user.isActive ? "secondary" : "default"}
                      action={async () => {
                        "use server";

                        const { toggleUserStatus } = await import("./actions");

                        return toggleUserStatus(user.id, user.isActive);
                      }}
                    >
                      {user.isActive ? "Disable" : "Enable"}
                    </ActionButton>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete User?</AlertDialogTitle>

                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete{" "}
                            <span className="font-bold text-foreground">
                              {user.businessName}
                            </span>{" "}
                            and all related records.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction asChild>
                            <ActionButton
                              variant="destructive"
                              action={async () => {
                                "use server";

                                const { deleteUser } =
                                  await import("./actions");

                                return deleteUser(user.id);
                              }}
                            >
                              Confirm Delete
                            </ActionButton>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}

              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
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
