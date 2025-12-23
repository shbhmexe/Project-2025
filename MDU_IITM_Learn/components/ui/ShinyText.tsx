import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDarkMode = mounted && (theme === 'dark' || resolvedTheme === 'dark');
    const animationDuration = `${speed}s`;

    // Dark mode uses a colorful emerald-cyan shine, Light mode stays with white shine for visibility
    const shineGradient = isDarkMode
        ? 'linear-gradient(120deg, rgba(16, 185, 129, 0) 40%, rgba(52, 211, 153, 0.9) 50%, rgba(16, 185, 129, 0) 60%)'
        : 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)';

    return (
        <span
            className={`inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
            style={{
                backgroundImage: `${shineGradient}, linear-gradient(to right, #10b981, #4ade80)`,
                backgroundSize: '200% 100%, 100% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animationDuration: animationDuration
            }}
        >
            {text}
        </span>
    );
};

export default ShinyText;
