import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-navy group-[.toaster]:border-gray-100 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:font-semibold group-[.toaster]:p-4",
          description: "group-[.toast]:text-gray-500 text-xs",
          actionButton:
            "group-[.toast]:bg-saffron group-[.toast]:text-navy font-bold rounded-xl",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-600 rounded-xl",
          success: "group-[.toaster]:border-emerald-200 group-[.toaster]:bg-emerald-50/70",
          error: "group-[.toaster]:border-red-200 group-[.toaster]:bg-red-50/70",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
