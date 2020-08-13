import React from "react";

export const XssComponent = ({ str }) => {
  const clickHandler = (str) => {
    alert(str);
  };
  return (
    <>
      <br />
      html文字: {str}
      <br />
      按鈕 (將字串植入 Click 行為):<button onClick={str}>{str}</button>
      <br />
      按鈕 (click 誘發 alert 行為，將資訊放在 alert 中):
      <button
        onClick={() => {
          clickHandler(str);
        }}
      >
        {str}
      </button>
      <br />
      將資訊放在圖片src路徑中:{" "}
      <img
        src={str}
        style={{ margin: "black", width: "200px", height: "200px" }}
      />
    </>
  );
};
