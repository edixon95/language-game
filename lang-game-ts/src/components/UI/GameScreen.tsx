import { useGameStore } from "../../store/useGameStore";
import alienImage  from "../../assets/images/alien/alien.png"

export const GameScreen = () => {
    const currentNPCState = useGameStore((s) => s.currentNPCState);
    const options = useGameStore((s) => s.options);
    const selectOption = useGameStore((s) => s.selectOption);

    return (
        <div style={{ display: "flex", border: "1px solid black", width: "80%" }}>
            <div style={{
                width: "60%"
            }}>
                Evidence
            </div>
            <div style={{
                width: "40%",
                borderLeft: "1px solid black",
                background: `url(${alienImage})`,
                backgroundSize: "cover", // optional: adjust as needed
                backgroundPosition: "center"
            }}>
            </div>
        </div>
    );
};
