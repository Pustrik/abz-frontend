import axios from "axios";
import TokenService from "./TokenService";

export default class UserService {
    static async getPage(count = 6, page = 1) {
        return axios.get('http://3.70.236.251:3001/api/v1/users', {
            params: {
                count: count,
                page: page
            }
        });
    };
    static async getPageByURL(count = 6, page = 1) {
        return axios.get('http://3.70.236.251:3001/api/v1/users', {
            params: {
                count: count,
                page: page
            }
        });
    };
    static async getById(id) {
        return axios.get(`http://3.70.236.251:3001/api/v1/users/${id}`);
    }

    static async createUser(user) {
        const token = await TokenService.getToken();
        return axios.post(`http://3.70.236.251:3001/api/v1/users`, user, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
    };

    static async getPositions() {
        return await axios.get(`http://3.70.236.251:3001/api/v1/positions`);
    };
}