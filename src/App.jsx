import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AuthForm from "./components/AuthForm/AuthForm";
import Chatbox from "./components/Chatbox/Chatbox";

const firebaseConfig = {
  apiKey: "AIzaSyDI40T3n8Uil2Zas8e7c1s5f1Trvov0if0",
  authDomain: "fir-chat-82ef0.firebaseapp.com",
  projectId: "fir-chat-82ef0",
  storageBucket: "fir-chat-82ef0.appspot.com",
  messagingSenderId: "177421117585",
  appId: "1:177421117585:web:be892e4597d04f0b45f730",
  measurementId: "G-H563NJHWHN",
};

function App() {
  const [user, setUser] = useState(null);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  });

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar signout={logout} user={user} />
      <main>
        <div>User: {user?.email}</div>
        {user ? (
          <Chatbox auth={auth} db={db} />
        ) : (
          <AuthForm auth={auth} setUser={setUser} />
        )}
      </main>
    </>
  );
}

export default App;
