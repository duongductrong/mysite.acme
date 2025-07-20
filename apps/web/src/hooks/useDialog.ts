import { useMemo } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DialogState<TProps> {
  id: string;
  props: TProps;
}

interface DialogStoreState<TProps = unknown> {
  dialogs: DialogState<TProps>[];
  register: (state: DialogState<TProps>) => void;
  unregister: (id: string) => {};
}

const useDialogStore = create<DialogStoreState>()(
  devtools((set) => {
    return {
      dialogs: [],

      register(state) {
        set((prevState) => ({
          dialogs: [...(prevState.dialogs || []), state],
        }));
      },

      unregister(id: string) {
        set((prevState) => ({
          dialogs: prevState.dialogs.filter((dialog) => dialog.id !== id),
        }));
      },
    };
  })
);

export const useDialogRegistry = <TDialogProps>(id: string) => {
  const { register, unregister, dialogs } = useDialogStore();

  const open = (props: TDialogProps) => {
    register({
      id,
      props,
    });
  };

  const dismiss = () => unregister(id);

  const currentDialog = useMemo(
    () => dialogs.find((dialog) => dialog.id === id),
    [id, dialogs]
  );

  return {
    id: currentDialog?.id,
    dialog: {
      ...(currentDialog?.props as TDialogProps),
      show: !!currentDialog?.id,
    },
    open,
    dismiss,
  };
};

export const createDialogId = <T>(id: T) => id;
