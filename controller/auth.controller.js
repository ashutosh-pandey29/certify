
export const registerUser = (req, res) => {
  res.send("Register route hit");
};

export const loginUser = (req, res) => {
  res.send("Login route hit");
};

export const forgetPassword = (req, res) => {
  res.send("Forget password route hit");
};

export const changePassword = (req, res) => {
  res.send("Change password route hit");
};

export const isLoggedIn = (req, res) => {
  res.send("User login check route hit");
};
