import "./Navbar.css";

function Navbar({ signout, user }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2>Realtime Chat</h2>
        {user ? <button onClick={signout}>Logout</button> : null}
      </div>
    </nav>
  );
}

export default Navbar;
