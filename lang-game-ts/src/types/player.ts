export interface Player {
    knownWords: Word[];
    items: Item[];
}

export interface Word {
    id: number;
    image: string;
    meaning: string[];
    isFound?: boolean;
    playerTranslation?: string
}

export interface Item {
    id: number;
    name: string;
    image: string;
}