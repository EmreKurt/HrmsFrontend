import axios from "axios"


export default class JobSeekerService{
    getJobSeeker(){
        return axios.get("http://localhost:8080/api/jobseeker/getall")
    }

    registerSeeker(values){
        return axios.post("http://localhost:8080/api/jobseeker/add",values)
    }
} 