var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    contactNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

// UserSchema.virtual('password')
// .set(function(password){
//   this.hash_password = bcrypt.hashSync(password, 10);
// });

UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compareSync(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", UserSchema);
