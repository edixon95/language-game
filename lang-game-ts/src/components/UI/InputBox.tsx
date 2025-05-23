import { useRef, useEffect, useState } from "react";

interface InputBoxProps {
    wordStateComp: any,
    setWordStateComp: any,
    handleBlur: any,
    shouldFocus: any
}

const InputBox = ({ wordStateComp, setWordStateComp, handleBlur, shouldFocus }: InputBoxProps) => {
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputWidth, setInputWidth] = useState(20);


    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [shouldFocus])

    useEffect(() => {
        if (spanRef.current) {
            const spanWidth = spanRef.current.offsetWidth;
            setInputWidth(Math.max(20, spanWidth + 5)); 
        }
    }, [wordStateComp.translation]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleBlur();
        }
    };

    return (
        <div style={{ display: "inline-block", position: "relative" }}>
            <input
                className="no-focus-style"
                spellCheck={false}
                ref={inputRef}
                value={wordStateComp.translation}
                onChange={(e) =>
                    setWordStateComp({ ...wordStateComp, translation: e.target.value })
                }
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                style={{
                    backgroundColor: "transparent",
                    border: "none",
                    width: inputWidth,
                    minWidth: 20,
                    color: "#00FF00",
                    caretColor: "#00FF00",
                    textAlign: "center"
                }}

            />
            <span
                ref={spanRef}
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre",
                    font: "inherit"
                }}
            >
                {wordStateComp.translation || " "}
            </span>
        </div>
    );
}

export default InputBox