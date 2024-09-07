import EditorNav from "@/components/Navbar/EditorNav"
import Navbar from "@/components/Navbar/Navbar"
import React from "react"
import { useLocation } from "react-router-dom"

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    const { pathname } = useLocation()
    return (
        <div>
            {pathname === "/editor" ? <EditorNav /> : <Navbar />}
            <div className="">
                {children}
            </div>
        </div>
    )
}

export default Layout