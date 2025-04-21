import PostDetail from "./PostDetail";
import PostTo from "./PostTo";
import PostType from "./PostType";
import SelectFolders from "./SelectFolders";
import * as coursesClient from "../../client";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addPost } from "../postReducer";
import { v4 as uuidv4 } from "uuid";
export default function NewPost({ users }: { users: any[] }) {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("question");
  const [privatePost, setPrivatePost] = useState(false);
  const [post, setPost] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [visible, setVisible] = useState<string[]>(["All Users"]);
  const [today, setToday] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setHasError] = useState(false);
  const postId = uuidv4();
  const getToday = () => {
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    setToday(formattedDate);
  };
  const addPostHandler = async () => {
    try {
      if (privatePost) {
        setVisible((prev) => [...prev, currentUser._id]);
      }
      const newPost = await coursesClient.createPostForCourse(cid!, {
        _id: postId,
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
        resolved: false,
        visible: visible,
        view: [],
      });
      dispatch(addPost(newPost));
      setSubject("");
      setType("");
      setPrivatePost(false);
      setPost("");
      setCategory([]);
      setVisible([currentUser._id]);
      setHasError(false);
    } catch (error: any) {
      setErrorMessage(error.response.data.errorMessage);
    }
  };
  useEffect(() => {
    getToday();
  }, []);
  return (
    <div id="wd-pazza-post-screen" className="mb-5">
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
              <PostTo
                setPrivatePost={setPrivatePost}
                users={users}
                setVisible={setVisible}
                visible={visible}
              />
            </td>
          </tr>
          <tr>
            <td>
              <div className="wd-pazza-dark-grey wd-pazza-font-11pt pe-2 ps-1 text-nowrap float-end">
                <b>Select Folder(s)*</b>
              </div>
            </td>
            <td>
              <SelectFolders category={category} setCategory={setCategory} />
            </td>
          </tr>
          <tr>
            <td>
              <label
                htmlFor="wd-pazza-post-summary"
                className="wd-pazza-dark-grey wd-pazza-font-11pt align-content-center float-end pe-2 mt-2 form-control-label text-nowrap "
              >
                <b>Summary*</b>
              </label>
            </td>
            <td>
              <div className="pe-3 d-flex align-items-center">
                <input
                  id="wd-pazza-post-summary"
                  type="text"
                  className="form-control mt-2 pazza-font-11pt me-2"
                  placeholder="Enter a one line summary, 100 characters or less"
                  maxLength={100}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <span
                  className={`wd-pazza-font-10pt float-end me-2 mt-1 pt-1  ${
                    subject.length === 100 ? "wd-pazza-red" : "wd-pazza-black"
                  }`}
                >
                  {subject.length}/100
                </span>
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
              {errorMessage && (
                <div className="wd-pazza-font-11pt wd-pazza-font-lucida alert alert-danger">
                  {errorMessage}
                </div>
              )}
              <div className="d-flex mt-2">
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    setErrorMessage("");
                    setHasError(false);
                    if (category.length === 0) {
                      setErrorMessage("Must select at least one folder");
                      setHasError(true);
                      return;
                    }
                    if (subject.trim() === "") {
                      setErrorMessage("Must enter summary for your post");
                      setHasError(true);
                      return;
                    }
                    if (post.trim() === "") {
                      setErrorMessage("Must enter details for your post");
                      setHasError(true);
                      return;
                    }
                    try {
                      await addPostHandler();
                      navigate(
                        `/Kambaz/Courses/${cid}/Pazza/QandA/Post/${postId}`
                      );
                    } catch (error: any) {
                      setHasError(true);
                    }
                  }}
                  className="btn wd-pazza-bg-blue border border-1 rounded-1 text-white wd-pazza-font-lucida wd-pazza-border-dark-grey"
                >
                  Post My Question to Class
                </button>
                <button className="btn border border-1 rounded-1 text-black wd-pazza-font-lucida ms-3 wd-pazza-bg-light-grey wd-pazza-border-dark-grey">
                  Save Draft
                </button>
                <button
                  className="btn border border-1 rounded-1 text-black wd-pazza-font-lucida ms-3 wd-pazza-bg-light-grey wd-pazza-border-dark-grey"
                  onClick={() =>
                    navigate(`/Kambaz/Courses/${cid}/Pazza/QandA/ClassAtGlance`)
                  }
                >
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
