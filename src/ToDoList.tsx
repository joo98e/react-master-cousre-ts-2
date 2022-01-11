import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Categories, categoryState, toDoSelector, toDoState } from './Atoms/toDoState'
import CreateToDo from './CreateToDo'
import ToDo from './ToDo'

interface Props {

}



const ToDoList = (props: Props) => {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);

    const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value as any);
    }

    return (
        <>
            <h1>To Do List</h1>
            <hr />
            <select onInput={onInput} value={category}>
                <option value={Categories.TO_DO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
            </select>
            <br />
            <span>current category : {category}</span>

            <hr />
            <CreateToDo />
            <hr />

            <ul>
                {
                    toDos?.map(toDo => <ToDo {...toDo} key={toDo.id} />)
                }
            </ul>
        </>
    )
}

export default ToDoList
