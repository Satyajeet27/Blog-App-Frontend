import { useGetUser } from '@/auth/autheticateValidation'
import { Separator } from '../ui/separator'
import BlogCard from './BlogCard'
import { useGetBlogsByUserProfile } from '@/api/blogApi'
import { LoaderCircle, Search } from 'lucide-react'
import { Input } from '../ui/input'
import { useState } from 'react'
export type BlogCardType = {
    _id?: string
    title: string;
    createdAt: Date;
    coverImage: string;
    content: string;
    likes: number
}
const Blogs = () => {
    const { userData } = useGetUser()
    const [searchInput, setSearchInput] = useState<string | undefined>("")
    // console.log(userData)
    const { blogsData, isLoading } = useGetBlogsByUserProfile(`/user/${userData?.user?.username}`)

    const filterData = searchInput ? blogsData?.blogs.filter((blog: BlogCardType) => blog.title.toLowerCase().includes(searchInput.toLowerCase())) : blogsData?.blogs
    console.log(filterData)

    return (
        <div className='p-4 flex flex-col gap-4 text-slate-600'>
            <h4 className=''>Manage Blogs</h4>
            {/* <InputSearch /> */}
            <div className="relative">
                <Search className="absolute top-3 left-2 text-slate-700" size={"1.1rem"} />
                <Input type="search" className="rounded-full ps-8" placeholder="Search" onChange={e => setSearchInput(e.target.value)} />
            </div>
            <div className="">
                <span>Published Blogs</span>
                <Separator />

                {
                    isLoading ? <div><LoaderCircle className='animate-spin m-4' /></div> : filterData.length === 0 ?
                        <p className='mt-4 text-slate-700 bg-slate-200 text-center rounded-full py-1'>No blogs published yet</p>
                        :
                        filterData?.map((blog: BlogCardType, index: string) => (<div key={index} className='my-4 grid grid-cols-2 '>
                            <BlogCard likes={blog.likes} coverImage={blog.coverImage} title={blog.title} createdAt={blog.createdAt} content={blog.content} _id={blog._id} />
                        </div>))
                }

            </div>

        </div>
    )
}

export default Blogs