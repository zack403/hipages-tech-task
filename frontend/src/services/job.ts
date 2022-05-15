import http from "../utils/http";
import IJobData from "../type/jobs";
import IFilter from "../type/filter";
import IUpdateJobData from "../type/updateJob";


class JobDataService {
  getAll({status, search, page, limit}: IFilter) {
    return http.get<Array<IJobData>>(`/job?status=${status}&search=${search}&page=${page}&limit=${limit}`);
  }
  get(id: string) {
    return http.get<IJobData>(`/job/${id}`);
  }
  create(data: IJobData) {
    return http.post<IJobData>("/job", data);
  }
  update(data: IUpdateJobData, id: any) {
    return http.patch<any>(`/job/${id}`, data);
  }
  delete(id: any) {
    return http.delete<any>(`/job/${id}`);
  }
}
export default new JobDataService();