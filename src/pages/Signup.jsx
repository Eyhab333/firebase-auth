import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  return (
    <>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <Header />

      <main>
        <form>
          <p style={{ fontSize: "23px", marginBottom: "22px" }}>
            Create a new account <span>🧡</span>{" "}
          </p>

          <input
            onChange={(e) => setName(e.target.value)}
            required
            placeholder=" First Name  : "
            type="text"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" E-mail : "
            type="email"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" Password : "
            type="password"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  sendEmailVerification(auth.currentUser).then(() => {
                    // Email verification sent!
                    // ...
                  });
                  // Signed in
                  updateProfile(auth.currentUser, {
                    displayName: name,
                  })
                    .then(() => {
                      // Profile updated!
                      navigate("/");
                    })
                    .catch((error) => {
                      // An error occurred
                      console.log(error);
                    });
                })
                .catch((error) => {
                  const errorCode = error.code;
                  setShowError(errorCode);

                  switch (errorCode) {
                    case "auth/email-already-exists":
                      setShowError(
                        "The provided email is already in use by an existing user"
                      );
                      break;

                    case "auth/email-already-in-use":
                      setShowError(
                        "The provided email is already in use by an existing user"
                      );
                      break;
                    case "auth/wrong-password":
                      setShowError("wrong password");
                      break;

                    default:
                      setShowError(errorCode);
                      break;
                  }
                });
            }}
          >
            Sign up
          </button>
          <p className="account">
            Already hava an account <Link to="/signin"> Sign-in</Link>
          </p>
          <p className="account">{showError}</p>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Signup;
