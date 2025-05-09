export interface NPC {
    id: number;
}

export interface DialogueTree {
    npcId: number;
    startNode: number;
}
export interface DialogueNode {
    id: number;
    meaning: string;
    text: number[]; // wordId
    choices: number[]; // dialogueOptionId
}

export interface DialogueOption {
    id: number;
    meaning: string;
    text: number[];
    nextNode?: number; // DialogueNodeId
    canShow?: boolean;
}