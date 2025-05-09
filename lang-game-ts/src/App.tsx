import './App.css'
import { GameScreen } from './components/UI/GameScreen'
import { MissionPanel } from './components/UI/MissionPanel'
import { TextBox } from './components/UI/TextBox'
import { useEffect } from "react"

import { useGameStore } from "../src/store/useGameStore"

function App() {
    const {
        initGame,
        currentNPCState,
        displayFirstInteraction
    } = useGameStore();


    useEffect(() => {
        initGame();
        displayFirstInteraction();
    }, []);


    console.log(currentNPCState)

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
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
                <MissionPanel linesToType={[
                    "How does this screen look?",
                    "I think maybe the text is a bit too slow for things that are long, but hey it gives time for you to see the tracking line",
                    "What tracking line?",
                    "Look, it's right there!"
                ]} />
            </div>
            <div style={{
                display: "flex",
                height: "20%",
                border: "1px solid black",
                width: "95%"
            }}>
                <TextBox />
            </div>
        </div>
    )
}

export default App
