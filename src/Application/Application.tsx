import AppLayout from "../Layout/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SidebarContainer from "../Container/SidebarContainer/SidebarContainer";
import { useQuery } from "react-query";
import { getSidebarItems } from "../Requests/GetSidebarItems/GetSidebarItems";
import BusinessUnitManagment from "../Pages/AdminKartable/BusinessUnitManagment/BusinessUnitManagment";
import { RecoilRoot } from "recoil";
import { sidebarIcons } from "../Components/UI/SidebarIcons/SidebarIcons";
import BeneficiaryUnitManagment from "../Pages/AdminKartable/BeneficiaryUnitManagment/BeneficiaryUnitManagment";
import BeneficiaryProfile from "../Pages/BeneficiaryKartable/BeneficiaryProfile/BeneficiaryProfile";
import { sortOnListOrder } from "../Utils/Sorter/Sorter";
import { getCurrentUser } from "../Requests/GetCurrentUser/GetCurrentUser";
import { getGenLookupItems } from "../Requests/GetGenLookup/GetGenLookup";

export const components: Record<number | string, JSX.Element> = {
  1: <h1>درحال توسعه</h1>,
  2: <h1>درحال توسعه</h1>,
  3: <BusinessUnitManagment title={"مدیریت واحد های تجاری"} />,
  4: <BeneficiaryUnitManagment title={"مدیریت بهره برداران"} />,
  5: <h1>درحال توسعه</h1>,
  6: <h1>درحال توسعه</h1>,
  7: <h1>درحال توسعه</h1>,
  8: <h1>درحال توسعه</h1>,
  9: <h1>درحال توسعه</h1>,
  10: <BeneficiaryProfile title={"پروفایل"} />,
  11: <h1>درحال توسعه</h1>,
  12: <h1>درحال توسعه</h1>,
};
const Application = () => {
  const { data: sidebarItems } = useQuery("getSidebarItems", getSidebarItems, {
    select: (data) => {
      return sortOnListOrder(data);
    },
    refetchOnWindowFocus: false,
  }); // دریافت اطلاعات سایدبار
  const { data: currentUser, isFetching: currentUserLoading } = useQuery(
    "getCurrentUser",
    getCurrentUser,
    {
      refetchOnWindowFocus: false,
    }
  );
  useQuery("getGenLookupItems", getGenLookupItems, {
    refetchOnWindowFocus: false,
  }); //دریافت اطلاعات مستر شده
  return (
    <>
      <AppLayout>
        <BrowserRouter>
          <SidebarContainer
            sidebarItems={sidebarItems}
            sidebarIcons={sidebarIcons}
          />
          <div className="h-screen lg:h-4/5 lg:col-span-4 p-3 overflow-y-scroll">
            <Routes>
              {sidebarItems?.map((item: any) => {
                const Element = (): JSX.Element => components[item.Component_Code];
                return (
                  <Route
                    key={item?.Route}
                    path={`/${item?.Route}`}
                    element={
                      <RecoilRoot>
                        <Element />
                      </RecoilRoot>
                    }
                  />
                );
              })}
            </Routes>
          </div>
        </BrowserRouter>
      </AppLayout>
    </>
  );
};

export default Application;
