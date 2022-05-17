import React, {useState} from "react";
import { BiBriefcase } from "react-icons/bi";
import {BsEnvelope, BsTelephone} from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import IProps from "../../type/props";
import { formatDateAndTime1, formatDateAndTime2 } from "../../utils/dateAndTimeFormatter";
import { JobStatus, TabState } from "../../utils/enum";
import { getFirstCharFromName } from "../../utils/getFirstCharFromName";
import styles from "./content.module.css";
import JobDataService from "../../services/job";
import { formatToMoney } from "../../utils/currencyFormatter";
import IJobData from "../../type/jobs";


const Content = ({ job, tabState, bgColor, setInvitedJobs }: IProps) => {
  const [accepting, setAccepting] = useState(false);
  const [declining, setDeclining] = useState(false);

  const acceptJob = async (jobId: string) => {
    try {
      setAccepting(true);
      const {data: {sucessMessage}} = await JobDataService.update({status: JobStatus.ACCEPTED}, jobId);
      setAccepting(false);
      setInvitedJobs((currentValue: [IJobData]) => currentValue.filter((job: IJobData) => job.id !== jobId));
      //alert(sucessMessage);
    } catch (error) {
      console.log(error);
      setAccepting(false);
    }
  }

  const declineJob = async (jobId: string) => {
    try {
      setDeclining(true);
      const {data: {sucessMessage}} = await JobDataService.update({status: JobStatus.DECLINED}, jobId);
      setDeclining(false);
      setInvitedJobs((currentValue: [IJobData]) => currentValue.filter((job: IJobData) => job.id !== jobId));
    } catch (error) {
      console.log(error);
      setDeclining(false);
    }
  }

  return (
    <div className={styles.single}>
      <div className={styles.user_profile_row}>
        { tabState === TabState.INVITED && <div style={{backgroundColor: '#ff9f42'}} className={styles.logo}>{getFirstCharFromName(job.contact_name)}</div> }
        {tabState === TabState.ACCEPTED && <div style={{backgroundColor: bgColor }} className={styles.logo}> {getFirstCharFromName(job.contact_name)}</div> }

        <div className={styles.right}>
          <div className={styles.name}>{job.contact_name}</div>
          <div className={styles.date}>{ tabState === TabState.INVITED ? formatDateAndTime1(job.created_at) : formatDateAndTime2(job.created_at) }</div>
        </div>
      </div>
      <div className={styles.detail_row}>
        <div className={styles.location}>
          <GoLocation color="black" className="mb-1" /> {job.suburb.name}&nbsp;{job.suburb.postcode}
        </div>
        <div className={styles.role}>
          <BiBriefcase color="black" className="mb-1" /> {job.category.name}
        </div>
        <div className={styles.id}>Job ID: {job.id}</div>
        { tabState === TabState.ACCEPTED && 
          <div className={styles.price_lead}>{formatToMoney.format(job.price)} Lead Invitation</div> 
        }

      </div>
      { 
        tabState === TabState.ACCEPTED && 
        <div className={styles.contact_me}>
          <a className={styles.anchor} href={`tel: ${job.contact_phone}`}>
            <BsTelephone color="black" className="mb-1" /> {job.contact_phone}
          </a>
          <a className={styles.anchor} href={`mail: ${job.contact_email}`} >
            <BsEnvelope color="black" className="mb-1" /> {job.contact_email}
          </a>
        
        </div> 
      }
      
      
      <div className={styles.description_row}>{job.description}</div>
       { tabState === TabState.INVITED && <div className={styles.actions}>
        <div onClick={() => acceptJob(job.id)} className={styles.accept}>{accepting ? 'Processing...' : 'Accept'}</div>
        <div onClick={() => declineJob(job.id)} className={styles.reject}>{declining ? 'Processing...' : 'Decline'}</div>
        <div className={styles.price}>{formatToMoney.format(job.price)}</div>
        <div className={styles.lead}>Lead Invitation</div>
      </div> }
    </div>
  );
};

export default Content;
