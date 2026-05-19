"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

// PROFILE UPDATE
export async function updateProfile(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, message: "Unauthorized" };

    const businessName = formData.get("businessName") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        businessName,
        firstName,
        lastName,
        email,
      },
    });

    revalidatePath("/dashboard");

    return { success: true, message: "Profile updated successfully" };
  } catch {
    return { success: false, message: "Failed to update profile" };
  }
}

// PASSWORD UPDATE
export async function updatePassword(password: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, message: "Unauthorized" };

    const hashed = await hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });

    revalidatePath("/dashboard");

    return { success: true, message: "Password updated successfully" };
  } catch {
    return { success: false, message: "Failed to update password" };
  }
}
