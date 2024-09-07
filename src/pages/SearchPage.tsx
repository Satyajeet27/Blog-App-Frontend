import { useGetAllBlogs } from '@/api/blogApi'
import { BlogType } from '@/components/blog/Blog'
import BlogCard from '@/components/blog/BlogCard'
import { BlogCardType } from '@/components/Dashboard/Blogs'
import { Loader2Icon } from 'lucide-react'

import { useSearchParams } from 'react-router-dom'

const SearchPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, _] = useSearchParams()
    // console.log(searchParams.toString().split("=").at(-1))
    const searchInput = searchParams.toString().split("=").at(-1)
    const { blogsData, isLoading } = useGetAllBlogs()
    const filterData = blogsData?.blogs.filter((blog: BlogCardType) => blog.title.toLowerCase().includes(searchInput?.toLowerCase() as string))
    return (
        <div className='container my-6'>
            <h2 className='text-lg my-4 font-semibold text-slate-700'>Results for the search....</h2>
            {
                isLoading ? <div><Loader2Icon className='animate-spin' /></div> :
                    filterData?.length === 0 ? <div className='text-center bg-slate-200 text-slate-700 py-2 px-6 rounded-full'>No any blogs found!</div>
                        : <div className="flex flex-col gap-4 mt-4">
                            {filterData.map((blog: BlogType) => (
                                <div key={blog._id}>
                                    <div ><BlogCard {...blog} /></div>
                                </div>
                            ))}

                        </div>
            }
        </div>
    )
}

export default SearchPage