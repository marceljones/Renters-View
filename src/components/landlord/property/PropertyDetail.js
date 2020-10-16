import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "./PropertyProvider";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "reactstrap";

export const PropertyDetail = () => {
  const { getPropertyById } = useContext(PropertyContext);
  const [property, setProperty] = useState({});
  const [tenant, setTenant] = useState({});

  const { propertyId } = useParams();

  useEffect(() => {
    getPropertyById(propertyId).then((response) => {
      setProperty(response);
      setTenant(response.tenant);
    });
  }, []);
  return (
    <article className="container">
      <h1 className="display-3">{property.street}</h1>
      <h1 className="display-3">
        {property.city}
        {property.state} {property.zip}
      </h1>
      <img
        width="50%"
        src={require("../../../img/house.jpg")}
        alt="Card image cap"
      />

      <Row>
        <Col>
          <h3 className="display-5">Current Tenant</h3>
          <p>
            Tenant: {tenant.firstName} {tenant.lastName}
          </p>
          <p>Email: {tenant.email}</p>
          <p>Phone: {tenant.phone}</p>
        </Col>
        <Col>
          <h3 className="display-5">Payment Information</h3>
          <p>
            Lease Type:{" "}
            {property.leaseTerm ? ` ${property.leaseTerm}` : " None"}
          </p>
          <p>
            Rent amount:{" "}
            {property.rentAmount
              ? ` ${property.rentAmount} due on ${property.paymentDay} in the Amount of $${property.lastPaymentAmount}`
              : " None"}
          </p>
          <p>
            Secuirty Desposit:{" "}
            {property.secuirtyDesposit
              ? ` ${property.secuirtyDesposit}`
              : " None"}
          </p>
          <p>
            Lease State Date:{" "}
            {property.leaseStartDate ? ` ${property.leaseStartDate}` : " None"}
          </p>
          <p>
            Lease End Date:{" "}
            {property.leaseEndDate ? ` ${property.leaseEndDate}` : " None"}
          </p>
        </Col>
      </Row>
      <h3 className="display-5">Maintenance History</h3>
    </article>
  );
};
