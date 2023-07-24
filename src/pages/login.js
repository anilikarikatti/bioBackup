import { useEffect, useState } from "react"
import {getData, postData} from "../pages/api/api"
import axios from "axios";
import Image from "next/image";
import {useRouter} from "next/router";
import "../../global"

import Logo from "/public/images/logo_full.webp"

export default function Login(){

    // let [number,setNumber] = useState("");
    let [data,setData] = useState({})

    let [optSend,setOtpSend] = useState(false)

    // const BASE_URL = "http://0.0.0.0:8000"

    // let BASE_URL = "http://ec2-54-250-75-169.ap-northeast-1.compute.amazonaws.com/"

    const router = useRouter()
    // return axios.get('http://10.0.0.2:3000/hello')

    const sendOtp =async (e)=>{
        e.preventDefault()
        // console.log(number);
        
            let res = await axios.get(`${global.BASE_URL}/${global.USER}/${global.OTP}/${global.SENDOTP}/${data.mobileNumber}`);

            if(res.status == 200){
                setOtpSend(true)
            }
            


        }


    const Login =async (e)=>{
        e.preventDefault()
        // console.log(number);
        
            let res = await axios.post(`${global.BASE_URL}/${global.USER}/${global.OTP}/${global.VERIFYOTP}`,{
                "mobile":data.mobileNumber,
                "otp": data.otp
            });

            console.log(res.data.response);

            console.log(res);
           if(res.data.message != "no user"){
                window.localStorage.setItem("token",res.data.response.accessToken) 
            
                window.localStorage.setItem("uuid",res.data.response.uuid) 

            router.push("/home")
           }
           else{
            router.push("/register")
           }


        }


     
    

    
    return(

        <>
             {/* <div className="h-40 ">
                </div> */}
            <div className="h-screen loginBackground overflow-hidden">
                <div className="flex justify-center ">
                <Image src={Logo} alt="logo" height={10} width={300}></Image>

                </div>
            <div className="h-80 flex justify-center ">

                
                
                {/* content */}

                <div className="flex justify-center flex-col space-y-10 ">
                    <div>
                        <input type="number" placeholder="Mobile Number" className="px-4 rounded-lg h-10 text-black" name="mobileNumber" maxLength="10"  onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}/>

                    </div>
                    <div className="flex justify-center">
                        <button className={optSend ?"rounded-3xl w-32 h-10 orange text-white hidden " : "rounded-3xl w-32 h-10 orange text-white  "} onClick={sendOtp} >lets go </button>
                    </div>

                    <div>
                        <input type="number" placeholder="enter otp" className={optSend ? "px-4 rounded-lg h-10 text-black" : "px-4 rounded-lg h-10 hidden"} name="otp" onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}/>

                    </div>

                    <div className="flex justify-center">
                        <button className={!optSend ?"rounded-3xl w-32 h-10 orange text-white hidden " : "rounded-3xl w-32 h-10 orange text-white  "} onClick={Login} >Login </button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}