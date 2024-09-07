import { LoaderCircle, TrendingUp, UserCircle2Icon } from 'lucide-react'
import TrendingBlogCard from './TrendingBlogCard'
import { Separator } from '../ui/separator'
import { useGetTrendingBlogs } from '@/api/blogApi'
import PopularAuthors from './PopularAuthors'

export type BlogDataType = {
    title: string;
    content: string;
    author: { username: string };
    createdAt: Date;
    index: number
    _id: string;
}

const Sidebar = () => {
    const { data, isLoading } = useGetTrendingBlogs()
    return (
        <div className='md:border-s'>
            <div className="">
                <p className='font-semibold p-1 px-3 flex gap-1 items-center text-slate-700'><UserCircle2Icon size={"1.1rem"} /> Popular Authors</p>
                <Separator />
                <div className="my-6 ps-2">
                    {isLoading ? <LoaderCircle className='animate-spin m-4' /> : <PopularAuthors data={data} />}
                </div>
            </div>
            <div className="">
                <h4 className='flex gap-2 items-center ps-2 font-semibold text-slate-700'><TrendingUp /><span>Trending</span></h4>
                <Separator />
                <div className="my-4 ps-2 grid gap-4">
                    {isLoading ? <LoaderCircle className='animate-spin m-4' /> : (
                        data.map((blogData: BlogDataType, index: number) => (<div className='' key={index}><TrendingBlogCard author={blogData.author} title={blogData.title} createdAt={blogData.createdAt} content={blogData.content} index={index + 1} _id={blogData._id} /></div>))
                    )}</div>

            </div>
        </div>
    )
}

export default Sidebar