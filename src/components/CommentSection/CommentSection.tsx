import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchComments } from "../../apis/fetchComments";
import { Item } from "../../Models/Item";
import Comment from '../Comment/Comment';

const CommentSection = () => {
  const { id } = useParams<{ id: string }>();
  const commentsTree: any =  {id: parseInt(id), comments: []}; 
  const [comments, setComments] = useState<any>([]);

  const createCommentTree = (comments: Array<Item>, commentsTree: any) => {
    let childComments = comments.filter((comment: Item) => {
      return comment?.parent === commentsTree.id;
    });
    if (!childComments) return;

    commentsTree.comments = childComments;
    for (let i = 0; i < commentsTree.comments.length; i++) {
      createCommentTree(comments, commentsTree.comments[i]);
    }
  };

  useEffect(() => {
    async function getComments() {
      await fetchComments(Number(id), setComments)
    }
    getComments();
  }, []);

  if(comments.length > 0) {
    createCommentTree(comments, commentsTree)
  }
  return (
    commentsTree.comments.length > 0 
    ?(<div> <Comment comments={commentsTree?.comments}/> </div>)
    : null  
  );
};

export default CommentSection;
