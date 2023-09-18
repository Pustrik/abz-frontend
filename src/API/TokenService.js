import axios from "axios";

export default class TokenService {
    static async getToken() {
        const res = await axios.get('http://3.70.236.251:3001/api/v1/token');
        return res.data.token;
    };
}