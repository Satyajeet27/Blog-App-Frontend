import DashboardSideBar from '@/components/Dashboard/DashboardSideBar'
import { Outlet } from 'react-router-dom'
import DashboardMobSidebar from '../components/Dashboard/DashboardMobSidebar'

const Dashboard = () => {
    return (
        <div className='md:container'>
            <div className="grid grid-cols-4 ">
                <div className="col-span-1 hidden md:block border-e">
                    <DashboardSideBar />

                </div>
                <div className="w-full md:hidden border-e">
                    <DashboardMobSidebar />
                </div>
                <div className="col-span-4 md:col-span-3 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard