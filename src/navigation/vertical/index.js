import { Mail, Home, Airplay, Circle, FileText, List } from "react-feather";

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
    title: " دوره های آموزشی",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
      {
        id: "courdseList",
        title: "لیست دوره ها",
        icon: <List  size={12} />,
        navLink: "/CoursesList",
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
        title: "دانشجویان",
        icon: <Circle size={12} />,
        navLink: "/UsersList/StudentTable",
      }, 
      {
        id: "FreeUserTable",
        title: "  داوران",
        icon: <Circle size={12} />,
        navLink: "/UsersList/FreeUserTable",
      },
      {
        id: "MentorsTable",
        title: "  منتور ها",
        icon: <Circle size={12} />,
        navLink: "/UsersList/MentorsTable",
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
