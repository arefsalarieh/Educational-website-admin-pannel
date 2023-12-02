import { Mail, Home, Airplay, Circle } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "smaplePage",
    title: "Sample Page",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
  {
    id: "UsersList",
    title: "کاربران",
    icon: <Home size={20} />,
    //navLink: "/UsersList",
    children: [
      {
        id: "AdminTable",
        title: "ادمین ها",
        icon: <Circle size={12} />,
        navLink: "/UsersList/AdminTable",
      },
      {
        id: "TeacherTable",
        title: "مدرسان",
        icon: <Circle size={12} />,
        navLink: "/UsersList/TeacherTable",
      },   
      {
        id: "StudentTable",
        title: "دانش جو",
        icon: <Circle size={12} />,
        navLink: "/UsersList/StudentTable",
      },            
    ],    
  },

  
];
