import { useState } from "react"

import { InputData } from "@/components/userInput/input"
import { getData,postData } from './api/api';

import { patientUuidContext } from "@/components/ReportPatientContext"

import { useContext } from "react";
import "../../global"
import GetMedicine from "./getMedicine"

import GetVitalReadings from "./getVitalreadings";
import FailMessage from "@/components/Failure";

import SuccessMessage from "@/components/Success";




export default function AddVitalReadings(){

     let uuid = useContext(patientUuidContext)

     let [page,setPage] = useState({})

    let [status,setStatus] = useState({})

     console.log(uuid);

        let [data,setData] = useState({
            patientUuid:uuid
        })


        const updateReadings = async(e)=>{
            
                e.preventDefault()
      
                console.log(`${global.VITALREADINGS}/${global.ADD}`);

                console.log(data);
                let res = await postData(`${global.VITALREADINGS}/${global.ADD}`,data)
      
                
                console.log("res",res);
                    if(res.data.message == "success"){
                        setStatus({...status,success:true,action:"vital readings added successfully"})

                }
                else{
                    setStatus({...status,failure:true,action:"failed to add readings"})
                }
      
               
              
        }


    return(
        <>
            {page== "medicine" ?  <GetMedicine/> :
            page == "history" ? <GetVitalReadings/> :
            status.success ? <SuccessMessage setData={setData} setStatus={setStatus} action = {status.action}/>:

            status.failure ? <FailMessage setData={setData} setStatus={setStatus} action = {status.action}/> :
             <div className="h-screen pageBackground">
                <div className="h-full overflow-y-scroll">


                <div className="h-14 items-center relative top-10 flex justify-center text-white gap-4 left-20">

                    <div className="capitalize  background w-20 text-center rounded-full" onClick={()=>setPage("history")}>history</div>
                    <div className="capitalize  background w-20 text-center rounded-full" onClick={()=>setPage("medicine")}>medicine</div>
                    {/* <h2>medicines</h2> */}
                </div>

                    
                    <div className="text-white text-3xl relative top-20 w-66 capitalize flex justify-center">
                        <h2  className='capitalize '>add readings </h2>
                    </div>

                   <div className="flex flex-col justify-center items-center relative top-32 space-y-2">

                        <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4">23</div>
                              <InputData data={data}  setData= {setData} label="body height" className="relative" name="height" type="number"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative  items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4">23</div>
                              <InputData data={data}  setData= {setData} label="body weight" type="number" name="weight"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="blood sugar" type="number" name="bloodSugar"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="blood pressure" name="bloodPressure" type="number"/>

                         </div>

                        
                        
                        

                         <div className="h-10 flex justify-center" >
                                   <button className=' h-10 flex  w-60 justify-center rounded-[40px] relative items-center  orange top-6 text-black  capitalize' onClick={updateReadings} >ADD readings</button>
                                </div>

                                <div className="h-40">

                                </div>

                       
                   </div>

               
                     
                       
                </div>

            </div>
}
        </>
    )
}