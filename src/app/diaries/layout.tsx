import React from "react";

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="flex-1">{children}</div>
      {modal}
    </div>
  );
}
