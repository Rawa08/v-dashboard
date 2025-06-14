import toast from "react-hot-toast";

const showSuccess = (message: string) => toast.success(message);
const showError = (message: string) => toast.error(message);
const showLoading = (message: string) => toast.loading(message);

export { showSuccess, showError, showLoading};
