import { useGameStore } from "../../store/useGameStore"

const UIButtons = () => {
    const selectPanelScreen = useGameStore((s) => s.selectPanelScreen)

    const uiButtons = [
        {
            screen: "history",
            view: "History"
        },
        {
            screen: "dictionary",
            view: "Dictionary"
        },
        {
            screen: "options",
            view: "Options"
        },
    ]

    return (
        <div style={{
            borderTop: "1px solid #00FF00",
            height: "10%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
        }}>
            {uiButtons && uiButtons.length > 0 &&
                uiButtons.map((x) => {
                    return (
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #00FF00",
                            width: "30%",
                            height: "80%",
                            cursor: "pointer"
                        }}
                            onClick={() => selectPanelScreen(x.screen)}
                        >
                            {x.view}
                        </div>
                    )
                })
            }

        </div>
    )
}

export default UIButtons