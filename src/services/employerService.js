import axios from "axios"


export default class EmployerService{
    getEmployer(){
        return axios.get("http://localhost:8080/api/employer/getall")
    }

    registerEmployer(values){
        return axios.post("http://localhost:8080/api/employer/add",values)
    }

    getEmployerById(id){
        return axios.get("http://localhost:8080/api/employer/getById?id="+id)
    }

    update(values){
        return axios.put("http://localhost:8080/api/employer/update",values)
    }

    verifyUpdate(employerUpdateId,staffId){
        return axios.put(`http://localhost:8080/api/employer/verifyUpdate?employerUpdateId=${employerUpdateId}&staffId=${staffId}`)
    }

    getByVerifyedFalse(){
        return axios.get("http://localhost:8080/api/employer/getByVerifyedFalse")
    }
} 