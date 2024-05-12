import { StateCreator } from "zustand"

import { getCategories, getRecipeById, getRecipies } from "../services/recipeService"
import type { Categories, Drinks, SearchFilter, Drink, Recipe } from "../types";
import { FavoritesSliceType } from "./favoritesSlice";

export type RecipesSliceType = {
    categories: Categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: boolean,
    fetchCategories: () => Promise<void>,
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>,
    selectRecipe: (id: Drink['idDrink']) => Promise<void>,
    closeModal: () => void
}

export const createRecipeSlice: StateCreator<RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories();
        set({
            categories
        })
    },
    searchRecipes: async (searchFilters) => {
        const drinks = await getRecipies(searchFilters);
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const recipe = await getRecipeById(id);
        set({
            selectedRecipe : recipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe // Para no escribir todo el tipo
        })
    }
})