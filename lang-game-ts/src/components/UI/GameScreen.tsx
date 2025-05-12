import alienImage from "../../assets/images/alien/alien.png"
import EvidenceContainer from "./EvidenceContainer";

export const GameScreen = () => {
    return (
        <div style={{ display: "flex", border: "1px solid #00FF00", width: "70%", height: "100%" }}>
            <div style={{
                width: "60%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <EvidenceContainer />
            </div>
            <div style={{
                width: "40%",
                background: `url(${alienImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
                className="missionPanelImage"
            >
            </div>
        </div>
    );
};
