
import { useContext, useState } from "react"
import Image from "next/image"

import EmptyBox from "/public/images/empty_box.gif"
import { getData } from "./api/api"

import { useEffect } from "react"
import "../../global"
import Router, { useRouter } from "next/router"

import { patientUuidContext } from "@/components/ReportPatientContext"

// import ReportView from "./reportView"

import UploadFiles from "./addReports"

// icons

import Medical from "/public/images/medical_records.png"

export default function PatientReports(){

    let router = useRouter()

    // let {uuid} = router.query

    let uuid = useContext(patientUuidContext)
    let [addReports,setAddReports] = useState(false)

    let [search,setSearch] = useState(false)

    let [user,setUser] = useState("")
    useEffect(()=>{

        // console.log("executed");
        let getReports = async()=>{
            let res =await  getData(`${global.SCANREPORT}/${global.PATIENT}/${uuid}`);
    
            console.log(res.data.response );

            if(res.data.response){

            setUser(res.data.response.map(elem=>{
                return {name:elem.scan_report_type,consultant :elem.consultant,s3Url : elem.s3Url , updated:elem.report_date ? elem.report_date : elem.created_at}
            }))
            }
        }

        getReports()
    },[uuid])


    



console.log("reports",user);

    let [sortOptions,setSortOptions] = useState([
        {name : "consultant" , id:"1"},
        {name : "date" , id:"2"},
        {name : "name" , id:"3"},
        {name : "report type" , id:"4"},
    ])

    const sortReports = (e)=>{
        // console.log(e.target.value);
        let name = e.target.value;
        console.log(name);
        name = (name == "report type") ? "name" : name;

        name = (name == "date") ? "updated" : name;

        
        let arr1 = [...user]
         let arr = arr1.sort((a,b)=>(a[name] > b[name] )? 1: ((b[name] > a[name]) ? -1 : 0))


         console.log(arr);
         setUser(arr)
        // setUser([{name:"anil"}])        
    }

    

        
     
    return(
        
        <>
        {addReports ? <UploadFiles/> : 

            <div className="h-screen  pageBackground overflow-hidden">
           {!search ?  <div className="background h-10 w-full fixed flex justify-between items-center z-[100] top-4 " >
                    <div className="relative left-4 " onClick={()=>router.back()}>
                         <div className=" w-4  border-2 -rotate-45"></div>
                         <div className=" w-4  border-2 rotate-45 relative top-1"></div>
                    </div>
                    <div className="text-white text-[20px]">Reports</div>
                    <div className="text-white relative right-4" onClick={()=>setSearch(true)}>
                        search
                    </div>

            </div> : 
            <div className="flex justify-center fixed top-4 w-full ">
                  <div className="h-10 w-[90%] relative flex  items-center bg-white  text-black"> 
                <div className="relative left-4 top-2 " onClick={()=>setSearch(false)}>
                         <div className=" w-4  border-2 -rotate-45 border-black"></div>
                         <div className=" w-4  border-2 rotate-45 relative top-1 border-black "></div>
                         <div className="w-4  border-2 border-black relative left-2 -top-1"></div>
                    </div>
                    <div className="relative left-10 w-[100%]">
                     <input type="search" id="search" name="search" placeholder="Search here" className="h-8 w-[80%]  outline-none "></input></div>
            </div>
            </div>
            }

            <div className="flex justify-center ">
                 <div className="background h-10 w-[90%] top-20  flex justify-between rounded-lg items-center fixed  z-[100]"> 
                    <div className="text-white left-2 relative ">Sort By</div>
                    <div className="text-white relative right-6">
                    <select name="Doctype" id="Doctype" className="background relative left-4 w-32 bd text-white capitalize" onChange={sortReports}> 
                                <option id="" >select</option>
                               {sortOptions.map(elem=>  <option id={elem.id} className="capitalize" key={elem}>{elem.name}</option>)}
                            </select>    
                    </div>
                 </div>
            </div>
            <div className="relative  flex items-center flex-col   overflow-y-scroll gap-y-6 h-[80%] overflow-x-hidden top-32">

            {user ? user.map((elem,index)=>{

                return (
                // <div className="relative">
                <div className="  background rounded-lg relative top-10 w-[90%] flex justify-center" key={index} onClick={()=>router.push({pathname:"bulkReportsView",query:{s3Url : elem.s3Url}})}>
                    {/* profile */}

                   
                    <div className=" h-40 w-full">
                        <div className="flex">
                        <div className="h-20 w-20 relative  top-8 left-6 overflow-hidden">
                        {/* img */}
                        <Image src={Medical} alt="data" width={100} height={100} />
                        
                    </div>
                         <div  className="relative top-8 left-4 text-white">
                        {/* information */}

                            <div className="relative left-6 top-4">{elem.name}</div>

                            <div className="flex rounded-2xl h-10 left-5 items-center space-x-2 relative top-2 w-52 ">
                             By {elem.consultant} 
                           
                             </div>
                            
                        </div>
                        </div>

                         <div className="text-white relative top-10 left-10  w-  text-[18px]  "> on  {elem.updated}</div>
                        
                        
                    </div>
                    
                 
                </div>

                
                // </div>
                )
         })  :<Image src={EmptyBox} alt="img3"/>} 
         </div>
         <div className="fixed left-[65%] top-[89%] background h-12 flex items-center w-28 rounded-lg justify-center text-yellow-800 " onClick={()=>setAddReports(true)}>
         + add report
         </div>

         </div>
 }
        </>
        
    )
        
}