import React from "react";
import { Label } from "semantic-ui-react";

export default function(props) {
  return (
    <div className="d-flex justify-content-between">
      <p style={{ color: "black" }} className="m-0">
        Recipient:
      </p>
      <Label
        className="w-100"
        as="a"
        image
        style={{ backgroundColor: "#007bff" }}
      >
        <img src="https://react.semantic-ui.com//assets/images/avatar/large/steve.jpg" />
        Steve Sanders
      </Label>
    </div>
  );
}
