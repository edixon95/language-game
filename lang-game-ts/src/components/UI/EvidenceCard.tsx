import { useGameStore } from "../../store/useGameStore";

interface EvidenceCardProps {
    id: number;
    name: string;
    isViewed: boolean;
}

const EvidenceCard = ({ id, name, isViewed }: EvidenceCardProps) => {

    const selectEvidence = useGameStore((s) => s.selectEvidence)
    return (
        <div onClick={() => selectEvidence(id)} style={{
            border: "1px solid #00FF00",
            width: "45%",
            height: "49%"

        }}>
            <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                <div style={{ top: 0, left: 0, position: "absolute", padding: 5, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <div
                        style={{
                            width: 20, height: 20, backgroundColor: isViewed ? "#00FF00" : "red",
                        }}
                    />
                </div>
                {name}
            </div>
        </div>
    )
}

export default EvidenceCard