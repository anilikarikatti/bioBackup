
import AddVitalReadings from "./vitalReadings";

import {patientUuidContext} from "../components/ReportPatientContext"

import { useRouter } from "next/router";

export default function Section(){

    let router = useRouter()

    let {uuid} = router.query;

    console.log(uuid,"id");
    return (

        <>
        <patientUuidContext.Provider value={uuid} >

            <AddVitalReadings/>
            {/* <h2>hello</h2> */}

        </patientUuidContext.Provider>
        </>
    )
}