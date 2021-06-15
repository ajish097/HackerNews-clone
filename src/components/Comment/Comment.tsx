import React from "react";
import "./Comment.css";

const Comment = (props) => {
    function createMarkup(comment) {
        return {__html: comment.text};
    }
    return (
        props.comments.map(comment => {
            return (
                <React.Fragment key={comment.id} >
                <ul>
                    <li>
                    <ul id="content">
                        <span>
                            username: {comment.by}
                            <br />
                        </span>
                        <span dangerouslySetInnerHTML={createMarkup(comment)}></span>
                    </ul>
                    <ul>
                        {comment.comments?.length > 0 ? <Comment comments = {comment.comments} /> : null}
                    </ul>
                    </li>
                </ul>
                </React.Fragment>
            )
        })
    )
}

export default Comment;