import React from 'react'
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import { Formik } from 'formik'

const UpdadeUsreRoles = ({roles}) => {

    console.log(roles);
  return (
    <div>
        <Formik>
            {({values , handleSubmit, handleChange , setFieldValue }) => (
                <form  onSubmit={handleSubmit}>

                </form>
            )}
        </Formik>
        <Row>
            <Col lg='3'>
                .cyii
            </Col>
        </Row>
    </div>
  )
}

export default UpdadeUsreRoles