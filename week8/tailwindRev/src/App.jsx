import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RevenueCard from "./components/RevenueCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    // <>
    //   <div className="flex flex-row w-full h-screen ">
    //     <div className="bg-[#1E2640] text-white w-[280px] h-screen">sidebar</div>

    //     <div className="flex flex-col ml-8 mr-8 w-full h-screen">
    //       {/* header */}
    //       <div className="flex flex-row justify-between ">
    //         <div className="flex flex-row items-center">
    //           <h3>Payouts</h3>
    //           <h5>? how it works</h5>
    //         </div>

    //         <div>
    //           <img src="https" alt="" />
    //           <h5>search feature</h5>
    //         </div>

    //         <div className=" flex flex-row items-center">
    //       <h2>logos</h2>
    //       <h2>logos</h2>
    //         </div>

    //       </div>

    //       <div>transactions</div>
    //       <div>table</div>
    //     </div>
    //   </div>
    // </>
    <>
      <div className="grid grid-cols-4">
        <RevenueCard
          amount={9635.028}
          orderCount={13}
          orderColor={"blue"}
          title={"Amount Pending"}
        />
      </div>
    </>
  );
}

export default App;
