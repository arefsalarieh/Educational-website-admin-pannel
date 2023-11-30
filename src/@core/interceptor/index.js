import axios from "axios";
import { getItem } from "../common/storage.services";





const baseURL = "https://acadapi.etacorealtime.ir/api"

const instance = axios.create({
    baseURL: baseURL,
});

const onSuccess = (response) => {
    return response.data
}

const onError = (err) => {
    // console.log(err);

    // if(err.response.status === 401){
    //     // clearStorage()
    //     removeItem('token');
    //     window.location.pathname = '/' // or '/login'
    // }

    // if(err.response.status >= 400 && err.response.status < 500){
    //     // alert("Client request error: " + err.response.status);
    // }

    return Promise.reject(err);
}

instance.interceptors.response.use(onSuccess, onError);

instance.interceptors.request.use(opt => {

    //const user = useSelector(state => state.user)

    const token = getItem("token") ? getItem("token") : null;


    //  opt.headers['MessageTest'] = "Hello World"; 
    //  opt.headers['Content-Type'] = "application/json";
    if (token) opt.headers.Authorization = 'Bearer ' + token;
    return opt
})

export default instance;