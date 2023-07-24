
import {  useState } from "react"
import Image from "next/image"

import logo from "/public/favicon.ico"
import { getData } from "./api/api"

import { useEffect } from "react"
import "../../global"
import Router, { useRouter } from "next/router"


import { useContext } from 'react';


import { patientUuidContext } from "@/components/ReportPatientContext"


// import ReportView from "./reportView"

import UploadFiles from "./addReports"
import AddMedicine from "./addMedicine"

export default function GetMedicine(){


    let uuid = useContext(patientUuidContext)

     console.log(uuid);
    // let uuid = useContext(patientUuidContext)
    // console.log(uuid);

    let [addReports,setAddReports] = useState(false)

    let [medicineHistory, setMedicineHistory] = useState([
        {name:"anil" , consultant:"alk",updated:":ddd"}
    ])
    
    // let uuid = "b295417a-225b-11ee-8f67-e8fb1c04540d"

    useEffect(()=>{


    
        let getReports = async()=>{
            let res =await  getData(`${global.PATIENT}/${global.GET_MEDICATION }/${uuid}`);
    
            console.log(res.data );

            if(res.data){

                setMedicineHistory(res.data.response.map(elem=>{
                return {Number_of_times:elem.Number_of_times,daily:elem.daily
,end_date:elem.end_date,medicin_name:elem.medicin_name,quantity:elem.quantity,start_date:elem.start_date


                }
            }))
            }
        }

        getReports()
    },[uuid])

        
     
    return(
        
        <>
        {addReports ? <AddMedicine/> : 

            <div className="h-screen overflow-y-scroll pageBackground overflow-x-hidden">
           

                <div className=" w-[90%] top-2 relative flex justify-between rounded-lg items-center flex-col"> 
                   
          

                        {medicineHistory ? medicineHistory.map((elem,index)=>{

                            return (
                            // <div className="relative">
                            <div className="background rounded-lg relative mt-6 w-[90%] flex flex-col gap-y" key={index} >

                                <div className="relative left-10 flex">
                                    {/* <Image src="" /> */}
                                    <div className="text-white capitalize">
                                       name :  {elem.medicin_name}
                                    </div>
                                </div>

                                <div className="relative left-10 flex">
                                     {/* <Image src="" /> */}
                                    <div  className="text-white capitalize">
                                       quantity :  {elem.quantity}
                                    </div>
                                </div>

                                <div className="relative left-10 flex">
                                    {/* <Image src="" /> */}
                                    <div className="text-white capitalize">
                                        no. of times : {elem.Number_of_times}
                                    </div>
                                </div>

                                <div className="relative left-10 flex">
                                    {/* <Image src="" /> */}
                                    <div  className="text-white capitalize">
                                      start date :   {elem.start_date}
                                    </div>
                                </div>


                                <div className="relative left-10 flex">
                                    {/* <Image src="" /> */}
                                    <div className="text-white capitalize">
                                      end date :  {elem.end_date}
                                    </div>
                                </div>


                                <div className="relative left-10 flex">
                                    {/* <Image src="" /> */}
                                    <div  className="text-white capitalize">
                                       routine :  {elem.daily}
                                    </div>
                                </div>
                                
                                    
                            </div>
                                
                            
                            )
                    }) : ""}  
         </div>
         <div className="absolute left-[65%] top-[90%] background h-12 flex items-center w-12 rounded-full justify-center text-yellow-800 " onClick={()=>setAddReports(true)}>
         + 
         </div>

         </div>
}
        </>
        
    )
        
}