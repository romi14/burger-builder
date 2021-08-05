import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-my-burger-8b618-default-rtdb.firebaseio.com/'//URL copied from my DB project on firebase
});

export default instance;