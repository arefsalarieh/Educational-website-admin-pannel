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
  // Form,
  Label,
  Input,
  FormFeedback,
  Col,
} from "reactstrap";
import { useQuery } from "react-query";
import http from "../../interceptor";
import { Formik, Form, ErrorMessage, Field } from "formik";

const FormReserveCourse = () => {
  const validation = yup.object().shape({
    courseId: yup.string().required("لطفا درس برای رزرو مشخص کنید"),
    courseGroupId: yup.string().required("لطفا   گروه درسی را وارد نمایید"),
    studentId: yup.string().required("لطفادانشجویی که درس را رزر کردمشخص کنید"),
  });

  // ** Hooks
  const { reset } = useForm({ mode: "onChange" });

  const reseveCourseFnc = async (values) => {
    const reserveObj = {
      courseId: values.courseId,
      courseGroupId: values.courseGroupId,
      studentId: values.studentId,
    };
    console.log(reserveObj);
    const res = await http.post(
      `/CourseReserve/SendReserveToCourse`,
      reserveObj
    );
    refetch();
    return res;
  };

  {
    return (
      <Formik
        initialValues={{
          courseId: "",
          courseGroupId: "",
          studentId: "",
        }}
        validationSchema={validation}
        onSubmit={reseveCourseFnc}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4"> رزرو دوره </CardTitle>
              </CardHeader>
              <CardBody>
                <Col>
                  <div>
                    <Label className="form-label"> آی دی درس </Label>
                    <div>
                      <Field name="courseId">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text-area"
                              {...field}
                              placeholder="لطفا درس مربوطه را وارد کنید..."
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="courseId"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <Label className="form-label"> آی دی گروه </Label>
                    <div>
                      <Field name="courseGroupId">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text-area"
                              {...field}
                              placeholder="لطفا گروه درسی را وارد کنید..."
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="courseGroupId"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <Label className="form-label"> آی دی دانشجو </Label>
                    <div>
                      <Field name="studentId">
                        {({ field }) => (
                          <div>
                            <Input
                              type="text-area"
                              {...field}
                              placeholder="لطفا دانشجو را وارد کنید..."
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="studentId"
                        component={"p"}
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Col>
              </CardBody>
            </Card>
            <div className="d-flex mt-2">
              <Button className="me-1 " color="primary" type="submit">
                رزرو دوره
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
};

export default FormReserveCourse;
