import { useEffect, useState } from "react"
import {getData} from "../pages/api/api"
import axios from "axios";
import Image from "next/image";

import "../../global"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Home(){

    // let[home,setHome] = useState(true)
    
    // home page
    let [user,setUser] = useState({});

    useEffect(()=>{
        const getUser = async()=>{
            let res =await  getData(`${global.USER}/${localStorage.getItem("uuid")}`);

        console.log("resp",res.data.response);
        
        console.log(`${global.USER}/${localStorage.getItem("uuid")},${localStorage.getItem("token")}`)

        let {name,gender,date_of_birth,s3Url} = res.data.response

        setUser({name:name,gender:gender == "m" ? "male" : "female" ,dob:date_of_birth,url:s3Url})

        }
        getUser()
    },[])


    
    return(

        <>
            <div className="h-screen flex justify-center pageBackground">
                <Header />
                {/* content */}
                <div className="orange h-40  w-[85%] top-20 relative rounded-lg ">
                   
                    {/* profile */}
                    <div className="flex h-40">
                    <div className="h-20 bg-white rounded-full border-2 border-black w-20 relative  top-8 left-6 overflow-hidden">
                        {/* img */}
                        <Image src={user.url} alt="data" width={100} height={100} />
                        
                    </div>
                    
                    <div  className="relative top-8 left-8">
                        {/* information */}
                        
                        <div>{user.name}</div>
                        <div>gender : {user.gender}</div>
                        <div>DOB : {user.dob}</div>
                        {/* <div>{user.name}</div> */}

                    </div> 
                </div>

                {/* banner */}

               
                        

               </div>
                <Footer/>
            </div>
        </>
    )
}