import { useEffect, useRef } from "react";
import { useGameStore } from "../../store/useGameStore";
import ChatMessage from "./ChatMessage";

const ChatHistory = () => {

    const chatHistory = useGameStore((s) => s.chatHistory)
    const lastHistoryUpdate = useGameStore((s) => s.lastHistoryUpdate)

    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lastHistoryUpdate]);

    return (
        <div
            ref={scrollRef}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                height: "100%",
                overflow: "auto",
                padding: 10
            }}>
            {chatHistory && chatHistory.length > 0 ?
                chatHistory.map((history) => {
                    return (
                        <ChatMessage
                            key={history.id}
                            type={history.type}
                            npcId={history.npcId}
                            npcMood={history.npcMood}
                            text={history.text}
                            id={history.id}
                        />
                    )
                }) : <div>No history to display</div>
            }
        </div>
    )
}

export default ChatHistory