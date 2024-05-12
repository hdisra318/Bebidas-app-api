import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAppStore } from "../stores/useAppStore";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Notification from "../components/Notification";

function Layout() {

    // Obtiene los datos de LocalStorage
    const loadFromStorage = useAppStore(state => state.loadFromStorage);

    useEffect(() => {
        loadFromStorage();
    }, []);

    return (
        <>
            <Header />

            <main className="container mx-auto py-16 px-10">
                {/* Children of the layout */}
                <Outlet />
            </main>

            <Modal />

            <Notification />
        </>
    )
}

export default Layout
