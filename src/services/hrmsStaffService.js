import axios from "axios"


export default class HrmsStaffService{
    getHrms(){
        return axios.get("http://localhost:8080/api/hrmsstaff/getall")
    }
} 