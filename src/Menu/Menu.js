import {
  Link
} from "react-router-dom";
function Menu() {
    return (
      <div className="menu" aria-label="Main Navigation">        
         <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
        <li>
          <Link to="login">Login</Link>
        </li>
      </ul>
    </div>
    );
  }
  
  export default Menu;