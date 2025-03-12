import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function LessonControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  return (
    <div className="float-end">
      {isFaculty && (
        <>
          <FaPencil
            className="text-primary me-3"
            onClick={() => editModule(moduleId)}
          />
          <FaTrash
            className="text-danger me-3 mb-1 "
            onClick={() => deleteModule(moduleId)}
          />
        </>
      )}
      {
        <>
          <GreenCheckmark />
          <BsPlus className="fs-4 me-2" />
          <IoEllipsisVertical className="fs-4" />
        </>
      }
    </div>
  );
}
