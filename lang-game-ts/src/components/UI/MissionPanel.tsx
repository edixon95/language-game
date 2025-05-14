import { useGameStore } from "../../store/useGameStore";
import ChatHistory from "./ChatHistory";
import Dictionary from "./Dictionary";
import UIButtons from "./UIButtons";
import React, { useEffect, useState } from "react"


type PanelType = "history" | "dictionary";

// 2. Define the mapping type
const panels: Record<PanelType, React.ReactElement> = {
    history: <ChatHistory />,
    dictionary: <Dictionary />
};

export const MissionPanel = () => {
    const panelScreen = useGameStore((s) => s.panelScreen as PanelType);

    const [screenPanel, setScreenPanel] = useState<React.ReactElement>(<ChatHistory />);

    useEffect(() => {
        setScreenPanel(panels[panelScreen]);
    }, [panelScreen]);


    return (
        <div style={{ width: "35%", border: "1px solid #00FF00" }} >
            <div style={{ height: "90%" }}>
                {screenPanel}
            </div>
            <UIButtons />
        </div>
    );
};
