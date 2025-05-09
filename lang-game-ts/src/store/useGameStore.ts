import { create } from 'zustand'
import type { Word, DialogueNode, DialogueOption } from "../types/index"
import { dialogueText } from "../data/dialogues/dialogueText"
import { dialogueOptions } from "../data/dialogues/dialogueOptions"
import { words } from "../data/words/words"

interface GameState {
    wordList: Word[];
    currentNPCState?: {
        dialogueId: number;
        dialogueNode: DialogueNode;
    };
    options?: DialogueOption[];
    setWordList: (words: Word[]) => void;
    setCurrentNPCState: (state: { dialogueId: number; dialogueNode: DialogueNode }) => void;
    initGame: () => void;
    displayFirstInteraction: () => void;
    selectNextInteraction: (nodeId: number) => void;
    createOptions: () => void;
    selectOption: (index: number) => void;
}

const updateWordListWithFoundWords = (wordList: Word[], text: number[]): Word[] => {
    return wordList.map(word => {
        if (text.includes(word.id)) {
            return { ...word, isFound: true };
        }
        return word;
    });
};

// Helper function to check if all words for options are found
const areWordsFoundForOptions = (wordList: Word[], optionText: number[]): boolean => {
    return optionText.every(wordId =>
        wordList.find(w => w.id === wordId)?.isFound
    );
};

export const useGameStore = create<GameState>((set, get) => ({
    wordList: [],
    currentNPCState: undefined,

    setWordList: (words) => set({ wordList: words }),
    setCurrentNPCState: (state) => set({ currentNPCState: state }),

    initGame: () => {
        const initializedWords = words.map((word, i) => ({
            ...word,
            image: `../src/assets/images/language/${i + 1}.png`,
            isFound: false,
        }));
        set({ wordList: initializedWords });
    },

    displayFirstInteraction: () => {
        const startNode = dialogueText.find((x) => x.id === 1);
        if (!startNode) return;

        const updatedWordList = updateWordListWithFoundWords(get().wordList, startNode.text);

        const optionsToDisplay = dialogueOptions.filter(option =>
            startNode.choices.includes(option.id) &&
            areWordsFoundForOptions(updatedWordList, option.text)
        );

        set(state => {
            const hasWordListChanged = updatedWordList.some((word, index) => word.isFound !== state.wordList[index]?.isFound);
            if (hasWordListChanged || state.currentNPCState?.dialogueId !== 1) {
                return {
                    currentNPCState: { dialogueId: 1, dialogueNode: startNode },
                    wordList: updatedWordList,
                    options: optionsToDisplay
                };
            }
            return {}; // No state change
        });
    },

    selectNextInteraction: (nodeId) => {
        const nextNode = dialogueText.find((x) => x.id === nodeId);
        if (!nextNode) return;

        const updatedWordList = updateWordListWithFoundWords(get().wordList, nextNode.text);

        const optionsToDisplay = dialogueOptions.filter(option =>
            nextNode.choices.includes(option.id) &&
            areWordsFoundForOptions(updatedWordList, option.text)
        );

        set(state => {
            const hasWordListChanged = updatedWordList.some((word, index) => word.isFound !== state.wordList[index]?.isFound);
            if (hasWordListChanged || state.currentNPCState?.dialogueId !== nodeId) {
                return {
                    currentNPCState: { dialogueId: nodeId, dialogueNode: nextNode },
                    wordList: updatedWordList,
                    options: optionsToDisplay
                };
            }
            return {}; // No state change
        });
    },

    createOptions: () => {
        const { currentNPCState, wordList } = get();
        if (!currentNPCState?.dialogueNode.choices) return;

        const filteredOptions = dialogueOptions.filter(option =>
            currentNPCState.dialogueNode.choices.includes(option.id) &&
            option.text.every(wordId =>
                wordList.find(w => w.id === wordId)?.isFound
            )
        );

        set(state => {
            if (state.options !== filteredOptions) {
                return { options: filteredOptions };
            }
            return {}; // No state change
        });
    },

    selectOption: (index) => {
        const { options, selectNextInteraction } = get();
        const nextNode = options?.[index]?.nextNode;
        if (typeof nextNode !== 'number') return;

        selectNextInteraction(nextNode);
    }

}));
