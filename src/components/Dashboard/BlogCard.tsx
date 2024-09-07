import { Loader2, Trash2Icon } from "lucide-react"

import { BlogCardType } from "./Blogs"
import { formatDate } from "@/util/dateFormatter"
import BlogUpdate from "./BlogUpdate"
import { useDeleteBlogRequest } from "@/api/blogApi"
import { useQueryClient } from "@tanstack/react-query"
import { Card } from "../ui/card"
import { Separator } from "../ui/separator"



const BlogCard = ({ title, createdAt, coverImage, _id, likes }: BlogCardType) => {
    const formattedDate = formatDate(createdAt)
    const { deleteBlog, isPending, isSuccess } = useDeleteBlogRequest()
    const handleDelete = (blogId: string) => {
        deleteBlog(blogId)
    }
    const queryClient = useQueryClient()
    if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ['fetchAllBlogsByUsername'] })
        queryClient.invalidateQueries({ queryKey: ['fetchAllBlogs'] })
        queryClient.invalidateQueries({ queryKey: ['getBlogById'] })
        queryClient.fetchQuery({ queryKey: ['fetchAllBlogsByUsername'] })
    }
    return (
        <div className="flex justify-between col-span-2">
            <Card className="flex flex-row p-1 md:justify-between md:items-center w-full ">
                <img className="w-28 md:w-32 h-28 rounded-md" src={coverImage} alt="" />
                <div className="ps-2 w-full h-full flex-1 pe-4 flex flex-col justify-between flex-wrap">
                    <h3 className="w-full line-clamp-2 leading-tight font-semibold text-black">{title}</h3>
                    <p className=" text-sm text-slate-600">Published on {formattedDate}</p>
                    <div className=" ">
                        {isPending ? <div className="px-4"><Loader2 className="animate-spin" /></div> : <div className=" h-full flex  gap-2">
                            <BlogUpdate blogId={_id as string} />
                            <Trash2Icon className="text-red-500 cursor-pointer" size={"1.1rem"} onClick={() => handleDelete(_id as string)} />
                        </div>}
                    </div>
                </div>
                <div className=""><Separator orientation="vertical" /></div>

                <div className="text-slate-700 flex text-center items-center px-2 gap-2 md:px-4">
                    <p className="">{likes}</p>
                    <p>Likes</p>
                </div>
            </Card>

        </div>
        // <div className="flex justify-between my-4">
        //     <div className="flex">
        //         <img className="h-20 w-20 object-cover" src={coverImage} alt="" />
        //         <div className="px-2 flex flex-col justify-between">
        //             <h3 className="text-lg font-semibold text-black">{title}</h3>
        //             <p className="text-sm">Published on {formattedDate}</p>
        //             {isPending ? <div className="px-4"><Ellipsis className="animate-ping" /></div> : <div className="flex gap-2">
        //                 <BlogUpdate blogId={_id as string} />
        //                 <Trash2Icon className="text-red-500 cursor-pointer" size={"1.1rem"} onClick={() => handleDelete(_id as string)} />
        //             </div>}

        //         </div>
        //     </div>

        //     <div className="flex gap-4">
        //         <div className="flex flex-col justify-evenly items-center">
        //             <span>0</span>
        //             <span>Likes</span>
        //         </div>
        //         <Separator orientation="vertical" />
        //         <div className="flex flex-col justify-evenly items-center">
        //             <span>0</span>
        //             <span>Reads</span>
        //         </div>
        //     </div>
        // </div>
    )
}

export default BlogCard