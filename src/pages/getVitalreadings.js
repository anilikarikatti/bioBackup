
import {  useState } from "react"
import Image from "next/image"

import logo from "/public/favicon.ico"
import { getData } from "./api/api"
import Heart from '/public/images/heart.png'
import Bp from '/public/images/bpr.png'
import Weight from '/public/images/weightr.png'
import Height from '/public/images/heightr.png'


import { useEffect } from "react"
import "../../global"
import Router, { useRouter } from "next/router"

import AddMedicine from "./addMedicine"
    import { useContext } from 'react';


import { patientUuidContext } from "@/components/ReportPatientContext"


// import ReportView from "./reportView"



export default function GetVitalReadings(){


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
            let res = await  getData(`${global.VITALREADINGS}/${global.PATIENT}/${uuid}`);
    
            console.log(res);

            if(res.data.response){

                setMedicineHistory(res.data.response.map(elem=>{
                return {sugar:elem.blood_sugar,
                    bp:elem.blood_pressure,
                    height:elem.height,
                    weight:elem.weight,
                    date:elem.c_at



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

                                <div className="relative left-10 flex items-center gap-2">
                                    <Image src={Heart} className="w-6 h-5 object-contain" alt="img1"/>
                                    <div className="text-white capitalize">
                                       sugar :  {elem.sugar}
                                    </div>
                                </div>

                                <div className="relative left-10 flex items-center gap-2">
                                    <Image src={Bp} className="w-6 h-5 object-contain" alt="img2"/>
                                    <div  className="text-white capitalize">
                                       blood pressure :  {elem.bp}
                                    </div>
                                </div>

                                <div className="relative left-10 flex items-center gap-2">
                                    <Image src={Weight} className="w-6 h-8 object-contain" alt="img3"/>
                                    <div className="text-white capitalize">
                                        height : {elem.height}
                                    </div>
                                </div>

                                <div className="relative left-10 flex items-center gap-2">
                                    <Image src={Height} className="w-6  h-8" alt="img4" />
                                    <div  className="text-white capitalize">
                                      weight :   {elem.weight}
                                    </div>
                                </div>


                                <div className="relative left-10 flex items-center gap-5">
                                    {/* <Image src="" className="w-5 h-5" /> */}
                                    <div className="text-white capitalize">
                                        created date :  {elem.date}
                                    </div>
                                </div>


                                {/* <div className="relative left-10 flex">
                                    <Image src="" />
                                    <div  className="text-white capitalize">
                                       routine :  {elem.daily}
                                    </div>
                                </div>
                                 */}
                                    
                            </div>
                                
                            
                            )
                    }) :""} 
         </div>
         {/* <div className="absolute left-[65%] top-[90%] background h-12 flex items-center w-12 rounded-full justify-center text-yellow-800 " onClick={()=>setAddReports(true)}>
         + 
         </div> */}
        <div className="h-20"></div>
         </div>
}
        </>
        
    )
        
}