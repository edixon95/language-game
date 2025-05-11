import { create } from 'zustand'
import type { Word, DialogueNode, DialogueOption, Message } from "../types/index"
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
    chatHistory?: Message[];
    setWordList: (words: Word[]) => void;
    setCurrentNPCState: (state: { dialogueId: number; dialogueNode: DialogueNode }) => void;
    initGame: () => void;
    displayFirstInteraction: () => void;
    selectNextInteraction: (nodeId: number, optionId: number) => void;
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

const buildHistoryMessage = (text: string | number[], type: number, npcId: null | number, npcMood: null | number, history: Message[]): Message[] => {
    const newMessage: Message = {
        type: type,
        npcId: npcId,
        npcMood: npcMood,
        text: text
    };

    while (history.length >= 5) {
        history.shift();
    }

    history.push(newMessage);

    return history;
}

export const useGameStore = create<GameState>((set, get) => ({
    wordList: [],
    currentNPCState: undefined,
    chatHistory: [],

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

        const initialHistory: Message[] = []
        const newHistory: Message[] = buildHistoryMessage(startNode.text, 2, 2, 2, initialHistory)

        set(state => {
            const hasWordListChanged = updatedWordList.some((word, index) => word.isFound !== state.wordList[index]?.isFound);
            if (hasWordListChanged || state.currentNPCState?.dialogueId !== 1) {
                return {
                    currentNPCState: { dialogueId: 1, dialogueNode: startNode },
                    wordList: updatedWordList,
                    options: optionsToDisplay,
                    chatHistory: newHistory
                };
            }
            return {}; // No state change
        });
    },

    selectNextInteraction: (nodeId, optionId) => {
        const selectedOption = dialogueOptions.find((x) => x.id === optionId)
        const nextNode = dialogueText.find((x) => x.id === nodeId);
        if (!nextNode || !selectedOption) return;

        const updatedWordList = updateWordListWithFoundWords(get().wordList, nextNode.text);

        const optionsToDisplay = dialogueOptions.filter(option =>
            nextNode.choices.includes(option.id) &&
            areWordsFoundForOptions(updatedWordList, option.text)
        );


        // Flow will always be user response -> new node -> additional info
        // Add player history and update before anything else so that text elements have time to be noticed
        const { chatHistory = [] } = get();
        let newHistory: Message[] = buildHistoryMessage(selectedOption.text, 1, null, null, chatHistory)

        set(() => {
            return {
                options: optionsToDisplay
            };
        });

        setTimeout(() => {
            newHistory = buildHistoryMessage(nextNode.text, 2, 2, 3, newHistory)
            if (nextNode.evidence && nextNode.evidence.length > 0) {
                newHistory = buildHistoryMessage("Evidence Added", 3, null, null, newHistory)
            }

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
        }, 2000)
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
        const optionId = options?.[index].id
        if (typeof nextNode !== 'number' || typeof optionId !== 'number') return;

        selectNextInteraction(nextNode, optionId);
    }

}));
