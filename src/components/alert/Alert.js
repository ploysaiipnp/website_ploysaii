import Swal from "sweetalert2";

const COLOR = {
  primary: "#f87198",
};
export const AlertError = ({
  text = " ",
  title = "ไม่สามารถดำเนินการได้!",
  confirmButtonText = "ตกลง",
  onOk = () => {},
}) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "error",
    confirmButtonText,
    confirmButtonColor: COLOR.primary,
    allowOutsideClick: false, // Prevent clicking outside the modal to close
    allowEscapeKey: false, // Prevent pressing escape key to close
  }).then((result) => {
    if (result.isConfirmed) {
      onOk();
    }
  });
};
export const AlertWarning = ({
  text = " ",
  title = "ไม่สามารถดำเนินการได้!",
  confirmButtonText = "ตกลง",
  onOk = () => {},
}) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    confirmButtonText,
    confirmButtonColor: COLOR.primary,
    allowOutsideClick: false, // Prevent clicking outside the modal to close
    allowEscapeKey: false, // Prevent pressing escape key to close
  }).then((result) => {
    if (result.isConfirmed) {
      onOk();
    }
  });
};
export const AlertSuccess = ({
  text = " ",
  title = "ดำเนินการสำเร็จ!",
  confirmButtonText = "ตกลง",
  onOk = () => {},
}) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "success",
    confirmButtonText,
    confirmButtonColor: COLOR.primary,
    allowOutsideClick: false, // Prevent clicking outside the modal to close
    allowEscapeKey: false, // Prevent pressing escape key to close
  }).then((result) => {
    if (result.isConfirmed) {
      onOk();
    }
  });
};

export const AlertConfirm = ({
  text = "คุณต้องการทำรายการหรือไม่",
  title = "ยืนยันการทำรายการ",
  onOk = () => {},
  confirmButtonText = "ตกลง",
  cancelButtonText = "ยกเลิก",
}) => {
  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: COLOR.primary,
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      onOk();
    }
  });
};

export const AlertLoading = ({ title = "กรุณารอสักครู่...", text = " " }) => {
  Swal.fire({
    title,
    text,
    timerProgressBar: true,
    allowOutsideClick: false, // Prevent clicking outside the modal to close
    allowEscapeKey: false, // Prevent pressing escape key to close
    showConfirmButton: false, // Hide the confirm button
    didOpen: () => {
      Swal.showLoading();
    },
    willClose: () => true,
  }).then((result) => {
    /* Read more about handling dismissals below */
  });
};

export const AlertClosed = () => {
  Swal.close();
};
