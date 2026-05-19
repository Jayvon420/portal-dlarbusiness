"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function toggleUserStatus(userId: string, currentStatus: boolean) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        isActive: !currentStatus,
      },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: currentStatus
        ? "User disabled successfully"
        : "User enabled successfully",
    };
  } catch {
    return {
      success: false,
      message: "Failed to update user status",
    };
  }
}

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch {
    return {
      success: false,
      message: "Failed to delete user",
    };
  }
}

export async function updateUser(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const data: any = {
      firstName,
      lastName,
      email,
      username,
    };

    if (password && password.trim() !== "") {
      data.password = await hash(password, 10);
    }

    await prisma.user.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch {
    return {
      success: false,
      message: "Failed to update user",
    };
  }
}

//adding user

export type CreateUserInput = {
  businessName: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export type CreateUserResponse = {
  success: boolean;
  message: string;
};

export async function createUser(
  data: CreateUserInput,
): Promise<CreateUserResponse> {
  try {
    const { firstName, lastName, email, username, password, businessName } =
      data;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !businessName
    ) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existing) {
      return {
        success: false,
        message: "Email or username already exists",
      };
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        businessName,
        password: hashedPassword,
        role: "USER",
        isActive: true,
      },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (err) {
    console.error("createUser error:", err);

    return {
      success: false,
      message: "Server error while creating user",
    };
  }
}
