"use client"

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Overview',
            active: pathname === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Homepage',
            active: pathname === `/${params.storeId}/billboards`,
        },
        {
            href: `/${params.storeId}/categories`,
            label: 'Categories',    
            active: pathname === `/${params.storeId}/categories`,
        },
        {
            href: `/${params.storeId}/dailyReports`,
            label: 'Manage Reports',    
            active: pathname === `/${params.storeId}/dailyReports`,
        },
        {
            href: `/${params.storeId}/customer`,
            label: 'Customer',    
            active: pathname === `/${params.storeId}/customer`,
        },
        {
            href: `/${params.storeId}/pelanggan`,
            label: 'Pelanggan',    
            active: pathname === `/${params.storeId}/pelanggan`,
        },
        {
            href: `/${params.storeId}/standMeter`,
            label: 'Stand Meter',    
            active: pathname === `/${params.storeId}/standMeter`,
        },
        {
            href: `/${params.storeId}/catatMeter`,
            label: 'Catat Meter',    
            active: pathname === `/${params.storeId}/catatMeter`,
        },
        {
            href: `/${params.storeId}/reportMaintenanceByArea`,
            label: 'Maintenance Area',    
            active: pathname === `/${params.storeId}/reportMaintenanceByArea`,
        },
        {
            href: `/${params.storeId}/reportMaintenanceByCategory`,
            label: 'Maintenance Category',    
            active: pathname === `/${params.storeId}/reportMaintenanceByCategory`,
        },
        // {
        //     href: `/${params.storeId}/sizes`,
        //     label: 'Length',
        //     active: pathname === `/${params.storeId}/sizes`,
        // },
        // {
        //     href: `/${params.storeId}/colors`,
        //     label: 'Type',
        //     active: pathname === `/${params.storeId}/colors`,
        // },
        // {
        //     href: `/${params.storeId}/products`,
        //     label: 'Waters',
        //     active: pathname === `/${params.storeId}/products`,
        // },
        // {
        //     href: `/${params.storeId}/orders`,
        //     label: 'Reports',
        //     active: pathname === `/${params.storeId}/orders`,
        // },
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`,
        },
    ];

    return (
       <nav
        className={cn("flex my-4 items-center flex-col space-y-4 lg:space-x-0", className)}
       >
        {routes.map((route) => (
            <Link
                key={route.href}
                href={route.href}
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    route.active ? "text-black dark:text-white" : "text-muted-foreground"
                )}
            >
                {route.label}
            </Link>
        ))}
       </nav>
    )
}