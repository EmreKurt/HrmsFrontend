import axios from "axios";

export default class SchoolService{
    getByCvId(cvId){
        return axios.get(`http://localhost:8080/api/school/getByCvId?cvId=${cvId}`)
    }

    addScholl(school){
        return axios.post("http://localhost:8080/api/school/add",school)
    }

    deleteSchool(schoolId){
        return axios.delete(`http://localhost:8080/api/school/deleteSchool?schoolId=${schoolId}`)
    }

    updateSchool(cvId,departmentName,graduationYear,schoolName,startYear){
        return axios.put(`http://localhost:8080/api/school/updateSchool?cvId=${cvId}&departmentName=${departmentName}&graduationYear=${graduationYear}&schoolName=${schoolName}&startYear=${startYear}`)
    }
} 