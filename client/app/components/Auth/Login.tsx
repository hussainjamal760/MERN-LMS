'use client'
import React,{FC, useState} from 'react'
import {useFormik} from "formik"
import * as Yup from 'yup'
import {AiOutlineEye , AiOutlineEyeInvisible , AiFillGithub} from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"

type Props = {
    setRoute:(route:string)=>void
}
const schema =Yup.object().shape({
    email:Yup.string().email("Invalid email!").required("Please enter your email!"),
    password:Yup.string().required("Please enter your password!"),
})


const Login: FC<Props> = ({setRoute}) => {
    const [show, setShow] = useState(false)

    const formik = useFormik({
        initialValues:{email:"",password:""},
        validationSchema:schema,
        onSubmit: async({email,password})=>{
            console.log(email , password);
        }
    })

    const {errors,touched,values,handleChange , handleSubmit} = formik

  return (
    <div>
        <div>
            {/* Lottiefy */}
        </div>
        <h1>Login with Sheep Academy</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Enter email</label>
            <input type="email" name="" value={values.email} onChange={handleChange} id="email" placeholder='loginmail@gmail.com' />

             <label htmlFor="password">Enter password</label>
            <input type={!show ? "password" : "text"} name="" value={values.password} onChange={handleChange} id="password" placeholder='password' />
        
        </form>
    </div>
  )
}

export default Login