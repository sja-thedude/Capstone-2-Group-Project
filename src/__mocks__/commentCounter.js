const commentCounter = (commentsArr) => {
    if (commentsArr) {
      const text = `Comments (${commentsArr.length}) by previous visitors`;
      return text;
    }
    return 'Comments (0) by previous visitors';
  };
  
  module.exports = commentCounter;