// If evidence has either text or meaning, it should have both
export type Evidence =
    | {
        id: number;
        name?: string;
        notes?: string;
        meaning: string;
        text: number[]; // wordId
        image?: string;
        isFound?: boolean; // If can show in evidence menu
        isViewed?: boolean; // If player has viewed yet to determine if can show words
        puzzle?: number; // puzzleId
        orderFound: number;
    }
    | {
        id: number;
        name?: string;
        notes?: string;
        meaning?: undefined;
        text?: undefined;
        image?: string;
        isFound?: boolean;
        isViewed?: boolean;
        puzzle?: number;
        orderFound: number;
    };

export interface Puzzle {
    id: number;
    meaning?: string;
    text?: number[]; // wordId
    image?: string;
    isSolved?: boolean;
    evidence?: number[] // Rewards for solving
}