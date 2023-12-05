import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import "./Chatbox.css";

function Chatbox({ db, auth }) {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesSnap = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        messagesSnap.push(data);
      });
      setMessages(messagesSnap);
    });
    return () => unsubscribe();
  }, [db]);

  async function writeChat(event) {
    event.preventDefault();
    await addDoc(collection(db, "messages"), {
      uid: auth.currentUser.uid,
      username: auth.currentUser.email.split("@")[0],
      imageUrl: `https://source.boringavatars.com/pixel/128/${auth.currentUser.uid}`,
      createdAt: serverTimestamp(),
      text: chatInput,
    });
    setChatInput("");
  }

  const reversedMessages = [...messages].reverse();

  return (
    <div>
      <h1>Chatbox</h1>
      <div className="chat-container">
        {reversedMessages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.uid === auth.currentUser.uid ? "sent" : "received"
            }`}
          >
            <img
              className="profile-pic"
              src={message.imageUrl}
              alt="profile pic"
              width="48"
              height="48"
            />
            <div className="message-content">
              <p className="username">{message.username}</p>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={writeChat}>
        <input
          type="text"
          id="chat"
          value={chatInput}
          className="chat-input"
          placeholder="Message"
          autoComplete="off"
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button type="submit" className="chat-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chatbox;
