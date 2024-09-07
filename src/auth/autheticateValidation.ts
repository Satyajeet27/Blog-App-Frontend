import axiosClient from "@/api/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUser = () => {
  const queryClient = useQueryClient();
  const fetchUserRequest = async () => {
    const { data } = await axiosClient.get("/api/v1/user");
    return data;
  };
  const {
    data: userData,
    isLoading,
    error,
    isSuccess,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["fetchUser"],
    queryFn: fetchUserRequest,
    retry: false,
    refetchOnWindowFocus: false,
  });
  // console.error(error);
  if (isError) {
    localStorage.clear();
    queryClient.cancelQueries({ queryKey: ["fetchUser"] });
  }

  return { userData, isLoading, error, isSuccess, refetch, isError };
};

interface ApiError extends Error {
  response?: {
    status: number;
  };
}

export const useAuthenticate = () => {
  const { error } = useGetUser() as { error: ApiError | null };
  const token = localStorage.getItem("token");

  const isAuthenticated = !!token;
  // console.log(isSuccess);
  //   console.log(isAuthenticated);
  if (error?.response?.status == 401) {
    console.error("Authentication error:", error);
    localStorage.removeItem("token");
  }
  return { isAuthenticated };
};
