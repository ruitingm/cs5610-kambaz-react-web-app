import PostDetail from "./PostDetail";
import PostTo from "./PostTo";
import PostType from "./PostType";
import SelectFolders from "./SelectFolders";
import * as coursesClient from "../../client";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addPost } from "../postReducer";
export default function NewPost() {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [privatePost, setPrivatePost] = useState(false);
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("");
  const [today, setToday] = useState("");
  const getToday = () => {
    const date = new Date();
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10 ? 0 : ""
    }${date.getMonth() + 1}-${date.getDate() + 1 < 10 ? 0 : ""}${
      date.getDate() + 1
    }`;
    setToday(formatedDate);
  };
  const addPostHandler = async () => {
    const newPost = await coursesClient.createPostForCourse(cid!, {
      user: currentUser,
      course: cid!,
      subject: subject,
      type: type,
      private: privatePost,
      post: post,
      date: today,
      liked: false,
      role: currentUser.role,
      category: category,
      read: false,
      answered: false,
      _id: "",
    });
    dispatch(addPost(newPost));
    setSubject("");
    setType("");
    setPrivatePost(false);
    setPost("");
    setCategory("");
  };
  useEffect(() => {
    getToday();
  }, []);
  return (
    <div id="wd-pazza-post-screen">
      <table>
        <thead>
          <tr>
            <th className="bg-white p-0">
              <div className="wd-pazza-dark-grey wd-pazza-font-11pt align-self-center float-end pe-2 float-end text-nowrap">
                <b>Post Type*</b>
              </div>
            </th>
            <th>
              <PostType setType={setType} />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="wd-pazza-dark-grey wd-pazza-font-11pt mt-3 pe-2 text-nowrap float-end align-content-center">
                <b>Post To*</b>
              </div>
            </td>
            <td>
              <PostTo setPrivatePost={setPrivatePost} />
            </td>
          </tr>
          <tr>
            <td>
              <div className="wd-pazza-dark-grey wd-pazza-font-11pt pe-2 ps-1 text-nowrap float-end">
                <b>Select Folder(s)*</b>
              </div>
            </td>
            <td>
              <SelectFolders setCategory={setCategory} />
            </td>
          </tr>
          <tr>
            <td>
              <label
                htmlFor="wd-pazza-post-summary"
                className="wd-pazza-dark-grey wd-pazza-font-11pt align-content-center float-end pe-2 mt-2 form-control-label text-nowrap float-end"
              >
                <b>Summary*</b>
              </label>
            </td>
            <td>
              <div className="pe-3">
                <input
                  id="wd-pazza-post-summary"
                  type="text"
                  className="form-control mt-2 pazza-font-11pt"
                  placeholder="Enter a one line summary, 100 characters or less"
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="wd-pazza-dark-grey wd-pazza-font-11pt pe-2 align-content-center text-nowrap float-end">
                <b>Details</b>
              </div>
            </td>
            <td>
              <PostDetail setPost={setPost} />
            </td>
          </tr>
          <tr>
            <td>
              <div className="wd-pazza-dark-grey wd-pazza-font-11pt pe-2 text-nowrap float-end">
                <b>Posting Options</b>
              </div>
            </td>
            <td>
              <div className="d-flex mt-3">
                <input
                  id="wd-pazza-posting-option"
                  type="checkbox"
                  className="form-control-input"
                />
                <label
                  htmlFor="wd-pazza-posting-option"
                  className="form-control-label wd-pazza-dark-grey wd-pazza-font-11pt wd-pazza-font-lucida ms-2"
                >
                  <b>Send email notifications immediately </b> (by passing
                  students' email preferences, if necessary)
                </label>
              </div>
              <span className="wd-pazza-font-11pt wd-pazza-font-lucida wd-pazza-dark-grey">
                * Required fields
              </span>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div className="d-flex mt-3">
                <button
                  onClick={() => {
                    addPostHandler();
                    navigate(-1);
                    // navigate(`/Kambaz/Courses/${cid}/Pazza/QandA`);
                  }}
                  className="btn wd-pazza-bg-blue border border-1 rounded-1 text-white wd-pazza-font-lucida wd-pazza-border-dark-grey"
                >
                  Post My Question to Class
                </button>
                <button className="btn border border-1 rounded-1 text-black wd-pazza-font-lucida ms-3 wd-pazza-bg-light-grey wd-pazza-border-dark-grey">
                  Save Draft
                </button>
                <button className="btn border border-1 rounded-1 text-black wd-pazza-font-lucida ms-3 wd-pazza-bg-light-grey wd-pazza-border-dark-grey">
                  Cancel
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
