import { Link } from "react-router-dom";
import style from "./Homepage.module.css";

function Homepage() {
  const newDate = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[newDate.getMonth()];

  const fullDate = `${month} ${newDate.getDate()}, ${newDate.getFullYear()}`;

  return (
    <>
      <h2 className={style.Today}>Today is</h2>
      <h1>{fullDate}</h1>
      <Link to="/todos">
        <button className={style.ViewTodosBtn}>View Todos</button>
      </Link>
    </>
  );
}

export default Homepage;
