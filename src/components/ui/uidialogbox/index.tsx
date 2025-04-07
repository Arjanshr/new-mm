import UIButton from "@/components/ui/uibutton";
import UIModal from "@/components/ui/uimodal";

export interface UIDialogBoxProps {
  cancel: () => void;
  confirm: () => void;
  title: string;
  message: string;

  cancelName?: string;
  confirmName?: string;
}

export default function UIDialogBox({
  cancel,
  confirm,
  message,
  title,
  cancelName,
  confirmName,
}: UIDialogBoxProps) {
  return (
    <UIModal onClose={cancel} showAnimation>
      <div className="flex flex-col gap-8 p-6 pb-8">
        <h2 className="text-primary text-xl font-semibold">{title}</h2>
        <p className="text-black text-base">{message}</p>
        <div className="flex justify-end gap-4">
          <UIButton
            label={confirmName ?? "Confirm"}
            type="primary"
            className="min-w-[18%] w-max"
            onClick={confirm}
          />
          <UIButton
            label={cancelName ?? "Cancel"}
            type="error"
            className="min-w-[18%] w-max"
            onClick={cancel}
          />
        </div>
      </div>
    </UIModal>
  );
}
