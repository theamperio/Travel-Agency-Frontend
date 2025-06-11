
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer/footer";

export default function HomeLayout(): React.ReactElement {
    return (
            <div className="min-h-screen flex flex-col">               
                <Navbar />           
                <main className="flex-1 w-full">
                    <Outlet />
                </main>
                <Footer />
            </div>
        
    );
}
