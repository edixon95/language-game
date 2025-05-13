import { useGameStore } from "../../store/useGameStore";
import EvidenceCard from "./EvidenceCard";

const EvidenceContainer = () => {
    const evidenceList = useGameStore((s) => s.evidenceList)
    const evidenceState = useGameStore((s) => s.evidenceState)

    console.log(evidenceState)

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

            {evidenceState?.evidenceId !== 0 ?
                null :
                evidenceList && evidenceList.filter((e) => e.isFound).length > 0 ?
                    evidenceList.filter((e) => e.isFound).map((ev) => {
                        return (
                            <EvidenceCard
                                id={ev.id}
                                name={ev.name}
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