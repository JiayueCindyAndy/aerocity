import { UserButton } from "@clerk/nextjs";

import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    });

    return (
        <div className="rounded-md bg-white dark:bg-customDark w-48 mt-4 ml-4 mb-4">
            <div className="flex h-full flex-col items-center py-4">
                <StoreSwitcher items={stores} />
                <MainNav className="mx-4 w-full items-center" />
                <div className="flex flex-col items-center space-y-4">
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}

export default Navbar;