import { atom, selector } from "recoil";

type categories = "TO_DO" | "DOING" | "DONE";

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE"
}

export interface ITodo {
    id: number;
    text: string;
    category: Categories;
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO
})

export const toDoState = atom<ITodo[]>({
    key: "todo",
    default: []
});

export const toDoSelector = selector({
    key: "todoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);

        return toDos.filter((toDo) => toDo.category === category);

        // return [
        //     toDos.filter(toDo => toDo.category === "TO_DO"),
        //     toDos.filter(toDo => toDo.category === "DOING"),
        //     toDos.filter(toDo => toDo.category === "DONE"),
        // ];
    }
})