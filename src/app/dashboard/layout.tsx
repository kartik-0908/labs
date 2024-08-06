import React from "react"
import { Sidebar } from "../../components/sidebar"

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-screen h-screen flex flex-row">
            <Sidebar />
            <div>
                {children}
            </div>
        </div>
    )
}