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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          This is Home Page
        </h1>

        {userDetails ? (
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              {userDetails.name}
            </p>
            <p className="text-gray-500">{userDetails.email}</p>
          </div>
        ) : (
          <p className="text-gray-400 italic">Loading user details...</p>
        )}
      </div>
    </div>
  );
}
