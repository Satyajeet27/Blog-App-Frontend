import { Edit, LogOut } from "lucide-react"
import blogLogo from "../../assets/logo/blog.png"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useAuthenticate, useGetUser } from "@/auth/autheticateValidation"
import { useEffect } from "react"
import InputSearch from "../Search/InputSearch"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const Navbar = () => {
    const { userData, isSuccess } = useGetUser()
    const { isAuthenticated } = useAuthenticate()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        queryClient.invalidateQueries({ queryKey: ["fetchUser"] })
        toast.success("Logout Successfully!", { style: { background: "green", color: "white" } })
        navigate("/auth")
    }
    // console.log(error)
    useEffect(() => {
        if (isSuccess) {
            // console.log(userData)
        }
    }, [isAuthenticated, isSuccess])
    return (
        <div className=" py-4 border-b">
            <div className="container flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <Link to={"/"}><img src={blogLogo} alt="blog-logo" className=" w-12" /></Link>
                    <InputSearch />
                </div>
                {
                    isAuthenticated ?
                        <div className="flex mx-2 gap-4 items-center">
                            <Link to={"/dashboard/editor"} className="flex gap-2 text-slate-600 bg-slate-200 py-2 px-4 rounded-full"><Edit /> <span className="hidden sm:block">Write</span></Link>
                            <div className="">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem><Link to={`/user/${userData?.user?.username}`}>Profile</Link></DropdownMenuItem>
                                        <DropdownMenuItem><Link to={"/dashboard/blogs"}>Dashboard</Link></DropdownMenuItem>
                                        <DropdownMenuItem><Button onClick={handleLogout} className="space-x-1" size={"sm"} variant={"destructive"}><LogOut size={"1.1rem"} /> <span>Logout</span></Button></DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                        </div>
                        : <div className="flex">
                            <Button onClick={() => navigate("/auth", { state: { "auth": "login" } })} variant={"ghost"}>Login</Button>
                            <Button onClick={() => navigate("/auth", { state: { "auth": "register" } })}>Signup</Button>
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar