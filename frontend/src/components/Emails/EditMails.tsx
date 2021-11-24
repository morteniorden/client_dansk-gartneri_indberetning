import { Button } from "@chakra-ui/button";
import { Divider, Flex, Heading, HStack, Stack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import BasicLayout from "components/Layouts/BasicLayout";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genMailClient } from "services/backend/apiClients";
import { EmailDto, IEmailDto, UpdateEmailCommand } from "services/backend/nswagts";
import { logger } from "utils/logger";

import EditEmailForm from "./EditEmailForm";
import PreviewModal from "./PreviewModal";

const EditEmails: FC = () => {
  const toast = useToast();
  const { t } = useLocales();
  const [emails, dispatchEmails] = useReducer(ListReducer<IEmailDto>("id"), []);
  const [currentMail, setCurrentMail] = useState<IEmailDto>(
    new EmailDto({
      id: 0,
      name: "",
      subject: "",
      heading1: "",
      heading2: "",
      heading3: "",
      paragraph1: "",
      paragraph2: "",
      paragraph3: "",
      ctaButtonText: ""
    })
  );
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const mailClient = await genMailClient();
      const data = await mailClient.getAllMails();
      console.log(data);

      if (data && data.length > 0)
        dispatchEmails({
          type: ListReducerActionType.AddOrUpdate,
          data
        });
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, []);

  useEffect(() => {
    async function asyncInnerEffect() {
      await fetchData();
      if (emails && emails.length > 0) setCurrentMail(emails[0]);
    }
    asyncInnerEffect();
  }, [fetchData]);

  const handleSave = useCallback(
    async (e: React.MouseEvent) => {
      setIsSaving(true);
      try {
        const mailClient = await genMailClient();
        await mailClient.updateEmail(
          currentMail.id,
          new UpdateEmailCommand({
            newEmail: currentMail
          })
        );
        toast({
          title: t("actions.saveSuccessTitle"),
          description: t("actions.saveSuccessText"),
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      } catch (e) {
        toast({
          title: t("actions.saveErrorTitle"),
          description: t("actions.saveErrorText"),
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      }
      await fetchData();
      setIsSaving(false);
    },
    [currentMail]
  );

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const mail = emails.find(m => m.id == Number(e.target.value));
      if (!mail) return;
      setCurrentMail(mail);
    },
    [emails]
  );

  return (
    <BasicLayout maxW="1500px">
      <Stack>
        <Heading mb={5}>{t("mailEditor.editEmails")}</Heading>
        <Flex justifyContent="space-between">
          <Select maxW="max-content" onChange={handleSelectChange}>
            {emails.map(mail => (
              <option key={mail.id} value={mail.id}>
                {mail.name}
              </option>
            ))}
          </Select>
          <HStack>
            <PreviewModal currentMail={currentMail} />
            <Button colorScheme="green" w="max-content" minW="100px" onClick={handleSave}>
              {isSaving ? <Spinner /> : "Gem"}
            </Button>
          </HStack>
        </Flex>
        <Divider mb={5} />
        <Stack>
          <EditEmailForm
            variant="endCTAButton"
            email={currentMail}
            setEmail={email => setCurrentMail(email)}
          />
        </Stack>
      </Stack>
    </BasicLayout>
  );
};
export default EditEmails;
