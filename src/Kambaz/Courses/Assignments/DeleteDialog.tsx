import { useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import * as assignmentClient from "./client";
export default function DeleteDialog({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const dispatch = useDispatch();
  const deleteAssignmentHandler = async (assignmentId: string) => {
    await assignmentClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };
  return (
    <div
      id="wd-add-assignment-dialog"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Confirm Deletion
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete assignment {assignmentId}?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              onClick={() => {
                deleteAssignmentHandler(assignmentId);
              }}
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
