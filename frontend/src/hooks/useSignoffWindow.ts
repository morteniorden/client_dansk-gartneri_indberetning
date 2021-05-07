import { useToast } from "@chakra-ui/toast";
import { useCallback } from "react";
import { genStatementClient } from "services/backend/apiClients";

import { useLocales } from "./useLocales";

type SignoffHook = {
  openSignoffWindow: (url: string, caseFileId: number, statementId: number, cb: () => void) => void;
};

export const useSignoffWindow = (): SignoffHook => {
  const { t } = useLocales();
  const toast = useToast();

  const openSignoffWindow = useCallback(
    (url: string, caseFileId: number, statementId: number, cb: () => void) => {
      const h = window.top.innerHeight * 0.6;
      const w = window.top.innerWidth * 0.6;
      const y = window.top.innerHeight / 2 + window.top.screenY - h / 2;
      const x = window.top.innerWidth / 2 + window.top.screenX - w / 2;
      const win = window.open(
        url,
        "Signing",
        `width=${w}, height=${h}, left=${x}, top=${y}, toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes`
      );
      const id = setInterval(async function () {
        //Try/catch because this will throw a cors error every half second while still on the signing page
        try {
          if (
            win.closed ||
            win.location.href.indexOf("/signingSuccess") < 0 ||
            win.location.href.indexOf("/signingFailure") < 0
          ) {
            clearInterval(id);
            waitForSigningCompletion(win, caseFileId, statementId, cb);
          }
        } catch (error) {
          console.debug(error);
        }
      }, 500);
    },
    []
  );

  const waitForSigningCompletion = useCallback(
    async (window: Window, caseFileid: number, statementId: number, cb: () => void) => {
      try {
        const statementClient = await genStatementClient();
        let iterations = 0;
        const id = setInterval(async function () {
          iterations++;
          //Wait maximum 10 seconds, before stopping and displaying error
          if (iterations > 5) {
            clearInterval(id);
            window.close();
            toast({
              title: t("statements.ApproveErrorTitle"),
              description: t("statements.ApproveErrorText"),
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left"
            });
          }
          //Call backend to check if the caseFile has been signed
          const completed = await statementClient.checkIsSigned(statementId, caseFileid);
          if (completed) {
            clearInterval(id);
            window.close();
            toast({
              title: t("statements.ApproveSuccessTitle"),
              description: t("statements.ApproveSuccessText"),
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom-left"
            });
            //Call callback
            cb();
          }
        }, 2000);
      } catch (error) {
        window.close();
        console.error(error);
        toast({
          title: t("statements.ApproveSuccessTitle"),
          description: t("statements.ApproveSuccessText"),
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      }
    },
    []
  );

  return { openSignoffWindow };
};
