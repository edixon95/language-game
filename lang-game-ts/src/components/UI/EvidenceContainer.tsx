import { useGameStore } from "../../store/useGameStore";
import EvidenceCard from "./EvidenceCard";
import ViewEvidence from "./ViewEvidence";

const EvidenceContainer = () => {
    const evidenceList = useGameStore((s) => s.evidenceList)
    const evidenceState = useGameStore((s) => s.evidenceState)

    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            width: "100%",
            height: "95%",
            overflow: "auto",
            paddingLeft: "1.5%",
            paddingRight: "1.5%",
            justifyContent: "flex-start"
        }}>

            {evidenceState?.evidenceId !== 0 ?
                <ViewEvidence /> :
                evidenceList && evidenceList.filter((e) => e.isFound).length > 0 ?
                    evidenceList.filter((e) => e.isFound).map((ev) => {
                        return (
                            <EvidenceCard
                                id={ev.id}
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