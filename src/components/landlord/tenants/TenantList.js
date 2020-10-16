import React, { useContext, useEffect, useState } from "react";
import { TenantContext } from "./TenantProvider";
import { TenantCard } from "./TenantCard";
import { parse } from "@fortawesome/fontawesome-svg-core";

export const TenantList = () => {
  const { getTenants, tenants } = useContext(TenantContext);
  const [filteredTenants, setFilteredTenants] = useState([]);

  useEffect(() => {
    getTenants();
  }, []);

  useEffect(() => {
    const subsetTenants = tenants.filter(
      (tenant) =>
        tenant.landlordId === parseInt(localStorage.landlord) && tenant.id !== 1
    );

    setFilteredTenants(subsetTenants);
  }, [tenants]);

  return (
    <div className="container d-flex justify-content-around">
      <div className="row wrap m-5">
        {filteredTenants.map((tenant) => {
          return <TenantCard key={tenant.id} tenant={tenant} />;
        })}
      </div>
    </div>
  );
};