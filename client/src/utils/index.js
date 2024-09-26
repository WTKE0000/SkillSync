import axios from "axios";

const API_URL = "http://localhost:8800/api-v1";

// Create a reusable Axios instance
export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

// API request wrapper
export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await API(url, {
      method: method || "GET",
      data: data,
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",  // Correct header formatting
      },
    });

    return result?.data;  // Return the response data
  } catch (error) {
    console.error("API Request Error:", error);  // Log the error for debugging

    // Return a structured error object
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
  formData.append("upload_preset", "skillsync");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dricgyjxy/image/upload/",
      formData
    );
    return response.data.secure_url;  // Return the uploaded image URL
  } catch (error) {
    console.error("File Upload Error:", error);
    throw new Error("Failed to upload file");  // Throw a meaningful error
  }
};

// Update the URL with search parameters
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
    params.set("location", cmpLoc);  // Correct typo from 'loacation' to 'location'
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
  navigate(newURL, { replace: true });  // Navigate and replace the current URL
  return newURL;  // Return the updated URL
};
