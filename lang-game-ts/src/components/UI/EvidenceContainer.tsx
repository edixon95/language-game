import { useGameStore } from "../../store/useGameStore";
import EvidenceCard from "./EvidenceCard";

const EvidenceContainer = () => {
    const evidenceList = useGameStore((s) => s.evidenceList)

    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            width: "98%",
            height: "95%",
            overflow: "auto",
            paddingLeft: "1.5%"
        }}>

            {evidenceList && evidenceList.filter((e) => e.isFound).length > 0 ?
                evidenceList.filter((e) => e.isFound).map((ev, index) => {
                    return (
                        <EvidenceCard
                            id={ev.id}
                            name={String(index + 1)}
                            isViewed={ev.isViewed ?? false}
                        />
                    )
                })
                : <div>
                    No evidence on record
                </div>
            }
        </div>
    )
}

export default EvidenceContainer 