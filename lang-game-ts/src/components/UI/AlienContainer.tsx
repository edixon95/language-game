import alienImage from "/assets/images/alien/alien-content-noeyes.png"
import alienEyes from "/assets/images/alien/alien-eyes.png"
import alienLeftEyelid from "/assets/images/alien/alien-left-eyelid.png"
import alienRightEyelid from "/assets/images/alien/alien-right-eyelid.png"
import { useEffect, useState } from "react"

const AlienContainer = () => {
    const [isBlink, setIsBlink] = useState(false)

    useEffect(() => {
        let blinkTimeout: NodeJS.Timeout

        const scheduleBlink = () => {
            const delay = Math.random() * (20000 - 7000) + 7000

            blinkTimeout = setTimeout(() => {
                setIsBlink(true)
                setTimeout(() => {
                    setIsBlink(false)
                    scheduleBlink()
                }, 300)
            }, delay)
        }

        scheduleBlink()

        return () => clearTimeout(blinkTimeout) 
    }, [])

    return (
        <div className="missionPanelImage" style={{ width: "40%", position: "relative" }}>
            <img src={alienImage} alt="Alien" className="missionImageTag" style={{ position: "absolute", zIndex: 3 }} />
            <img src={alienEyes} alt="Alien Eyes" className="missionImageTag" style={{ position: "absolute", zIndex: 1 }} />
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
