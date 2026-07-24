import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mail";
import { resetPasswordEmail } from "@/lib/emails/reset-password";
import { forgotPasswordSchema } from "@/validators/forgot-password";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = forgotPasswordSchema.safeParse(body);

    // Always return the same response
    const successResponse = Response.json({
      success: true,
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });

    if (!parsed.success) {
      return successResponse;
    }

    const { email } = parsed.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Never reveal whether the email exists
    if (!user) {
      return successResponse;
    }

    // Remove previous reset tokens
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // Generate secure token
    const rawToken = crypto.randomBytes(32).toString("hex");

    // Store only the hash
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    // 30 minutes
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        token: hashedToken,
        expiresAt,
        userId: user.id,
      },
    });

    const resetUrl = `${process.env.APP_URL}/reset-password?token=${rawToken}`;

    const emailContent = resetPasswordEmail({
      firstName: user.firstName,
      resetUrl,
    });

    await sendEmail({
      to: user.email,
      ...emailContent,
    });

    return successResponse;
  } catch (error) {
    console.error("Forgot Password:", error);

    return Response.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      },
    );
  }
}
