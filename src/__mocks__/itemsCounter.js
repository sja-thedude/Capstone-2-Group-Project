const itemsCounter = (itemsArr) => {

    if (itemsArr) {
        const res = itemsArr.length;
        return res;
      }
      return 0;
    };
  
  module.exports = itemsCounter;