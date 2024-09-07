import { Separator } from '../ui/separator'
import { Edit, LockKeyhole, NotebookPen, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const DashboardSideBar = () => {
    const { pathname } = useLocation()
    const selectedData = pathname.split("/").at(-1)
    return (
        <div className='flex flex-col gap-6 text-slate-600 '>
            <div className="">
                <p className='p-4 '>Dashboard</p>
                <Separator />
                <div className="">
                    <Link to={"/dashboard/blogs"} className={`p-4 flex items-center gap-2 hover:bg-slate-200 ${selectedData === "blogs" && "bg-slate-200 border-e-4 border-slate-500"}`}><NotebookPen size={"1.2rem"} /> Blog</Link>
                    {/* <Link to={"notification"} className='p-4 flex items-center gap-2  hover:bg-slate-200 ' ><BellIcon size={"1.2rem"} /> Notification</Link> */}
                    <Link to={"/dashboard/editor"} className={`p-4 flex items-center gap-2 hover:bg-slate-200 ${selectedData === "editor" && "bg-slate-200 border-e-4 border-slate-500"}`}><Edit size={"1.2rem"} /> Write</Link>
                </div>
            </div>
            <div className="">
                <p className='p-4 '>Settings</p>
                <Separator />
                <div className="">
                    <Link to={"/settings/edit-profile"} className={`p-4 flex items-center gap-2 hover:bg-slate-200 ${selectedData === "edit-profile" && "bg-slate-200 border-e-4 border-slate-500"}`}><User size={"1.2rem"} /> Edit Profile</Link>
                    <Link to={"/settings/reset-password"} className={`p-4 flex items-center gap-2 hover:bg-slate-200 ${selectedData === "reset-password" && "bg-slate-200 border-e-4 border-slate-500"}`}> <LockKeyhole size={"1.2rem"} />Change Password</Link>
                </div>
            </div>
        </div>
    )
}

export default DashboardSideBar