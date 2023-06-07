import { hasOwn } from "./hasOwn";

export const classNames = (...args: any[]) => {
  let classes = [];

  for (let arg of args) {
    if (!arg) continue;

    const type = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();

    switch (type) {
      case "string":
      case "number":
        classes.push(arg);
        break;
      case "array":
        if (arg.length) {
          let inner = classNames.apply(null, arg);
          if (inner) {
            classes.push(inner);
          }
        }
        break;
      case "object":
        for (let key in arg) {
          if (hasOwn(arg, key, true)) {
            classes.push(key);
          }
        }

        break;
    }
  }

  return classes.join(" ");
};
