import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LayoutDashboardIcon } from "lucide-react"
import DashboardSideBar from "./DashboardSideBar"


const DashboardMobSidebar = () => {
    return (
        <Sheet >
            <SheetTrigger><div className="text-nowrap flex gap-1 p-1 ps-6 mt-4 text-slate-700"><LayoutDashboardIcon /> Dashboard</div></SheetTrigger>
            <SheetContent side={"left"}>
                <SheetHeader>
                    <DashboardSideBar />
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}

export default DashboardMobSidebar