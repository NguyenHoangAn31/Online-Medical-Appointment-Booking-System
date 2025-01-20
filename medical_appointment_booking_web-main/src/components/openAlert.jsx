
import useNotification from "antd/es/notification/useNotification";


const openNotification = (api, type, message, description) => {
  api[type]({
    message: message,
    description: description
  });
};

const openAlert = () => {
  const [api, contextHolder] = useNotification();

  const customOpenNotification = (type, message, description) => {
    openNotification(api, type, message, description);
  };

  return [customOpenNotification, contextHolder];
};

export default openAlert;
