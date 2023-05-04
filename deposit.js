const Deposit = () => {
  const [depositAmount, setDepositAmount] = React.useState("");
  const [message, setMessage] = React.useState("");
  const ctx = React.useContext(UserContext);
  const loggedInUser = ctx.loggedInUser;

  const handleDeposit = (event) => {
    event.preventDefault();

    if (!loggedInUser) {
      setMessage("Error: You need to log in first");
      return;
    }

    // update the user's balance in the context
    const updatedUsers = ctx.users.map((user) => {
      if (user.email === loggedInUser.email) {
        user.balance += parseFloat(depositAmount);
      }
      return user;
    });
    ctx.users = updatedUsers;

    // update alldata.js with the new user data
    const allData = JSON.parse(localStorage.getItem("allData"));
    allData.users = updatedUsers;
    localStorage.setItem("allData", JSON.stringify(allData));

    setMessage(`Successfully deposited $${depositAmount}`);
    setDepositAmount("");
  };

  return (
    <div className="container">
      <h1>Deposit</h1>
      {loggedInUser ? (
        <form onSubmit={handleDeposit}>
          <div className="form-group">
            <label htmlFor="depositAmount">Amount to Deposit</label>
            <input
              type="number"
              className="form-control"
              id="depositAmount"
              placeholder="Enter amount"
              value={depositAmount}
              onChange={(event) => setDepositAmount(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Deposit
          </button>
        </form>
      ) : (
        <div>Please log in to deposit</div>
      )}
      <div>{message}</div>
    </div>
  );
};
