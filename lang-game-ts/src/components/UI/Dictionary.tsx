import { useGameStore } from "../../store/useGameStore";
import WordContainer from "./WordContainer";
import { useState, useEffect } from "react"

const Dictionary = () => {

    const wordList = useGameStore((s) => s.wordList)
    const lastHistoryUpdate = useGameStore((s) => s.lastHistoryUpdate)
    const [words, setWords] = useState(wordList)

    useEffect(() => {
        setWords(wordList)
    }, [lastHistoryUpdate])

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                overflow: "auto",
                padding: 10
            }}>
            {words && words.length > 0 && words.filter((x) => x.isFound).length > 0 &&
                words.filter((x) => x.isFound).map((word, index) => {
                    return (
                        <WordContainer
                            text={[word.id]}
                            editScreen={"dictionary"}
                            messageId={Number(`111111111${index}`)}
                        />
                    )
                })
            }
        </div>
    )
}

export default Dictionary