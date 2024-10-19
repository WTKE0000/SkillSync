import axios from "axios";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';



const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: 'AKIAU6GD2ADGEWNXOOU4',
    secretAccessKey: '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',
  },
});



const API_URL = "http://localhost:8800/api-v1";


export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

const token = localStorage.getItem('User Token');


export const apiRequest = async ({ url, data, method }) => {
  try {
    const result = await API(url, {
      method: method || "GET",
      data: data,
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",  // Correct header formatting
      },
    });

    return result?.data; 
  } catch (error) {
    console.log("API Request Error:", error); 

    
    return {
      status: error.response?.status || "failed",
      message: error.response?.data?.message || error.message,
    };
  }
};

// Handle file upload using Cloudinary
export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload presets", "skillsync");
  formData.append("dricgyjxy");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dricgyjxy/image/upload/",
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.log("File Upload Error:", error);
    throw new Error("Failed to upload file");  
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

  if (pageNum && pageNum > 1) {
    params.set("page", pageNum);
  }
  
  if (query) {
    params.set("search", query);
  }

  if (cmpLoc) {
    params.set("location", cmpLoc); 
  }

  if (sort) {
    params.set("sort", sort);
  }

  if (jType) {
    params.set("jtype", jType);
  }

  if (exp) {
    params.set("exp", exp);
  }

  const newURL = `${location.pathname}?${params.toString()}`;
  navigate(newURL, { replace: true }); 
  return newURL; 
};

export const uploadVideoToS3 = async (video) => {
  if (!video) {
    console.error('No video file provided.');
    return null;
  }

  const params = {
    Bucket: 'ai-rental-images',
    Key: `${Date.now()}_${video.name}`,
    Body: video,
    ContentType: video.type,
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);
    // Build the URL manually if needed
    console.log('Video uploaded successfully:', data);
    return `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

export const createLink = async () => {
  try {
    const result = await API("https://api.daily.co/v1/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer a5362f55e9e97b06e882c9c01fd6b796ab7e47a100a549a6295a23e7d553895c`
      },
    });

    return result?.data; 
  } catch (error) {
    console.log("API Request Error:", error); 

    
    return {
      status: error.response?.status || "failed",
      message: error.response?.data?.message || error.message,
    };
  }
};
