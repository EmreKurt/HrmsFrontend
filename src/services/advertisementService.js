import axios from "axios";

export default class AdvertisementService {
  getAdvertisements() {
    return axios.get("http://localhost:8080/api/jobadvertisement/getall");
  }

  getByJobAdId(id) {
    return axios.get(
      "http://localhost:8080/api/jobadvertisement/getByJobAdId?id=" + id
    );
  }

  getById(id) {
    return axios.get(
      "http://localhost:8080/api/jobadvertisement/findbyid?id=" + id
    );
  }


  getActiveAdsByCompanyId(id) {
    return axios.get(
      "http://localhost:8080/api/jobadvertisement/findbyisactivetrueandemployer?id=" +
        id
    );
  }

  add(values) {
    return axios.post("http://localhost:8080/api/jobadvertisement/create", values);
  }

  getByConfirmFalse() {
    return axios.get(
      "http://localhost:8080/api/jobadvertisement/getbyisconfirm?isConfirm=false"
    );
  }

  getByJobAdvertisementIdAndConfirmFalse(id) {
    return axios.get(
      "http://localhost:8080/api/jobadvertisement/getbyisconfirm?isConfirm=false&id=" +
        id
    );
  }

  confirm(id) {
    return axios.get(
      "http://localhost:8080/api/jobadvertisements/updateisconfirm?isConfirm=true&id=" +
        id
    );
  }

  delete(id) {
    return axios.post(
      "http://localhost:8080/api/jobadvertisements/delete?id=" + id
    );
  }

  getPageableAndFilterJobPostings(pageNo, pageSize, filterOption) {
    return axios.post(`http://localhost:8080/api/jobadvertisement/getByActiceAndFilter?pageNo=${pageNo}&pageSize=${pageSize}`,filterOption);
  }
}
