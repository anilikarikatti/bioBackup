import { useEffect, useState } from "react"
import {getData} from "./api/api"
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import "../../global"
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Family from "/public/images/family.gif"

export default function AddFamilyMember({home}){

    // let[home,setHome] = useState(true)
    
    let router = useRouter()
        // home page
    console.log(home);
    let [user,setUser] = useState({});

   const [totalNumberOfFamilyMember,setFamilyMembers] = useState(0)

    useEffect(()=>{
        const getUser = async()=>{
            let res =await  getData(`${global.PATIENT}/${global.USER}/${localStorage.getItem("uuid")}`);

              
            setFamilyMembers(  res.data.response.length)
        // let {name,gender,date_of_birth,s3Url} = res.data.response

        

        }
        getUser()
    },[])


    
    return(

        <>
            <div className="h-screen flex justify-center pageBackground overflow-hidden">
                <Header />
                {/* content */}
                <div className="orange h-40 rounded-lg w-[85%] relative top-20">
                   
                    <div className="relative left-64 top-2 border border-black justify-center text-center w-12 rounded-full h-12 items-center flex text-[60px] text-black" onClick={()=>router.push("addMember")}><p className="relative -top-1" >+</p></div> 
                    {/* profile */}
                    <div className="flex h-40">
                    <div className="overflow-hidden">
                        {/* img */}
                        <Image src={Family} alt="data" width={150} height={150} className="object-cover" />
                        
                    </div>
                   
                    <div  className="relative  left-4">
                        {/* information */}
                        
                        <div className="text-white capitalize">family members</div>
                        <div className="text-[12px]  text-white">your family consists of {totalNumberOfFamilyMember} members</div>
                        <div className="text-[12px] text-white">member ship up to </div>
                        {/* <div>{user.name}</div> */}

                    </div>
                    
                    
                </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}