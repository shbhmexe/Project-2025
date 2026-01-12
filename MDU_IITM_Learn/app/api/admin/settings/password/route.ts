import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !(session.user as any)?.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { currentPassword, newPassword } = await request.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
        }

        await dbConnect();

        const admin = await Admin.findOne({ email: session.user?.email });

        if (!admin) {
            return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        }

        // Verify current password
        const isValid = await admin.comparePassword(currentPassword);

        if (!isValid) {
            return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
        }

        // Update password (will be hashed by the pre-save hook)
        admin.password = newPassword;
        await admin.save();

        return NextResponse.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Password change error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
