import React, { useState } from "react";
import TodayIcon from '@material-ui/icons/Today';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

const toggle = () => setIsOpen(!isOpen);
    return (
    <header>
      <h1>
        <TodayIcon />
        NoteKeeper
      </h1>
      <h2>
        Check Out My <a href="https://github.com/aidansheehan">GitHub</a>
      </h2>
    </header>
  );
}

export default Header;
