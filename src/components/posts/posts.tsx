import React, { useState, useEffect } from "react";
import { Item } from "../../Models/Item";
import { fetchPosts } from "./../../apis/fetchPosts";
import { Link } from "react-router-dom";

const Posts = () => {
  const [items, setItems] = useState<Array<Item>>([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const response: Array<Item> = await fetchPosts();
        setItems(response);
      } catch (e) {
        console.error(e);
      }
    }
    getPosts();
  }, []);

  const renderedList = () => {
    return items.map((item) => {
      return (
        <React.Fragment key={item.postId}>
          <tr>
            <td style={{ width: "20px" }}>
              <span className="item-row"> {item.postId}. </span>
            </td>
            <td>
              <a className="item-row" href="item.url">
                {item.title}
              </a>
            </td>
          </tr>
          <tr className="subtext">
            <td></td>
            <td className="subtext-row">
              <span>
                {item.score} points by {item.by}
              </span>
              <span> | </span>
              <Link to={`/comments/${item.id}`} className="link">
                {item.descendants} comments
              </Link>
            </td>
          </tr>
        </React.Fragment>
      );
    });
  };

  return (
    <div className="itemlist">
      <table>
        <tbody>{renderedList()}</tbody>
      </table>
      <div className="footer">
        {/* <Link to={`posts/${}`}>
          <button id="btn_next">Next</button>
        </Link> */}
      </div>
    </div>
  );
};

export default Posts;
