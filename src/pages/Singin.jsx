import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  return (
    <>
      <Helmet>
        <title>Signin</title>
      </Helmet>
      <Header />

      <main>
        <form>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder=" E-mail : "
            type="email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            placeholder=" Password : "
            type="password"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                  navigate("/");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  setShowError(errorCode);

                  switch (errorCode) {
                    case "auth/user-not-found":
                      setShowError("invalid email");
                      break;

                    case "auth/invalid-password":
                      setShowError("invalid password");
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
            Sign in
          </button>
          <p className="account">
            Don't hava an account <Link to="/signup"> Sign-up</Link>
          </p>
          <p>{showError}</p>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Signin;
