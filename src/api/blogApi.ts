import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "./api";
import { z } from "zod";
import { formSchema } from "@/pages/Editor";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ErrorResponseMessageType } from "./userApi";

export const useGetAllBlogs = () => {
  const fetchAllBlogs = async () => {
    const { data } = await axiosClient.get("/api/v1/blog");
    return data;
  };
  const {
    data: blogsData,
    isLoading,
    error,
  } = useQuery({ queryKey: ["fetchAllBlogs"], queryFn: fetchAllBlogs });
  return { blogsData, isLoading, error };
};
export const useGetBlogsByUserProfile = (usernames: string) => {
  const fetchAllBlogsByUserProfile = async (usernames: string) => {
    const { data } = await axiosClient.get(`/api/v1/blog${usernames}`);
    return data;
  };
  const {
    data: blogsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["fetchAllBlogsByUsername"],
    queryFn: () => fetchAllBlogsByUserProfile(usernames),
  });
  return { blogsData, isLoading, error, refetch };
};

type BlogData = z.infer<typeof formSchema>;

export const usePublishBlog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const publishBlogRequest = async (blogData: BlogData) => {
    console.log(blogData);
    const response = await axiosClient.post(
      "/api/v1/blog",
      { ...blogData },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  };
  const {
    mutate: publishBlog,
    isPending,
    isError,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: publishBlogRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchAllBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["fetchAllBlogsByUsername"] });
      toast.success("Blog Created Successfully!", {
        style: { background: "green", color: "white" },
      });
      navigate("/");
    },
  });
  return { publishBlog, isPending, isError, isSuccess, data };
};

export const useGetBlogById = (blogId: string) => {
  const fetchBlogById = async () => {
    const { data } = await axiosClient.get(`/api/v1/blog/${blogId}`);
    return data;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["getBlogById"],
    queryFn: fetchBlogById,
  });
  return { data, isLoading, error };
};

export const useUpdateBlog = (blogId: string) => {
  const updateBlogRequest = async (blogData: BlogData) => {
    const { data } = await axiosClient.put(
      `/api/v1/blog/${blogId}`,
      {
        ...blogData,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  };
  const {
    mutate: updateBlog,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: updateBlogRequest,
    onSuccess: () => {
      toast.success("Blog Updated Successfully!", {
        style: { background: "green", color: "white" },
      });
    },
    onError: (error: AxiosError<ErrorResponseMessageType>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message, {
        style: { background: "red", color: "white" },
      });
    },
  });
  return { updateBlog, isPending, isSuccess };
};

export const useDeleteBlogRequest = () => {
  const deleteBlogRequest = async (blogId: string) => {
    const { data } = await axiosClient.delete(`/api/v1/blog/${blogId}`);
    return data;
  };
  const {
    mutate: deleteBlog,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: deleteBlogRequest,
    onSuccess: () => {
      toast.success("Blog Deleted Successfully", {
        style: { background: "green", color: "white" },
      });
    },
    onError: (error: AxiosError<ErrorResponseMessageType>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message, {
        style: { background: "red", color: "white" },
      });
    },
  });
  return { deleteBlog, isPending, isSuccess };
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const likePostRequest = async (blogId: string) => {
    const { data } = await axiosClient.post(`/api/v1/blog/${blogId}/like`);
    return data;
  };
  const { mutate: likePost } = useMutation({
    mutationFn: likePostRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchAllBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["fetchAllBlogsByUsername"] });
    },
    onError: (error: AxiosError<ErrorResponseMessageType>) => {
      console.log(error.response?.data.message);
      toast.error("Login, to like or unlike any post", {
        style: { background: "red", color: "white" },
      });
    },
  });
  return { likePost };
};
export const useUnLikePost = () => {
  const queryClient = useQueryClient();
  const unlikePostRequest = async (blogId: string) => {
    const { data } = await axiosClient.post(`/api/v1/blog/${blogId}/unlike`);
    return data;
  };
  const { mutate: unlikePost } = useMutation({
    mutationFn: unlikePostRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchAllBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["fetchAllBlogsByUsername"] });
    },
    onError: (error: AxiosError<ErrorResponseMessageType>) => {
      console.log(error.response?.data.message);
      toast.error("Login, to like or unlike any post", {
        style: { background: "red", color: "white" },
      });
    },
  });
  return { unlikePost };
};

export const useGetTrendingBlogs = () => {
  const getTrendingBlogsRequest = async () => {
    const { data } = await axiosClient.get("/api/v1/blog/@/trending");
    return data;
  };
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["getTrendingBlogs"],
    queryFn: getTrendingBlogsRequest,
  });
  return { data, isLoading, isError, isSuccess };
};
