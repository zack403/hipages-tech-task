import http from "../utils/http";
import IJobData from "../type/jobs";
import IFilter from "../type/filter";
import IUpdateJobData from "../type/updateJob";
import { IApiFeedack } from "../type/apiFeedback";


class JobDataService {
  getAll({status, search, page, limit}: IFilter) {
    return http.get<IApiFeedack>(`/job?status=${status}&search=${search}&page=${page}&limit=${limit}`);
  }
  get(id: string) {
    return http.get<IApiFeedack>(`/job/${id}`);
  }
  create(data: IJobData) {
    return http.post<IApiFeedack>("/job", data);
  }
  update(data: IUpdateJobData, id: any) {
    return http.patch<IApiFeedack>(`/job/${id}`, data);
  }
  delete(id: any) {
    return http.delete<IApiFeedack>(`/job/${id}`);
  }
}
export default new JobDataService();