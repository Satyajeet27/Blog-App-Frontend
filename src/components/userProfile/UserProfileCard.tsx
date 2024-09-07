
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useGetUser } from '@/auth/autheticateValidation'
import { Button } from '../ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGetBlogsByUserProfile } from '@/api/blogApi'
import { useEffect } from 'react'

const UserProfileCard = () => {
    const { userData } = useGetUser()
    const { pathname } = useLocation()
    const { blogsData, refetch } = useGetBlogsByUserProfile(pathname)
    const navigate = useNavigate()
    const date = new Date(userData?.user?.createdAt)
    const formattedDate = date.toLocaleDateString("en-us", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }).replace(",", " ")
    useEffect(() => { refetch() }, [pathname, refetch])
    return (
        <div className='md:border-s'>
            <div className="flex flex-col gap-4 px-6 text-sm text-slate-700">
                <Avatar className=' text-center w-28 h-28'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className='font-semibold text-lg'>@{blogsData?.author?.username}</p>
                <p className=''>{blogsData?.blogs.length} Blogs</p>
                {
                    userData?.user?.username === pathname.split("/").at(-1) && <Button className='w-fit' onClick={() => navigate("/settings/edit-profile")} variant={"secondary"} size={"sm"}>Edit Profile</Button>
                }
                <p className=''>{blogsData?.author.bio}</p>
                <p className='text-slate-500'>Joined on {formattedDate}</p>
            </div>

        </div>
    )
}

export default UserProfileCard