"use client";

import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Export toast functions for easy use across the app
export { toast };

// Custom toast functions with theme-aware styling
export const showToast = {
    success: (message: string) => {
        toast.success(message, {
            duration: 3000,
            icon: "✓",
        });
    },
    error: (message: string) => {
        toast.error(message, {
            duration: 4000,
            icon: "✕",
        });
    },
    info: (message: string) => {
        toast(message, {
            duration: 3000,
            icon: "ℹ️",
        });
    },
    loading: (message: string) => {
        return toast.loading(message);
    },
    dismiss: (toastId?: string) => {
        if (toastId) {
            toast.dismiss(toastId);
        } else {
            toast.dismiss();
        }
    },
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

    return (
        <>
            {children}
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                gutter={12}
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: isDark ? "#1e293b" : "#ffffff",
                        color: isDark ? "#f1f5f9" : "#1e293b",
                        padding: "16px 20px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: "500",
                        boxShadow: isDark
                            ? "0 10px 40px rgba(0, 0, 0, 0.5)"
                            : "0 10px 40px rgba(0, 0, 0, 0.15)",
                        border: isDark
                            ? "1px solid rgba(255, 255, 255, 0.1)"
                            : "1px solid rgba(0, 0, 0, 0.05)",
                    },
                    success: {
                        iconTheme: {
                            primary: "#22c55e",
                            secondary: isDark ? "#1e293b" : "#ffffff",
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: isDark ? "#1e293b" : "#ffffff",
                        },
                    },
                }}
            />
        </>
    );
};
