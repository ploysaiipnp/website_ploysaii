import axios from "axios";
import {
  AlertClosed,
  AlertError,
  AlertLoading,
} from "../components/alert/Alert";
import { URL_API } from "../utils";

export const onUploadFile = async ({ file }) => {
  try {
    AlertLoading({});
    const endPoint = `${URL_API}/fs/savefile`;
    const formData = new FormData();
    formData.append("img", file);

    const res = await axios.post(endPoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    AlertClosed();
    return res;
  } catch (error) {
    AlertClosed();
    AlertError({ text: `${error}` });
  }
};
