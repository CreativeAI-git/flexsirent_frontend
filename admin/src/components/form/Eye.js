import React from "react";

const Eye = ({ isEye, onClick }) => {
    return (
        <div className="">
            <i
                className={`fa-solid ct_eye_show ct_text_op_07 ${!isEye ? "fa-eye-slash" : "fa-eye"}`}
                onClick={() => onClick(!isEye)}
            ></i>
        </div>
    );
};

export default Eye;