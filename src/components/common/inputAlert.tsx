import React from "react";

export default function InputAlert({ message }: { message: string }) {
  return (
    <small className="text-red-500" role="alert">
      {message}
    </small>
  );
}
