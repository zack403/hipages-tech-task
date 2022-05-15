import { JobStatus } from "../utils/enum";

export default interface IFilter {
    status: JobStatus;
    page: number;
    search: string;
    limit: number;
}