import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/CheckAuth"
import { useForm, Controller } from "react-hook-form";
import "../style/Login.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export default function Login() {
    const {checkAuth, setCheckAuth} = useContext(AuthContext)
    const { control, handleSubmit, formState: { errors } } = useForm();

    const [emailData, setEmailData] = useState([])
    const [passwordData, setPasswordData] = useState([])

    const [emailOrPasswordError, setEmailOrPasswordError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const getDataEmailAndPassword = () => {
            const stored = localStorage.getItem('formData')
            if (stored) {
                const storedFormData = JSON.parse(stored);
                setEmailData(storedFormData.email);
                setPasswordData(storedFormData.password)
            }
        }
        getDataEmailAndPassword()
        
    }, []);
    console.log(emailData, passwordData)

    const onSubmitLogin = (data) => {
        if(data.email == emailData && data.password == passwordData){
            alert('success')
        }else{
            setEmailOrPasswordError('неверный пароль или e-mail')
        }
    }

    const changeAuthState = () => {
        setCheckAuth(false)
        navigate('/productlist')
    }

    return(
        <section className="login">
            <h1>вход</h1>
            <form className="profileModalForm" onSubmit={handleSubmit(onSubmitLogin)}>
                <Box
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                     <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                            {...field}
                            type="text"
                            label="Email"
                            variant="outlined"
                            />
                        )}
                        rules={{ required: 'Параметр обязателен' }}
                        />
                        {
                            (errors.email && 
                            <p style={{color: 'red'}}>{errors.email.message}</p> || 
                            <p style={{color: 'red'}}>{emailOrPasswordError}</p>)
                        }

                        <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                            {...field}
                            type="password"
                            label="Password"
                            variant="outlined"
                            />
                        )}
                        rules={{ required: 'Параметр обязателен' }}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                </Box>
                <button type="submit" onClick={changeAuthState}>вход</button>
            </form>
            <Link
                href="/regist" 
                id="link"
            >
                {'ещё не зарегистрирован ;)'}
            </Link>
        </section>
    )
}