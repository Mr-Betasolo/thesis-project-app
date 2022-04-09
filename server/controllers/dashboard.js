import User from "../models/user.js";

// Subjects Controller
export const addSubject = (req, res) => {
  const subject = req.body;
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          name: "UserError",
          message: "User not found",
        });
      }
      const isDuplicate = user.subjects.some(
        (sub) =>
          sub.subjectName.toUpperCase() === subject.subjectName.toUpperCase() &&
          sub.subjectGrade === subject.subjectGrade
      );
      if (isDuplicate) {
        console.log("duplicate error");
        return res.status(401).send({
          name: "DuplicateError",
          message: "The subject already exist",
        });
      }

      user.subjects.push(subject);
      user.save((saveErr, saveRes) => {
        if (saveErr) {
          console.log(saveErr);
          res.status(500).send(saveErr.message);
        } else {
          console.log("Subject added");
          res.status(200).send(saveRes);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.message);
    });
};
export const updateSubject = (req, res) => {
  const newSubject = req.body;
  const userId = req.params.id;

  User.findOneAndUpdate(
    { _id: userId, "subjects._id": newSubject._id },
    {
      $set: {
        "subjects.$.subjectName": newSubject.subjectName,
        "subjects.$.subjectGrade": newSubject.subjectGrade,
        "subjects.$.details": newSubject.details,
      },
    },
    { new: true },
    (err, db) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      if (!db) {
        return res.status(404).send({
          name: "UserError",
          message: "User not found",
        });
      }
      res.status(200).send(db);
    }
  );
};
export const deleteSubject = (req, res) => {
  const userId = req.params.id;
  const removeId = req.body._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          name: "UserError",
          message: "User not found",
        });
      }

      const isFound = user.subjects.some(
        (sub) => sub._id.toString() === removeId.toString()
      );
      if (!isFound) {
        return res.status(401).send({
          name: "DeleteError",
          message: "The subject does not exist",
        });
      }

      user.subjects.id(removeId).remove((removeErr, removeResult) => {
        if (removeErr) return res.status(400).send(removeErr);
      });

      user.markModified("subjects");
      user.save((saveErr, saveRes) => {
        if (saveErr) return res.status(400).send(saveErr);
        res.status(200).send(saveRes);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

// Students Controller
export const addStudent = (req, res) => {
  const userId = req.params.id;
  const newStudent = req.body;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          name: "UserError",
          message: "User not found",
        });
      }

      const isDuplicate = user.students.some(
        (student) =>
          student.firstName.toUpperCase().trim() ===
            newStudent.firstName.toUpperCase().trim() &&
          student.lastName.toUpperCase() ===
            newStudent.lastName.toUpperCase() &&
          student.grade === newStudent.grade
      );
      if (isDuplicate) {
        console.log("duplicate error");
        return res.status(401).send({
          name: "DuplicateError",
          message: "The student already exist",
        });
      }

      // todo: add 1 to the subject total if the student has that subject

      user.students.push(newStudent);
      user.save((saveErr, saveRes) => {
        if (saveErr) {
          console.log(saveErr);
          res.status(500).send(saveErr.message);
        } else {
          console.log("Student added");
          res.status(200).send(saveRes);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.message);
    });
};
export const updateStudent = (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  console.log(newData.subjects);

  User.findOneAndUpdate(
    { _id: userId, "students._id": newData._id },
    {
      $set: {
        "students.$.firstName": newData.firstName,
        "students.$.lastName": newData.lastName,
        "students.$.age": newData.age,
        "students.$.contact": newData.contact,
        "students.$.grade": newData.grade,
        "students.$.strand": newData.strand,
        "students.$.specialization": newData.specialization,
        "students.$.subjects": newData.subjects,
      },
    },
    { new: true },
    (err, db) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      if (!db) {
        console.log(err);
        return res.status(404).send({
          name: "UserError",
          message: "User not found",
        });
      }
      res.status(200).send(db);
    }
  );
};
export const deleteStudent = (req, res) => {
  const userId = req.params.id;
  const removeId = req.body._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          name: "UserError",
          message: "User not found",
        });
      }

      const isFound = user.students.some(
        (student) => student._id.toString() === removeId.toString()
      );
      if (!isFound) {
        return res.status(401).send({
          name: "DeleteError",
          message: "The student does not exist",
        });
      }

      user.students.id(removeId).remove((removeErr, removeResult) => {
        if (removeErr) return res.status(400).send(removeErr);
      });

      user.markModified("students");
      user.save((saveErr, saveRes) => {
        if (saveErr) return res.status(400).send(saveErr);
        res.status(200).send(saveRes);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

// add score
export const addScore = (req, res) => {
  const userId = req.params.userId;
  const studentId = req.params.studentId;
  const newSubjects = req.body;

  User.findOneAndUpdate(
    { _id: userId, "students._id": studentId },
    {
      $set: {
        "students.$.subjects": newSubjects,
      },
    },
    { new: true },
    (err, db) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      if (!db) {
        console.log(err);
        return res.status(404).send({
          name: "UserError",
          message: "User not found",
        });
      }
      res.status(200).send(db);
    }
  );
};
