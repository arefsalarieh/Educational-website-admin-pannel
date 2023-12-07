import { Mail, Home, Airplay, Circle, List } from "react-feather";

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
      {
        id: "courdseList",
        title: "222لیست دوره ها",
        icon: <List  size={12} />,
        navLink: "/UsersList",
      },
    ],
  },
];
