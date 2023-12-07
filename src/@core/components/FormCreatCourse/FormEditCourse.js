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
import { Formik } from "formik";
import { useParams } from "react-router-dom";

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

  const handleReset = () => {
    reset({
      title: "",
      technology: "",
      status: "",
      level: "",
      type: "",
      term: "",
      capacity: "",
      describe: "",
    });
  };

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
    const res = await http.put(`/Course`, dataForm);
    return res;
  };

  const courseEdit = useParams();
  console.log(courseEdit);

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
        <Card>
          <CardHeader>
            <CardTitle tag="h4"> ویرایش دوره </CardTitle>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> عنوان </Label>
                  <Input
                    value={values.Title}
                    name="Title"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) => setFieldValue("Title", val.target.value)}
                    setInitialValues={courseEdit.Title}
                  />
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
                    setInitialValues={courseEdit.Title}
                  />
                </Col>
              </Row>
              <Row>
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
                    setInitialValues={courseEdit.MiniDescribe}
                  />
                </Col>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> ظرفیت </Label>
                  <Input
                    value={values.Capacity}
                    name="Capacity"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("Capacity", val.target.value)
                    }
                    setInitialValues={courseEdit.Capacity}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> نوع درس </Label>
                  <Input
                    value={values.CourseTypeId}
                    name="CourseTypeId"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("CourseTypeId", val.target.value)
                    }
                    setInitialValues={courseEdit.CourseTypeId}
                  />
                </Col>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> تعداد جلسه </Label>
                  <Input
                    value={values.SessionNumber}
                    name="SessionNumber"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("SessionNumber", val.target.value)
                    }
                    setInitialValues={courseEdit.SessionNumber}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> شماره پرداخت دوره جاری </Label>
                  <Input
                    value={values.CurrentCoursePaymentNumber}
                    name="CurrentCoursePaymentNumber"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue(
                        "CurrentCoursePaymentNumber",
                        val.target.value
                      )
                    }
                    setInitialValues={courseEdit.CurrentCoursePaymentNumber}
                  />
                </Col>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> ترم </Label>
                  <Input
                    value={values.TremId}
                    name="TremId"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("TremId", val.target.value)
                    }
                    setInitialValues={courseEdit.TremId}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> آی دی کلاس </Label>
                  <Input
                    value={values.ClassId}
                    name="ClassId"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("ClassId", val.target.value)
                    }
                    setInitialValues={courseEdit.ClassId}
                  />
                </Col>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> سطح دوره </Label>
                  <Input
                    value={values.CourseLvlId}
                    name="CourseLvlId"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("CourseLvlId", val.target.value)
                    }
                    setInitialValues={courseEdit.CourseLvlId}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> استاد آی دی </Label>
                  <Input
                    value={values.TeacherId}
                    name="TeacherId"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("TeacherId", val.target.value)
                    }
                    setInitialValues={courseEdit.TeacherId}
                  />
                </Col>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> قیمت </Label>
                  <Input
                    value={values.Cost}
                    name="Cost"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) => setFieldValue("Cost", val.target.value)}
                    setInitialValues={courseEdit.Cost}
                  />
                </Col>
              </Row>
              <Row>
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
                    setInitialValues={courseEdit.UniqeUrlString}
                  />
                </Col>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> عکس </Label>
                  <Input
                    value={values.Image}
                    name="Image"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) => setFieldValue("Image", val.target.value)}
                    setInitialValues={courseEdit.Image}
                  />
                </Col>
              </Row>
              <Row>
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
                    setInitialValues={courseEdit.StartTime}
                  />
                </Col>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> تاریخ پایان دوره </Label>
                  <Input
                    value={values.EndTime}
                    name="EndTime"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("EndTime", val.target.value)
                    }
                    setInitialValues={courseEdit.EndTime}
                  />
                </Col>
              </Row>
              <Row>
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
                    setInitialValues={courseEdit.GoogleSchema}
                  />
                </Col>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label">عنوان گوگل </Label>
                  <Input
                    value={values.GoogleTitle}
                    name="GoogleTitle"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("GoogleTitle", val.target.value)
                    }
                    setInitialValues={courseEdit.GoogleTitle}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> پیش نیاز دوره </Label>
                  <Input
                    value={values.CoursePrerequisiteId}
                    name="CoursePrerequisiteId"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("CoursePrerequisiteId", val.target.value)
                    }
                    setInitialValues={courseEdit.CoursePrerequisiteId}
                  />
                </Col>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> لینک کوتاه </Label>
                  <Input
                    value={values.ShortLink}
                    name="ShortLink"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("ShortLink", val.target.value)
                    }
                    setInitialValues={courseEdit.ShortLink}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> عکس کوچک </Label>
                  <Input
                    value={values.TumbImageAddress}
                    name="TumbImageAddress"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("TumbImageAddress", val.target.value)
                    }
                    setInitialValues={courseEdit.TumbImageAddress}
                  />
                </Col>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label"> آدرس عکس</Label>
                  <Input
                    value={values.ImageAddress}
                    name="ImageAddress"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(val) =>
                      setFieldValue("ImageAddress", val.target.value)
                    }
                    setInitialValues={courseEdit.ImageAddress}
                  />
                </Col>
              </Row>
            </form>
            <div className="d-flex">
              <Button className="me-1" color="primary" type="submit">
                ویرایش
              </Button>
              <Button
                outline
                color="secondary"
                type="reset"
                onClick={handleReset}
              >
                ریست
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </Formik>
  );
};

export default FormEditCourse;
