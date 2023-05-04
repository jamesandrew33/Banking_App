const Withdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = React.useState("");
  const [message, setMessage] = React.useState("");
  const ctx = React.useContext(UserContext);
  const loggedInUser = ctx.loggedInUser;

  const handleWithdraw = (event) => {
    event.preventDefault();

    if (!loggedInUser) {
      setMessage("Error: You need to log in first");
      return;
    }

    if (parseFloat(withdrawAmount) > loggedInUser.balance) {
      setMessage("Error: Insufficient balance");
      return;
    }

    // update the user's balance in the context
    const updatedUsers = ctx.users.map((user) => {
      if (user.email === loggedInUser.email) {
        user.balance -= parseFloat(withdrawAmount);
      }
      return user;
    });
    ctx.users = updatedUsers;

    // update alldata.js with the new user data
    const allData = JSON.parse(localStorage.getItem("allData"));
    allData.users = updatedUsers;
    localStorage.setItem("allData", JSON.stringify(allData));

    setMessage(`Successfully withdrew $${withdrawAmount}`);
    setWithdrawAmount("");
  };

  return (
    <div className="container">
      <h1>Withdraw</h1>
      {loggedInUser ? (
        <form onSubmit={handleWithdraw}>
          <div className="form-group">
            <label htmlFor="withdrawAmount">Amount to Withdraw</label>
            <input
              type="number"
              className="form-control"
              id="withdrawAmount"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={(event) => setWithdrawAmount(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Withdraw
          </button>
        </form>
      ) : (
        <div>Please log in to withdraw</div>
      )}
      <div>{message}</div>
    </div>
  );
};
