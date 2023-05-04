function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const ctx = React.useContext(UserContext);

  function handleLogin(e) {
    e.preventDefault();
    const user = ctx.users.find((user) => user.email === email && user.password === password);
    if (user) {
      setLoggedIn(true);
      ctx.loggedInUser = user;
      localStorage.setItem("email", user.email);
      setErrorMessage('');
    } else {
      setLoggedIn(false);
      setErrorMessage('Invalid email or password');
    }
  }

  function handleLogout() {
    setLoggedIn(false);
    ctx.loggedInUser = null;
    localStorage.removeItem("email");
  }

  return (
    <>
      {loggedIn ? (
        <div>
          <p>Welcome, {email}!</p>
          <button onClick={handleLogout}>Logout</button>
          <AllData />
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit">Login</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      )}
    </>
  );
}
