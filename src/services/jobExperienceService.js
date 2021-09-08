import axios from "axios"


export default class JobExperienceService{
    getByCvId(cvId){
        return axios.get(`http://localhost:8080/api/jobexperience/getByCvId?id=${cvId}`)
    }


    updateExperience(cvId,leavingWorkYear,position,startYear,workPlaceName){
        return axios.put(`http://localhost:8080/api/jobexperience/updateExperience?cvId=${cvId}&leavingWorkYear=${leavingWorkYear}&position=${position}&startYear=${startYear}&workPlaceName=${workPlaceName}`)
    }
} 