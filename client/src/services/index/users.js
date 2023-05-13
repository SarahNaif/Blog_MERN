import axios from "axios";

export const signup = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post("/api/users/register", {name,email,password });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };


export const login = async ({ email, password }) => {
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };



  export const forgetPassword = async ({ email }) => {
    try {
      const { data } = await axios.put("/api/users/forget-password", {
        email,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };

  export const resetPassword = async ({ password }) => {
    let resetPasswordToken = window.location.href.split("/").pop();
    console.log(resetPasswordToken)
    try {
      const { data } = await axios.post(`/api/users/reset-password/${resetPasswordToken}`, {
        password,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };
  