// ** React Imports
import { Fragment, useEffect } from "react";

// ** Third Party Components
import * as yup from "yup";
import toast from "react-hot-toast";
import { Check } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Form,
  Label,
  Input,
  FormFeedback,
  Col,
  Row,
} from "reactstrap";

import http from "../../interceptor";
import { ErrorMessage, Field, Formik } from "formik";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import { Select } from "antd";
import { Title } from "chart.js";

const FormEditCourse = () => {
  const validation = yup.object().shape({
    Title: yup.string().required("لطفا عنوان مورد نظر را وارد نمایید"),
    MiniDescribe: yup.string().required("لطفا مینی توضیحاترا وارد نمایید"),
    SessionNumber: yup.string().required("لطفا تعداد جلسات  کلاس را مشخص کنید"),
    CourseLvlId: yup.string().required("لطفا سطح کلاس را وارد نمایید."),
    CourseTypeId: yup.string().required("لطفا نوع کلاس را مشخص کنید"),
    TremId: yup.string().required("لطفا ترم کلاس مربوطه را مشخص کنید"),
    Capacity: yup.string().required("ظرفیت کلاس را مشخص کنید"),
    Describe: yup.string().required("لطفا توضیحات  را وارد نمایید"),
    SessionNumber: yup.string().required("لطفا شماره کلاس  را وارد نمایید"),
    ClassId: yup.string().required("لطفا آی دی کلاس  را وارد نمایید"),
    TeacherId: yup.string().required("لطفا آی دی استاد  را وارد نمایید"),
    Cost: yup.string().required("لطفا قیمت  را وارد نمایید"),
    UniqeUrlString: yup
      .string()
      .required("لطفا رشته ای که تکراری نباشد وارد کنید"),
    ShortLink: yup.string().required("لطفا لینک کوتاه  را وارد نمایید"),
    TumbImageAddress: yup.string().required("لطفا عکس کوچک  را وارد نمایید"),
    ImageAddress: yup.string().required("لطفا آدرس عکس  را وارد نمایید"),
    Image: yup.string().required("لطفا  تصویر  را وارد نمایید"),
    StartTime: yup.string().required("تاریخ شروع وارد شود"),
    EndTime: yup.string().required("تاریخ پایان وارد شود"),
    // courseStatus: yup.string().required("لطفا وضعیت  کلاس را مشخص کنید"),
    // technology: yup
    //   .string()
    //   .required("لطفا تکنولوژی یاد گیری را وارد نمایید"),
  });

  // // ** Hooks
  // const { reset } = useForm({ mode: "onChange" });

  const [courseEdit, setCourseEdit] = useState({
    Title: "",
    Describe: "",
    MiniDescribe: "",
    Capacity: "",
    CourseTypeId: "",
    SessionNumber: "",
    TremId: "",
    ClassId: "",
    CourseLvlId: "",
    TeacherId: "",
    Cost: "",
    UniqeUrlString: "",
    ShortLink: "",
    TumbImageAddress: "",
    ImageAddress: "",
    StartTime: "",
    EndTime: "",
  });

  const { id } = useParams();
  console.log(id);

  const getCourseInfo = async () => {
    const result = await http.get(`/Course/${id}`);
    return result;
  };
  const { data, status } = useQuery(["courseInfo", id], getCourseInfo);

  data && console.log(data);

  useEffect(() => {
    if (status === "success") {
      setCourseEdit({ ...data });
    }
  }, [status, data]);

  console.log(courseEdit);

  const [CourseLvlId, setCourseLvlId] = useState([]);
  const [CourseTypeId, setCourseType] = useState([]);
  const [ClassId, setClassRoom] = useState([]);
  const [TeacherId, setCourseTeach] = useState([]);
  const [TremId, setCourseTerm] = useState([]);
  // const [courseStatus, setStatus] = useState([]);
  // const [technology, setCoursetechnology] = useState([]);

  const getCourse = async () => {
    const result = await http.get(`/Course/GetEditCourse?CourseId=${id}`);
    console.log(result);

    setCourseType(
      result?.getCourseFor.courseTypeDtos?.map((m) => ({
        value: m.id,
        label: m.typeName,
      }))
    );
    setCourseLvlId(
      result?.getCourseFor.courseLevelDtos?.map((m) => ({
        value: m.id,
        label: m.levelName,
      }))
    );
    setClassRoom(
      result?.getCourseFor.classRoomDtos?.map((m) => ({
        value: m.id,
        label: m.classRoomName,
      }))
    );
    setCourseTeach(
      result?.getCourseFor.teachers?.map((m) => ({
        value: m.teacherId,
        label: m.fullName,
      }))
    );
    setCourseTerm(
      result?.getCourseFor.termDtos.map((m) => ({
        value: m.id,
        label: m.termName,
      }))
    );
    console.log(result);
    return result;
  };

  const { dataGet, statusGet } = useQuery("getCourse", getCourse);

  const editCourse = async (values) => {
    const dataForm = new FormData();

    const setCourses = {
      Id: id,
      Title: values.Title,
      Describe: values.Describe,
      MiniDescribe: values.MiniDescribe,
      Capacity: values.Capacity,
      CourseTypeId: values.CourseTypeId,
      SessionNumber: values.SessionNumber,
      CurrentCoursePaymentNumber: 0,
      TremId: values.TremId,
      ClassId: values.ClassId,
      CourseLvlId: values.CourseLvlId,
      TeacherId: values.TeacherId,
      Cost: values.Cost,
      UniqeUrlString: values.UniqeUrlString,
      ShortLink: values.ShortLink,
      TumbImageAddress: values.TumbImageAddress,
      ImageAddress: values.ImageAddress,
      StartTime: values.StartTime,
      EndTime: values.EndTime,
      EndTime: values.EndTime,
      CoursePrerequisiteId: "7b41aed7-2576-ee11-b6c7-ca6d3e095898",
    };
    const keys = Object.keys(setCourses);
    keys.forEach((key) => {
      const item = setCourses[key];
      dataForm.append(key, item);
      console.log(dataForm);
    });
    const res = await http.put(`/Course/`, dataForm);

    return res;
  };

  // useEffect(() => {
  //   refetch()
  // },[editCourse])

  return (
    <Formik
      initialValues={{
        Id: courseEdit.Id,
        Title: courseEdit?.title,
        Describe: courseEdit?.describe,
        MiniDescribe: courseEdit?.miniDescribe,
        Capacity: courseEdit?.capacity,
        CourseTypeId: courseEdit?.courseTypeId,
        SessionNumber: courseEdit?.sessionNumber,
        CurrentCoursePaymentNumber: 0,
        TremId: courseEdit?.tremId,
        ClassId: courseEdit?.classId,
        CourseLvlId: courseEdit?.courseLvlId,
        TeacherId: courseEdit?.teacherId,
        Cost: courseEdit.cost,
        UniqeUrlString: courseEdit?.uniqeUrlString,
        ShortLink: courseEdit.shortLink,
        TumbImageAddress: courseEdit?.tumbImageAddress,
        ImageAddress: courseEdit?.imageAddress,
        Image: courseEdit?.image,
        StartTime: courseEdit?.startTime,
        EndTime: courseEdit?.endTime,
        // technology:courseEdit?.techName,
        // courseStatus:courseEdit?.statusName,
      }}
      validationSchema={validation}
      onSubmit={editCourse}
      enableReinitialize={true}
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Card>
            <CardHeader className="mb-2 mt-2">
              <CardTitle tag="h4"> ویرایش دوره </CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <div>
                    <Label className="form-label"> عنوان </Label>
                    <div>
                      <Field name="Title">
                        {({ field }) => (
                          <div>
                            <Input
                              className="react-select"
                              classNamePrefix="select"
                              type="text"
                              {...field}
                              placeholder="عنوان را وارد کنید..."
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="Title"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <Label className="form-label">سطح دوره </Label>
                    <div>
                      <Field name="CourseLvlId">
                        {({ field }) => (
                          <div>
                            <Select
                              style={{ width: "480px", height: "40px" }}
                              options={CourseLvlId}
                              type="text"
                              {...field}
                              onChange={(val) =>
                                setFieldValue("CourseLvlId", val)
                              }
                              placeholder=" سطح دوره"
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="CourseLvlId"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row></Row>
              <Row>
                <Col>
                  <div>
                    <Label className="form-label"> نوع کلاس </Label>
                    <div>
                      <Field name="CourseTypeId">
                        {({ field }) => (
                          <div>
                            <Select
                              style={{ width: "480px", height: "40px" }}
                              options={CourseTypeId}
                              type="text"
                              {...field}
                              onChange={(val) =>
                                setFieldValue("CourseTypeId", val)
                              }
                              placeholder=" لطفا نوع کلاس را وارد نمایید..."
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="CourseTypeId"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <Label className="form-label"> تعداد جلسه </Label>
                    <div>
                      <Field name="SessionNumber">
                        {({ field }) => (
                          <div>
                            <Input
                              className="Input"
                              type="text"
                              {...field}
                              placeholder=" لطفا تعداد جلسه را وارد نمایید..."
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="SessionNumber"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="fieldAdd">
                    <Label className="form-label"> لینک کوتاه </Label>
                    <div>
                      <Field name="ShortLink">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder=" لینک کوتاه"
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="ShortLink"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <Label className="form-label"> ترم </Label>
                    <div>
                      <Field name="TremId">
                        {({ field }) => (
                          <div>
                            <Select
                              style={{ width: "480px", height: "40px" }}
                              options={TremId}
                              type="text"
                              {...field}
                              onChange={(val) => setFieldValue("TremId", val)}
                              placeholder="ترم "
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="TremId"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>
                    <Label className="form-label"> شماره کلاس </Label>
                    <div>
                      <Field name="ClassId">
                        {({ field }) => (
                          <div>
                            <Select
                              style={{ width: "480px", height: "40px" }}
                              options={ClassId}
                              {...field}
                              onChange={(val) => setFieldValue("ClassId", val)}
                              placeholder="شماره کلاس ..."
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="ClassId"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <Label className="form-label"> ظرفیت </Label>
                    <div>
                      <Field name="Capacity">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder="لطفا ظرفیت دوره مربوطه را وارد نمایید ..."
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="Capacity"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
               
              </Row>
              <Row>
                <Col>
                  <div>
                    <Label className="form-label">نام استاد </Label>
                    <div>
                      <Field name="TeacherId">
                        {({ field }) => (
                          <div>
                            <Select
                              style={{ width: "480px", height: "40px" }}
                              options={TeacherId}
                              {...field}
                              onChange={(val) =>
                                setFieldValue("TeacherId", val)
                              }
                              placeholder="  نام استاد..."
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="TeacherId"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="fieldAdd">
                    <Label className="form-label"> قیمت </Label>
                    <div>
                      <Field name="Cost">
                        {({ field }) => (
                          <div>
                            <Input
                              className="Input"
                              type="text"
                              {...field}
                              placeholder="قیمت  ..."
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="Cost"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>
                    <Label className="form-label"> رشته ی یکتا</Label>
                    <div>
                      <Field name="UniqeUrlString">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder=" رشته ای که تکراری نباشد وارد کنید  ..."
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="UniqeUrlString"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="fieldAdd">
                    <Label className="form-label"> تصویر </Label>
                    <div>
                      <Field name="Image">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder="تصویر "
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="Image"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
                
              </Row>
              <Row>
                <Col>
                  <div>
                    <Label className="form-label"> عکس کوچک شده </Label>
                    <div>
                      <Field name="TumbImageAddress">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder="عکس کوچک"
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="TumbImageAddress"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <Label className="form-label"> آدرس عکس </Label>
                    <div>
                      <Field name="ImageAddress">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder=" آدرس عکس"
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="ImageAddress"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
          
                <Col>
                  <div>
                    <Label className="form-label"> تاریخ شروع دوره</Label>
                    <div>
                      <Field name="StartTime">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder="عکس کوچک"
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="StartTime"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
                <Col>               
                  <div>
                    <Label className="form-label"> تاریخ پایان دوره </Label>
                    <div>
                      <Field name="EndTime">
                        {({ field }) => (
                          <div>
                            <Input type="text" {...field} placeholder=" عکس" />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="EndTime"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
             
                <Col>
                  <div>
                    <Label className="form-label"> توضیحات </Label>
                    <div>
                      <Field name="Describe">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text-area"
                              {...field}
                              placeholder="لطفا توضیحات را وارد کنید..."
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="Describe"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="fieldAdd">
                    <Label className="form-label"> مینی توضیحات </Label>
                    <div>
                      <Field name="MiniDescribe">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text-area"
                              {...field}
                              placeholder="مینی توضیحات را وارد نمایید ..."
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="MiniDescribe"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
               
              </Row>
              <div className="d-flex mt-2">
                <Button className="me-1 " color="primary" type="submit">
                  ویرایش
                </Button>
                {/* <Button outline color="secondary" type="reset">
                  ریست
                </Button> */}
              </div>
            </CardBody>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default FormEditCourse;
