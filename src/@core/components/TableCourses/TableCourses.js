import { MoreVertical, Edit, Trash } from "react-feather";

import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import http from "../../interceptor";
import { useQuery } from "react-query";
import CourseItem from "./CourseItem";

const TableCourses = () => {


  const getAllCourses = async () =>{
    const result = await http.get(`/Course/CourseList?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=Expire&Query`)
    return result;
  }

  const {data , status} = useQuery("getAllCourses", getAllCourses);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>نام دوره</th>
          <th>عنوان دوره</th>
          <th>سطح دوره</th>
          <th>نام کلاس</th>
          <th>وضعیت دوره</th>
          <th>نوع دوره</th>
          <th>قیمت</th>
          {/* <th>فعال</th>
          <th>حذف</th>
          <th>منقضی</th> */}
          <th>توضیحات </th>
          {/* <th>عکس</th>
          <th>آی دی</th> */}
        </tr>
      </thead>
      <tbody>
        {status === "success" &&
          data.courseDtos.map((item, index) => {
            return (
              <CourseItem
                key={index}
                fullName={item.fullName}
                typeName={item.typeName}
                statusName={item.statusName}
                classRoomName={item.classRoomName}
                levelName={item.levelName}
                cost={item.cost}
                // isActive={item.isActive}
                // isdelete={item.isdelete}
                // isExpire={item.isExpire}
                title={item.title}
                describe={item.describe}
                // tumbImageAddress={item.tumbImageAddress}
                // lastUpdate={item.lastUpdate}
                // courseId={item.courseId}
              />
            );
          })}
      </tbody>
    </Table>
  );
};

export default TableCourses;
