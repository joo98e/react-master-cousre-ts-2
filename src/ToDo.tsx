import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { ITodo, toDoState } from './Atoms/toDoState'

const ToDo = ({ text, id, category }: ITodo) => {
    const setToDos = useSetRecoilState(toDoState);

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { currentTarget: { name } } = e;

        setToDos(oldToDos => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id)
            const newTodo = { text, id, category: name as any };
            return [...oldToDos.slice(0, targetIndex), newTodo, ...oldToDos.slice(targetIndex + 1)];
        })
    }

    return (
        <>
            <div>
                <span>{text}</span>
                {category !== "TO_DO" && <button name="TO_DO" onClick={onClick}>TO_DO</button>}
                {category !== "DOING" && <button name="DOING" onClick={onClick}>DOING</button>}
                {category !== "DONE" && <button name="DONE" onClick={onClick}>DONE</button>}
            </div>
        </>
    )
}

export default ToDo
