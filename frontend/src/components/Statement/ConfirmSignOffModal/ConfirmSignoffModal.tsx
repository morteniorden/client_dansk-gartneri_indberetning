import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure
} from "@chakra-ui/react";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, useContext, useMemo } from "react";

const ConfirmSignOffModal: FC = () => {
  const { buttonFont } = useColors();
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { statement, total } = useContext(EditStatementContext);

  const maxTotal = 100000;

  const disabled = useMemo(() => {
    return (
      (!statement.isApproved && total >= maxTotal) ||
      (statement.account.accountant != null && !statement.isApproved)
    );
  }, [statement, total, maxTotal]);

  const disabledMsg = useMemo(() => {
    if (disabled && statement.account.accountant == null && total >= maxTotal)
      return t("statements.signOffExceeding");
    if (disabled && statement.account.accountant != null && !statement.isApproved)
      return t("statements.signOffNeedsApproval");
    return null;
  }, [total, statement, disabled]);

  return (
    <>
      <Tooltip label={disabledMsg}>
        {/* wrapping div required to display tooltip when button is disabled */}
        <div>
          <Button
            rounded="full"
            colorScheme="blue"
            textColor={buttonFont}
            onClick={onOpen}
            disabled={disabled}>
            {t("statements.signOff")}
          </Button>
        </div>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("accounts.addAccount")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{t("statements.confirmSignOffText")}</Text>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button rounded="full" onClick={onClose}>
                {t("actions.back")}
              </Button>
              <Button colorScheme="green" rounded="full" type="submit" form="statement_form">
                {t("statements.confirmSignOffButton")}
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConfirmSignOffModal;
