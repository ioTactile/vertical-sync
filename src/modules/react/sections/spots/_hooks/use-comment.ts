import * as React from 'react';

export const useComment = () => {
  const [isCommentModalOpen, setIsCommentModalOpen] = React.useState(false);

  return { isCommentModalOpen, setIsCommentModalOpen };
};
