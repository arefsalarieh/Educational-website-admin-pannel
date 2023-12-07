import { Mail, Home, Airplay, Circle, FileText } from "react-feather";

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
        title: " لیست کاربران",
        icon: <Circle size={12} />,
        navLink: "/UsersList/AllUsers",
      },
      {
        id: "CreateUser",
        title: "ایجاد کاربر جدید",
        icon: <Circle size={12} />,
        navLink: "/UsersList/CreateUser",
      },   
                       
    ],    
  },
  {
    id: "news",
    title: "اخبار",
    icon: <FileText size={20} />,
    // navLink: "/news",
    children: [
      {
        id: "invoiceList",
        title: "همه اخبار",
        icon: <Circle size={12} />,
        navLink: "/news",
      },
    ],
  },

  
];
