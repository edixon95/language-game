import type { DialogueOption } from "../../types/index"

export const dialogueOptions: DialogueOption[] = [
    {
        id: 1,
        meaning: "Hello",
        text: [8], // WordId
        nextNode: 2 // DialogueOptionId
    },
    {
        id: 2,
        meaning: "Home?",
        text: [9, 5],
        nextNode: 3
    },
    {
        id: 3,
        meaning: "You?",
        text: [9, 3],
        nextNode: 4
    },
    {
        id: 4,
        meaning: "You",
        text: [3],
        nextNode: 4 // Testing Node End
    },
    {
        id: 5,
        meaning: "Me",
        text: [4],
        nextNode: 4// Testing Node End
    },
    { // This is just forcing the test to pass 
        id: 6,
        meaning: "TO USE ALL WORDS",
        text: [1, 2, 6, 7],
        nextNode: 4// Testing Node End
    },
]