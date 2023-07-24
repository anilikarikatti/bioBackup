
import { useState } from "react"
import Image from "next/image"

import logo from "/public/favicon.ico"
import { getData } from "./api/api"

import { useEffect } from "react"
import "../../global"
import Router, { useRouter } from "next/router"
import PatientReports from "./patientViseReports"

import {patientUuidContext} from "../components/ReportPatientContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

// import 
// PatientReports

export default function PatientsByUser(){

    let [user,setUser] = useState([])

    // console.log(user);

    let router = useRouter()

    



 useEffect(()=>{
    const getUser = async()=>{

        console.log(`${global.PATIENT}/${global.USER}/${localStorage.getItem("uuid")}`);
        let res =await  getData(`${global.PATIENT}/${global.USER}/${localStorage.getItem("uuid")}`);

        console.log(res.data.response , "users");

        if(res.data.response){

        let reportsLength = res.data.response.length
          
        let uuids = res.data.response.map(elem=>{
                return elem.uuid
        })

        console.log(uuids);
                
        let fun = async()=>{
            let lenarr = []
            for(let uuid of uuids){
            let res1 = await getData(`scanReport/patient/${uuid}`);

            lenarr.push( res1.data.response ? res1.data.response.length : 0)
        
        }
        return lenarr;
    }
        let arr =await fun()
        // console.log("length",arr);
        // }

        setUser(res.data.response.map((elem,index)=>{
        
            return {name:elem.name, reportsLength : arr[index] , updated: elem.updated_at?elem.updated_at : elem.created_at.split('T')[0], s3Url:elem.s3Url , paUuid:elem.uuid}
        }))
    // let {name,gender,date_of_birth,s3Url} = res.data.response

    

    }else{
        router.push("/login")
    }
}

    getUser()
},[router])

    let childComponent = (id)=>{

        router.push({pathname : "reportsSection",query : {'uuid':id}})
    }

    return(
        
        <>
       
            <div className="h-screen overflow-hidden pageBackground ">
                    <Header/>

            <div className="relative top-10 flex justify-center flex-col items-center  relative  overflow-y-scroll gap-y-6 h-[80%] overflow-x-hidden">

            {user.map((elem,index)=>{

                return (
                // <div className="relative">
                <div className=" relative top-10 background rounded-lg flex justify-center" key={index}  onClick={()=>childComponent(elem.paUuid)}>
                    {/* profile */}

                    <div className="relative left-72 top-10">
                         <div className=" w-4 border-orange-400 border-2 rotate-45"></div>
                         <div className=" w-4 border-orange-400 border-2 -rotate-45 relative top-1"></div>
                    </div>
                    <div className=" h-48 w-full">
                        <div className="flex">
                        <div className="h-20 bg-white rounded-full border-2 border-black w-20 relative  top-8 left-6 overflow-hidden">
                        {/* img */}
                        <Image src={elem.s3Url} alt="data" width={100} height={100} />
                        
                    </div>
                         <div  className="relative top-8 left-4 text-white">
                        {/* information */}

                            <div className="relative left-6">{elem.name}</div>

                            <div className="flex rounded-2xl h-10 left-5 items-center space-x-2 relative top-6 w-52 ">
                            {elem.reportsLength} report available
                           
                             </div>
                            
                        </div>
                        </div>

                         <div className="text-white relative top-16 left-10  w-  text-[12px]  ">Last updated on : {elem.updated}</div>
                        
                        
                    </div>
                    
                 
                </div>

                // </div>
                )
         })} 
         </div>
         <div className="h-40"></div>
            <Footer/>
         </div>
        </>
    )
}