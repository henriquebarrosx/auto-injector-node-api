export async function promiseResolver<T>(promise: Promise<T>) {
  return promise
    .then((data) => [null, data])
    .catch((error) => [error, null]);
}