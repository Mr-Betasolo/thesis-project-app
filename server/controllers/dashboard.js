import User from "../models/user.js";

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
