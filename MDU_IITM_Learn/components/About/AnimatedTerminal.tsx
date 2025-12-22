"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface TerminalLine {
    text: string;
    prefix?: string;
    prefixColor?: string;
    textColor?: string;
}

interface AnimatedTerminalProps {
    title: string;
    lines: TerminalLine[];
}

function TypewriterLine({
    line,
    onComplete,
    isVisible,
    showPlaceholder
}: {
    line: TerminalLine;
    onComplete: () => void;
    isVisible: boolean;
    showPlaceholder: boolean;
}) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const hasStarted = useRef(false);

    useEffect(() => {
        if (!isVisible || hasStarted.current) return;
        hasStarted.current = true;
        setIsTyping(true);

        let index = 0;
        const interval = setInterval(() => {
            if (index < line.text.length) {
                setDisplayedText(line.text.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
                setIsTyping(false);
                onComplete();
            }
        }, 25);

        return () => clearInterval(interval);
    }, [isVisible, line.text, onComplete]);

    // Always render the container to maintain fixed height
    return (
        <div className="mb-1 h-6">
            {showPlaceholder && (
                <>
                    {line.prefix && (
                        <span className={isVisible ? (line.prefixColor || "text-emerald-400") : "text-transparent"}>
                            {line.prefix}{" "}
                        </span>
                    )}
                    <span className={isVisible ? (line.textColor || "text-zinc-100") : "text-transparent"}>
                        {isVisible ? displayedText : line.text}
                        {isTyping && <span className="animate-pulse">▌</span>}
                    </span>
                </>
            )}
        </div>
    );
}

export function AnimatedTerminal({ title, lines }: AnimatedTerminalProps) {
    const [currentLine, setCurrentLine] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                    setCurrentLine(1);
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [hasStarted]);

    const handleLineComplete = useCallback(() => {
        if (currentLine < lines.length) {
            setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, 100);
        } else {
            setIsComplete(true);
        }
    }, [currentLine, lines.length]);

    return (
        <div
            ref={containerRef}
            className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-900 shadow-2xl dark:bg-zinc-950/40 dark:backdrop-blur-xl text-left group"
        >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-white/5 bg-zinc-800 dark:bg-white/5 px-4 py-3">
                <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#FF5F56] shadow-[0_0_10px_rgba(255,95,86,0.2)]"></span>
                    <span className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.2)]"></span>
                    <span className="h-3 w-3 rounded-full bg-[#27C93F] shadow-[0_0_10px_rgba(39,201,63,0.2)]"></span>
                </div>
                <span className="ml-4 text-[11px] font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">{title}</span>
            </div>

            {/* Terminal Body - Fixed height container */}
            <div className="p-6 font-mono text-[13px] leading-relaxed sm:text-[14px]">
                {lines.map((line, index) => (
                    <TypewriterLine
                        key={index}
                        line={line}
                        isVisible={index < currentLine}
                        showPlaceholder={true}
                        onComplete={index === currentLine - 1 ? handleLineComplete : () => { }}
                    />
                ))}
                {/* Blinking cursor at the end */}
                <div className="mt-3 h-6">
                    {isComplete && (
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">$</span>
                            <span className="h-4 w-2 bg-emerald-500 animate-[pulse_0.8s_infinite] shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        </div>
                    )}
                </div>
            </div>

            {/* Subtle bottom shine */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />
        </div>
    );
}
