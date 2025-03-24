import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"



export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExist: (recipe: Recipe) => boolean,
    loadFromStorage: () => void
}


export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().favoriteExist(recipe)){
            set({
                favorites: get().favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            })
            createNotificationSlice(set, get, api).showNotification({text: 'Se eliminó de favoritos', error: false})
        }else {
            set((state)=> ({
                favorites: [...state.favorites, recipe]
            }))
            createNotificationSlice(set, get, api).showNotification({text: 'Se agregó a favoritos', error: false})
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