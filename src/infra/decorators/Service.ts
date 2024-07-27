export function Service(): ClassDecorator {
  return (target: Function) => {
    target.prototype.isService = true;
  };
}