import { useState, useEffect } from "react";

interface MissionPanelProps {
    linesToType: string[];
}

export const MissionPanel = ({ linesToType }: MissionPanelProps) => {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [typedLines, setTypedLines] = useState<string[]>([]);

    // Only run once on mount to initialize empty lines
    useEffect(() => {
        setTypedLines(new Array(linesToType.length).fill(""));
    }, [linesToType.length]);

    useEffect(() => {
        if (typedLines.length === 0 || currentLineIndex >= linesToType.length) return;

        let currentText = "";
        const target = linesToType[currentLineIndex];
        let charIndex = 0;

        const interval = setInterval(() => {
            currentText += target.charAt(charIndex);
            charIndex++;

            setTypedLines(prev => {
                const updated = [...prev];
                updated[currentLineIndex] = currentText;
                return updated;
            });

            if (charIndex >= target.length) {
                clearInterval(interval);
                if (currentLineIndex < linesToType.length - 1) {
                    setTimeout(() => setCurrentLineIndex(i => i + 1), 500); // Optional delay between lines
                }
            }
        }, 75);

        return () => clearInterval(interval);
    }, [currentLineIndex, typedLines.length, linesToType]);

    return (
        <div style={{ width: "30%", border: "1px solid #00FF00", padding: 10 }} >
            <div>
                {typedLines.map((line, index) => (
                    <p key={index} style={{marginBottom:10} }>{line}</p>
                ))}
            </div>
        </div>
    );
};
