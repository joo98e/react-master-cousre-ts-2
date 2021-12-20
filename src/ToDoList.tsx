import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
interface Props {

}

// const ToDoList = (props: Props) => {
//     const [todo, setTodo] = useState<string>("");

//     const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//         const { currentTarget: { value } } = event;
//         setTodo(value);
//     }

//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log(todo);
//     }

//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input type="text" onChange={onChange} value={todo} placeholder="Write a to do" />
//                 <button>Add</button>
//             </form>
//         </div>
//     )
// }

const ToDoList = (props: Props) => {
    const { register, watch, handleSubmit, formState } = useForm();

    const onValidation = (data: any) => {
        console.log(data);
    }
    console.log(watch())
    console.log(formState.errors)

    return (
        <div>
            <form onSubmit={handleSubmit(onValidation)}>
                <input {...register("Email", { required: "이메일", minLength: 5 })} type="text" placeholder="Write your e-mail" />
                <input {...register("toDo", { required: true, minLength: { value: 10, message: "todo" } })} type="text" placeholder="Write a to do" />
                <button>Add</button>
            </form>
        </div>
    )
}

export default ToDoList
