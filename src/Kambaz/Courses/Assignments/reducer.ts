import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";
export type Assignment = {
  _id: string;
  title: string;
  course: string;
  due: string;
  available: string;
  until: string;
  editing?: boolean;
  points: string;
  description?: string;
};

const initialState = {
  assignments: assignments as Assignment[],
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = {
        _id: uuidv4(),
        title: assignment.title,
        course: assignment.course,
        due: assignment.due,
        available: assignment.available,
        until: assignment.until,
        points: assignment.points,
        description: assignment.description,
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignment._id ? assignment : a
      );
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      );
    },
  },
});
export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
