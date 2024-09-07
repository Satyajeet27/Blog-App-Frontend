import { Heart, UserRoundPen } from "lucide-react"
import { BlogType } from "./Blog";
import { formatDate } from "@/util/dateFormatter";
import { Card } from "../ui/card";
import { Link } from "react-router-dom";
import { useLikePost, useUnLikePost } from "@/api/blogApi";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "@/auth/autheticateValidation";



const BlogCard = ({ author, title, createdAt, coverImage, category, content, _id, likes, likedBy }: BlogType) => {
    const formattedDate = formatDate(createdAt)
    const { likePost } = useLikePost()
    const { unlikePost } = useUnLikePost()
    const { userData } = useGetUser()
    // console.log(likedBy)
    // console.log(userData?.user?._id)
    const queryClient = useQueryClient()
    const handleLike = (id: string) => {
        likePost(id)
        queryClient.refetchQueries({ queryKey: ["fetchAllBlogs"] })
    }
    const handleUnlike = (id: string) => {
        unlikePost(id)
        queryClient.refetchQueries({ queryKey: ["fetchAllBlogs"] })
    }
    return (
        <Card className="grid grid-cols-6 md:grid-cols-8  p-2 bg-slate-100">
            <div className="col-span-4 md:col-span-5 flex flex-col justify-between">
                <div className="flex items-center gap-1  text-slate-500">
                    <UserRoundPen size={"1rem"} />
                    <span className="text-sm">{author?.username?.toLowerCase()}</span>
                    <span className="text-xs">@{formattedDate}</span>
                </div>
                <div className="">
                    <Link to={`/blog/${_id}`} className="hover:underline text-base md:text-xl text-slate-800 font-bold">{title}</Link>
                    <p className="text-slate-700 w-4/5 text-sm line-clamp-1 md:line-clamp-2 ">{content}</p>
                </div>
                <div className="text-slate-600 flex items-center gap-3 text-sm">
                    <p className="bg-slate-200 rounded-full py-1 px-4">{category}</p>

                    <div className="flex gap-1 items-center"><span>{likes}</span><div className="cursor-pointer"  >
                        {
                            likedBy.includes(userData?.user._id) ? <Heart size={"1rem"} className="text-rose-500" onClick={() => handleUnlike(_id as string)} />
                                : <Heart size={"1rem"} onClick={() => handleLike(_id as string)} />
                        }
                    </div></div>
                </div>
            </div>
            <div className="col-span-2 md:col-span-3 h-32">
                <img src={coverImage} alt="" className="object-cover w-full h-full rounded-md" />
            </div>
        </Card>
    )
}

export default BlogCard