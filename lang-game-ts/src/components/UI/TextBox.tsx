import { useGameStore } from "../../store/useGameStore";
import WordContainer from "./WordContainer";
import ConfirmIcon from "../../assets/images/ui/icons/confirm-icon.png"

export const TextBox = () => {
    const currentNPCState = useGameStore((s) => s.currentNPCState);
    const options = useGameStore((s) => s.options);
    const selectOption = useGameStore((s) => s.selectOption);

    console.log(options)

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between", paddingLeft: 10, paddingRight :10 }}>
            <div style={{
                width: "45%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <WordContainer
                    text={currentNPCState?.dialogueNode.text ?? ""}
                    editScreen={"textDialogue"}
                    messageId={99999999}
                />
            </div>
            <div style={{
                display: "flex",
                gap: 10,
                width: "45%",
                flexDirection: "column",
                height: "100%",
                overflow: "auto",
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 10
            }}>
                {options && options.length > 0 &&
                    options.map((op, index) => (
                        <div key={index} style={{ border: "1px solid #00FF00", display: "flex", justifyContent: "center", position: "relative" }}>
                            <WordContainer
                                text={op.text}
                                editScreen={"textReply"}
                                messageId={Number(`9999999${index}`)}
                            />
                            <img src={ConfirmIcon} style={{ width: 20, height: 20, cursor: "pointer", position: "absolute", right: 10, top: "40%" }}
                                onClick={() => selectOption(index)}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}