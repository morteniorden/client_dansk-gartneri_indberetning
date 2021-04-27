import { IconButton } from "@chakra-ui/button";
import { Center, HStack, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { FC, useCallback, useContext, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineFilePdf } from "react-icons/ai";
import { BiX } from "react-icons/bi";

interface Props {
  file: File;
  setFile: (file: File) => void;
}

const DropZone: FC<Props> = ({ file, setFile }) => {
  const { t } = useLocales();
  const { readonly } = useContext(EditStatementContext);

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop: onDrop,
    accept: ".pdf"
  });

  useEffect(() => {
    console.log(acceptedFiles);
  }, [acceptedFiles]);

  return (
    <>
      {file == null && !readonly ? (
        <div className="container">
          <Center
            {...getRootProps({ isDragActive })}
            p={5}
            borderWidth="2px"
            borderStyle="dashed"
            outline="none"
            borderColor={isDragActive || isFocused ? "blue.400" : "gray.200"}
            _hover={{ borderColor: "blue.400", cursor: "pointer" }}
            transition="border .24s ease-in-out">
            <input {...getInputProps()} />
            <Text>
              {isDragActive
                ? t("statements.accountantSection.dropFile")
                : t("statements.accountantSection.dragAndDrop")}
            </Text>
          </Center>
        </div>
      ) : (
        <Center p={5} borderWidth="2px">
          <HStack spacing={5}>
            <AiOutlineFilePdf size="30px" />
            {/* TODO: Make into a link, so that file can be downloaded */}
            {file && <Text>{file.name}</Text>}
            {!readonly && (
              <Tooltip label={t("actions.delete")}>
                <IconButton
                  aria-label="delete"
                  icon={<BiX color="red" />}
                  variant="ghost"
                  size="sm"
                  isRound={true}
                  disabled={readonly}
                  onClick={e => setFile(null)}
                />
              </Tooltip>
            )}
          </HStack>
        </Center>
      )}
    </>
  );
};
export default DropZone;
