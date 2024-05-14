import { useCallback } from "react";

import { useToast } from "@/components/ui/use-toast";

interface Error {
  code: string;
  detail: string;
  attr: string;
}

interface ErrorResponse {
  type: string;
  errors: Error[];
}

const useErrorToasts = () => {
  const { toast } = useToast();

  const handleErrorToasts = useCallback(
    (response: any) => {
      {
        response[1].forEach((error: string) => {
          toast({
            variant: "destructive",
            title: response[0] ? `Error with ${response[0]}` : "Error",
            description: error,
          });
        });
      }
    },
    [toast]
  );

  const handleMessageToast = useCallback(
    (response: any) => {
      {
        toast({
          variant: "destructive",
          title: response["message"] ?? "Error",
          description: "",
        });
      }
    },
    [toast]
  );

  const triggerErrorToasts = useCallback(
    (response: ErrorResponse) => {
      let errRes: Object | string = response;
      if (typeof response == "string") errRes = JSON.parse(response);
      // if (errRes.hasOwnProperty("errors")) {
      //   handleErrorToasts(errRes)
      // }
      // else if (errRes.hasOwnProperty("message")) {
      //   handleMessageToast(errRes)
      // }

      Object.entries(errRes).forEach((err) => handleErrorToasts(err));
    },
    [toast]
  );

  return { triggerErrorToasts };
};

export default useErrorToasts;
