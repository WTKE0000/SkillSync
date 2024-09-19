import axios from "axios"
const API_URL = "http://localhost:8800/api-v1";


export const API = axios.create({
    baseURL: API_URL,
    responseType: "json",
});



export const apiRequest = async({url, token, data, method})=>{
    try{
        const result = await API(url, {
            method: method || "GET",
            data: data,
            headers: {
                "content-type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
            }
        })
    }catch (error){
        console.log(error);
        return { status: err.success, message: err.message};
    }
};

export const handleFileUpload = async(uploadFile)=>{
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "skillsync");

    try{
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dricgyjxy/image/upload/",
            formData
        );
        return response.data.secure_url;
    } catch(error){
        console.log(error);
    }
}; 

export const updateURL = ({
    pageNum,
    query,
    cmpLoc,
    sort,
    navigate,
    location,
    jType,
    exp,
}) => {
    const params = new URLSearchParams();
};

