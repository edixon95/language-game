import alienImage  from "../../assets/images/alien/alien.png"

export const GameScreen = () => {
    return (
        <div style={{ display: "flex", border: "1px solid #00FF00", width: "70%" }}>
            <div style={{
                width: "60%"
            }}>
                Evidence
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
