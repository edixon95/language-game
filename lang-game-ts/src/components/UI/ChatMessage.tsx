import type { Message } from "../../types/index"; // adjust path as needed
import { chatIcons } from "../../data/dialogues/chatIcons"
import WordContainer from "./WordContainer";

const ChatMessage = ({ type, npcId, npcMood, text, id }: Message) => {

    const getChatImage = (id: number | null, mood: number | null): string => {
        if (id === null || mood === null) return chatIcons[2][4];

        const icon = chatIcons[id][mood];
        return icon
    };

    if (type === 1) {
        return (
            <div style={{ border: "1px solid #00FF00", display: "flex", alignItems: "stretch" }}>
                <div style={{
                    width: "70%",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    gap: 2,
                    padding: 5,
                    
                }}>
                    <span style={{ wordWrap: "break-word", height: "20%" }}>
                        <WordContainer text={text} editScreen={"history"} messageId={id} />
                    </span>
                </div>
                <div style={{ width: "30%" }}>
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
                <div style={{ width: "30%" }}>
                    {getChatImage(npcId, npcMood) &&
                        <img src={getChatImage(npcId, npcMood)} style={{
                            width: "100%",
                            height: "auto"
                        }} />
                    }
                </div>
                <div style={{
                    width: "70%",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    gap: 2,
                    padding: 5,
                }}>
                    <span style={{ wordWrap: "break-word", height: "20%" }}>
                        <WordContainer text={text} editScreen={"history"} messageId={id} />
                    </span>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{ display: "flex", minHeight: "10%", justifyContent: "center", alignItems: "center" }}>
                <div style={{ border: "1px solid #00FF00", width: "58%", height: "100%", justifyContent: "center", alignItems: "center", display: "flex" }}>
                    {text}
                </div>

            </div>
        )
    }
};

export default ChatMessage;
