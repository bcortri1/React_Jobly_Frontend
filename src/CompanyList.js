import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./api";
import "./CompanyList.css"

const CompanyList = () => {
    const [companies, setCompanies] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function getCompanies() {
            let { companies } = await JoblyApi.getAllCompanies();
            setCompanies(() => companies)
            setLoading(() => false)
        }  
        getCompanies();
    }, [])

    if (isLoading) {
        return <p>Loading &hellip;</p>;
    }

    return (
        <div className="CompanyList">
            <SearchBar type="companies" setTypeData={setCompanies} />
            {companies.map((company) => {
                return <CompanyCard key={company.handle + "-companycard"} company={company} />
            })}

        </div>
    );

}

export default CompanyList;