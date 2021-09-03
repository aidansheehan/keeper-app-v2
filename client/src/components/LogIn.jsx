import React, {useState} from "react";

function LogIn(props) {
  const [user, setUser] = useState({username: "", password:""});

  function handleChange(event) {
    const {value, name} = event.target;
    console.log(name);
    setUser(prevUser => {
      return {
        ...prevUser,
        [name]: value
      }
    });
  }

  function handleClick(event) {
    event.preventDefault();
    props.onClick(user);
  }
  return (
    <div>
      <form className="login"  >
        <label>
          Username:
          <input onChange={handleChange} name="username"/>
        </label>
        <label>
          Password:
          <input onChange={handleChange} name="password" type="password"/>
        </label>
        <button type="submit" onClick={handleClick} >Log In</button> {/* Remember to preventDefault*/}
      </form>
    </div>
  )
}

export default LogIn;
