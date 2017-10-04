export interface Task {
    id:number;
    name:string;
    done:boolean;
}

export interface Card {
    id:number;
    title:string;
    description:string;
    status:string;
    tasks:Task[];
}