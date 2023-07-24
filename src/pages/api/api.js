
import axios from "axios";
// import { headers } from "next/dist/client/components/headers";


// let baseUrl = "http://localhost:8000";

let baseUrl = "http://ec2-54-250-75-169.ap-northeast-1.compute.amazonaws.com"

const BASE_URL = "http://localhost:8000"


 const getData =  (url)=>{

    console.log(`${baseUrl}/${url}`);

    return axios.get(`${baseUrl}/${url}`,{headers:{
        "access-token":localStorage.getItem("token")
        // trial
        // "access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNTllNWM0NTktMGE4Yi0xMWVkLWJmMzEtYThhNzk1YWE0MDUxIiwibmFtZSI6IkFkbWluIiwiZ2VuZGVyIjoibSIsImRvYiI6IjIwMDItMDItMTlUMTg6MzA6MDAuMDAwWiIsIm1vYmlsZSI6IjcwMTkwOTc5NjYiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImNpdHkiOiJodWJsaSIsInBpbmNvZGUiOiI1ODAwMzAiLCJhZGRyZXNzIjoic2FkZmFzZCIsImFhZGhhciI6IjE0Nzg0NTg3ODUyNSIsInBhc3N3b3JkIjoiYWRtaW4iLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yM1QxMzoyODozNC4wMDBaIiwidXBkYXRlZF9hdCI6bnVsbCwiaWF0IjoxNjU4NjAxNDc5fQ.ogIxb6RehYMqBFxRqnaucVIAX5pshYck2zGZYrKggpc"
    }})
}


 const  postData = (url,values)=>{
    return axios.post(`${baseUrl}/${url}`,values,{headers:{
        "access-token":localStorage.getItem("token")

        // "access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNTllNWM0NTktMGE4Yi0xMWVkLWJmMzEtYThhNzk1YWE0MDUxIiwibmFtZSI6IkFkbWluIiwiZ2VuZGVyIjoibSIsImRvYiI6IjIwMDItMDItMTlUMTg6MzA6MDAuMDAwWiIsIm1vYmlsZSI6IjcwMTkwOTc5NjYiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImNpdHkiOiJodWJsaSIsInBpbmNvZGUiOiI1ODAwMzAiLCJhZGRyZXNzIjoic2FkZmFzZCIsImFhZGhhciI6IjE0Nzg0NTg3ODUyNSIsInBhc3N3b3JkIjoiYWRtaW4iLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yM1QxMzoyODozNC4wMDBaIiwidXBkYXRlZF9hdCI6bnVsbCwiaWF0IjoxNjU4NjAxNDc5fQ.ogIxb6RehYMqBFxRqnaucVIAX5pshYck2zGZYrKggpc"
    }})
}

export {getData,postData}

