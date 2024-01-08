import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import assignments from "./data/assignments.js";
import { comments } from "./data/comments.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/assignments", (req, res) => {
  const limit = req.query.limit;
  if (limit > 10) {
    res.json({
      message: "Invalid request,limit must not exceeds 10 assignments",
    });
  }
  const assignmentsWithLimit = assignments.slice(0, limit);
  return res.json({
    message: "Complete Fetching assignments",
    data: assignmentsWithLimit,
  });
});

app.get("/assignments/:id", (req, res) => {
  const assignmentId = req.params.id;
  const findAssignmentsById = assignments.filter(
    (assignment) => assignment.id.toString() === assignmentId
  );
  if (findAssignmentsById.length === 0) {
    res.status(404).json({
      message: `assignment ID ${assignmentId} is not found`,
    });
    return;
  }
  return res.json({
    message: "Complete Fetching assignments",
    data: findAssignmentsById[0],
  });
});

app.post("/assignments", (req, res) => {
  assignments.push({ ...req.body, id: assignments.length + 1 });
  res.json({
    message: `Assignments has been created successfully`,
    data: { ...req.body, id: assignments.length },
  });
});

app.delete("/assignments/:id", (req, res) => {
  const assignmentId = req.params.id;
  const assignmentIndex = assignments.findIndex(
    (assignment) => assignment.id.toString() === assignmentId
  );

  if (assignmentIndex === -1) {
    res.json({
      message: "Cannot delete, No data available!",
    });
    return;
  }

  assignments.splice(assignmentIndex, 1);

  return res.json({
    message: "Assignment Id : <assignmentsId>  has been deleted successfully",
  });
});

app.put("/assignments/:id", (req, res) => {
  const assignmentId = req.params.id;
  const hasFound = assignments.find(
    (assignment) => assignment.id.toString() === assignmentId
  );

  if (!hasFound) {
    res.json({
      message: "Cannot update, No data available!",
    });
    return;
  }
  const assignmentIndex = assignments.findIndex(
    (assignment) => assignment.id.toString() === assignmentId
  );

  assignments[assignmentIndex] = { id: assignmentId, ...req.body };

  return res.json({
    message: `Assignment Id : ${assignmentId}  has been updated successfully`,
    data: assignments[assignmentIndex],
  });
});

app.get("/assignments/:assignmentsId/comments", (req, res) => {
  const assignmentId = req.params.assignmentsId;
  const result = comments.filter(
    (comment) => comment.assignmentId.toString() === assignmentId
  );
  return res.json({
    message: "Complete fetching comments",
    data: result,
  });
});

app.post("/assignments/:assignmentsId/comments", (req, res) => {
  const assignmentId = req.params.assignmentsId;

  comments.push({
    ...req.body,
    id: comments.length + 1,
    assignmentId: assignmentId,
  });

  return res.json({
    message: "New comment has been created successfully",
    data: req.body,
  });
});
