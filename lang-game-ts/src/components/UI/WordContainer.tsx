import WordSymbol from "./WordSymbol";
import WordInput from "./WordInput"
import { useGameStore } from "../../store/useGameStore";


interface WordContainerProps {
    text: number[] | string;
    editScreen: string;
    messageId: number;
}

const WordContainer = ({ text, editScreen, messageId }: WordContainerProps) => {
    const wordList = useGameStore((s) => s.wordList)
    const selectWordDefinition = useGameStore((s) => s.selectWordDefinition)

    const getUserInput = (id: number) => {
        return wordList.find((x) => x.id === id)?.playerTranslation
    }

    const getWordSymbol = (id: number) => {
        return wordList.find((x) => x.id === id)?.image
    }

    return (
        <div style={{ height: "100%" }}>
            {typeof text === "string" ?
                <div style={{ height: "100%" }}>
                    <WordSymbol symbol={text} />
                </div>
                :
                <div style={{ height: "100%", display: "flex" }}>
                    {text && text.length > 0 &&
                        text.map((t, index) => {
                            return (
                                <div key={index} style={{ height: "100%", alignItems: "center", justifyContent: "center" }} onClick={() => selectWordDefinition(t, messageId,"history")}>
                                    <WordSymbol symbol={getWordSymbol(t)} />
                                    <WordInput word={getUserInput(t)} editScreen={editScreen} wordId={t} messageId={messageId} />
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default WordContainer;
