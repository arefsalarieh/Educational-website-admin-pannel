import { MoreVertical, Edit, Trash } from "react-feather";

import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
} from "reactstrap";
import http from "../../interceptor";
import { useQuery } from "react-query";
import CourseItem from "./CourseItem";
import { useNavigate } from "react-router-dom";

const TableCourses = () => {
  const getAllCourses = async () => {
    const result = await http.get(
      `/Course/CourseList?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=Expire&Query`
    );
    return result;
  };

  const { data, status } = useQuery("getAllCourses", getAllCourses);

  const navigate = useNavigate();

  return (
    <>
      <Button
        className="me-1 mb-4 mt-2"
        color="primary"
        type="submit"
        onClick={() => {
          navigate("/CreatCourse");
        }}
      >
        ایجاد دوره جدید
      </Button>

      <Table responsive>
        <thead>
          <tr>
            <th  className='text-nowrap '>نام دوره</th>
            <th  className='text-nowrap '>عنوان دوره</th>
            <th  className='text-nowrap '>سطح دوره</th>
            {/* <th  className='text-nowrap '>شماره کلاس</th> */}
            <th  className='text-nowrap '>وضعیت دوره</th>
            <th  className='text-nowrap '>نوع دوره</th>
            <th  className='text-nowrap '>قیمت</th>
            {/* <th>توضیحات </th> */}
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
                  // classRoomName={item.classRoomName}
                  levelName={item.levelName}
                  cost={item.cost}
                  title={item.title}
                  // describe={item.describe}
                />
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default TableCourses;
