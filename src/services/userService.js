import axios from 'axios'

export default class UserService {
    login(values){
        return axios.post("http://localhost:8080/api/user/login",values)
    }
}
