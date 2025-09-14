import axios from "axios";

// async function getUserData() {
//   // await new Promise((r)=> setTimeout(r,5000));
//   const res = await axios.get('https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details')
//   return res.data;
// }

async function getUserDataAPI() {
  // fetching this data from the local api backend folder
  try {
    const res = await axios.get('http://localhost:3000/api/user')
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export default async function Home() {

  // the details will be fetched from backend to next server, then will be returned as the html
  // const userDetails = await getUserData();
  
  // from api folder
  const userDetails = await getUserDataAPI();

  return (
    <div className="flex items-center justify-center">

      {userDetails?.name} {" "}
      {userDetails?.email}

    </div>
  );
}
