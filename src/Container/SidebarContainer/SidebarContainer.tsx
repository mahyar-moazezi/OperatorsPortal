import { useState } from "react";
import Button from "antd-button-color";
import { MenuOutlined } from "@ant-design/icons";
import KoroushMallLogo from "../../Assets/Images/logo.png";
import SideBarDrawer from "../../Components/UI/SideBarDrawer/SidebarDrawer";
import { SidebarContainerTypes } from "./SidebarContainer.types";
import { NavLink } from "react-router-dom";
const SidebarContainer = ({ sidebarItems, sidebarIcons }: SidebarContainerTypes) => {
  const [show, setShow] = useState(false);
  const showDrawer = () => {
    setShow(true);
  };
  const onClose = () => {
    setShow(false);
  };

  return (
    <>
      <div className="h-screen lg:h-4/5 hidden lg:block">
        <div className="bg-roseColor h-full md:round hidden md:block">
          <div className="flex  justify-center">
            <img
              src={KoroushMallLogo}
              className="h-7/12 w-7/12 mt-4"
              alt="KoroushmallLogo"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <ul className="list-none mt-10">
              {sidebarItems?.map((i: any) => (
                <li key={i.Id} className="my-5 text-white">
                  <NavLink
                    to={`/${i.Route}`}
                    style={(isActive) => ({
                      color: isActive ? "white" : "blue",
                    })}
                  >
                    <span className="mx-2">{sidebarIcons[i.Icon_Id]}</span>
                    <span>{i.Title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className={
          "bg-roseColor sticky lg:hidden h-10 w-full flex justify-around items-center z-10"
        }
      >
        <div className="lg:hidden">
          <Button
            type={"default"}
            ghost={true}
            onClick={showDrawer}
            icon={<MenuOutlined className="text-white" />}
            style={{ backgroundColor: "transparent", border: "none" }}
          ></Button>
        </div>
      </div>
      <SideBarDrawer
        visible={show}
        onClose={onClose}
        sidebarItems={sidebarItems}
        sidebarIcons={sidebarIcons}
      />
    </>
  );
};
export default SidebarContainer;
