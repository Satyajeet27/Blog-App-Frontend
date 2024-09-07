
import React from 'react'
import { Separator } from '../ui/separator'
import { LoaderCircle } from 'lucide-react'
import BlogCard from './BlogCard'
import { BlogType } from './Blog'
import { useGetBlogsByUserProfile } from '@/api/blogApi'
import { Link, useLocation } from 'react-router-dom'

const UserPublishedBlog = () => {
    // const { blogsData: data, isLoading } = useGetAllBlogs()
    const { pathname } = useLocation()
    // console.log(pathname)
    const { blogsData: data, isLoading } = useGetBlogsByUserProfile(pathname)
    // console.log(data)

    return (
        <div>
            <div className=''>
                <p className='border-b-2 w-fit border-slate-500 px-3 py-1 text-slate-700'>Blog Published</p>
                <Separator />

                {
                    isLoading ? <div className="m-5 text-slate-500 text-center"><LoaderCircle className='animate-spin w-full' /></div>
                        : data.blogs.length === 0 ? <p className='mt-4 text-slate-700 bg-slate-200 text-center rounded-full py-1'>No blogs published yet</p> :
                            <div className="flex flex-col gap-4 mt-4">
                                {data && data?.blogs.map((blog: BlogType) => (
                                    <div key={blog._id}>
                                        <Link to={`/blog/${blog._id}`}>
                                            <BlogCard {...blog} />
                                        </Link>
                                    </div>
                                ))}

                            </div>
                }

            </div>
        </div>
    )
}

export default UserPublishedBlog