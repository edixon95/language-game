import alienImage from "/assets/images/alien/alien-content-noeyes.png"
import alienEyes from "/assets/images/alien/alien-eyes.png"
import alienLeftEyelid from "/assets/images/alien/alien-left-eyelid.png"
import alienRightEyelid from "/assets/images/alien/alien-right-eyelid.png"
import alienMouthOpen from "/assets/images/alien/alien-mouth-open.png"

import { useEffect, useState } from "react"
import { useGameStore } from "../../store/useGameStore"

const AlienContainer = () => {
    const [isBlink, setIsBlink] = useState<boolean>(false)
    const [isSpeak, setIsSpeak] = useState<boolean>(false);

    const currentNPCState = useGameStore((s) => s.currentNPCState);

    useEffect(() => {
        let blinkTimeout: NodeJS.Timeout;

        const scheduleBlink = () => {
            const delay = Math.random() * (16000 - 7000) + 7000;

            blinkTimeout = setTimeout(() => {
                setIsBlink(true);
                setTimeout(() => {
                    setIsBlink(false);
                    scheduleBlink();
                }, 350);
            }, delay);
        };

        scheduleBlink();

        return () => clearTimeout(blinkTimeout);
    }, [])

    useEffect(() => {
        if (!currentNPCState?.wordsToSay || currentNPCState.wordsToSay === 0) return;

        let speakTimeout: NodeJS.Timeout;
        let toggleCount = 0;
        const totalToggles = currentNPCState.wordsToSay * 2; 
        const toggleSpeak = () => {
            setIsSpeak(prev => !prev);
            toggleCount++;

            if (toggleCount < totalToggles) {
                speakTimeout = setTimeout(toggleSpeak, 200);
            } else {
                setIsSpeak(false);
            }
        };

        toggleSpeak();

        return () => {
            clearTimeout(speakTimeout);
            setIsSpeak(false);
        };
    }, [currentNPCState?.wordsToSay]);

    return (
        <div className="missionPanelImage" style={{ width: "40%", position: "relative" }}>
            <img src={alienImage} alt="Alien" className="missionImageTag" style={{ position: "absolute", zIndex: 3 }} />
            <img src={alienEyes} alt="Alien Eyes" className="missionImageTag" style={{ position: "absolute", zIndex: 1 }} />
            <img
                src={alienMouthOpen}
                alt="Alien Left Eyelid"
                className="missionImageTag"
                style={{ position: "absolute", zIndex: 3, display: isSpeak ? "initial" : "none" }}
            />
            <img
                src={alienLeftEyelid}
                alt="Alien Left Eyelid"
                className="missionImageTag"
                style={{ position: "absolute", zIndex: 2, display: isBlink ? "initial" : "none" }}
            />
            <img
                src={alienRightEyelid}
                alt="Alien Right Eyelid"
                className="missionImageTag"
                style={{ position: "absolute", zIndex: 2, display: isBlink ? "initial" : "none" }}
            />
        </div>
    )
}

export default AlienContainer
