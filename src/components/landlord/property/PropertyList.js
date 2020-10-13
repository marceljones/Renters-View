import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "./PropertyProvider";
import { PropertyCard } from "./PropertyCard";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import "./Property.css";

export const PropertyList = () => {
  const { properties, getProperties } = useContext(PropertyContext);
  const [filteredProperies, setFilterdProperties] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getProperties();
  }, []);

  useEffect(() => {
    const subsetProperties = properties.filter(
      (property) => property.landlordId === parseInt(localStorage.landlord)
    );
    setFilterdProperties(subsetProperties);
  }, [properties]);

  return (
    <>
      <Container>
        <h2>Properties</h2>
        <Button
          variant="contained"
          color="primary"
          className="button-primary"
          onClick={() => {
            history.push("/landlord/property");
          }}
        >
          Add Property
        </Button>
        <div className="properties row wrap">
          {filteredProperies.map((property) => {
            return <PropertyCard key={property.id} property={property} />;
          })}
        </div>
      </Container>
    </>
  );
};
