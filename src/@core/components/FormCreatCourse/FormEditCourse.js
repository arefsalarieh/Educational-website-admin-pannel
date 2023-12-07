// ** React Imports
import { Fragment } from "react";

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

const FormEditCourse = () => {
  const validation = yup.object().shape({
    title: yup.string().required("لطفا عنوان مورد نظر را وارد نمایید"),
    technology: yup.string().required("لطفا تکنولوژی یاد گیری را وارد نمایید"),
    status: yup.string().required("لطفا وضعیت  کلاس را مشخص کنید"),
    level: yup.string().required("لطفا سطح کلاس را وارد نمایید."),
    type: yup.string().required("لطفا نوع کلاس را مشخص کنید"),
    term: yup.string().required("لطفا ترم کلاس مربوطه را مشخص کنید"),
    capacity: yup.string().required("ظرفیت کلاس را مشخص کنید"),
    describe: yup.string().required("لطفا توضیحات  را وارد نمایید"),
  });

  // ** Hooks
  const { reset } = useForm({ mode: "onChange" });

  const [courseEdit, setCourseEdit] = useState({
    Title: "",
    Describe: "",
    MiniDescribe: "",
    Capacity: "",
    CourseTypeId: "",
    SessionNumber: "",
    CurrentCoursePaymentNumber: "",
    TremId: "",
    ClassId: "",
    CourseLvlId: "",
    TeacherId: "",
    Cost: "",
    UniqeUrlString: "",
    ShortLink: "",
    TumbImageAddress: "",
    ImageAddress: "",
  });

  const { id } = useParams();
  console.log(id);

  const getCourseInfo = async () => {
    const result = await http.get(`/Course/${id}`);
    console.log(result);
    if (result) setCourseEdit(result);
    return result;
  };

  console.log(courseEdit.Title);
  const editCourse = async (values) => {
    const dataForm = new FormData();

    const setCourses = {
      Id: values.Id,
      Title: values.Title,
      Describe: values.Describe,
      MiniDescribe: values.MiniDescribe,
      Capacity: values.Capacity,
      CourseTypeId: values.CourseTypeId,
      SessionNumber: values.SessionNumber,
      CurrentCoursePaymentNumber: values.CurrentCoursePaymentNumber,
      TremId: values.TremId,
      ClassId: values.ClassId,
      CourseLvlId: values.CourseLvlId,
      TeacherId: values.TeacherId,
      Cost: values.Cost,
      UniqeUrlString: values.UniqeUrlString,
      ShortLink: values.ShortLink,
      TumbImageAddress: values.TumbImageAddress,
      ImageAddress: values.ImageAddress,
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

  return (
    <Formik
      initialValues={{
        Id: "",
        Title: "",
        Describe: "",
        MiniDescribe: "",
        Capacity: "",
        CourseTypeId: "",
        SessionNumber: "",
        CurrentCoursePaymentNumber: "",
        TremId: "",
        ClassId: "",
        CourseLvlId: "",
        TeacherId: "",
        Cost: "",
        UniqeUrlString: "",
        ShortLink: "",
        TumbImageAddress: "",
        ImageAddress: "",
      }}
      validationSchema={validation}
      onSubmit={editCourse}
      enableReinitialize={true}
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
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
                              // value={values.Title}
                              className="react-select"
                              classNamePrefix="select"
                              // onChange={(val) => setFieldValue("Title", val.target.value)}
                              type="text"
                              {...field}
                              placeholder="عنوان را وارد کنید..."
                              setInitialValues={courseEdit.Title}
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
                    <Label className="form-label"> توضیحات </Label>
                    <div>
                      <Field name="Describe">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text-area"
                              {...field}
                              placeholder="لطفا توضیحات را وارد کنید..."
                              setInitialValues={courseEdit.Describe}
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
              </Row>
              <Row>
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
                              setInitialValues={courseEdit.MiniDescribe}
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
                              setInitialValues={courseEdit.Capacity}
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
                    <Label className="form-label"> نوع کلاس </Label>
                    <div>
                      <Field name="CourseTypeId">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder=" لطفا نوع کلاس را وارد نمایید..."
                              setInitialValues={courseEdit.CourseTypeId}
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
                              setInitialValues={courseEdit.SessionNumber}
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
                  <div>
                    <Label className="form-label">
                      شماره پرداخت دوره جاری{" "}
                    </Label>
                    <div>
                      <Field name="CurrentCoursePaymentNumber">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder=" شماره پرداخت جاری..."
                              setInitialValues={
                                courseEdit.CurrentCoursePaymentNumber
                              }
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="CurrentCoursePaymentNumber"
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
                            <Input
                              type="text"
                              {...field}
                              placeholder="ترم "
                              setInitialValues={courseEdit.TremId}
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
                    <Label className="form-label"> آی دی کلاس </Label>
                    <div>
                      <Field name="ClassId">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder="آی دی کلاس ..."
                              setInitialValues={courseEdit.ClassId}
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
                    <Label className="form-label"> عنوان </Label>
                    <div>
                      <Field name="CourseLvlId">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder=" سطح دوره"
                              setInitialValues={courseEdit.CourseLvlId}
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
              <Row>
                <Col>
                  <div className="fieldAdd">
                    <Label className="form-label"> آی دی استاد </Label>
                    <div>
                      <Field name="TeacherId">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder=" آی دی استاد"
                              setInitialValues={courseEdit.TeacherId}
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
                              setInitialValues={courseEdit.Cost}
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
                    <Label className="form-label"> یو آر ال </Label>
                    <div>
                      <Field name="UniqeUrlString">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder="یو آر ال ..."
                              setInitialValues={courseEdit.UniqeUrlString}
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
                    <Label className="form-label"> عنوان </Label>
                    <div>
                      <Field name="Image">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder="تصویر "
                              setInitialValues={courseEdit.Image}
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
                  <div className="fieldAdd">
                    <Label className="form-label"> شروع دوره </Label>
                    <div>
                      <Field name="StartTime">
                        {({ field }) => (
                          <div>
                            <Input
                              className="Input"
                              type="text"
                              {...field}
                              placeholder="شروع دوره "
                              setInitialValues={courseEdit.StartTime}
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
                    <Label className="form-label"> پایان دوره </Label>
                    <div>
                      <Field name="EndTime">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder="پایان دوره"
                              setInitialValues={courseEdit.EndTime}
                            />
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
                  <div className="fieldAdd">
                    <Label className="form-label"> شمای گوگل </Label>
                    <div>
                      <Field name="GoogleSchema">
                        {({ field }) => (
                          <div>
                            <Input
                              className="Input"
                              type="text"
                              {...field}
                              placeholder="شمای گوگل ..."
                              setInitialValues={courseEdit.GoogleSchema}
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="GoogleSchema"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <Label className="form-label"> گوگل عنوان </Label>
                    <div>
                      <Field name="GoogleTitle">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder=" عنوان گوگل"
                              setInitialValues={courseEdit.GoogleTitle}
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="GoogleTitle"
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
                    <Label className="form-label"> پیش نیاز دوره </Label>
                    <div>
                      <Field name="CoursePrerequisiteId">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder="پیش نیاز دوره"
                              setInitialValues={courseEdit.CoursePrerequisiteId}
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="CoursePrerequisiteId"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
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
                              setInitialValues={courseEdit.ShortLink}
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
                              setInitialValues={courseEdit.TumbImageAddress}
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
                    <Label className="form-label"> عکس </Label>
                    <div>
                      <Field name="ImageAddress">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text"
                              {...field}
                              placeholder=" عکس"
                              setInitialValues={courseEdit.ImageAddress}
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
              <div className="d-flex">
                <Button className="me-1" color="primary" type="submit">
                  ویرایش
                </Button>
                <Button outline color="secondary" type="reset">
                  ریست
                </Button>
              </div>
            </CardBody>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default FormEditCourse;
