
import PatientReports from "./patientViseReports";

import {patientUuidContext} from "../components/ReportPatientContext"

import { useRouter } from "next/router";

export default function Section(){

    let router = useRouter()

    let {uuid} = router.query;

    console.log(uuid,"id");
    return (

        <>
        <patientUuidContext.Provider value={uuid} >

            <PatientReports />
            {/* <h2>hello</h2> */}

        </patientUuidContext.Provider>
        </>
    )
}