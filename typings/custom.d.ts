export interface Task {
    id: number;
    name: string;
    done: boolean;
}

export interface Card {
    id: number;
    title: string;
    description: string;
    color: string;
    status: string;
    tasks: Task[];
}

export interface TaskCallbacks{
    toggle: Function,
    delete: Function,
    add: Function
}

export interface CardCallbacks{
    addCard: Function,
    updateCard: Function,
    updateStatus: Function;
    updatePosition: Function;
    persistCardDrag: Function;
}

export interface RouterMatchProps{
    card_id:number
}