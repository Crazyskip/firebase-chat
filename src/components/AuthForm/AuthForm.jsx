import { useRef } from "react";
import "./AuthForm.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";

function AuthForm({ auth, setUser }) {
  const provider = new GoogleAuthProvider();

  const signInEmailRef = useRef();
  const signInPasswordRef = useRef();
  const signUpEmailRef = useRef();
  const signUpPasswordRef = useRef();

  function googleSignIn() {
    const auth = getAuth();
    signInWithPopup(auth, provider);
  }

  function signIn(event) {
    event.preventDefault();
    const email = signInEmailRef.current.value;
    const password = signInPasswordRef.current.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  }

  function signUp(event) {
    event.preventDefault();
    const email = signUpEmailRef.current.value;
    const password = signUpPasswordRef.current.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        setUser(userCredential);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  }

  return (
    <div className="auth-forms">
      <form className="signin-form" onSubmit={signIn}>
        <h2 className="signin-title">Login</h2>
        <input
          type="text"
          className="signin-input"
          placeholder="Email"
          id="signin-email"
          ref={signInEmailRef}
        />
        <input
          type="password"
          className="signin-input"
          placeholder="Password"
          id="signin-password"
          ref={signInPasswordRef}
        />
        <input type="submit" value="Login" />
        <button className="google-sign" onClick={googleSignIn}>
          <img src="/dark_google_signin.png" alt="google sign in" height={48} />
        </button>
      </form>
      <form className="signin-form" onSubmit={signUp}>
        <h2 className="signin-title">Signup</h2>
        <input
          type="text"
          className="signin-input"
          placeholder="Email"
          id="signup-email"
          ref={signUpEmailRef}
        />
        <input
          type="password"
          className="signin-input"
          placeholder="Password"
          id="signup-password"
          ref={signUpPasswordRef}
        />
        <input type="submit" value="Sign up" />
        <button className="google-sign" onClick={googleSignIn}>
          <img src="/dark_google_signup.png" alt="google sign up" height={48} />
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
