import { create } from 'zustand'
import type { Word, DialogueNode, DialogueOption, Message, Evidence, Puzzle } from "../types/index"
import { dialogueText } from "../data/dialogues/dialogueText"
import { dialogueOptions } from "../data/dialogues/dialogueOptions"
import { words } from "../data/words/words"
import { evidenceOptions } from '../data/evidence/evidenceOptions'
import { puzzleOptions } from '../data/puzzle/puzzleOptions'

interface GameState {
    gameScreen: string;
    panelScreen: string;
    wordList: Word[];
    evidenceList: Evidence[];
    puzzleList: Puzzle[];
    currentNPCState?: {
        dialogueId: number;
        dialogueNode: DialogueNode;
        wordsToSay?: number;
    };
    dialogueList: DialogueOption[];
    options?: DialogueOption[];
    chatHistory?: Message[];
    lastHistoryUpdate: string | undefined;
    wordState?: {
        messageId: number;
        wordId: number;
        translation?: string | null;
        editScreen: string | null;
        wordIndex?: string | null
    };
    evidenceState?: {
        evidenceId: number;
        puzzleId?: number;
    };
    setWordList: (words: Word[]) => void;
    setCurrentNPCState: (state: { dialogueId: number; dialogueNode: DialogueNode }) => void;
    initGame: () => void;
    displayFirstInteraction: () => void;
    selectNextInteraction: (nodeId: number, optionId: number) => void;
    createOptions: () => void;
    selectOption: (index: number) => void;
    selectWordDefinition: (wordId: number, messageId: number, screen: string, wordIndex: number) => void;
    updateWordDefinition: (definition: string, wordId: number) => void;
    selectEvidence: (evidenceId: number) => void;
    updateEvidence: (evidenceId: number, name: null | string, notes: null | string) => void;
    deselectEvidence: () => void;
    selectPanelScreen: (screen: string) => void;
}

const updateWordListWithFoundWords = (wordList: Word[], text: number[]): Word[] => {
    let count = wordList.filter((x) => x.isFound).length
    return wordList.map(word => {
        if (text.includes(word.id)) {
            count++
            return { ...word, isFound: true, orderFound: count };
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
        id: history.length + 1,
        type: type,
        npcId: npcId,
        npcMood: npcMood,
        text: text
    };

    while (history.length >= 7) {
        history.shift();
    }

    history.push(newMessage);

    return history;
}

export const useGameStore = create<GameState>((set, get) => ({
    gameScreen: "game",
    panelScreen: "history",
    wordList: [],
    evidenceList: [],
    puzzleList: [],
    currentNPCState: undefined,
    dialogueList: [],
    chatHistory: [],
    lastHistoryUpdate: new Date().toISOString(),
    wordState: {
        messageId: 0,
        wordId: 0,
        translation: "",
        editScreen: null,
        wordIndex: ""
    },
    evidenceState: {
        evidenceId: 0,
        puzzleId: 0,
    },

    setWordList: (words) => set({ wordList: words }),
    setCurrentNPCState: (state) => set({ currentNPCState: state }),

    initGame: () => {
        const initializedWords = words.map((word) => ({
            ...word,
            isFound: false,
        }));

        const initializedEvidence = evidenceOptions.map((evidence) => ({
            ...evidence,
            isFound: false,
            isViewed: false
        }));

        const initializedPuzzles = puzzleOptions.map((puzzle) => ({
            ...puzzle,
            isSolved: false
        }));

        set({
            wordList: initializedWords,
            evidenceList: initializedEvidence,
            puzzleList: initializedPuzzles,
            dialogueList: dialogueOptions
        });
    },

    displayFirstInteraction: () => {
        const startNode = dialogueText.find((x) => x.id === 1);
        if (!startNode) return;

        const updatedWordList = updateWordListWithFoundWords(get().wordList, startNode.text);

        const dialogueList = get().dialogueList
        const optionsToDisplay = dialogueList.filter(option =>
            startNode.choices.includes(option.id) &&
            areWordsFoundForOptions(updatedWordList, option.text)
        );

        const initialHistory: Message[] = []
        const newHistory: Message[] = buildHistoryMessage(startNode.text, 2, 2, 2, initialHistory)

        set(state => {
            const hasWordListChanged = updatedWordList.some((word, index) => word.isFound !== state.wordList[index]?.isFound);
            if (hasWordListChanged || state.currentNPCState?.dialogueId !== 1) {
                return {
                    currentNPCState: { dialogueId: 1, dialogueNode: startNode, wordsToSay: startNode.text.length },
                    wordList: updatedWordList.sort((a, b) => {
                        if (a.orderFound == null) return 1;
                        if (b.orderFound == null) return -1;
                        return a.orderFound - b.orderFound;
                    }),
                    options: optionsToDisplay,
                    chatHistory: newHistory,
                    lastHistoryUpdate: new Date().toISOString()
                };
            }
            return {}; // No state change
        });
    },

    selectNextInteraction: (nodeId, optionId) => {
        const dialogueList = get().dialogueList
        const selectedOption = dialogueList.find((x) => x.id === optionId);
        const selectedOptionIndex = dialogueList.findIndex((x) => x.id === optionId);
        dialogueList[selectedOptionIndex].isSeen = true;

        console.log(selectedOption)
        const nextNode = dialogueText.find((x) => x.id === nodeId);
        if (!nextNode || !selectedOption) return;

        const updatedWordList = updateWordListWithFoundWords(get().wordList, nextNode.text);

        const optionsToDisplay = dialogueList.filter(option =>
            nextNode.choices.includes(option.id) &&
            areWordsFoundForOptions(updatedWordList, option.text)
        );


        // Flow will always be user response -> new node -> additional info
        // Add player history and update before anything else so that text elements have time to be noticed
        const { chatHistory = [] } = get();
        const { evidenceList = [] } = get();
        let newHistory: Message[] = buildHistoryMessage(selectedOption.text, 1, null, null, chatHistory)


        // Not sure how I feel about this, options should 100% be hidden on click until something new is placed
        // However I'm not sure if removing the NPC here to do the chat looks okay or not
        //set(() => {
        //    return {
        //        chatHistory: newHistory,
        //        options: [],
        //    };
        //});

        set(() => {
            return {
                chatHistory: newHistory,
                options: [],
                currentNPCState: undefined,
                lastHistoryUpdate: new Date().toISOString(),
                dialogueList: dialogueList
            };
        });

        setTimeout(() => {
            newHistory = buildHistoryMessage(nextNode.text, 2, 2, 3, newHistory)
            if (nextNode.evidence && nextNode.evidence.length > 0) {
                // Make sure to add all the evidence 
                const newEvidence: number[] = []
                const oldEvidence: number[] = []
                let evidenceCount = evidenceList.filter((x) => x.isFound).length

                nextNode.evidence.forEach((ev) => {
                    const evIndex = evidenceList.findIndex((x) => x.id === ev)
                    if (evidenceList[evIndex].isFound) {
                        oldEvidence.push(evidenceList[evIndex].id!)
                    } else {
                        evidenceList[evIndex].isFound = true;
                        ++evidenceCount
                        evidenceList[evIndex].orderFound = evidenceCount;
                        evidenceList[evIndex].name = `Document ${evidenceCount}`
                        newEvidence.push(evidenceList[evIndex].id!)
                    }
                })
                if (newEvidence.length > 0) {
                    let evidenceString = `New documents: ${newEvidence.join(", ")}`
                    newHistory = buildHistoryMessage(evidenceString, 3, null, null, newHistory)
                }

                if (oldEvidence.length > 0) {
                    let evidenceString = `Mentioned documents: ${oldEvidence.join(", ")}`
                    newHistory = buildHistoryMessage(evidenceString, 3, null, null, newHistory)
                }

            }

            evidenceList.sort((a, b) => a.orderFound - b.orderFound);

            set(state => {
                const hasWordListChanged = updatedWordList.some((word, index) => word.isFound !== state.wordList[index]?.isFound);
                if (hasWordListChanged || state.currentNPCState?.dialogueId !== nodeId) {
                    return {
                        currentNPCState: { dialogueId: nodeId, dialogueNode: nextNode, wordsToSay: nextNode.text.length },
                        wordList: updatedWordList.sort((a, b) => {
                            if (a.orderFound == null) return 1;
                            if (b.orderFound == null) return -1;
                            return a.orderFound - b.orderFound;
                        }),
                        options: optionsToDisplay,
                        evidenceList: evidenceList,
                        chatHistory: newHistory,
                        lastHistoryUpdate: new Date().toISOString()
                    };
                }
                return {}; // No state change
            });
        }, 2000)
    },

    createOptions: () => {
        const { currentNPCState, wordList } = get();
        if (!currentNPCState?.dialogueNode.choices) return;
        const dialogueList = get().dialogueList
        const filteredOptions = dialogueList.filter(option =>
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
    },

    selectWordDefinition: (wordId: number, messageId: number, screen: string, wordIndex: number) => {
        const { wordList } = get();
        const selectedWord = wordList.find((x) => x.id === wordId)
        if (!selectedWord) return;

        set(() => ({
            wordState: {
                wordId: wordId,
                messageId: messageId,
                translation: selectedWord.playerTranslation ? selectedWord.playerTranslation : "",
                editScreen: screen,
                wordIndex: String(wordIndex)
            }
        }));
    },

    updateWordDefinition: (definition, wordId) => {
        const { wordList } = get();
        const wordIndex: number = wordList.findIndex((x) => x.id === wordId);
        if (wordIndex === -1) return;
        wordList[wordIndex].playerTranslation = definition;

        set(() => {
            return {
                wordList: wordList,
                wordState: {
                    wordId: 0,
                    messageId: 0,
                    translation: "",
                    editScreen: "",
                    wordIndex: ""
                },
                lastHistoryUpdate: new Date().toISOString()
            };
        });
    },

    selectEvidence: (evidenceId: number) => {
        const { evidenceList } = get();
        const evidenceIndex = evidenceList.findIndex((x) => x.id === evidenceId);
        if (evidenceIndex === -1) return;

        evidenceList[evidenceIndex].isViewed = true;
        const puzzleId = evidenceList[evidenceIndex].puzzle ? evidenceList[evidenceIndex].puzzle : 0;


        const updatedWordList = updateWordListWithFoundWords(get().wordList, evidenceList[evidenceIndex].text ?? []);
        const currentNode = dialogueText.find((x) => x.id === get().currentNPCState?.dialogueId);

        let optionsToDisplay = get().options
        const dialogueList = get().dialogueList
        if (currentNode) {
            optionsToDisplay = dialogueList.filter(option =>
                currentNode.choices.includes(option.id) &&
                areWordsFoundForOptions(updatedWordList, option.text)
            );
        };

        set(() => ({
            evidenceState: {
                evidenceId,
                puzzleId
            },
            wordList: updatedWordList.sort((a, b) => {
                if (a.orderFound == null) return 1;
                if (b.orderFound == null) return -1;
                return a.orderFound - b.orderFound;
            }),
            options: optionsToDisplay,
            evidenceList: evidenceList,
            lastHistoryUpdate: new Date().toISOString()
        }));
    },

    updateEvidence: (evidenceId: number, name: string | null, notes: string | null) => {
        const { evidenceList } = get();
        const evidenceIndex = evidenceList.findIndex((x) => x.id === evidenceId);
        if (evidenceIndex === -1) return;

        evidenceList[evidenceIndex].name = name ?? undefined;
        evidenceList[evidenceIndex].notes = notes ?? undefined;

        set(() => ({
            evidenceList: evidenceList,
            lastHistoryUpdate: new Date().toISOString()
        }));
    },

    deselectEvidence: () => {
        set(() => ({
            evidenceState: {
                evidenceId: 0,
                puzzleId: 0
            },
        }));
    },

    selectPanelScreen: (screen: string) => {
        set(() => ({
            panelScreen: screen
        }));
    }


}));
