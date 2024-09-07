import { useGetBlogById } from '@/api/blogApi'
import { formatDate } from '@/util/dateFormatter'
import { Loader, UserRoundPen } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const BlogPage = () => {
    const { pathname } = useLocation()
    const blogId = pathname.split("/").at(-1) as string
    const { data, isLoading } = useGetBlogById(blogId)
    const formattedDate = formatDate(data?.blogs?.createdAt)
    if (isLoading) {
        return <Loader size={"3rem"} className='w-full text-slate-500 text-center my-8 animate-spin duration-2000' />
    }
    return (
        <div className='container'>
            <div className="px-2 md:px-20 ">
                <div className="">
                    <img src={data?.blogs.coverImage} className='max-h-[35rem] w-full py-6  object-center' alt="" />
                </div>
                <div className="flex justify-between">
                    <h3 className='text-3xl my-1 font-bold'>{data?.blogs.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                        <UserRoundPen size={"1rem"} />
                        <Link to={`/user/${data?.blogs?.author?.username}`}><span className="hover:underline">{data?.blogs?.author?.username?.toLowerCase()}</span></Link>
                        <span className="ms-2">@{formattedDate}</span>
                    </div>

                </div>

                <p className='bg-slate-200 text-sm px-4 py-1 w-fit rounded-full text-slate-600'>{data?.blogs.category}</p>
                <p className='my-2'>{data?.blogs?.content}</p>
            </div>
        </div>
    )
}

export default BlogPage