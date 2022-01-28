/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

export default ({ comments }) => {
  const renderedComments = comments.map(comment => {
    // let content;
    // if (comment.status === 'approved') {
    //   content = comment.content;
    // }
    // if (comment.status === 'rejected') {
    //   content = 'This comment has been rejected!';
    // }
    // if (comment.status === 'pending') {
    //   content = 'This comment is awaiting moderation!';
    // }

    const content =
      comment.status === 'approved'
        ? comment.content
        : comment.status === 'rejected'
        ? 'This comment has been rejected!'
        : comment.status === 'pending'
        ? 'This comment is awaiting moderation!'
        : '';

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
