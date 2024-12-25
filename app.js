const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/users");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/read", async function (req, res) {
  const newuser = await userModel.find();
  res.render("read", { users: newuser });
});
app.post("/create", async function (req, res) {
  const { name, email, image } = req.body;
  const createdUser = await userModel.create({
    name: name,
    email: email,
    image: image,
  });
  res.redirect("/read");
});
app.get("/delete/:id", async function (req, res) {
    const newuser = await userModel.findOneAndDelete({_id : req.params.id});
    res.redirect("/read");
  });

app.listen(3000, function (err) {
  if (err) throw err;
  console.log("Running");
});
