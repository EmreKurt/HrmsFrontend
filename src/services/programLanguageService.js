import axios from "axios"


export default class ProgramLanguageService{

    deleteProgramLanguage(technologyId){
        return axios.delete(`http://localhost:8080/api/programminglanguage/deleteTechnology?technologyId=${technologyId}`)
    }

    addProgramLanguage(programLanguage){
        return axios.post("http://localhost:8080/api/programminglanguage/add",programLanguage)
    }

    getByCvId(cvId){
        return axios.get(`http://localhost:8080/api/programminglanguage/getByCvId?cvId=${cvId}`)
    }
} 