import {StateCreator} from 'zustand';

import { Recipe } from '../types';
import { RecipesSliceType, createRecipeSlice } from './recipeSlice';
import { NotificationSliceType, createNotificationSlice } from './notificationSlice';

export type FavoritesSliceType = {
    favorites: Recipe[],
    handleClickFavorite: (recipe: Recipe) => void,
    favoriteExists: (id: Recipe['idDrink']) => boolean,
    loadFromStorage: () => void
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {

        // Si ya fue agregado a favoritos la receta
        if(get().favoriteExists(recipe.idDrink)){
            // Eliminando de lista la receta
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))

            // Manando notificacion
            createNotificationSlice(set, get, api).showNotification({
                text: 'Bebida eliminada de Favoritos',
                error: false
            })
        } else {
            // Agregando a favoritos
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))

            // Manando notificacion
            createNotificationSlice(set, get, api).showNotification({
                text: 'Bebida agregada a Favoritos',
                error: false
            })
        }

        // Llamando al otro slice
        createRecipeSlice(set, get, api).closeModal();

        // Sincronizando con LocalStorage
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExists: id => {

        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    // Carga los datos a LocalStorage
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');

        if(storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})