import { TabState } from "../utils/enum";
import IJobData from "./jobs";

export default interface IProps {
    job: IJobData;
    tabState: TabState;
    bgColor?: string,
    getInvitedJobs?: any
}