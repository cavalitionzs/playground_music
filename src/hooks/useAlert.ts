import { useState } from "react";

type AlertType = "danger" | "success";

type AlertState = {
  show: boolean;
  text: string;
  type: AlertType;
};

const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    text: "",
    type: "success",
  });

  const showAlert = (options: { text: string; type: AlertType; show?: boolean }) => {
    setAlert({
      show: options.show ?? true,
      text: options.text,
      type: options.type,
    });
  };

  const hideAlert = (value?: boolean) => {
    setAlert((prev) => ({
      ...prev,
      show: value === undefined ? false : value,
    }));
  };

  return { alert, showAlert, hideAlert };
};

export default useAlert;
