import React, { useState } from "react";
import UseAnimations from "react-useanimations";
import checkbox from "react-useanimations/lib/checkBox";

type CheckBoxProps = {
  isChecked?: boolean;
  onChange?: (status: boolean) => void;
};
const Checkbox = ({ isChecked = false, onChange }: CheckBoxProps) => {
  const [checked, setChecked] = useState<boolean>(isChecked);

  return (
    <div className="  flex justify-center items-center    ">
      <UseAnimations
        reverse={checked}
        onClick={() => {
          setChecked(!checked);
          setTimeout(() => {
            onChange && onChange(!checked);
          }, 1000);
        }}
        size={24}
        wrapperStyle={{ marginTop: "5px" }}
        animation={checkbox}
      />
    </div>
  );
};

export default Checkbox;
