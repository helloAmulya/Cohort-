import "./App.css";
import { RecoilRoot, useRecoilStateLoadable } from "recoil";
import { todosAtomFamily } from "./atoms";
import SkeletonLoad from "./components/SkeletonLoad.jsx";

function App() {
  return (
    <RecoilRoot>
      <Todo id={1} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

//Recoil uses React’s Suspense to "pause" rendering until async data (selectors) are ready,
//  letting you avoid manual loading state logic.

function Todo({ id }) {
  const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id));
  if (todo.state === "loading") {
    // return <div>loading</div>
    return <SkeletonLoad />;
  }

  return (
    <>
      {todo.contents.title}
      {todo.contents.description}
      <br />
    </>
  );
}

export default App;
