import UserPublishedBlog from "@/components/blog/UserPublishedBlog"
import UserProfileCard from "@/components/userProfile/UserProfileCard"


const UserProfile = () => {
    return (
        <div className='container my-8'>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-3 ">
                <div className="md:col-span-2">
                    <UserPublishedBlog />
                </div>

                <div className="md:col-span-1">
                    <UserProfileCard />
                </div>
            </div>
        </div>
    )
}

export default UserProfile