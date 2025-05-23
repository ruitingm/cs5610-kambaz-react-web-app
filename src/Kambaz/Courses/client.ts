import axios from "axios";
import { Post } from "./Pazza/postReducer";
import { Folder } from "./Pazza/folderReducer";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
};
export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};
export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};
export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`
  );
  return response.data;
};
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};
export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/assignments`
  );
  return response.data;
};
export const createAssignmentForCourse = async (
  courseId: string,
  assignment: any
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};
export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};
export const findPostsForCourse = async (
  courseId: string,
  userId: string,
  role: string
) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/posts?userId=${userId}&role=${role}`
  );
  return response.data;
};
export const createPostForCourse = async (courseId: string, post: Post) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/posts`,
    post
  );
  return response.data;
};
export const findPostsByKeyword = async (
  courseId: string,
  userId: string,
  role: string,
  keyword: string
) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/posts?keyword=${keyword}&userId=${userId}&role=${role}`
  );
  return response.data;
};
export const findFoldersForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/folders`
  );
  return response.data;
};
export const createFolder = async (courseId: string, folder: Folder) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/folders`,
    folder
  );
  return response.data;
};
