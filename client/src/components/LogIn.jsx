import React, {useState} from "react";

function LogIn(props) {
  const [user, setUser] = useState({username: "", password:""});
  const [newUser, setNewUser] = useState({username: "", password1: "", password2: ""});

  function handleLoginChange(event) {
    const {value, name} = event.target;
    setUser(prevUser => {
      return {
        ...prevUser,
        [name]: value
      }
    });
  };

  function handleLoginClick(event) {
    event.preventDefault();
    props.onLoginClick(user);
    setUser({username: "", password: ""});
  }

  function handleRegisterChange(event) {
    const {value, name} = event.target;
    setNewUser(prevNewUser => {
      return {
        ...prevNewUser,
        [name]: value
      }
    });
  };

  function handleRegisterClick(event) {
    event.preventDefault();
    if (newUser.password1 === newUser.password2) {
      props.onRegisterClick({username: newUser.username, password: newUser.password1});
      setNewUser({username: "", password1: "", password2: ""});
    } else {
      alert("The passwords you provided do not match. Please enter them again.");
      setNewUser((prevNewUser) => {
        return {username: prevNewUser.username, password1: "", password2: ""}
      });
    }
  };



  return (
    <div>

      <form className="login"  >
        <h2>Log In</h2>
        <label>
          Username:
          <input
            onChange={handleLoginChange}
            name="username"
            value={user.username}
          />
        </label>
        <label>
          Password:
          <input
            onChange={handleLoginChange}
            name="password"
            type="password"
            value={user.password}
          />
        </label>
        <button type="submit" onClick={handleLoginClick} >Log In</button>
      </form>

      <form className="register">
        <h2>Register</h2>
        <label>
          Username:
          <input
            onChange={handleRegisterChange}
            name="username"
            value={newUser.username}
          />
        </label>
        <label>
          Password:
          <input
            onChange={handleRegisterChange}
            name="password1"
            type="password"
            value={newUser.password1}
          />
        </label>
        <label>
          Enter your password again:
          <input
            onChange={handleRegisterChange}
            name="password2"
            type="password"
            value={newUser.password2}
          />
        </label>
        <button type="submit" onClick={handleRegisterClick} >Register</button>
      </form>

    </div>
  )
}

export default LogIn;
