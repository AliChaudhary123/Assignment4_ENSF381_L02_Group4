import React, { useContext } from "react";
import DisplayStatus from "./DisplayStatus";
import { AuthContext } from "./LoginForm";

export default function AuthMessage() {
  const { status } = useContext(AuthContext);
  return (
    <div>
      {status.message && (
        <DisplayStatus type={status.type} message={status.message} />
      )}
    </div>
  );
}
