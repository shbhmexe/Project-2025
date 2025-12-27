import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
    repeatDelay?: number; // Delay in seconds between animation repeats
}

const ShinyText: React.FC<ShinyTextProps> = ({
    text,
    disabled = false,
    speed = 2,
    className = '',
    repeatDelay = 15 // Default 15 seconds between repeats
}) => {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isShining, setIsShining] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Animation cycle: shine for 'speed' seconds, hide shine, wait 'repeatDelay' seconds, repeat
    useEffect(() => {
        if (disabled) return;

        let timeoutId: NodeJS.Timeout;

        const runCycle = () => {
            // Start shine animation
            setIsShining(true);

            // After animation completes, hide the shine
            timeoutId = setTimeout(() => {
                setIsShining(false);

                // After repeatDelay, start the cycle again
                timeoutId = setTimeout(() => {
                    runCycle();
                }, repeatDelay * 1000);
            }, speed * 1000);
        };

        runCycle();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [speed, repeatDelay, disabled]);

    const isDarkMode = mounted && (theme === 'dark' || resolvedTheme === 'dark');

    // Dark mode uses a colorful emerald-cyan shine, Light mode uses white shine
    const shineGradient = isDarkMode
        ? 'linear-gradient(120deg, rgba(16, 185, 129, 0) 40%, rgba(52, 211, 153, 0.9) 50%, rgba(16, 185, 129, 0) 60%)'
        : 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)';

    // Base gradient (always visible)
    const baseGradient = 'linear-gradient(to right, #10b981, #4ade80)';

    return (
        <span
            className={`inline-block ${!disabled && isShining ? 'animate-shine' : ''} ${className}`}
            style={{
                backgroundImage: isShining ? `${shineGradient}, ${baseGradient}` : baseGradient,
                backgroundSize: isShining ? '200% 100%, 100% 100%' : '100% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animationDuration: `${speed}s`,
                animationIterationCount: 1,
                animationTimingFunction: 'linear'
            }}
        >
            {text}
        </span>
    );
};

export default ShinyText;
