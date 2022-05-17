import React, { useEffect, useState } from "react";
import { JobStatus, TabState } from "../../utils/enum";
import Content from "../card/content";
import JobDataService from "../../services/job";
import IFilter from "../../type/filter";
import IJobData from "../../type/jobs";

const Invited = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [invitedJobs, setInvitedJobs] = useState([]);

  useEffect(() => {
    const getInvitedJobs = async () => {
      setIsLoading(true)
      try {
        const query: IFilter = {
          status: JobStatus.NEW,
          search: '',
          page: 1,
          limit: 20
        }
        const {data: {data: {data}}} = await JobDataService.getAll(query);
        setInvitedJobs(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getInvitedJobs();
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
      {invitedJobs && invitedJobs.length > 0 ? (
        <>
          {invitedJobs.map((job: IJobData) => (
            <Content key={job.id} tabState={TabState.INVITED} job={job} setInvitedJobs={setInvitedJobs} />
          ))}
        </>
      ) : (
        <div>
          <p>No invited jobs</p>
        </div>
      )}
    </div>
  );
};

export default Invited;
