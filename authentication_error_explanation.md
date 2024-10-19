# Authentication Error: JWT Token Not Provided

## Problem

When trying to fetch applicants for a job, you're encountering the following error:

```
GET /api-v1/applications/job/66fa69e9c3294814170d79cb 500 2.328 ms - 45
Authentication failed
Error: Authentication== failed
JsonWebTokenError: jwt must be provided
```

This error indicates that the JWT (JSON Web Token) is not being provided in the request to the server.

## Cause

The issue is likely occurring on the client side. The server is expecting a JWT token in the Authorization header of the request, but it's not being sent correctly.

## Solution

To fix this issue, ensure that you're including the JWT token in the Authorization header of your request on the client side. Here's how you can do it:

1. When making API calls from your client (e.g., using fetch or axios), include the token in the headers:

```javascript
const token = localStorage.getItem('token'); // Or however you're storing the token

fetch('http://your-api-url/api-v1/applications/job/66fa69e9c3294814170d79cb', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

2. If you're using axios, you can set up an interceptor to automatically include the token in all requests:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-api-url'
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Then use it like this:


3. Ensure that you're storing the token correctly after login. When the user logs in successfully, save the token:

```javascript
localStorage.setItem('token', responseData.token);
```

4. Check that the token hasn't expired. JWTs typically have an expiration time. If the token has expired, you'll need to refresh it or require the user to log in again.

By implementing these changes, you should be able to successfully include the JWT token in your requests and resolve the authentication error.