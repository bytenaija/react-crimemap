import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Comment = ({ comment }) => {
  return (
    <CommentWrapper>
      <h4>{comment.comment}</h4>
      <CommentMeta>
        <a href={`comments/authors/${comment.userId._id}`}>
          {comment.userId.username}
        </a>
        <span>{moment(comment.createdAt).fromNow()}</span>
      </CommentMeta>
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  padding: 0.8rem;
  box-shadow: 1px 1px 5px purple;
  width: 100%;
  margin-bottom: 1rem;
`;

const CommentMeta = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-around;
`;
export default Comment;
