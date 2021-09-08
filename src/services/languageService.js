import axios from "axios"


export default class LanguageService{

    deleteLanguage(languageId){
        return axios.delete(`http://localhost:8080/api/language/deleteLanguage?languageId=${languageId}`)
    }

    addLanguage(language){
        return axios.post("http://localhost:8080/api/language/add",language)
    }

    getByCvId(cvId){
        return axios.get(`http://localhost:8080/api/language/getByCvId?cvId=${cvId}`)
    }
} 