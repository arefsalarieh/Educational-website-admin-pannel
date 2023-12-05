import { Card, Spinner } from "reactstrap";

const ProjSpinner = () => {
  return (
    <Card className="w-100 d-flex align-items-center justify-content-center" style={{height: "300px"}}>
      <Spinner className="me-25"/>
    </Card>
  );
};
export default ProjSpinner;
