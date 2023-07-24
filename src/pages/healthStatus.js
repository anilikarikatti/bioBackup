
import { useState } from "react"
import Image from "next/image"

import Heart from '/public/images/heart.png'
import Bp from '/public/images/bpr.png'
import Weight from '/public/images/weightr.png'

import { getData } from "./api/api"

import { useEffect } from "react"

import "../../global"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useRouter } from "next/router"

export default function HealthMain(){

    let [user,setUser] = useState([
    ])

    let router = useRouter()
 useEffect(()=>{
    const getUser = async()=>{
        let res =await  getData(`${global.PATIENT}/${global.USER}/${localStorage.getItem("uuid")}`);


        console.log(res.data.response);
        // get vital readings

        let res1 =await  getData(`${global.VITALREADINGS}/${global.USER}/${localStorage.getItem("uuid")}`);

        console.log(res1);

          
        setUser(  res.data.response.map((elem,index)=>{

            let {blood_pressure,blood_sugar,weight} = res1.data.response[index]

            console.log("data",blood_pressure,blood_sugar,weight);

            return {name:elem.name , gender:"m" ? "Male" : "Female" ,DOB:elem.dob , bp:blood_pressure , sugar:blood_sugar ,  weight , "updated":elem.updated_at?elem.updated_at : elem.created_at.split('T')[0] , s3Url:elem.s3Url,paUuid:elem.uuid}
        }))
    // let {name,gender,date_of_birth,s3Url} = res.data.response

    

    }
    getUser()
},[])

let childComponent = (id)=>{

    router.push({pathname : "healthSection",query : {'uuid':id}})
}

    return(
        <>
         <div className="h-screen overflow-hidden pageBackground  ">

            <Header/>
            <div className="relative top-10 flex justify-center flex-col items-center relative  overflow-y-scroll gap-y-6 h-[80%] overflow-x-hidden">
            {user.map((elem,index)=>{

                return (
                // <div className="relative">
                <div className="background rounded-lg relative top-60 w-[90%] flex justify-center" key={index}   onClick={()=>childComponent(elem.paUuid)}>
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

                            <div className="flex bg-orange-400 rounded-2xl h-10 items-center space-x-2 relative top-6 w-52 left-1">
                                <div className="flex px-2 items-center">
                                    <Image src={Heart} height={12} width={20} alt="img"/>
                                    <p className="text-[10px]">{elem.bp}</p>
                                </div> 
                                <div className="flex px-2  items-center">
                                    <Image src={Bp} height={12} width={20} alt="img"/>
                                    <p className="text-[10px]">{elem.sugar}</p>
                                </div>
                                <div className="flex px-2 items-center">
                                    <Image src={Weight} height={12} width={20} alt="img"/>
                                    <p className="text-[10px]">{elem.weight}</p>
                                </div>
                           
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
         
         {/* <div className="h-40"></div> */}
         <Footer />
         </div>
        </>
    )
}