import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobList from "./JobList";
import "./CompanyDetail.css"

const CompanyDetail = ({ currUser, apply }) => {
    const { handle } = useParams();
    const [companyData, setCompanyData] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function getCompany() {
            let { company } = await JoblyApi.getCompany(handle);
            setCompanyData(() => company)
            setLoading(() => false);
        }
        getCompany();
    }, [handle])

    if (isLoading) {
        return <p>Loading &hellip;</p>;
    }

    return (<>
        <div className="CompanyDetail">        
            <h1>{companyData.name}</h1>
            <div>{companyData.description}</div>
        </div>
        <JobList jobArr={companyData.jobs} loading={isLoading} currUser={currUser} apply={apply} noSearch={true} />
    </>
    );
}

export default CompanyDetail;