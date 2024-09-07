import Blog from '@/components/blog/Blog'
import Sidebar from '@/components/blog/Sidebar'



const Home = () => {
    return (
        <div className='container my-8'>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-3 ">
                <div className="md:col-span-2">
                    <Blog />
                </div>

                <div className="md:col-span-1">
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default Home