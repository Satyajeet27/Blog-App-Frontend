import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "./api";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "@/auth/autheticateValidation";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface UserLoginType {
  email: string;
  password: string;
}
export interface ErrorResponseMessageType {
  message: string;
}

export const useUserLogin = () => {
  const navigate = useNavigate();
  const { refetch } = useGetUser();
  const userLoginRequest = async (userLoginData: UserLoginType) => {
    const response = await axiosClient.post("/api/v1/user/login", {
      ...userLoginData,
    });
    return response.data;
  };
  const {
    mutate: userLogin,
    isPending,
    error,
    data,
    isSuccess,
  } = useMutation({
    mutationFn: userLoginRequest,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Login Successfully!", {
        style: { background: "green", color: "white" },
      });
      refetch();
      navigate("/");
    },
    onError: (error: AxiosError<ErrorResponseMessageType>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message, {
        style: { background: "red", color: "white" },
      });
    },
  });
  return { userLogin, isPending, error, data, isSuccess };
};

interface UserRegisterType {
  username: string;
  email: string;
  password: string;
  bio: string;
}

export const useCreateUser = () => {
  const navigate = useNavigate();
  const createUserRequest = async (userData: UserRegisterType) => {
    const { data } = await axiosClient.post("/api/v1/user", { ...userData });
    return data;
  };
  const {
    mutate: createUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: createUserRequest,
    onSuccess: () => {
      toast.success("User Created Successfully!", {
        style: { background: "green", color: "white" },
      });
      navigate("/");
    },
    onError: (error: AxiosError<ErrorResponseMessageType>) => {
      console.error(error.response?.data);
      toast.error(error.response?.data.message, {
        style: { background: "red", color: "white" },
      });
    },
  });
  return { createUser, isPending, error };
};
type UpdateUserType = {
  fname?: string;
  lname?: string;
  bio?: string;
};
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const updateUserRequest = async (userData: UpdateUserType) => {
    const { data } = await axiosClient.put("/api/v1/user/", { ...userData });
    return data;
  };
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateUserRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchUser"] });
      toast.success("User Updated Successfully!", {
        style: { background: "green", color: "white" },
      });
    },
    onError: (error: AxiosError<ErrorResponseMessageType>) => {
      // console.log(error);
      toast.error(error.response?.data.message, {
        style: { background: "red", color: "white" },
      });
    },
  });
  return { updateUser, isPending };
};

export const useResetPassword = () => {
  const resetPasswordRequest = async (userData: {
    password: string;
    newPassword: string;
  }) => {
    const { data } = await axiosClient.put("/api/v1/user/reset-password", {
      ...userData,
    });
    return data;
  };
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordRequest,
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: AxiosError<ErrorResponseMessageType>) => {
      toast.error(error.response?.data.message, {
        style: { background: "red", color: "white" },
      });
    },
  });
  return { resetPassword, isPending };
};
