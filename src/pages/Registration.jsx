import { useForm, Controller } from "react-hook-form";
import "../style/Login.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Regist() {
    const {control, handleSubmit, formState: { errors }} = useForm();

    const navigate = useNavigate()


    const [datauser, setDatauser] = useState([]);

    const onSubmit = async (data) => {
        
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/users",
            { 
                name: data.name,
                email: data.email,
                password: data.password
               
            });
            localStorage.setItem('formData', JSON.stringify(response.data));
            navigate('/login')
        } catch (error) {
            console.log(error);
        }

        
    }

    useEffect(() => {
        axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then((response) => {
            setDatauser(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    



    return(
        <section className="login">

            <h1>регистрация</h1>
           
            <form className="profileModalForm" method="POST" onSubmit={handleSubmit(onSubmit)}>
                
                <Box
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    disabled={false}
                >

                    <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                        {...field}
                        type="text"
                        label="Name"
                        variant="outlined"
                        />
                    )}
                    rules={{ required: 'Параметр обязателен' }}
                    />
                    {errors.name && <p>{errors.name.message}</p>}

                    <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                        {...field}
                        type="email"
                        label="Email"
                        variant="outlined"
                        />
                    )}
                    rules={{ required: 'Параметр обязателен' }}
                    />
                    {errors.email && <p>{errors.email.message}</p>}

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
                <button style={{color: "black"}} type="submit">вход</button>

            </form>

            <Link
                href="/login" 
                id="link"
            >
                {'уже зарегистрирован ;)'}
            </Link>
        </section>
    )
}