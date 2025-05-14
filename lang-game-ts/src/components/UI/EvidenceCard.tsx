import { useGameStore } from "../../store/useGameStore";
import OpenIcon from "/assets/images/ui/icons/open-icon.png";
import { useEffect, useState } from "react";
import type { Evidence } from "../../types";

interface EvidenceCardProps {
    id: number;
    isViewed: boolean;
}

const EvidenceCard = ({ id, isViewed }: EvidenceCardProps) => {
    const selectEvidence = useGameStore((s) => s.selectEvidence)
    const evidenceList = useGameStore((s) => s.evidenceList)
    const updateEvidence = useGameStore((s) => s.updateEvidence)

    const [evidence, setEvidence] = useState<Evidence>()

    useEffect(() => {
        const componentEvidence = evidenceList.find((x) => x.id === id)
        if (!componentEvidence) return;

        setEvidence(componentEvidence)
    }, [evidenceList])

    const handleBlur = () => {
        if (evidence) {
            updateEvidence(evidence.id, evidence.name ?? null, evidence.notes ?? null)

        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleBlur();
        }
    };

    return (
        <div style={{
            border: "1px solid #00FF00",
            width: "48%",
            height: "49%",
            fontSize: 15

        }}>
            <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                <div style={{ top: 0, left: 0, position: "absolute", padding: 5, display: "flex", justifyContent: "flex-end", width: "100%", gap: 5 }}>
                    <img src={OpenIcon} style={{ width: 20, height: 20, cursor: "pointer" }}
                        onClick={() => selectEvidence(id)}
                    />
                    <div
                        style={{
                            width: 20,
                            height: 20,
                            border: "1px solid #00FF00",
                            backgroundColor: !isViewed ? "#00FF00" : "transparent",
                        }}
                    />
                </div>
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: "10%",
                        boxSizing: "border-box",
                    }}
                >

                    <div
                        style={{
                            height: "30%",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ width: "100%", height: "100%" }}>
                            <div style={{ display: "flex", gap: 10, paddingLeft: 5 }}>
                                <span>Name:</span>
                            </div>
                            <input
                                className="no-focus-style"
                                spellCheck={false}
                                value={evidence &&evidence.name}
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
                                onKeyDown={handleKeyDown }
                                onBlur={handleBlur}
                                style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    borderTop: "1px solid #00FF00",
                                    borderBottom: "1px solid #00FF00",
                                    width: "100%",
                                    height: "70%",
                                    color: "#00FF00",
                                    caretColor: "#00FF00",
                                    padding: 5
                                }}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            height: "70%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                height: "20%",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                paddingLeft: 5,
                            }}
                        >
                            <span>Notes:</span>
                        </div>
                        <textarea
                            className="no-focus-style"
                            spellCheck={false}
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
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                borderTop: "1px solid #00FF00",
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

            </div>
        </div>
    )
}

export default EvidenceCard