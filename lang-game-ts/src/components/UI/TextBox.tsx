import { useGameStore } from "../../store/useGameStore";

export const TextBox = () => {
    const currentNPCState = useGameStore((s) => s.currentNPCState);
    const options = useGameStore((s) => s.options);
    const selectOption = useGameStore((s) => s.selectOption);

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>
            <div style={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <p>{currentNPCState?.dialogueNode.meaning ?? "No dialogue yet"}</p>
            </div>
            <div style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                width: "50%"
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
    )
}