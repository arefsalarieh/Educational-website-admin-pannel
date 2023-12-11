import { Mail, Home, Airplay, Circle, FileText , List } from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  // {
  //   id: "secondPage",
  //   title: "Second Page",
  //   icon: <Mail size={20} />,
  //   navLink: "/second-page",
  // },
  // {
  //   id: "smaplePage",
  //   title: " دوره های آموزشی",
  //   icon: <Airplay size={20} />,
  //   // navLink: "/sample",
  //   children: [
  //     {
  //       id: "invoiceList",
  //       title: "List",
  //       icon: <Circle size={12} />,
  //       navLink: "/apps/invoice/list",
  //     },
  //     {
  //       id: "courdseList",
  //       title: "لیست دوره ها",
  //       icon: <List size={12} />,
  //       navLink: "/CoursesList",
  //     },
  //   ],
  // },
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
    id: "CourseList",
    title: " دوره های آموزشی",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "courdseList",
        title: "لیست دوره ها",
        icon: <List  size={12} />,
        navLink: "/TableCourses",
      },
      {
        id: "createCOurse",
        title: " ایجاد دوره ",
        icon: <List  size={12} />,
        navLink: "/FormCreatCourse",
      },      
      // {
      //   id: "courdseList",
      //   title: "222لیست دوره ها",
      //   icon: <List  size={12} />,
      //   navLink: "/UsersList",
      // },
    ],
  },
  {
    id: "news",
    title: "اخبار",
    icon: <FileText size={20} />,
    // navLink: "/news",
    children: [
      {
        id: "getAllNews",
        title: "همه اخبار",
        icon: <Circle size={12} />,
        navLink: "/news",
      },
      {
        id: "addNews",
        title: "درج خبر",
        icon: <Circle size={12} />,
        navLink: "/addNews",
      },
    ],
  },
];
