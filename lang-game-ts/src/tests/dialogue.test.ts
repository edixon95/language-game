import { dialogueText } from '../data/dialogues/dialogueText';
import { dialogueOptions } from '../data/dialogues/dialogueOptions';
import { words } from '../data/words/words';

// Helper function to find a dialogue node by its ID
const getDialogueNodeById = (id: number) => dialogueText.find((node) => node.id === id);

// Helper function to find a dialogue option by its ID
const getDialogueOptionById = (id: number) => dialogueOptions.find((option) => option.id === id);

describe('Dialogue System', () => {
    it('All dialogueText is reachable from dialogueOptions', () => {
        dialogueOptions.forEach(option => {
            const nextNodeId = option.nextNode;

            if (typeof nextNodeId !== "number") {
                fail(`Expected nextNodeId to be a number, but got ${typeof nextNodeId}`);
                return;
            }

            const nextNode = getDialogueNodeById(nextNodeId);

            expect(nextNode).toBeDefined();
        });
    });

    it('All dialogueOptions are reachable from dialogueText', () => {
        dialogueText.forEach(node => {
            node.choices.forEach(choiceId => {
                const option = getDialogueOptionById(choiceId);
                expect(option).toBeDefined();
            });
        });
    });

    it('All words are used in dialogueText and dialogueOptions', () => {
        const allWordsUsed = new Set();

        // Add words from dialogueText
        dialogueText.forEach(node => {
            node.text.forEach(wordId => {
                const word = words.find(w => w.id === wordId);
                if (word) {
                    word.meaning.forEach(wordMeaning => {
                        allWordsUsed.add(wordMeaning);
                    });
                }
            });
        });

        // Add words from dialogueOptions
        dialogueOptions.forEach(option => {
            option.text.forEach(wordId => {
                const word = words.find(w => w.id === wordId);
                if (word) {
                    word.meaning.forEach(wordMeaning => {
                        allWordsUsed.add(wordMeaning);
                    });
                }
            });
        });

        // Check that all words in the `words` list are used
        words.forEach(word => {
            word.meaning.forEach(wordMeaning => {
                expect(allWordsUsed.has(wordMeaning)).toBe(true);
            });
        });
    });
});
