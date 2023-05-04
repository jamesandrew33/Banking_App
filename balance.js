const Balance = () => {
  const ctx = React.useContext(UserContext);
  const loggedInUser = ctx.loggedInUser;

  return (
    <div className="container">
      <h1>Balance</h1>
      {loggedInUser ? (
        <div>Your current balance is ${loggedInUser.balance.toFixed(2)}</div>
      ) : (
        <div>Please log in to view your balance</div>
      )}
    </div>
  );
};
