import axios from "axios"


export default class CvService{
    getCv(){
        return axios.get("http://localhost:8080/api/cv/getAll")
    }

    getById(id){
        return axios.get("http://localhost:8080/api/cv/getId?id="+id)
    }    

    getBySeekerId(id){
        return axios.get("http://localhost:8080/api/cv/getBySeekerId?seekerId="+id)
    }

    getBySchoolId(id){
        return axios.get("http://localhost:8080/api/cv/getBySchoolId?schoolId="+id)
    }

    getByExperienceId(id){
        return axios.get("http://localhost:8080/api/cv/getByJobExperienceId?jobExperienceId="+id)
    }

    getByLanguageId(id){
        return axios.get("http://localhost:8080/api/cv/getByprogramLanguageId?programLanguageId="+id)
    }

    getByImageId(id){
        return axios.get("http://localhost:8080/api/cv/getByImageId?imageId="+id)
    }

    updateBiography(cvId,coverLatter){
        return axios.put(`http://localhost:8080/api/cv/updateBiography?coverLatter=${coverLatter}&cvId=${cvId}`)
    }

    updateGithub(cvId,githubLink){
        return axios.put(`http://localhost:8080/api/cv/updateGithub?cvId=${cvId}&githubLink=${githubLink}`)
    }

    updateLinkedin(cvId,linkedin){
        return axios.put(`http://localhost:8080/api/cv/updateLinkedin?cvId=${cvId}&linkedinlink=${linkedin}`)
    }

    deleteSchool(id){
        return axios.delete(`http://localhost:8080/api/cv/deleteSchool?id=${id}`)
    }
} 