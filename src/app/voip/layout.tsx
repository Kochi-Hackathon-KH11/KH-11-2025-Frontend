'use client'

import { SocketContextProvider } from "@/hooks/useSocketContext"
import { ReactNode } from "react"

const Layout = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <SocketContextProvider>
            {children}
        </SocketContextProvider>    
    )
}

export default Layout;