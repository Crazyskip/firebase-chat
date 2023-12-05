import { useRef } from "react";
import "./AuthForm.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function AuthForm({ auth, setUser }) {
  const signInEmailRef = useRef();
  const signInPasswordRef = useRef();
  const signUpEmailRef = useRef();
  const signUpPasswordRef = useRef();

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
      </form>
    </div>
  );
}

export default AuthForm;
