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
} 