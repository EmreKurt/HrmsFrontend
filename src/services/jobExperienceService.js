import axios from "axios"


export default class JobExperienceService{
    getExperience(){
        return axios.get("http://localhost:8080/api/jobexperience/getByCvId?id=8")
    }
} 