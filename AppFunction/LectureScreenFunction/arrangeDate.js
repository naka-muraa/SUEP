// 「〇年▽月□日」の形に直す
const arrangeDate = (fullDate) => {
  const date = fullDate.getDate();
  const month = fullDate.getMonth() + 1;
  const year = fullDate.getFullYear();
  const specificDate = `${year} / ${month} / ${date}`;
  return specificDate;
}

export default arrangeDate;
