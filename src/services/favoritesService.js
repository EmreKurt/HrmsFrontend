import axios from "axios";

export default class FavoritesService{

    getBySeekerId(seekerId){
        return axios.get(`http://localhost:8080/jobAdFavorites/getBySeekerId?seekerId=${seekerId}`)
    }

    addFavorite(seekerId,jobAdId ){
        return axios.post(`http://localhost:8080/jobAdFavorites/addFavorite?seekerId=${seekerId}&jobAdId=${jobAdId }`)
    }

    removeFavorite(favoriteId){
        return axios.delete(`http://localhost:8080/jobAdFavorites/removeFavorite?favoriteId=${favoriteId}`)
    }
}