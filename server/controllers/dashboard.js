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
        (sub) => sub.name.toUpperCase() === subject.name.toUpperCase()
      );
      if (isDuplicate) {
        return res.status(401).send({
          name: "DuplicateError",
          message: "The subject already exist",
        });
      }

      user.subjects.push(subject);
      user.save((saveErr, saveRes) => {
        if (err) {
          console.log(err);
          res.status(500).send(saveErr);
        } else {
          console.log("Subject added");
          res.status(200).send({ success: true, message: "Subject added" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

export const updateSubject = (req, res) => {
  const newSubject = req.body;
  const userId = req.params.id;

  User.findOneAndUpdate(
    { _id: userId, "subjects._id": newSubject._id },
    {
      $set: {
        "subjects.$.name": newSubject.name,
        "subjects.$.details": newSubject.details,
      },
    },
    (err, db) => {
      if (err) {
        console.log(err);
        return res.status(401).send(err);
      }
      console.log(db);
      if (!db) {
        return res.status(404).send({
          name: "UserError",
          message: "User not found",
        });
      }
      res
        .status(200)
        .send({ success: true, message: "Subject updated successfully" });
    }
  );
};

export const deleteSubject = (req, res) => {
  const userId = req.params.id;
  const removeId = req.body._id;
  console.log(removeId);
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
      console.log(isFound);
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
        res
          .status(200)
          .send({ success: true, message: "Subject deleted successfully" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};
