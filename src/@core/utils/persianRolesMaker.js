export const PersianRolesMaker = (string) => {
    if (string === "Administrator") return "ادمین";
    else if (string === "Teacher") return "استاد";
    else if (string === "Student") return "دانشجو";
    else if (string === "CourseAssistance") return "دستیار آموزش";
    else if (string === "Employee.Admin") return "دستیار ادمین";
    else if (string === "Employee.Writer") return "دستیار نویسنده";
    else if (string === "Referee") return "داور";
    else if (string === "TournamentAdmin") return "ادمین دوره";
    else if (string === "TournamentMentor") return "منتور";
  };