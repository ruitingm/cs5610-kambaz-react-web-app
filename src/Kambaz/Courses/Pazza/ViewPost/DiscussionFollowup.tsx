import DiscussionResolveButton from "./ButtonResolve";
import { IoMdLink } from "react-icons/io";
import FollowupReply from "./ReplyFollowup";
import ActionButton from "./ButtonAction";
import { useSelector } from "react-redux";
import { Reply } from "../replyReducer";
export default function FollowupDiscussion({ users }: { users: any[] }) {
  const { replies } = useSelector((state: any) => state.repliesReducer) as {
    replies: Reply[];
  };
  const getUserName = (userId: string) => {
    const user = users.find((u: any) => u._id === userId);
    return `${user.firstName} ${user.lastName}`;
  };
  return (
    <div id="wd-pazza-follow-up-screen" className="border border-1 rounded-1">
      <div
        id="wd-pazza-follow-up-title"
        className="wd-pazza-font-11pt border border-bottom-1 bg-white ps-2 pb-1 align pt-1"
      >
        <b>followup discussions&nbsp;</b>
        <span className="fst-italic wd-pazza-font-10pt">
          for lingering questions and comments
        </span>
      </div>
      {replies.map((reply) => (
        <>
          <div className="wd-pazza-bg-blue-grey ms-3 mb-3 me-3 mt-2">
            <div id="wd-pazza-follow-up-discussion" className="mb-1">
              <div className="wd-pazza-pos-upper-right">
                <ActionButton />
              </div>
              <DiscussionResolveButton />
              <span className="wd-pazza-blue ms-1">
                <b>@{reply._id}</b>
              </span>
              <IoMdLink className="wd-pazza-blue ms-1 fs-5" />
            </div>
            <div id="wd-pazza-discussion-content" className="container row">
              <div id="wd-pazza-discussion-profile" className="col-1">
                <img
                  src="/images/default_profile.png"
                  className="wd-pazza-profile-dimension border border-3 border-white"
                />
              </div>
              <div id="wd-pazza-discussion-text" className="col-11">
                <div
                  id="wd-pazza-discussion-user-name"
                  className="wd-pazza-font-11pt"
                >
                  <b>{getUserName(reply.user)} </b>
                  <span className="wd-pazza-dark-grey">3 hours ago</span>
                </div>
                <div className="wd-pazza-font-11pt">{reply.reply}</div>
                <div className="mt-3">
                  <span
                    id="wd-pazza-good-post-click"
                    className="wd-pazza-blue wd-pazza-font-11pt"
                  >
                    helpful <span className="wd-pazza-dark-grey"> | 0</span>
                  </span>
                </div>
                <FollowupReply followups={reply.followup} users={users} />
              </div>
            </div>
          </div>
        </>
      ))}
      <div className="mt-1 ms-3 me-3 wd-pazza-font-11pt">
        <span className="ms-1">Start a new followup discussion</span>
        <input
          id="wd-pazza-reply-followup"
          type="text"
          placeholder="Compose a new followup discussion"
          className="form-control wd-pazza-border-light-grey wd-pazza-font-11pt mb-2 mt-1"
        />
      </div>
    </div>
  );
}
