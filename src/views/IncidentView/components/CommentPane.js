import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';

const CommentPane = ({ comments = [] }) => {
  const sortedComments = comments.sort((a, b) =>
    new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1,
  );
  return (
    <CommentPaneWrapper>
      {sortedComments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </CommentPaneWrapper>
  );
};

const CommentPaneWrapper = styled.div`
  width: 50%;
  margin: 3.5rem 2rem;
`;

export default CommentPane;
