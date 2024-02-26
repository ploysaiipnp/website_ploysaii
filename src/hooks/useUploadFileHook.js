import { useState } from "react";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// Hook
const useUploadFileHook = (option) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (option?.insidePreviewOpen) {
      option.insidePreviewOpen();
    }
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    if (option?.insideHandleChange) {
      option.insideHandleChange();
    }
    setFileList(newFileList);
  };

  const handleCancel = () => {
    if (option?.insideHandleCancel) {
      option.insideHandleCancel();
    }
    setPreviewOpen(false);
  };

  const handleClearImage = () => {
    setFileList([]);
    setPreviewImage("");
  };

  return {
    previewOpen,
    previewImage,
    previewTitle,
    fileList,
    handlePreview,
    handleChange,
    handleCancel,
    handleClearImage,
  };
};

export default useUploadFileHook;
