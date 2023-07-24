
import {InputData} from "../components/userInput/input"

import Image from "next/image"
// import { InputDate } from "./userInput/input"

// import { useState } from "react"
import "../../global"

import axios from "axios"

import { getData, postData } from "./api/api"
import Router, { useRouter } from "next/router"

import { patientUuidContext } from "@/components/ReportPatientContext"

import { useContext, useEffect, useState } from "react"

import FailMessage from "@/components/Failure";

import SuccessMessage from "@/components/Success";


export default function UploadFiles() {

    let uuid = useContext(patientUuidContext)

    console.log(uuid,"id");

    const [reportType, setReportTypes] = useState()
    let [status,setStatus] = useState({})


    let[files,setFiles] = useState([])

    let[ofile,setoFiles] = useState([])

    let [data,setData]=useState("")

    let formData = new FormData()

    // console.log(formData,"formdartya");


    // console.log(ofile);
    // console.log(files,"file");

    console.log(data);

// useEffect

useEffect(()=>{
    let getScanReports = async()=>{
        let res = await getData(global.SCANREPORT_TYPE);

        console.log(res.data.response,"data");

        setReportTypes(res.data.response.map(elem=>{
            return  {"name":elem.name,"uuid":elem.uuid}
        }))

    }

    getScanReports();
},[])

async function FilUpload(e){
    e.preventDefault()

    
    let fieldKeys = Object.keys(data);

    fieldKeys.map(elem=>{
        formData.append(elem,data[elem]);
    })

    formData.append("patientUuid",uuid)
    // formData.append("scanReportTypeUuid","469540d5-7862-11ed-bda6-e8fb1c04540d")
    formData.append("fileLocation","asd")

    // patientUuid,scanReportTypeUuid,reportDate,consultant,remarks,fileLocation

    {files ? files.map(elem=>{
        formData.append(elem.name,elem);
    }) :""}
    for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }

    let res = await axios.post(`${global.BASE_URL}/${global.SCANREPORT}/${global.MULTIPLE}`,formData,{headers:{
        "access-token":localStorage.getItem("token") }})


    console.log(res,"res");

    if(res.data == "documents uploaded successfully"){
        setStatus({...status,success:true,action:"reports added successfully"})
        setFiles("")
        setoFiles("")

}
else{
    setStatus({...status,failure:true,action:"failed to add reports"})
    setFiles("")
    setoFiles("")
}

    }

    

    return (
        <>
          
    {
      status.success ? <SuccessMessage setData={setData} setStatus={setStatus} action = {status.action}/>:

        status.failure ? <FailMessage setData={setData} setStatus={setStatus} action = {status.action}/> :

            <div className="h-screen pageBackground">
                <div className="h-full overflow-y-scroll">

                    <div className="h-[66px] relative top-20 flex justify-center">gif</div>

                    <div className="text-white text-3xl relative top-20 w-full capitalize flex justify-center flex-col">
                        <h2 className="flex justify-center">upload your </h2>
                        <h2 className="space-y-6 flex justify-center"> documents</h2>
                    </div>

                   <div className="flex flex-col justify-center items-center relative top-32 space-y-2">

                        <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4">23</div>
                              <InputData label="file name" data={data}  setData= {setData}  className="relative" name=""/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative  items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4">23</div>
                              <InputData label="consultant name" data={data}  setData= {setData} name="consultant"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData label="remarks name" data={data}  setData= {setData} name="remarks"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData label="date of report" data={data}  setData= {setData} name="reportDate" type="date"/>

                         </div>

                        <div>

                        <div className="">
                                <h2>Document type</h2>
                            </div>
                         <div className="h-[66px] background flex  w-80 justiy-center rounded-[40px] relative   items-center orange top-4" >
                            {/* <label htmlFor="Doctype">select</label> */}
                            <select name="Doctype" id="Doctype" className="orange relative left-4 w-72 bd text-black " onChange={(e)=>{setData({...data,"scanReportTypeUuid":e.target.value}) ;console.log(e.target.id)}} > 
                                <option id="" >select</option>
                                {reportType ? reportType.map(elem=>  <option value={elem.uuid} className="capitalize" key={elem.uuid}>{elem.name}</option>) :""}
                            </select>                             

                        </div>
                        </div>

                       
                   </div>

               
                       <div className="relative top-44">
                            <div className=" flex text-2xl space-x-20 justify-center text-white" >
                                    <label className="relative left-4 " htmlFor="file">upload document</label>
                                    <label htmlFor="file">+</label>
                            </div>
                            <div className=" flex space-x-4 flex-wrap gap-y-2 justify-center">{!ofile  ?<h3> no document selected</h3> : 
                            
                                ofile.map(elem=>{
                                   return( 
                                   <div className="relative top-8 text-center flex justify-center " key={elem}>
                                   <Image src={elem} height={150} width={100} alt="image"/></div>)
                                })
                            }</div>


                            <input type="file" id="file" hidden multiple onChange={(e)=>{   
                                    // let keys = Object.keys(e.target.files);
                                    // let arr = keys.map(elem=>{
                                    //     return e.target.files[elem]
                                    // })

                                    // setFiles([...files,e.target.files[0]])
                                    setFiles([...files,e.target.files[0]])

                                    setoFiles([...ofile,URL.createObjectURL(e.target.files[0])])

                                    console.log(formData);

                                    // for (var pair of formData.entries()) {
                                    //     console.log(pair[0]+ ', ' + pair[1]); 
                                    // }
                                            }}></input>


                               

                                <div className="h-[46px]  flex  w-80 justify-center rounded-[40px] relative   items-center orange top-20 text-black  " >
                                   <button onClick={FilUpload} className="">upload</button>
                                </div>

                                <div className="h-40">

                                </div>
                        </div>

                       
                </div>

            </div> }
        </>
    )
}   