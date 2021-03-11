import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback } from "react";
import { CVRDataDto, getDataFromCVR } from "services/cvr/api";

interface Props {
  cvrNumber: string;
  onClick: (data: CVRDataDto) => void;
}

const CvrButton: FC<Props> = ({ cvrNumber, onClick }) => {
  const { t } = useLocales();
  const toast = useToast();
  const handleGetFromCvr = useCallback(async () => {
    try {
      const result = await getDataFromCVR(cvrNumber);
      if (result != null) {
        onClick(result);
      }
    } catch {
      toast({
        title: t("accounts.CVR_apiErrorTitle"),
        description: t("accounts.CVR_apiErrorDescription"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  }, [onClick]);

  return (
    <Button onClick={handleGetFromCvr} variant="ghost" size="xs">
      {t("accounts.CVR_getFromRegistry")}
    </Button>
  );
};
export default CvrButton;
