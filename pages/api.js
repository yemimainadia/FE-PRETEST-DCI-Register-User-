import axios from 'axios';

export default axios.create({
    baseURL: 'http://pretest-qa.dcidev.id/api/v1/',
    timeout: 15000
});
