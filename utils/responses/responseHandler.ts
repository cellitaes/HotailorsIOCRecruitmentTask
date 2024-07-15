import { HttpResponse } from "../../types/general/Response";

export const responseHandler: <T>(status: number, body: T) => HttpResponse = <
  T
>(
  status: number,
  body: T
): HttpResponse => {
  return {
    status,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };
};
