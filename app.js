import express from "express";
import { assignments } from "./data/assignments.js";

let dataAssignment = assignments;

const app = express();
const port = 3000;
//ดูทั้งหมด
app.get("/assignments", function (req, res) {
  const limit = req.query.limit;
  if (limit > 10) {
    return res.status(401).json({
      message: "Invalid request,limit must not exceeds 10 assignments",
    });
  }

  const assignments = dataAssignment.slice(0, limit);
  return res.json({
    message: "Complete Fetching assignment",
    data: assignments,
  });
});
//ดูด้วยID
app.get("/assignments/:assignmentsId", function (req, res) {
  let assignmentIdFromFontend = Number(req.params.assignmentsId);
  let assignment = dataAssignment.filter(
    (item) => item.id === assignmentIdFromFontend
  );
  return res.json({
    message: "Complete Fetching assignments",
    data: assignment,
  });
});
//สร้างใหม่
app.post("/assingments", function (req, res) {});
//ลบ
app.delete("/assignments/:assignmentsId", function (req, res) {
  let assignmentIdFromFontend = Number(req.params.assignmentsId);

  let found = false;
  for (let i = 0; i < dataAssignment.length; i++) {
    const element = dataAssignment[i];
    if (element.id === assignmentIdFromFontend) {
      found = true;
    }
  }
  if (!found) {
    return res.json({
      message: "Error",
    });
  }
  const NewAssignments = dataAssignment.filter((item) => {
    return item.id !== assignmentIdFromFontend;
  });
  dataAssignment = NewAssignments;

  return res.json({
    message: `Assignmet ID : ${req.params.assignmentsId} has been deleted successfully`,
  });
});
//แก้ไข Update
app.put("/assignments/:assignmentsId", function (req, res) {
  let assignmentIdFromFontend = Number(req.params.assignmentsId);

  const assignmentIndex = dataAssignment.findIndex((item) => {
    return item.id === assignmentIdFromFontend;
  });

  dataAssignment[assignmentIndex] = {
    id: assignmentIdFromFontend,
    ...req.body,
  };

  return res.json({
    message: "Complete Fetching assignments",
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
