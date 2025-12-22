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
                    <span className={isVisible ? (line.textColor || "text-zinc-300") : "text-transparent"}>
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
            }, 150);
        } else {
            setIsComplete(true);
        }
    }, [currentLine, lines.length]);

    return (
        <div
            ref={containerRef}
            className="overflow-hidden rounded-xl border border-border/40 bg-zinc-900 shadow-2xl text-left"
        >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 border-b border-zinc-700 bg-zinc-800 px-4 py-3">
                <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-500"></span>
                    <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                    <span className="h-3 w-3 rounded-full bg-green-500"></span>
                </div>
                <span className="ml-2 text-xs text-zinc-400">{title}</span>
            </div>
            {/* Terminal Body - Fixed height container */}
            <div className="p-4 font-mono text-sm leading-relaxed sm:p-5">
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
                        <>
                            <span className="text-emerald-400">$</span>
                            <span className="ml-2 animate-pulse text-zinc-300">▌</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
