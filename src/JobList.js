import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JoblyApi from "./api";
import SearchBar from "./SearchBar";
import "./JobList.css";

const JobList = ({ jobArr=[], loading = true, apply, currUser, noSearch = false }) => {
    const initialState = jobArr;
    const [jobs, setJobs] = useState(initialState);
    const [isLoading, setLoading] = useState(loading);

    useEffect(() => {
        async function getJobs() {
            let { jobs } = await JoblyApi.getAllJobs();
            setJobs(() => jobs);
            setLoading(() => false);
        }
        if (initialState.length === 0) {
            getJobs();
        }
        else {
            setLoading(() => false);
        }
    }, [initialState.length])

    if (isLoading) {
        return <p>Loading &hellip;</p>;
    }

    return (
        <div className="JobList">
            {noSearch ? null : <SearchBar type="jobs" setTypeData={setJobs}/>}
            {jobs.map((job) => {
                return <JobCard key={job.id + "-jobcard"} job={job} apply={apply} applied={currUser.applications} />
            })}
        </div>
    );

}

export default JobList;