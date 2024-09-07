import BlogCard from './BlogCard'
import { Separator } from '../ui/separator'
import { useGetAllBlogs } from '@/api/blogApi'
import { Home, LoaderCircle } from 'lucide-react'


interface AuthorType {
    _id: string;
    username: string;
}
export interface BlogType {
    _id?: string;
    title: string;
    content: string;
    createdAt: Date;
    coverImage: string;
    category: string;
    author: AuthorType;
    likes: number;
    likedBy: [object];
}

const Blog = () => {
    // const { data, isLoading, error } = useQuery({ queryKey: ["fetchAllBlogs"], queryFn: fetchAllBlogs })

    const { blogsData: data, isLoading, error } = useGetAllBlogs()

    if (error) {
        return <div>Something went wrong</div>
    }

    return (
        <div className=''>
            <p className='border-b-2 w-fit font-semibold border-slate-500 px-3 py-1 text-slate-700 flex items-center gap-1'><Home size={"1.1rem"} /> Home</p>
            <Separator />
            {
                isLoading ? <div className="m-5 text-slate-500 text-center"><LoaderCircle className='animate-spin m-4 w-full' /></div>
                    :
                    <div className="flex flex-col gap-4 mt-4">
                        {data && data?.blogs.map((blog: BlogType) => (
                            <div key={blog._id}>
                                <div ><BlogCard {...blog} /></div>
                            </div>
                        ))}

                    </div>
            }
        </div>
    )
}

export default Blog