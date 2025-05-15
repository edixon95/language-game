import EvidenceContainer from "./EvidenceContainer";
import AlienContainer from "./AlienContainer";

export const GameScreen = () => {
   

    return (
        <div style={{ display: "flex", border: "1px solid #00FF00", width: "65%", height: "100%" }}>
            <div style={{
                width: "60%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <EvidenceContainer />
            </div>

           <AlienContainer />

        </div>
    );
};
