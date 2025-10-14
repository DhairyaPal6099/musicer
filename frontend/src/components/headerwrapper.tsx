"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/ui/header"

export default function HeaderWrapper() {
    const pathname = usePathname()
    const showHeader = pathname !== "/" // hide header on home page

    return showHeader ? <Header /> : null
}