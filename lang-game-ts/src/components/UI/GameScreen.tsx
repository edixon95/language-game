import { useEffect } from "react";
import { useGameStore } from "../../store/useGameStore";

export const GameScreen = () => {
    const currentNPCState = useGameStore((s) => s.currentNPCState);
    const options = useGameStore((s) => s.options);
    const createOptions = useGameStore((s) => s.createOptions);
    const selectOption = useGameStore((s) => s.selectOption);

    //useEffect(() => {
    //    if (currentNPCState)
    //        createOptions();
    //}, [currentNPCState]);

    return (
        <div style={{ display: "flex", border: "1px solid black", width: "80%", flexDirection: "column" }}>
            <p>{currentNPCState?.dialogueNode.meaning ?? "No dialogue yet"}</p>
            <div style={{
                marginTop: 20,
                display: "flex",
                gap: 10
            }}>
                {options && options.length > 0 &&
                    options.map((op, index) => (
                        <div key={index} style={{ border: "1px solid black", display: "flex", padding: 5, cursor: "pointer" }}
                            onClick={() => selectOption(index)}
                        >
                            <p>{op.meaning}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
