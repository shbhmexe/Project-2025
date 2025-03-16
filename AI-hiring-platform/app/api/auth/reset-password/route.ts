import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { sendEmail, emailTemplates } from "@/app/lib/email";
import bcrypt from "bcryptjs";
import { prisma } from '@/app/lib/prisma';

// Validation schema for requesting password reset
const requestResetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Validation schema for resetting password
const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// POST - Request password reset
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request body
    const result = requestResetSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { email } = result.data;
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      // For security reasons, don't reveal that the email doesn't exist
      return NextResponse.json(
        { message: "If your email is registered, you will receive a password reset link" },
        { status: 200 }
      );
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now
    
    // Store reset token in database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });
    
    // Send password reset email, but don't fail if it doesn't work
    try {
      await sendEmail({
        to: email,
        subject: "Reset Your Password",
        html: emailTemplates.passwordReset(resetToken),
      });
    } catch (emailError) {
      console.error("Error sending password reset email:", emailError);
      // Continue even if email fails
    }
    
    return NextResponse.json(
      { message: "If your email is registered, you will receive a password reset link" },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Password reset request error:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}

// PUT - Reset password with token
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request body
    const result = resetPasswordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { token, password } = result.data;
    
    // Find user with valid reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Update user's password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    
    return NextResponse.json(
      { message: "Password has been reset successfully" },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
} 