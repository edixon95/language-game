import type { Message } from "../../types/index"; // adjust path as needed
import { chatIcons } from "../../data/dialogues/chatIcons"
import WordContainer from "./WordContainer";
import { useGameStore } from "../../store/useGameStore";

const ChatMessage = ({ type, npcId, npcMood, text, id }: Message) => {

    const evidenceList = useGameStore((s) => s.evidenceList)

    const getEvidenceNames = (evidenceString: string): string => {
        const evidenceArray = evidenceString.split("")
        let tempEvidenceList: string[] = []

        evidenceArray.forEach((evidenceNumberAsString) => {
            const foundEvidence = evidenceList.find((x) => x.id === Number(evidenceNumberAsString))
            if (foundEvidence) {
                tempEvidenceList.push(foundEvidence.name!)
            }

        })

        return tempEvidenceList.join(", ")
    }

    const getChatImage = (id: number | null, mood: number | null): string => {
        if (id === null || mood === null) return chatIcons[2][4];

        const icon = chatIcons[id][mood];
        return icon
    };

    if (type === 1) {
        return (
            <div style={{ border: "1px solid #00FF00", display: "flex", alignItems: "stretch", justifyContent: "space-between" }}>
                <div style={{
                    width: "80%",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    gap: 2,
                    padding: 5,
                    justifyContent: "flex-end",

                }}>
                    <span style={{ wordWrap: "break-word", height: "20%" }}>
                        <WordContainer text={text} editScreen={"history"} messageId={id} />
                    </span>
                </div>
                <div style={{ width: "20%" }}>
                    {getChatImage(npcId, npcMood) &&
                        <img src={getChatImage(npcId, npcMood)} style={{
                            width: "100%",
                            height: "auto"
                        }} />
                    }
                </div>
            </div>
        )
    } else if (type === 2) {
        return (
            <div style={{ border: "1px solid #00FF00", display: "flex", alignItems: "stretch" }}>
                <div style={{ width: "20%" }}>
                    {getChatImage(npcId, npcMood) &&
                        <img src={getChatImage(npcId, npcMood)} style={{
                            width: "100%",
                            height: "auto"
                        }} />
                    }
                </div>
                <div style={{
                    width: "80%",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    gap: 2,
                    padding: 5,
                }}>
                    <WordContainer text={text} editScreen={"history"} messageId={id} />
                </div>

            </div>
        )
    } else {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ border: "1px solid #00FF00", width: "80%", height: "100%", justifyContent: "center", alignItems: "flex-start", display: "flex", flexDirection: "column", padding: 5 }}>
                    <span>{text && typeof text === "string" && text.split(":")[0]}:</span>
                    <span>{text && typeof text === "string" && getEvidenceNames(text.split(":")[1])}</span>
                </div>

            </div>
        )
    }
};

export default ChatMessage;
