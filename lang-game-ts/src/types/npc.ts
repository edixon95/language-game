export interface NPC {
// NPC to be used later to add different aliens
    id: number;
    nodeSet: number; // dialogueOption and dialogueText to move in to number (id) folders
    startNode: number; // First interact dialogueText id, currently this will always be 1 
}
export interface DialogueNode {
    id: number;
    meaning: string;
    text: number[]; // wordId
    choices: number[]; // dialogueOptionId
    evidence?: number[]; // evidenceId
}

export interface DialogueOption {
    id: number;
    meaning: string;
    text: number[];
    nextNode?: number; // DialogueNodeId
    canShow?: boolean;
    isSeen?: boolean;
}