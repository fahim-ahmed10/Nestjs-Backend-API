"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import {useState} from 'react'

function AdminLogin() {
  const [message, setMessage] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    // await axios.get("/api/login").then(res=>{
    //   setMessage(res.data.message);
    //   console.log(res);
    // })

    await axios.post("/api/login", data).then(res=>{
      setMessage(res.data.message);
      console.log(res);
    })
  };

  return (
    <div className="max-w-96 mx-auto mt-20 bg-sky-950 p-10  text-white ">
      <p className="text-center mb-6 ">Login Form</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col justify-between ">
          <label>Email</label>
          <input
            {...register("email", {
              required: true,
              minLength: 11, 
              maxLength: 30,          
            })}
            className="text-black pl-1 outline-none appearence-none border border-blue-600 rounded-sm"
            type="email"
          />
          {errors.email?.type == "required" && (
            <p className="text-red-300">*Email is required</p>
          )}
          {errors.email?.type == "maxLength" && (
            <p className="text-red-300">*Maximum Length is 25 character</p>
          )}
        </div>
        <div className="mb-9 flex flex-col justify-between">
          <label>Password</label>
          <input
            {...register("password", {
              required: true,
              minLength: 4,
              maxLength: 15,
            })}
            className="text-black pl-1  outline-none appearence-none border border-blue-600 rounded-sm"
            type="password"
          />
          {errors.password?.type == "required" && (
            <p className="text-red-300">*Password is required</p>
          )}
          {errors.password?.type == "minLength" && (
            <p className="text-red-300">*Minimum Length is 4 character</p>
          )}
          {errors.password?.type == "maxLength" && (
            <p className="text-red-300">*Maximum Length is 15 character</p>
          )}
        </div>
        <div className="text-center">
          <button className="bg-blue-800 p-1 rounded" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div className="text-right">{message}</div>
    </div>
  );
}

export default AdminLogin;
