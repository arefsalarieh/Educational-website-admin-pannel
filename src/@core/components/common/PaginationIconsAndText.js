// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

// ** Third Party Components
import ReactPaginate from "react-paginate";

const IconPagination = ({ total, apiParam, setApiParam }) => {
  const totalPage = Math.ceil(total / apiParam?.RowsOfPage);
  console.log("rows of page: ", apiParam?.RowsOfPage);
  console.log(totalPage);

  const pageChange = (event) => {
    const newOffset = (event.selected++ * 6) % total;
    console.log(
      `User requested page number ${event.selected++}, which is offset ${newOffset}`
    );
    setApiParam({ ...apiParam, PageNumber: newOffset });
  };
  return (
    <Card>
      <CardBody>
        <ReactPaginate
          nextLabel=""
          pageCount={totalPage}
          breakLabel="..."
          previousLabel=""
          pageRangeDisplayed={6}
          marginPagesDisplayed={3}
          activeClassName="active"
          pageClassName="page-item"
          breakClassName="page-item"
          nextLinkClassName="page-link"
          pageLinkClassName="page-link"
          nextClassName="page-item next"
          breakLinkClassName="page-link"
          previousLinkClassName="page-link"
          previousClassName="page-item prev"
          containerClassName="pagination react-paginate justify-content-center"
          onPageChange={(e) => pageChange(e)}
        />
      </CardBody>
    </Card>
  );
};
export default IconPagination;
