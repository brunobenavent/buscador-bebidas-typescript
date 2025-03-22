import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice"



export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExist: (recipe: Recipe) => boolean,
    loadFromStorage: () => void
}


export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().favoriteExist(recipe)){
            set({
                favorites: get().favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            })

        }else {
            set((state)=> ({
                favorites: [...state.favorites, recipe]
            }))
        }
        createRecipesSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites) )
    },
    favoriteExist: (recipe) => get().favorites.some(favorite => recipe.idDrink === favorite.idDrink),
    loadFromStorage: ()=>{
        const storedFavorites = localStorage.getItem('favorites')

        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })

        }else{
            set({
                favorites:[]
            })
        }
    }
})  