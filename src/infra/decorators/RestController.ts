export function RestController(): ClassDecorator {
  return (target: Function) => {
    target.prototype.isRestController = true;
  };
}