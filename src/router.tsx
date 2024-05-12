import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

// Dividiendo para que no pese tanto la carga de los archivos
const IndexPage = lazy(() => import('./views/IndexPage'));
const FavoritesPage = lazy(() => import('./views/FavoritesPage'));

export default function AppRouter() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" index element={
                        <Suspense fallback="Cargando...">
                            <IndexPage />
                        </Suspense>
                    } />
                    <Route path="/favorites" element={
                        <Suspense fallback="Cargando...">
                            <FavoritesPage />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}