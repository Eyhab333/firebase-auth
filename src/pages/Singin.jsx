import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./signin.css";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [checkEmail, setcheckEmail] = useState(false);
  const [showForm, setshowForm] = useState("forgot-password");
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate("/");
      }
    }
  });

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Header />
          <main>please check your email, we sent you a verification link</main>
          <Footer />
        </>
      );
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main>Loading .......</main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Signin</title>
        </Helmet>

        <Header />

        <main>
          <form className={`forgot-password ${showForm}`}>
            <div className="close">
              <i
                onClick={() => {
                  setshowForm("forgot-password");
                }}
                className="fa-solid fa-xmark"
              ></i>
            </div>

            <input required placeholder=" E-mail : " type="email" />

            <button
              onClick={(e) => {
                e.preventDefault();
                setcheckEmail(true);
                const auth = getAuth();
                sendPasswordResetEmail(auth, email)
                  .then(() => {
                    // Password reset email sent!
                    // ..
                  })
                  .catch((error) => {
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    // ..
                  });
              }}
              className="reset-password"
            >
              Reset Password
            </button>

            {checkEmail && (
              <p className="check-email">
                check your email <br /> to reset your Password
              </p>
            )}
          </form>

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

            <p
              onClick={() => {
                setshowForm("show");
              }}
              className="account"
            >
              Forgot Password? <Link to="/signin"> Reset Password</Link>
            </p>
          </form>
        </main>

        <Footer />
      </>
    );
  }
};

export default Signin;
