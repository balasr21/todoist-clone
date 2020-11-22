import React from "react";
import { firebase } from "../firebase";

export const CheckBox = ({ id }) => {
  const archiveTask = () => {
    console.log(" Archive clicked");
    firebase.firestore().collection("tasks").doc(id).update({
      isArchived: true,
    });
  };

  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={(e) => {
        if (e.key === "Enter") archiveTask();
      }}
      role="button"
      tabIndex={0}
    >
      <span className="checkbox" />
    </div>
  );
};
