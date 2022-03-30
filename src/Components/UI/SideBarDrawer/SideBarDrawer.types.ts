
export type SidebarDrawerTypes = {
  data?: any;
  title?: string;
  onClose: () => void;
  visible: boolean;
  sidebarItems?: { Id: number; Route: string; Title?: string; Icon_Id: number }[];
  sidebarIcons: any;
};
