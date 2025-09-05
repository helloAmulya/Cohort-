
import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export const Signin = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="">
        <Auth type="signin" />
      </div>
      <div className="invisible md:visible">
        <Quote />
      </div>
    </div>
  );
};