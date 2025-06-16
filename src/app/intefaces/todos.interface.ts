export interface Todo {
        id: number;
        title: string;
        userId: number | null;
        completed: boolean | null;
}