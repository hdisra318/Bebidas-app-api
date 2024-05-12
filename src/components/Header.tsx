import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

    const {pathname} = useLocation();

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const isHome = useMemo(() => pathname === '/', [pathname]);

    const fetchCategories = useAppStore(state => state.fetchCategories);
    const categories = useAppStore(state => state.categories);
    const searchRecipes = useAppStore(state => state.searchRecipes);
    const showNotification = useAppStore(state => state.showNotification);

    useEffect(() => {
        fetchCategories()
    }, [])

    
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name] : e.target.value
        })
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>)  => {
        e.preventDefault();

        if(Object.values(searchFilters).includes('')) {
            // console.log("Todos los campos son obligatorios.");
            showNotification(({
                text: 'Todos los campos son obligatorios',
                error: true
            }))
            return;
        }

        // Obtiene las categorias
        searchRecipes(searchFilters);
    }

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img src="/logo.svg" alt="logo" className="w-32" />
                    </div>

                    <nav className="flex gap-4">
                        <NavLink 
                            to='/'
                            className={({isActive}) => isActive ? 'text-orange-500 font-bold' : 'text-white font-bold'} 
                        >INICIO</NavLink>
                        <NavLink
                            className={({isActive}) => isActive ? 'text-orange-500 font-bold' : 'text-white font-bold'} 
                            to='/favorites'
                        >FAVORITOS</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label htmlFor="ingredient" className="block text-white font-extrabol text-lg"
                            >Nombre o Ingredientes</label>
                            
                            <input
                                id="ingredient"
                                type="text"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o Ingrediente. Ej. Tequila, Vodka"
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="category" className="block text-white font-extrabol text-lg"
                            >Categorías</label>
                            
                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value="">---- Seleccione ----</option>
                                {categories?.drinks.map((category, index) => (
                                    <option key={index} value={category.strCategory}>{category.strCategory}</option>
                                ))}
                            </select>
                        </div>

                        <input
                            type="submit"
                            value="Buscar Recetas"
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold p-2 rounded-lg w-full md:w-1/2"
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
