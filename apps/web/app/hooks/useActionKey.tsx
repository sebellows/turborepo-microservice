import { useState, useEffect } from "react";

const ACTION_KEY_DEFAULT = ["Ctrl ", "Control"];
const ACTION_KEY_APPLE = ["⌘", "Command"];

export function useActionKey() {
  let [actionKey, setActionKey] = useState(ACTION_KEY_DEFAULT);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
        setActionKey(ACTION_KEY_APPLE);
      } else {
        setActionKey(ACTION_KEY_DEFAULT);
      }
    }
  }, []);

  return actionKey;
}
