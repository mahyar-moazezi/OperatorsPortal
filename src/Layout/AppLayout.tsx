import KoroushMallBackground from "../Assets/Images/back.jpg";
import { LayoutTypes } from "./AppLayout.types";
const AppLayout = ({ children }: LayoutTypes) => {
  return (
    <div className="flex justify-center items-center">
      <img
        src={KoroushMallBackground}
        className="hidden lg:block lg:fixed top-0 left-0 right-0 bottom-0 lg:w-screen lg:h-screen z-0"
        alt="koroshmall-backimg"
      />
      <div className="lg:fixed w-screen h-screen top-14 lg:h-4/5 lg:w-11/12  bg-white lg:z-10">
        <div className="lg:grid lg:grid-cols-5 gap-6 md:overflow-x-hidden h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
