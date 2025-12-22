"use client";

import React from "react";

export const DotGrid = () => {
    return (
        <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
            <svg
                className="absolute inset-0 h-full w-full stroke-emerald-500/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="dot-grid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                        patternContentUnits="userSpaceOnUse"
                        x="50%"
                        y="0"
                    >
                        <circle cx="1" cy="1" r="1" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth="0" fill="url(#dot-grid)" />
            </svg>
        </div>
    );
};

export default DotGrid;
