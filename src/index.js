import './style.css';

const baseurl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';
const apiurl = 'https://isro.vercel.app/api/spacecrafts';

async function getData() {
  const response = await fetch(baseurl);
  const result = await response.json();
  const meal = await result;
  return meal;
}

getData();