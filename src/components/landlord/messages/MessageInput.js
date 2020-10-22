import React, { useContext, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { InputGroup, InputGroupAddon, Button, Input, Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./Message.css";

export const MessageInput = (reciever) => {
  const { addMessage } = useContext(MessageContext);

  const [message, setMessage] = useState({});

  //Controlled component
  const handleControlledInputChange = (event) => {
    const newMessage = { ...message };
    newMessage[event.target.name] = event.target.value;
    setMessage(newMessage);
  };

  const constructMessage = () => {
    const checkLandlord = Object.keys(localStorage);
    const checkTenant = Object.keys(localStorage);
    //if the user is a landlord add to database
    if (checkLandlord[0] === "landlord" && reciever.id) {
      addMessage({
        tenantId: reciever.id,
        landlordId: parseInt(localStorage.landlord),
        text: message.text.trim(),
        date: Date.now(),
        sender: "landlord",
      })
        //clear the message after its been sent
        .then((_) => {
          message.text = "";
        });
    } //if the user is a tenant
    if (checkTenant[0] === "tenant" && reciever) {
      addMessage({
        tenantId: parseInt(localStorage.tenant),
        landlordId: reciever.id,
        text: message.text.trim(),
        date: Date.now(),
        sender: "tenant",
      })
        //clear the message after its been sent
        .then((_) => {
          message.text = "";
        });
    }
  };

  return (
    <>
      <Form>
        <InputGroup>
          <Input
            className="messageTextInput"
            type="text"
            name="text"
            value={message.text}
            placeholder="Write message here ..."
            onChange={handleControlledInputChange}
          />
          {message.text ? (
            <InputGroupAddon addonType="append">
              <Button
                style={{ color: "darkcyan" }}
                color="link"
                onClick={(e) => {
                  e.preventDefault();
                  constructMessage();
                }}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </InputGroupAddon>
          ) : (
            <InputGroupAddon addonType="append">
              <Button style={{ color: "darkcyan" }} color="link" disabled>
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </InputGroupAddon>
          )}
        </InputGroup>
      </Form>
    </>
  );
};
