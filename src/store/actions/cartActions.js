export const ADD_TO_FAVORİTE = "ADD_TO_FAVORİTE"
export const DELETE_FROM_FAVORİTE = "DELETE_FROM_FAVORİTE"

export function addToFavorite(advertisement){
    return{
        type:ADD_TO_FAVORİTE,
        payload:advertisement
    }
}

export function deleteFromFavorite(advertisement){
    return{
        type:DELETE_FROM_FAVORİTE,
        payload:advertisement
    }
}