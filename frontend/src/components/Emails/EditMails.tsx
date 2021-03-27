import { Heading, Stack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import BasicLayout from "components/Layouts/BasicLayout";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genMailClient } from "services/backend/apiClients";
import { EmailDto, IEmailDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import EditorPage from "./Editor/EditorPage";

const EditEmails: FC = () => {
  const { t } = useLocales();
  const [emails, dispatchEmails] = useReducer(ListReducer<IEmailDto>("id"), []);
  const [currentMail, setCurrentMail] = useState<IEmailDto>(
    new EmailDto({
      id: 0,
      name: "",
      title: "",
      htmlContent: "",
      ctaButtonText: ""
    })
  );

  const fetchData = useCallback(async () => {
    try {
      const mailClient = await genMailClient();
      const data = await mailClient.getAllChildren();
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
    fetchData();
    if (emails && emails.length > 0) setCurrentMail(emails[0]);
  }, [fetchData]);

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const mail = emails.find(m => m.id == Number(e.target.value));
      if (mail) setCurrentMail(mail);
    },
    [emails]
  );

  useEffect(() => {
    //console.log(currentMail);
  }, [currentMail]);

  return (
    <BasicLayout>
      <Stack>
        <Heading>Edit email</Heading>
        <Select maxW="max-content" placeholder="Select option" onChange={handleSelectChange}>
          {emails.map(mail => (
            <option key={mail.id} value={mail.id}>
              {mail.name}
            </option>
          ))}
        </Select>
        <EditorPage emailDto={currentMail} />
      </Stack>
    </BasicLayout>
  );
};
export default EditEmails;
