
import { LucidePencilLine } from "lucide-react"
import { BlogDataType } from "./Sidebar"
import { formatDate } from "@/util/dateFormatter"
import { Card } from "../ui/card"
import { Link } from "react-router-dom"



const TrendingBlogCard = (blogData: BlogDataType) => {
    // console.log(blogData)
    const { author, title, content, createdAt, index, _id } = blogData
    const formattedDate = formatDate(createdAt)
    return (
        <Card className="flex items-center gap-2 p-2 bg-slate-100">
            <h1 className="text-6xl font-extrabold text-slate-300">0{index}</h1>
            <div className=" flex flex-col gap-1">
                <div className="flex gap-2 text-xs text-slate-600">
                    <LucidePencilLine size={"1rem"} />
                    <span>{author.username}</span>
                    <span>@ {formattedDate}</span>
                </div>
                <div className="text-slate-700">
                    <Link to={`/blog/${_id}`} className="font-bold text-lg hover:underline">{title}</Link>
                    <p className=" text-sm line-clamp-1">{content}</p>
                </div>

            </div>

        </Card>


    )
}

export default TrendingBlogCard