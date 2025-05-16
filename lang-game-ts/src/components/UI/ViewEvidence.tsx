import { useGameStore } from "../../store/useGameStore"
import CancelButton from "/assets/images/ui/icons/cancel-icon.png"
import { useEffect, useState } from "react"
import type { Evidence } from "../../types/index"

const ViewEvidence = () => {
    const evidenceState = useGameStore((s) => s.evidenceState)
    const evidenceList = useGameStore((s) => s.evidenceList)
    const updateEvidence = useGameStore((s) => s.updateEvidence)
    const deselectEvidence = useGameStore((s) => s.deselectEvidence)
    const selectedEvidence = evidenceList.find((x) => x.id === evidenceState?.evidenceId)

    const [evidence, setEvidence] = useState<Evidence>()

    useEffect(() => {
        if (selectedEvidence?.id !== 0) {
            setEvidence(selectedEvidence)
        }
    }, [selectedEvidence])

    const handleBlur = () => {
        if (evidence) {
            updateEvidence(evidence.id, evidence.name ?? null, evidence.notes ?? null)

        }
    }

    return (
        <div
            style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}

        >
            <div style={{ height: "5%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <input
                    value={evidence && evidence.name}
                    onChange={(e) =>
                        setEvidence((prev) =>
                            prev
                                ? {
                                    ...prev,
                                    name: e.target.value,
                                }
                                : prev
                        )
                    }
                    className="no-focus-style"
                    onBlur={handleBlur}
                    spellCheck={false}
                    style={{
                        backgroundColor: "transparent",
                        border: "1px solid #00FF00",
                        minWidth: "50%",
                        height: "100%",
                        color: "#00FF00",
                        caretColor: "#00FF00",
                        padding: 5
                    }}
                />
                <img src={CancelButton} style={{ width: 20, height: 20, cursor: "pointer" }} onClick={deselectEvidence} />
            </div>
            {selectedEvidence?.image ? (
                <div
                    style={{
                        height: "70%",
                        overflowY: "auto",
                        display: "flex",
                       alignItems: "center"
                    }}
                >
                    <div className="">
                        <img
                            src={selectedEvidence.image}
                            style={{
                                width: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </div>
                </div>


            ) : (
                <div>text</div>
            )}
            <div style={{ height: "20%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                Notes
                <textarea
                    className="no-focus-style"
                    value={evidence && evidence.notes}
                    onChange={(e) =>
                        setEvidence((prev) =>
                            prev
                                ? {
                                    ...prev,
                                    notes: e.target.value,
                                }
                                : prev
                        )
                    }
                    onBlur={handleBlur}
                    spellCheck={false}
                    style={{
                        backgroundColor: "transparent",
                        border: "1px solid #00FF00",
                        width: "100%",
                        height: "80%",
                        color: "#00FF00",
                        caretColor: "#00FF00",
                        padding: 5,
                        resize: "none"
                    }}
                />
            </div>
        </div>
    );


}

export default ViewEvidence