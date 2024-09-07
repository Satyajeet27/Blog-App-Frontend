import { UserRoundPen } from "lucide-react"
import { Link } from "react-router-dom"
import { BlogType } from "./Blog"

type AuthorType = {
    author: { username: string }
}

const PopularAuthors = ({ data }: { data: [BlogType] }) => {
    return (
        <div className="flex flex-wrap gap-2 items-center">
            {data?.map((blog: AuthorType, index: number) => (
                <Link to={`/user/${blog.author.username}`} key={index} className="px-4 py-1 flex items-center gap-2 hover:bg-slate-400 text-slate-600 text-nowrap rounded-full bg-slate-200 "><UserRoundPen size={"1.1rem"} />{blog.author.username}</Link>
            ))}
        </div>
    )
}

export default PopularAuthors