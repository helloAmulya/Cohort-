import axios from "axios";

async function getUserData() {
  const res = await axios.get('https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details')
  return res.data;
}

export default async function Home() {

  // the details will be fetched from backend to next server, then will be returned as the html
  const userDetails = await getUserData();

  return (
    <div className="flex items-center justify-center">

      {userDetails.name} {" "}
      {userDetails.email}

    </div>
  );
}
