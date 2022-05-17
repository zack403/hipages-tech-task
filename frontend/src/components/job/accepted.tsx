import React, { useEffect, useState } from "react";
import IFilter from "../../type/filter";
import { JobStatus, TabState } from "../../utils/enum";
import Content from "../card/content";
import JobDataService from "../../services/job";
import IJobData from "../../type/jobs";

const Accepted = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [acceptedJobs, setAcceptedJobs] = useState([]);

  useEffect(() => {
    const getAcceptedJobs = async () => {
      setIsLoading(true);
      try {
        const query: IFilter = {
          status: JobStatus.ACCEPTED,
          search: '',
          page: 1,
          limit: 20
        }
        const {data: {data: {data}}} = await JobDataService.getAll(query);
        setAcceptedJobs(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getAcceptedJobs();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div>
      {acceptedJobs && acceptedJobs.length > 0 ? (
        <>
          {acceptedJobs.map((job: IJobData, index) => (
            <Content bgColor={index % 2 ? '#ff9f42' : '#737987'} key={job.id} tabState={ TabState.ACCEPTED} job={job} />
          ))}
        </>
      ) : (
        <div>
          <p>No accepted jobs</p>
        </div>
      )}
    </div>
  );
};

export default Accepted;
