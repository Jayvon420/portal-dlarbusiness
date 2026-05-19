// "use server";

// import { prisma } from "@/lib/prisma";
// import { hash } from "bcryptjs";
// import { revalidatePath } from "next/cache";
// import { getCurrentUser } from "@/lib/auth";

// /* =========================
//    UPDATE PROFILE (ADMIN)
// ========================= */
// export async function updateProfile(formData: FormData) {
//   try {
//     const user = await getCurrentUser();

//     if (!user) {
//       return { success: false, message: "Unauthorized" };
//     }

//     const firstName = formData.get("firstName") as string;
//     const email = formData.get("email") as string;

//     // 🔥 VALIDATION
//     if (!firstName || !email) {
//       return {
//         success: false,
//         message: "Name and email are required",
//       };
//     }

//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         firstName: firstName.trim(),
//         email: email.trim(),
//       },
//     });

//     revalidatePath("/admin");

//     return {
//       success: true,
//       message: "Profile updated successfully",
//     };
//   } catch (err) {
//     console.error(err);
//     return {
//       success: false,
//       message: "Failed to update profile",
//     };
//   }
// }

// /* =========================
//    CHANGE PASSWORD (FIXED)
// ========================= */
// export async function updatePassword(password: string) {
//   try {
//     const user = await getCurrentUser();

//     if (!user) {
//       return { success: false, message: "Unauthorized" };
//     }

//     // 🔥 HARD FIX: prevent empty / weak password
//     if (!password || password.trim().length < 6) {
//       return {
//         success: false,
//         message: "Password must be at least 6 characters",
//       };
//     }

//     const hashed = await hash(password.trim(), 10);

//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         password: hashed,
//       },
//     });

//     revalidatePath("/admin");

//     return {
//       success: true,
//       message: "Password updated successfully",
//     };
//   } catch (err) {
//     console.error(err);
//     return {
//       success: false,
//       message: "Failed to update password",
//     };
//   }
// }

"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

/* =========================
   UPDATE PROFILE (NAME + USERNAME + EMAIL)
========================= */
export async function updateProfile(formData: FormData) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    const firstName = formData.get("firstName") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;

    if (!firstName || !username || !email) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName: firstName.trim(),
        username: username.trim(),
        email: email.trim(),
      },
    });

    revalidatePath("/admin");

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Failed to update profile",
    };
  }
}

/* =========================
   CHANGE PASSWORD
========================= */
export async function updatePassword(password: string) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    if (!password || password.trim().length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters",
      };
    }

    const hashed = await hash(password.trim(), 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashed,
      },
    });

    revalidatePath("/admin");

    return {
      success: true,
      message: "Password updated successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Failed to update password",
    };
  }
}
