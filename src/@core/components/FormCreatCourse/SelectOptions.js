// ** React Imports
import { useState } from "react";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Label,
  Input,
} from "reactstrap";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import axios from "axios";
import Select, { components } from "react-select"; // eslint-disable-line
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import AsyncSelect from "react-select/async";
import {
  File,
  Image,
  Figma,
  Globe,
  Slack,
  Chrome,
  GitHub,
  Gitlab,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  Dribbble,
  FileText,
  Instagram,
} from "react-feather";
import { useQuery } from "react-query";
import http from "../../interceptor";
import { ErrorMessage, useFormikContext } from "formik";

const colorOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isFixed: true },
  { value: "purple", label: "Purple", color: "#5243AA", isFixed: true },
  { value: "red", label: "Red", color: "#FF5630", isFixed: false },
  { value: "orange", label: "Orange", color: "#FF8B00", isFixed: false },
  { value: "yellow", label: "Yellow", color: "#FFC400", isFixed: false },
];

const groupedOptions = [
  {
    label: "Ice Creams",
    options: [
      { value: "vanilla", label: "Vanilla" },
      { value: "Dark Chocolate", label: "Dark Chocolate" },
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "salted-caramel", label: "Salted Caramel" },
    ],
  },
  {
    label: "Snacks",
    options: [
      { value: "Pizza", label: "Pizza" },
      { value: "Burger", label: "Burger" },
      { value: "Pasta", label: "Pasta" },
      { value: "Pretzel", label: "Pretzel" },
      { value: "Popcorn", label: "Popcorn" },
    ],
  },
];

const animatedComponents = makeAnimated();

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
};

const orderOptions = (values) => {
  if (values.length > 0)
    return values
      .filter((v) => v.isFixed)
      .concat(values.filter((v) => !v.isFixed));
};

const formatGroupLabel = (data) => (
  <div className="d-flex justify-content-between align-center">
    <strong>
      <span>{data.label}</span>
    </strong>
    <span>{data.options.length}</span>
  </div>
);

const SelectOptions = ({ values }) => {
  console.log(values);
  // ** State
  const [query, setQuery] = useState("");
  const [selectedDBVal, setSelectedDBVal] = useState(null);
  const [fixedValue, setFixedValue] = useState(
    orderOptions([colorOptions[0], colorOptions[1], colorOptions[3]])
  );

  const filterColors1 = (inputValue) => {
    return colorOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterColors1(inputValue));
    }, 2000);
  };

  const filterColors2 = (inputValue) => {
    return colorOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const fixedOnChange = (value, { action, removedValue }) => {
    switch (action) {
      case "remove-value":
      case "pop-value":
        if (removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        value = colorOptions.filter((v) => v.isFixed);
        break;
      default:
        break;
    }

    value = orderOptions(value);
    setFixedValue(value);
  };

  const handleInputChange = (newValue) => {
    const val = newValue.replace(/\W/g, "");
    return val;
  };

  const handleDBInputChange = (newValue) => {
    setQuery(newValue);
  };

  // handle selection
  const handleDBChange = (value) => {
    setSelectedDBVal(value);
  };

  const promiseOptions = (inputValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors2(inputValue));
      }, 2000);
    });
  };

  const loadOptionsDB = () => {
    return axios.get("/api/select/data", { query }).then((res) => {
      return res.data;
    });
  };

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
  const { setFieldValue } = useFormikContext();

  return (
    <Card>
      <CardBody>
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
              onChange={(val) => setFieldValue("Describe", val.target.value)}
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
              onChange={(val) => setFieldValue("TeacherId", val.target.value)}
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
              onChange={(val) => setFieldValue("Capacity", val.target.value)}
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
              onChange={(val) => setFieldValue("StartTime", val.target.value)}
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
              onChange={(val) => setFieldValue("EndTime", val.target.value)}
            />
            <ErrorMessage name="EndTime">
              {(errMsg) => {
                return <p className="text-danger">{errMsg}</p>
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
                return <p className="text-danger">{errMsg}</p>
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
              onChange={(val) => setFieldValue("GoogleTitle", val.target.value)}
            />
            <ErrorMessage name="GoogleTitle">
              {(errMsg) => {
                return <p className="text-danger">{errMsg}</p>
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
                return <p className="text-danger">{errMsg}</p>
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
                return <p className="text-danger">{errMsg}</p>
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
              onChange={(val) => setFieldValue("ShortLink", val.target.value)}
            />
            <ErrorMessage name="ShortLink">
              {(errMsg) => {
                return <p className="text-danger">{errMsg}</p>
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
                return <p className="text-danger">{errMsg}</p>
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
              onChange={(val) => setFieldValue("Cost", val.target.value)}
            />
            <ErrorMessage name="Cost">
              {(errMsg) => {
                return <p className="text-danger">{errMsg}</p>
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
                return <p className="text-danger">{errMsg}</p>
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
                return <p className="text-danger">{errMsg}</p>
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
                return <p className="text-danger">{errMsg}</p>
              }}
            </ErrorMessage>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default SelectOptions;
