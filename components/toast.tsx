import toast from "react-hot-toast";

export const toastSuccess = (message: string) => toast.success(message);
export const toastError = (message: string) => toast.error(message)
// export const toastPromise = (message: string) => toast.promise(
//     saveSettings(settings),
//      {
//        loading: 'Saving...',
//        success: <b>Settings saved!</b>,
//        error: <b>Could not save.</b>,
//      }
//    );
