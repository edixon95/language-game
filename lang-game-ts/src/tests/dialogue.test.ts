import { dialogueText } from '../data/dialogues/dialogueText';
import { dialogueOptions } from '../data/dialogues/dialogueOptions';
import { words } from '../data/words/words';

describe('Dialogue System', () => {
    it('All dialogueOptions have a nextNode', () => {
        dialogueOptions.forEach(option => {
            const isNumber = typeof option.nextNode === "number";
            expect(isNumber).toBeTruthy();
        });
    });

    it('All dialogueOptions has text', () => {
        dialogueOptions.forEach(option => {
            const hasText = option.text.length > 0;
            expect(hasText).toBeTruthy();
        });
    });

    it('All dialogueText has at least one choice', () => {
        dialogueText.forEach(node => {
            const hasChoices = node.choices.length > 0;
            expect(hasChoices).toBeTruthy();
        });
    });

    it('All dialogueText has text', () => {
        dialogueText.forEach(option => {
            const hasText = option.text.length > 0;
            expect(hasText).toBeTruthy();
        });
    });

    it('All dialogueText is reachable from a dialogueOption, not including dialogueText id:1', () => {
        const allNodesReached = new Set();

        dialogueOptions.forEach((node) => {
            allNodesReached.add(node.nextNode)
        });

        // First node is skipped as it's not reachable through the trees
        const unreachableIds = dialogueText.slice(1).map(x => x.id).filter(id => !allNodesReached.has(id));

        expect(unreachableIds).toEqual([]);
    });

    it('All dialogueOptions are reachable from a dialogueText choice', () => {
        const allNodesReached = new Set();

        dialogueText.forEach((node) => {
            node.choices.forEach((choiceId) => {
                allNodesReached.add(choiceId);
            });
        });

        const unreachableIds = dialogueOptions.map(x => x.id).filter(id => !allNodesReached.has(id));

        expect(unreachableIds).toEqual([]);

    });

    it('All words are used in dialogueText and dialogueOptions', () => {
        const allWordsUsed = new Set();


        // Words are only found through evidence, puzzles and NPC dialogue (dialogueNode)
        dialogueText.forEach(node => {
            node.text.forEach(wordId => {
                allWordsUsed.add(wordId);
            });
        });

        // TODO - Add evidence words

        const unreachableIds = words.map(x => x.id).filter(id => !allWordsUsed.has(id))

        expect(unreachableIds).toEqual([]);
    });
});
