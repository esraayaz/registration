import "./App.css";
import { useState } from "react";
import { validateEmail } from "./Components/utils.js";
import Footer from "./Components/Footer.js";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [role, setRole] = useState("role");

  const getIsFormValid = () => {
    return (
      firstName.trim() !== "" &&
      validateEmail(email) &&
      hasMinLength(password.value) &&
      hasNoRepeats(password.value) &&
      hasNoName(password.value, firstName, lastName) &&
      hasSpecialChar(password.value) &&
      (role === "individual" || role === "business")
    );
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword({
      value: "",
      isTouched: false,
    });
    setRole("role");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Account created!");
    clearForm();
  };

  function hasMinLength(password) {
    return password.length >= 8;
  }

  function hasNoRepeats(password) {
    return !/(.).*?\1/.test(password);
  }

  function hasNoName(password, firstName, lastName) {
    const lowerPassword = password.toLowerCase();
    return (
      !lowerPassword.includes(firstName.toLowerCase()) &&
      !lowerPassword.includes(lastName.toLowerCase())
    );
  }

  function hasSpecialChar(password) {
    return /[!.,?]/.test(password);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              className="uppercase"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="First name"
            />
          </div>
          <div className="Field">
            <label>Last name</label>
            <input
              className="uppercase"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Last name"
            />
          </div>
          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email address"
            />
          </div>
          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password.value}
              onChange={(e) =>
                setPassword({ ...password, value: e.target.value })
              }
              onBlur={() =>
                setPassword((prev) => ({ ...prev, isTouched: true }))
              }
            />
            {password.isTouched && (
              <>
                {!hasMinLength(password.value) && (
                  <p className="FieldError">
                    Password should have at least 8 characters.
                  </p>
                )}
                {!hasNoRepeats(password.value) && (
                  <p className="FieldError">
                    Password should not contain repeated characters.
                  </p>
                )}
                {!hasNoName(password.value, firstName, lastName) && (
                  <p className="FieldError">
                    Password should not contain your name or surname.
                  </p>
                )}
                {!hasSpecialChar(password.value) && (
                  <p className="FieldError">
                    Password must include at least one special character (! . ,
                    ?).
                  </p>
                )}
              </>
            )}
          </div>
          <div className="Field">
            <label>
              Role <sup>*</sup>
            </label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
          <button type="submit" disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
      </form>
      <Footer />
    </div>
  );
}

export default App;
