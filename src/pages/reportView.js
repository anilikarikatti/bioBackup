
import Image from "next/image"

import { useRouter } from "next/router"
export default function ReportView(){

    let router = useRouter()

    let {s3Url} = router.query;

    console.log(s3Url);

    return(
        <>
             <div className="h-full flex justify-center pageBackground">
                {/* content */}

                <div className="border-2 border-white ">
                    <Image src={s3Url} layout="fill" alt = "report"/>
                </div>
            </div>
        </>
    )
}