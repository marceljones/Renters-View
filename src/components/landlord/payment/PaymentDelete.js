import React, { useContext } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Button, UncontrolledTooltip } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { PaymentContext } from "./PaymentProvider";

export const PaymentDelete = (paymentId) => {
  const { deletePayment } = useContext(PaymentContext);
  //taost when a payment is deleted
  const notify = () => {
    toast.error("Payment Deleted", {
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  //show confirm modal for delete
  const alert = () => {
    confirmAlert({
      title: "Delete Payment",
      message: `Are you sure you want to delete this payment?`,
      buttons: [
        {
          label: "Yes", //delete and show toast
          onClick: () => deletePayment(paymentId.id).then(() => notify()),
        },
        {
          label: "No", //close modal
        },
      ],
    });
  };

  return (
    <>
      <Button
        id="UncontrolledTool"
        color="link"
        style={{ color: "#fa2d2d" }}
        onClick={alert}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <UncontrolledTooltip placement="top" target="UncontrolledTool">
        Delete
      </UncontrolledTooltip>
    </>
  );
};
