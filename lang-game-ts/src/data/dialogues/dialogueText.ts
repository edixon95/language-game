import type { DialogueNode } from "../../types/index"

export const dialogueText: DialogueNode[] = [
    {
        id: 1,
        meaning: "Hello",
        text: [8], // WordId
        choices: [1] // DialogueOptionId
    },
    {
        id: 2,
        meaning: "Yes?",
        text: [9, 6], // Question:Yes
        choices: [2, 3],
        evidence: [1, ]
    },
    {
        id: 3,
        meaning: "You? Me?",
        text: [9, 3, 9, 4], // Question:You:Question:Me
        choices: [4, 5],
    },
    { // This is just forcing the test to pass
        id: 4,
        meaning: "You",
        text: [3], 
        choices: [6],
    },
    
]