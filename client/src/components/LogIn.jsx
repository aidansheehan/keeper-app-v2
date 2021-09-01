import React, {useState} from "react";

function LogIn(props) {
  const [user, setUser] = useState({username: ""});

  function handleChange(event) {
    const {value} = event.target;
    setUser({username: value});
  }

  function handleClick(event) {
    event.preventDefault();
    props.onClick(user);
  }
  return (
    <div>
      <form>
        <input onChange={handleChange} />
        <button type="submit" onClick={handleClick} >Log In</button> {/* Remember to preventDefault*/}
      </form>
    </div>
  )
}

export default LogIn;
