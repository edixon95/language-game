import './App.css'
import { GameScreen } from './components/UI/GameScreen'
import { MissionPanel } from './components/UI/MissionPanel'
import { TextBox } from './components/UI/TextBox'
import { useEffect } from "react"

import { useGameStore } from "../src/store/useGameStore"
import monitorUI from "/assets/images/ui/monitor.png"
import background from "/assets/images/ui/background.png"

function App() {
    const {
        initGame,
        displayFirstInteraction
    } = useGameStore();


    useEffect(() => {
        initGame();
        displayFirstInteraction();
    }, []);

    return (
        <div style={{
            background: `url(${background})`,
            filter: "blur(1)"
        } }>
            <div
                style={{
                    position: 'relative',
                    width: "100%",
                    height: "100dvh",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    overflow: 'hidden',
                }}
            >
                {/* The monitor image */}
                <img
                    src={monitorUI}
                    alt="Monitor UI"
                    style={{
                        width: "100%",
                        height: "115%",
                        pointerEvents: "none",
                        zIndex: 2
                    }}
                />

                {/* The content inside the monitor screen */}
                <div
                    style={{
                        position: 'absolute',
                        top: '5%',
                        left: '13%',
                        width: '74.5%',
                        height: '96%',
                        zIndex: 1,
                        paddingLeft: "2%",
                        paddingRight: "2%",
                        paddingTop: "1%",
                        paddingBottom: "7%"
                    }}
                    className="missionPanel"
                >
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        overflow: "hidden",
                        gap: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <div style={{
                            display: "flex",
                            width: "95%",
                            height: "75%",
                            justifyContent: "center",
                            gap: 10
                        }}>
                            <GameScreen />
                            <MissionPanel />
                        </div>
                        <div style={{
                            display: "flex",
                            height: "20%",
                            border: "1px solid #00FF00",
                            width: "95%"
                        }}>
                            <TextBox />
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default App
