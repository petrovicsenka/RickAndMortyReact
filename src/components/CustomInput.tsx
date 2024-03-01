import { useState } from "react";
import { Input, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { CustomInputProps } from "../interfaces/CustomInputProps.interface";

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  name,
  rules,
  prefix,
  placeholder,
  value,
  onChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <Form.Item name={name} rules={rules}>
      <Input
        prefix={prefix}
        placeholder={placeholder}
        type={type === "password" && !isPasswordVisible ? "password" : "text"}
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        suffix={
          type === "password" ? (
            <>
              {isPasswordVisible ? (
                <EyeTwoTone onClick={togglePasswordVisibility} />
              ) : (
                <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
              )}
            </>
          ) : null
        }
      />
    </Form.Item>
  );
};

export default CustomInput;
