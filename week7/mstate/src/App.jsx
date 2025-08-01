import { useContext, useMemo, useState } from "react";
import { CountContext } from "./context";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
// import { countAtom, evenSelector } from "./store/atoms/count";
import { countAtom, verEven } from "./store/atoms/count";

function App() {
  return (
    <div>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </div>
  );
}

function Count() {
  console.log("re-render");
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);
  // const [count,setCount] = useRecoilState(countAtom);

  return (
    <div>
      <b>{count}</b>
      {/* <EvenCountRenderer /> */}
      <CheckEven />
    </div>
  );
}

// function EvenCountRenderer() {
//   const isEven = useRecoilValue(evenSelector);

//   return <div>
//     {isEven ? "It is even" : null}
//   </div>
// }

function CheckEven() {
  const isEven = useRecoilValue(verEven);
  return <div>{isEven ? "it is even" : null}</div>;
}

function Buttons() {
  const setCount = useSetRecoilState(countAtom);
  console.log("buttons re-rendererd");

  return (
    <div>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Increase
      </button>

      <button
        onClick={() => {
          setCount((count) => count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

export default App;
