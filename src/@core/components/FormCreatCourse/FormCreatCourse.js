// ** React Imports
import { Fragment, useState } from "react";

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
  // Form,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
} from "reactstrap";
import { useQuery } from "react-query";
import http from "../../interceptor";
import { Formik, Form, useFormikContext, ErrorMessage } from "formik";
import { Select } from "antd";
import { parse } from "postcss";
// import SelectOptions from "./SelectOptions";

const FormCreatCourse = () => {
  const validation = yup.object().shape({
    Title: yup.string().required("لطفا عنوان مورد نظر را وارد نمایید"),
    coursetechnol: yup
      .string()
      .required("لطفا تکنولوژی یاد گیری را وارد نمایید"),
    courseStatus: yup.string().required("لطفا وضعیت  کلاس را مشخص کنید"),
    courseLvl: yup.string().required("لطفا سطح دوره را وارد کنید"),
    courseType: yup.string().required("لطفا نوع دوره را انتخاب کنید"),
    courseterm: yup.string().required("لطفا ترم دوره را وارد کنید"),
    // Capacity: yup.required(),
    Describe: yup.string().required("لطفا توضیحات  را وارد نمایید"),
    courseroom: yup.string().required("رلطفا کلاس دوره را وارد کنید "),
    courseteach: yup.number().min(6).required("لطفاشماره استادرا مشخص کنید"),
    MiniDescribe: yup.string().required("لطفا مینی توضیح  را وارد نمایید."),
    TeacherId: yup.string().required("لطفاآی دی  را مشخص کنید"),
    StartTime: yup
      .date(" تاریخ شروع دوره نمیتواند از زمان حال کمتر باشد ")
      .required("لطفا تاریخ شروع دوره را وارد کنید"),
    EndTime: yup
      .date(" تاریخ پایان دوره نمیتواند از زمان شروع دوره کمتر باشد ")
      .required(" زمان پایان دوره را مشخص کنید"),
    GoogleSchema: yup.string().required("لطفا شمای گوگل  را وارد نمایید"),
    GoogleTitle: yup.string().required("لطفا عنوان کلاس را مشخص کنید"),
    ImageAddress: yup.string().required("لطفا آدرس عکس را مشخص کنید"),
    TumbImageAddress: yup.string().required(" عکس کوچک شده را مشخص کنید"),
    ShortLink: yup.string().required("لطفا لینک کوتاه  را وارد نمایید"),
    Image: yup.string().required("لطفا نوع کلاس را مشخص کنید"),
    Cost: yup.string().required("لطفا قیمت   را مشخص کنید"),
    SessionNumber: yup.string().required(" تعداد جلسات را مشخص کنید"),
    UniqeUrlString: yup.string().required("لطفا یوآر ال  را وارد نمایید"),
  });

  // ** Hooks
  const { reset } = useForm({ mode: "onChange" });

  const [courseLvl, setCourseLvl] = useState([]);
  const [courseType, setCourseType] = useState([]);
  const [courseStatus, setCourseStatus] = useState([]);
  const [courseroom, setCourseRoom] = useState([]);
  const [courseteach, setCourseTeach] = useState([]);
  const [courseterm, setCourseTerm] = useState([]);
  const [coursetechnol, setCourseTechnol] = useState([]);

  const getCreatCourse = async () => {
    const result = await http.get(`/Course/GetCreate`);

    setCourseType(
      result?.courseTypeDtos?.map((m) => ({ value: m.id, label: m.typeName }))
    );
    setCourseLvl(
      result?.courseLevelDtos?.map((m) => ({ value: m.id, label: m.levelName }))
    );
    setCourseStatus(
      result?.statusDtos?.map((m) => ({ value: m.id, label: m.statusName }))
    );
    setCourseRoom(
      result?.classRoomDtos?.map((m) => ({
        value: m.id,
        label: m.classRoomName,
      }))
    );
    setCourseTeach(
      result?.teachers?.map((m) => ({ value: m.userId, label: m.fullName }))
    );
    setCourseTerm(
      result?.termDtos?.map((m) => ({ value: m.id, label: m.termName }))
    );
    setCourseTechnol(
      result?.technologyDtos?.map((m) => ({ value: m.id, label: m.techName }))
    );

    return result;
  };

  const { data, status } = useQuery("getCreatCourse", getCreatCourse);

  const CreatCourse = async (values) => {
    const dataForm = new FormData();
    console.log(values);
    const setCourses = {
      Title: values.Title,
      Describe: values.Describe,
      MiniDescribe: values.MiniDescribe,
      Capacity: values.Capacity,
      courseType: Number(values.courseType),
      SessionNumber: values.SessionNumber,
      CurrentCoursePaymentNumber: 0,
      CoursePrerequisiteId: "7b41aed7-2576-ee11-b6c7-ca6d3e095898",
      courseterm: Number(values.courseterm),
      courseroom: Number(values.courseroom),
      courseLvl: Number(values.courseLvl),
      TeacherId: values.TeacherId,
      Cost: values.Cost,
      UniqeUrlString: values.UniqeUrlString,
      ShortLink: values.ShortLink,
      TumbImageAddress: values.TumbImageAddress,
      ImageAddress: values.ImageAddress,
      Image: values.Image,
    };
    const keys = Object.keys(setCourses);
    keys.forEach((key) => {
      const item = setCourses[key];
      dataForm.append(key, item);
      dataForm.courseType = Number(dataForm.courseType);
      console.log(dataForm);
    });
    const res = await http.post(`/Course`, dataForm);
    refetch();
    console.log(res);
    return res;
  };

  // const { setFieldValue } = useFormikContext();

  return (
    <Formik
      initialValues={{
        Title: "",
        coursetechnol: "",
        courseStatus: "",
        courseLvl: "",
        courseType: null,
        courseroom: "",
        courseroom: "",
        courseteach: "",
        courseterm: "",
        Describe: "",
        MiniDescribe: "",
        Capacity: "",
        SessionNumber: "",
        CurrentCoursePaymentNumber: "",
        Cost: "",
        StartTime: "",
        EndTime: "",
        GoogleSchema: "",
        GoogleTitle: "",
        CoursePrerequisiteId: "0",
        ShortLink: "",
        TumbImageAddress: "",
        ImageAddress: "",
        Image: "",
        UniqeUrlString: "",
        courseStatus: "",
      }}
      onSubmit={CreatCourse}
      validationSchema={validation}
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">ایجاد دوره جدید </CardTitle>
            </CardHeader>
            <CardBody>
              {/* <SelectOptions values={values} /> */}
              <Row>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> نوع کلاس </Label>
                  <Select
                    options={courseType}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) => setFieldValue("courseType", val)}
                  />
                  <ErrorMessage name="courseType">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> سطح دوره </Label>
                  <Select
                    options={courseLvl}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) => setFieldValue("courseLvl", val)}
                  />
                  <ErrorMessage name="courseLvl">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> وضعیت دوره </Label>
                  <Select
                    options={courseStatus}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) => setFieldValue("courseStatus", val)}
                  />
                  <option value={data?.id}></option>
                  <ErrorMessage name="courseStatus">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> شماره کلاس </Label>
                  <Select
                    options={courseroom}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) => setFieldValue("courseroom", val)}
                  />
                  <ErrorMessage name="courseroom">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> شماره استاد </Label>
                  <Select
                    options={courseteach}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) => setFieldValue("courseteach", val)}
                  />
                  <ErrorMessage name="courseteach">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> ترم </Label>
                  <Select
                    options={courseterm}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) => setFieldValue("courseterm", val)}
                  />
                  <ErrorMessage name="courseterm">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label">آموزش و یادگیری</Label>
                  <Select
                    options={coursetechnol}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) => setFieldValue("coursetechnol", val)}
                  />
                  <ErrorMessage name="coursetechnol">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> توضیحات </Label>
                  <Input
                    value={values.Describe}
                    name="Describe"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("Describe", val.target.value)
                    }
                  />
                  <ErrorMessage name="Describe">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> مینی توضیحات </Label>
                  <Input
                    value={values.MiniDescribe}
                    name="MiniDescribe"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("MiniDescribe", val.target.value)
                    }
                  />
                  <ErrorMessage name="MiniDescribe">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> آی دی استاد</Label>
                  <Input
                    value={values.TeacherId}
                    name="TeacherId"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("TeacherId", Number(val.target.value))
                    }
                  />
                  <ErrorMessage name="MiniDescribe">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> ظرفیت </Label>
                  <Input
                    value={values.Capacity}
                    name="Capacity"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("Capacity", Number(val.target.value))
                    }
                  />
                  <ErrorMessage name="Capacity">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> شروع دوره </Label>
                  <Input
                    value={values.StartTime}
                    name="StartTime"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("StartTime", val.target.value)
                    }
                  />
                  <ErrorMessage name="StartTime">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> پایان دوره </Label>
                  <Input
                    value={values.EndTime}
                    name="EndTime"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("EndTime", val.target.value)
                    }
                  />
                  <ErrorMessage name="EndTime">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> شمای گوگل </Label>
                  <Input
                    value={values.GoogleSchema}
                    name="GoogleSchema"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("GoogleSchema", val.target.value)
                    }
                  />
                  <ErrorMessage name="GoogleSchema">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> عنوان گوگل </Label>
                  <Input
                    value={values.GoogleTitle}
                    name="GoogleTitle"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("GoogleTitle", val.target.value)
                    }
                  />
                  <ErrorMessage name="GoogleTitle">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> آدرس عکس </Label>
                  <Input
                    value={values.ImageAddress}
                    name="ImageAddress"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("ImageAddress", val.target.value)
                    }
                  />
                  <ErrorMessage name="ImageAddress">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> آدرس عکس کوچک </Label>
                  <Input
                    value={values.TumbImageAddress}
                    name="TumbImageAddress"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("TumbImageAddress", val.target.value)
                    }
                  />
                  <ErrorMessage name="TumbImageAddress">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> لینک </Label>
                  <Input
                    value={values.ShortLink}
                    name="ShortLink"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("ShortLink", val.target.value)
                    }
                  />
                  <ErrorMessage name="ShortLink">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> عکس </Label>
                  <Input
                    value={values.Image}
                    name="Image"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) => setFieldValue("Image", val.target.value)}
                  />
                  <ErrorMessage name="Image">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> قیمت </Label>
                  <Input
                    value={values.Cost}
                    name="Cost"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("Cost", Number(val.target.value))
                    }
                  />
                  <ErrorMessage name="Cost">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> تعداد جلسات </Label>
                  <Input
                    value={values.SessionNumber}
                    name="SessionNumber"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("SessionNumber", val.target.value)
                    }
                  />
                  <ErrorMessage name="SessionNumber">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> یوآرال </Label>
                  <Input
                    value={values.UniqeUrlString}
                    name="UniqeUrlString"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("UniqeUrlString", val.target.value)
                    }
                  />
                  <ErrorMessage name="UniqeUrlString">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>

                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> عنوان دوره </Label>
                  <Input
                    value={values.Title}
                    name="Title"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) => setFieldValue("Title", val.target.value)}
                  />
                  <ErrorMessage name="Title">
                    {(errMsg) => {
                      return <p className="text-danger">{errMsg}</p>;
                    }}
                  </ErrorMessage>
                </Col>
              </Row>
              <div className="d-flex">
                <Button className="me-1" color="primary" type="submit">
                  اضافه کردن
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

export default FormCreatCourse;
