import React from "react";
import { Card, CardText, CardBody, Row, Col, CardTitle } from "reactstrap";

export const PropertyCard = ({ property, deleteBtn, editBtn, titleLink }) => {
  return (
    <div>
      <Card className="m-2">
        <CardBody>
          <CardTitle>{titleLink}</CardTitle>
        </CardBody>
        <img
          width="100%"
          src={require("../../../img/house.jpg")}
          alt="Card image cap"
        />
        <Row>
          <Col>{editBtn}</Col>
          <Col>{deleteBtn}</Col>
        </Row>
      </Card>
    </div>
  );
};
