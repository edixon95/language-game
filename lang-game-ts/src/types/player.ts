export interface Word {
    id: number;
    image: string;
    meaning: string[];
    isFound?: boolean;
    playerTranslation?: string
}

export interface Message {
    id: number;
    type: number; // 1 = Player, 2 = Any NPC, 3 = General notification
    npcId: null | number;
    npcMood: null | number; // 1 = Neutral, 2 = Happy, 3 = Very happy, 4 = Sad
    text: string | number[]; // String if in English
}