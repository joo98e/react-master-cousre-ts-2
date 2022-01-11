import React from 'react'
import { useForm } from 'react-hook-form';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Button } from './Assets/UIComponents';
import { categoryState, toDoState } from './Atoms/toDoState';

interface Props {

}

interface IForm {
    toDo: string;
}




const CreateToDo = (props: Props) => {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState)

    const { register, handleSubmit, setValue } = useForm<IForm>();

    const handleValid = ({ toDo }: IForm) => {
        setValue("toDo", "");

        setToDos(oldTodos => [{ id: Date.now(), text: toDo, category }, ...oldTodos])
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo", { required: "toDo is should be there." })} type="text" />
                <Button>Add</Button>
            </form>
        </>
    )
}

export default CreateToDo
