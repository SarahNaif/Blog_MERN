import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../components/navigation/MainLayout";
import { forgetPassword, signup } from "../../services/index/users";
import { userActions } from "../../store/reducers/userReducers";

const ForgetPass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading , } = useMutation({
    mutationFn: ({ email }) => {
      return forgetPassword({ email });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(null));
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  

  const {register, handleSubmit,formState: { errors, isValid, isSubmitSuccessful } }= useForm(
    {
     defaultValues:{
      email:"",
     },
     mode:"onChange"
  })
  useEffect(() => {
    if (isSubmitSuccessful) {
     navigate("/")
      toast.success("check your Email")
    }
  }, [navigate,isSubmitSuccessful]);

  const submitHandler = (data) => {
    const { email } = data;
    mutate({email});
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Rest your password
        </div>
        <div className="relative mt-10 h-px bg-gray-300">
          <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
            <span className="bg-white px-4 text-xs text-gray-500 capitalize">
              we will send you an email
            </span>
          </div>
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-6">
              <label
                htmlfor="email"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                E-Mail Address:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>

                <input
                  id="email"
                  type="email"
                  {...register("email",{
                    pattern:{
                      value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter a valid email",
                    },
                    required:{
                      value: true,
                      message:"Email is required"
                    }
                  })}
                  className={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none  ${errors.email ? "focus:border-red-500 border-red-500" : "focus:border-blue-400 "}`}
                  placeholder="E-Mail Address"
                />
              </div>
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in  disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="mr-2 uppercase">Reset</span>
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center mt-6">
          <Link
            to="/login"
            className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
          >
            <span className="ml-2 capitalize">You have an account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
