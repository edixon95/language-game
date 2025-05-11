import { useGameStore } from "../../store/useGameStore";
import ChatMessage from "./ChatMessage";


export const MissionPanel = () => {

    const chatHistory = useGameStore((s) => s.chatHistory)

    return (
        <div style={{ width: "30%", border: "1px solid #00FF00", padding: 10 }} >
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                height: "100%",
                overflow: "auto"
            }}>
                {chatHistory && chatHistory.length > 0 ?
                    chatHistory.map((history) => {
                        return (
                            <ChatMessage
                                type={history.type}
                                npcId={history.npcId}
                                npcMood={history.npcMood}
                                text={history.text}
                            />
                        )
                    }) : <div>No history to display</div>
                }
            </div>
        </div>
    );
};
