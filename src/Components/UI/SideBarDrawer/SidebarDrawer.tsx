import { Drawer } from "antd";
import { SidebarDrawerTypes } from "./SideBarDrawer.types";
import KoroushMallLogo from "../../../Assets/Images/logo.png";
import { CloseOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const SideBarDrawer = ({
  sidebarItems,
  title,
  onClose,
  visible,
  sidebarIcons,
}: SidebarDrawerTypes) => {

  return (
    <>
      {visible ? (
        <>
          <div className="h-4/5  lg:hidden">
            <div className="site-drawer-render-in-current-wrapper">
              <Drawer
                title={title}
                placement="top"
                closable={true}
                closeIcon={
                  <div className="text-white">
                    <CloseOutlined />
                    <span>بستن</span>
                  </div>
                }
                onClose={onClose}
                visible={visible}
                getContainer={false}
                style={{
                  position: "absolute",
                  backgroundColor: "#bf3276",
                  minWidth: "320px",
                }}
                className="h-full"
              >
                <div className="flex justify-center flex-col items-center">
                  <img
                    src={KoroushMallLogo}
                    className="h-5/12 w-4/12"
                    alt="KoroushmallLogo"
                  />
                  <div className="flex flex-col justify-center items-center">
                    <ul className="list-none mt-10">
                      {sidebarItems?.map((i) => (
                        <li key={i.Id} className="m-5">
                          {" "}
                          <NavLink to={`/${i.Route}`}>
                            <span className="text-white mx-2">
                              {sidebarIcons[i.Icon_Id]}
                            </span>
                            <span className="text-white">{i.Title}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default SideBarDrawer;
