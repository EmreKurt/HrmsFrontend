import axios from "axios"


export default class JobSeekerService{
    getJobSeeker(){
        return axios.get("http://localhost:8080/api/jobseeker/getall")
    }

    getAllByJobSeeker(id){
        return axios.get(`http://localhost:8080/api/jobseeker/getAllByJobSeeker?id=${id}`)
    }

    registerSeeker(values){
        return axios.post("http://localhost:8080/api/jobseeker/add",values)
    }

    add(values){
        return axios.post("http://localhost:8080/api/jobseeker/addJobSeeker",values)
    }

    updateSeeker(id,email,firstName,lastName,birthDate,phoneNumber,github,linkedin){
        return axios.put(`http://localhost:8080/api/jobseeker/update?birthDate=${birthDate}&email=${email}&firstName=${firstName}&github=${github}&id=${id}&lastName=${lastName}&linkedin=${linkedin}&phoneNumber=${phoneNumber}`)
    }
} 