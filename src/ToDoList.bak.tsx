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

interface ISubmitData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    extraError?: string;
}

const ToDoList = (props: Props) => {
    const { register, watch, handleSubmit, formState: { errors }, setError } = useForm<ISubmitData>({
        defaultValues: {
            email: "@mirim.co.kr"
        }
    });

    const onValidation = (data: ISubmitData) => {
        console.log(data)
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword',
                { message: "Password are not the same." },
                { shouldFocus: true })
        }

        setError("extraError",
            { message: "server is disconnected." }
        )
    }

    console.log(errors);

    return (
        <div>
            <form onSubmit={handleSubmit(onValidation)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <input
                    {...register("email",
                        {
                            required: "only mirim mail",
                            pattern: {
                                message: "only mirim email address",
                                value: /^[A-Za-z0-9._%+-]+@mirim.co.kr$/
                            },
                            minLength: {
                                value: 5,
                                message: "Too short"
                            },
                            validate: {
                                "valid1": () => {
                                    return true;
                                },
                                "valid2": () => {
                                    return true;
                                },
                            }
                        }
                    )}
                    type="text"
                    placeholder="Write your e-mail"
                />
                <span>{errors?.email?.message}</span>
                <input {...register("firstName", { required: "firstName is require", minLength: { value: 1, message: "First name is so short." }, validate: value => !value.includes('tae') })} type="text" placeholder="First Name" />
                <span>{errors?.firstName?.message}</span>
                <input {...register("lastName", { required: "lastName is require", minLength: { value: 2, message: "Last name is so short." } })} type="text" placeholder="Last Name" />
                <span>{errors?.lastName?.message}</span>
                <input {...register("password", { required: "password is require", minLength: { value: 3, message: "password is so short." } })} type="text" placeholder="Password" />
                <span>{errors?.password?.message}</span>
                <input {...register("confirmPassword", { required: "confirmPassword is require", minLength: { value: 3, message: "confirm password is so short." } })} type="text" placeholder="Confirm Password" />
                <span>{errors?.confirmPassword?.message}</span>
                <button>Add</button>
            </form>
        </div>
    )
}

export default ToDoList
