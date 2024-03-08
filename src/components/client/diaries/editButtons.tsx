import useRemoveMutation from "@/hooks/mutations/useRemoveMutation";
import React, { useState } from "react";

export default React.memo(function EditButton({
  isWrite,
  onCancel,
  onUpdate,
  onDelete,
}: {
  isWrite: boolean;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  onUpdate?: React.MouseEventHandler<HTMLButtonElement>;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const [confilmDelete, setConfilmDelete] = useState(false);
  return (
    <>
      {isWrite ? (
        <>
          <button
            data-tooltip-target="tooltip-update"
            className="h-fit px-2 border-l-2"
            title="취소"
            onClick={onCancel}
          >
            🔙
          </button>
        </>
      ) : (
        <>
          <button
            data-tooltip-target="tooltip-update"
            className="h-fit px-2"
            title="수정"
            onClick={onUpdate}
          >
            ✏️
          </button>
          {confilmDelete ? (
            <p>
              진짜로 지울거예요? <button onClick={onDelete}>예</button> /{" "}
              <button onClick={() => setConfilmDelete(false)}>아니오</button>
            </p>
          ) : (
            <button
              onClick={() => {
                setConfilmDelete(true);
              }}
              className="h-fit px-2 border-l-2"
              title="삭제"
            >
              ❌
            </button>
          )}
        </>
      )}
    </>
  );
});
