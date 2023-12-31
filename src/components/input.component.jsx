import { useState } from "react";

const InputBox = ({ name, type, id, defaultValue, value, onChangeHandler, placeholder, icon }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className="relative w-[100%] mb-4">
            <input
                name={name}
                type={type === "password" ? (passwordVisible ? "text" : "password") : type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                onChange={onChangeHandler}
                id={id}
                className="input-box"
            />
            <i className={"icon " + icon + " input-icon"}></i>
            {type === "password" && (
                <i className="fi fi-rr-eye-crossed input-icon left-[auto] right-4 cursor-pointer" onClick={() => setPasswordVisible(currentVal => !currentVal)}></i>
            )}
        </div>
    );
};

export default InputBox;
