import { useEffect, useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import InputBox from "./InputBox";

interface WordInputProps {
    word: string | undefined;
    editScreen: string;
    wordId: number;
    messageId: number;
    index: number;
}

const WordInput = ({ word, editScreen, wordId, messageId, index }: WordInputProps) => {
    const wordState = useGameStore((s) => s.wordState);
    const updateWordDefinition = useGameStore((s) => s.updateWordDefinition)
    const [wordStateComp, setWordStateComp] = useState<{
        translation: string;
        wordId: number;
        messageId: number;
        editScreen: string;
        wordIndex: string | null;
    }>({
        translation: "",
        wordId: 0,
        messageId: 0,
        editScreen: "",
        wordIndex: null
    });



    useEffect(() => {
        if (wordState) {
            setWordStateComp({
                translation: wordState.translation ?? "",
                wordId: wordState.wordId ?? 0,
                messageId: wordState.messageId ?? 0,
                editScreen: wordState.editScreen ?? "",
                wordIndex: wordState.wordIndex ?? null
            });
        }

        
    }, [wordState]);


    const shouldFocus = () => {
        if (wordStateComp.editScreen === editScreen &&
            wordStateComp.wordId !== 0 &&
            wordStateComp.wordId === wordId &&
            wordStateComp.messageId === messageId &&
            wordStateComp.wordIndex !== null && index === Number(wordStateComp.wordIndex)
        ) {
            return true
        }

        return false;
    }

    const handleBlur = () => {
        updateWordDefinition(wordStateComp.translation, wordStateComp.wordId)
        setWordStateComp({
            translation: "",
            wordId: 0,
            messageId: 0,
            editScreen: "",
            wordIndex: null
        })
    }

    return (
        <div style={{ textAlign: "center" }}>
            {wordStateComp.editScreen === editScreen && wordStateComp.wordId !== 0 && wordStateComp.wordId === wordId && wordStateComp.messageId === messageId && wordStateComp.wordIndex !== null && index === Number(wordStateComp.wordIndex) ?
                <InputBox
                    wordStateComp={wordStateComp}
                    setWordStateComp={setWordStateComp}
                    handleBlur={handleBlur}
                    shouldFocus={shouldFocus()}
                /> :
                word ? word : "___"
            }
        </div>
    );
}

export default WordInput;
