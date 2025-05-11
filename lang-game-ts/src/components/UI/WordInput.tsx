import { useEffect, useState } from "react";
import { useGameStore } from "../../store/useGameStore";

interface WordInputProps {
    word: string | undefined;
    editScreen: string;
    wordId: number;
    messageId: number;
}

const WordInput = ({ word, editScreen, wordId, messageId }: WordInputProps) => {
    const wordState = useGameStore((s) => s.wordState);
    const updateWordDefinition = useGameStore((s) => s.updateWordDefinition)
    const [wordStateComp, setWordStateComp] = useState({
        translation: "",
        wordId: 0,
        messageId: 0,
        editScreen: ""
    });

    useEffect(() => {
        if (wordState) {
            setWordStateComp({
                translation: wordState.translation || "",
                wordId: wordState.wordId || 0,
                messageId: wordState.messageId || 0,
                editScreen: wordState.editScreen || ""
            });
        }
    }, [wordState]);

    const handleBlur = () => {
        updateWordDefinition(wordStateComp.translation, wordStateComp.wordId)
        setWordStateComp({
            translation: "",
            wordId: 0,
            messageId: 0,
            editScreen: ""
        })
    }

    return (
        <div style={{ textAlign: "center" }}>
            {wordStateComp.editScreen === editScreen && wordStateComp.wordId !== 0 && wordStateComp.wordId === wordId && wordStateComp.messageId === messageId ?
                <input
                    value={wordStateComp.translation}
                    onChange={(e) => setWordStateComp({ ...wordStateComp, translation: e.target.value })}
                    onBlur={handleBlur}
                /> :
                word ? word : "___"
            }
        </div>
    );
}

export default WordInput;
