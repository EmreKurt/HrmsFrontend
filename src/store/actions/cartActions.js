export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE"
export const DELETE_FROM_FAVORITE = "DELETE_FROM_FAVORITE"

export function addToFavorite(advertisement){
    return{
        type:ADD_TO_FAVORITE,
        payload:advertisement
    }
}

export function deleteFromFavorite(advertisement){
    return{
        type:DELETE_FROM_FAVORITE,
        payload:advertisement
    }
}