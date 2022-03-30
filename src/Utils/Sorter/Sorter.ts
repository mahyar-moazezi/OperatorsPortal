export const sortOnListOrder = (result: any) => {
  return result.sort(function (a: any, b: any) {
    return a.List_Order - b.List_Order;
  });
};
export const sortOnId = (result: any) => {
  return result.sort(function (a: any, b: any) {
    return b.Id - a.Id;
  });
};
