import {useState} from "react";
import { AuthForm } from "../forms/AuthForm";
import { useLoginUserMutation, useSignUpUserMutation } from "../store/tickets/tickets.api";
import { AuthResponse } from "../models/response/AuthResponse";
import { RegisterForm } from "../forms/RegisterForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../hooks/useAuthDispatch";
import { setUser } from "../store/auth/auth.slice";

export default function AuthPage() {
    const [submitAuth, submitAuthResult] = useLoginUserMutation();
    const [submitRegister, submitRegisterResult] = useSignUpUserMutation();
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const [isRegister, setRegister] = useState<boolean>(false)
    const [authForm, setAuthForm] = useState<AuthForm>({
        email: '',
        password:''
    })
    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        email: '',
        password: '',
        phone: '',
        name: ''
    });

    const onEnterPressed: (event: any) => Promise<void> = async (event: any) => {
        submitAuth(authForm).unwrap().then((data : any) => {
            const token = data.token as string;
            dispatch(setUser({token}))
            toast.success('Welcome');
            navigate('/');

        }).catch((e: any) => {
            const errorMessage = e.data as AuthResponse;
            toast.error(errorMessage.message)
        });
    }

    const onRegisterPressed: (event: any) => Promise<void> = async (event: any) => {
        submitRegister(registerForm).unwrap().then((data: any) => {
            toast.success('Successfully registered');
            setRegister(false);
        }).catch((e: any) => {
            const errorMessage = e.data as AuthResponse;
            toast.error(errorMessage.message)
        });
    
    }

    const onRegisterFormChange: (event: any) => void = (event: any) => 
        setRegisterForm({...registerForm, 
                        [event.target.name]: event.target.value.trim()});
    

    const onAuthFormChange: (event: any) => void = (event: any) => 
        setAuthForm({...authForm, 
                    [event.target.name]: event.target.value.trim()})
    
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            {!isRegister &&
            <div className="border-2 p-10 rounded-2xl shadow-cyan-200 shadow-2xl">
                <div className="flex justify-end">
                    <span><a onClick={() => {setRegister(true)}} 
                    className="cursor-pointer
                    hover:font-semibold">Register</a>
                    </span>
                </div>
            <div className="flex flex-col">
                <div>
                    <h2 className="text-4xl text-center">Sign in</h2>
                </div>
                <div className="p-6">
                    <input onChange={onAuthFormChange} name="email" 
                    className="text-center
                    p-3 rounded-2xl 
                    border-cyan-100 
                    border-2" 
                    placeholder="Email"/>
                </div>
                <div className="p-6">
                    <input onChange={onAuthFormChange} name="password" 
                    className="text-center 
                    p-3 rounded-2xl 
                    border-cyan-100 
                    border-2" 
                    placeholder="Password"/>
                </div>
                <div className="p-6 flex justify-center">
                    <button disabled={submitAuthResult.isLoading} 
                    onClick={onEnterPressed} 
                    className="border-2 border-cyan-100 
                    px-6 rounded-2xl 
                    text-center bg-white">
                        Enter
                    </button>
                </div>
            </div>
            </div>}
            {isRegister &&
                <div className="border-2 p-10 rounded-2xl shadow-cyan-200 shadow-2xl">
                    <div className="flex justify-end">
                        <span><a onClick={() => {setRegister(false)}} 
                        className="cursor-pointer hover:font-semibold">Sign in</a></span>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <h2 className="text-4xl text-center">Sign up</h2>
                        </div>
                        <div className="p-6">
                            <input onChange={onRegisterFormChange} name="email" 
                            className="text-center p-3 
                            rounded-2xl border-cyan-100 
                            border-2" placeholder="Email"/>
                        </div>
                        <div className="p-6">
                            <input type="password" onChange={onRegisterFormChange} 
                            name="password" 
                            className="text-center p-3 
                            rounded-2xl border-cyan-100 
                            border-2" placeholder="Password"/>
                        </div>
                        <div className="p-6">
                            <input type="text" onChange={onRegisterFormChange} 
                            name="name" 
                            className="text-center p-3 
                            rounded-2xl border-cyan-100 
                            border-2" placeholder="Your first name"/>
                        </div>
                        <div className="p-6">
                            <input type="tel" pattern="+7-7[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}" 
                            onChange={onRegisterFormChange} name="phone" 
                            className="text-center p-3 
                            rounded-2xl border-cyan-100 
                            border-2" placeholder="Phone number"/>
                        </div>
                        <div className="p-6 flex justify-center">
                            <button disabled={submitRegisterResult.isLoading} 
                            onClick={onRegisterPressed} 
                            className="border-2 border-cyan-100 
                            px-6 rounded-2xl 
                            text-center bg-white">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}