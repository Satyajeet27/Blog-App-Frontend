import blogLogo from "../../assets/logo/blog.png"
import { Link } from "react-router-dom"

const EditorNav = () => {

    return (
        <div className="container py-4 border-b">
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <Link to={"/"}><img src={blogLogo} alt="blog-logo" className="h-12" /></Link>
                    <h3 className="font-bold">New Blog</h3>
                </div>
                <div className="">

                </div>
            </div>
        </div>
    )
}

export default EditorNav