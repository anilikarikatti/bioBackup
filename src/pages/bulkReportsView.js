
import Image from "next/image"

import { useRouter } from "next/router"
export default function BulkReportsView(){

    let router = useRouter()

    let {s3Url} = router.query;

    let files = s3Url ? s3Url.split(' ') : "";


    return(
        <>
             <div className ="h-screen flex flex-col justify-center pageBackground gap-2 ">
                {/* content */}

                { files ? files.map(elem=>{
                    return (

                    <div className="flex justify-center " key={elem} onClick={()=>router.push({pathname:"reportView" , query:{s3Url:elem}})}>
                            <div className=" border-white flex justify-center background w-[90%] ">
                        <Image src={elem} height={150} width={150} alt = "report"/>
                    </div>
                        </div>
                    )
                }) : ""}
            </div>
        </>
    )
}