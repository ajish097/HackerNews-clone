import React, { useState, useEffect, useCallback, useRef } from "react";
import { Item } from "../../Models/Item";
import { fetchPosts } from "./../../apis/fetchPosts";
import { Link } from "react-router-dom";
import './Posts.css'

const Posts = () => {
  const MaxPages = 25;
  const [items, setItems] = useState<Array<Item>>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        let responseItems: Array<Item> = await fetchPosts(pageNumber);
        responseItems = [...items, ...responseItems];
        mapPostIds(responseItems)
        setItems([...responseItems]);
        setHasMore(!(pageNumber === MaxPages))
      } catch (e) {
        console.error(e);
      }
    }
    getPosts();
  }, [pageNumber]);

  const mapPostIds = (posts: Array<Item>) => {
    posts.forEach((post, idx: number) => {
      post.postId = idx + 1;
    });
  }

  const observer:any = useRef();
  const lastPostRef = useCallback(node => {
    if(observer.current) {
      observer.current.disconnect();
    } 
    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore){
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    })
    if(node) observer.current.observe(node)
  },[])

  const renderTitle = (item) => {
    return (
      <React.Fragment>
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
    )
  }

  const renderedList = () => {
    return items.map((item, index) => {
      if(items.length === index+10) {
        return  <tbody ref={lastPostRef} key={item.postId}>{renderTitle(item)}</tbody>
      }
      else {
        return  <tbody key={item.postId}>{renderTitle(item)}</tbody>
      }
    });
  };

  return (
    <div className="itemlist">
      <table>
        {renderedList()}
      </table>
    </div>
  );
};

export default Posts;
