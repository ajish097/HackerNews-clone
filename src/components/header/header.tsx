import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <img
        alt="hacker-news"
        className="header-child"
        style={{ border: "1px white solid" }}
        src="https://news.ycombinator.com/y18.gif"
      />
      <h2 className="header-child">
        <a href="/">Hacker News</a>
      </h2>
    </div>
  );
};

export default Header;
