import { useSelector } from "react-redux";

export default function ModuleEditor({
  dialogTitle,
  moduleName,
  setModuleName,
  addModule,
}: {
  dialogTitle: string;
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
}) {
  return (
    <div
      id="wd-add-module-dialog"
      className="modal fade"
      data-bs-backdrop="statis"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-ttle fs-5" id="staticBackdropLabel">
                {dialogTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input
                className="form-control"
                defaultValue={moduleName}
                placeholder="Module Name"
                onChange={(e) => {
                  setModuleName(e.target.value);
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={addModule}
              >
                Add Module
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
