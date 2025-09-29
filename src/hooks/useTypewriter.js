import { useState, useEffect, useRef } from "react";

export function useTypewriter(text, speed = 100, startDelay = 0) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Reset state when text changes
        setDisplayedText("");
        setIsComplete(false);
        
        // Clear any existing timers
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        // Start typing after delay
        timeoutRef.current = setTimeout(() => {
            let i = 0;
            intervalRef.current = setInterval(() => {
                setDisplayedText(text.slice(0, i + 1));
                i++;
                if (i >= text.length) {
                    clearInterval(intervalRef.current);
                    setIsComplete(true);
                }
            }, speed);
        }, startDelay);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [text, speed, startDelay]);

    return { displayedText, isComplete };
}