import { IconButton } from "@chakra-ui/button";
import { Box, Center, HStack, Stack, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineFilePdf } from "react-icons/ai";
import { BiX } from "react-icons/bi";

interface Props {
  file: File;
  setFile: (file: File) => void;
}

const DropZone: FC<Props> = ({ file, setFile }) => {
  const { t } = useLocales();

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
      {file == null ? (
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
            <Text>{file.name}</Text>
            <Tooltip label={t("actions.delete")}>
              <IconButton
                aria-label="delete"
                icon={<BiX color="red" />}
                variant="ghost"
                size="sm"
                isRound={true}
                onClick={e => setFile(null)}
              />
            </Tooltip>
          </HStack>
        </Center>
      )}
    </>
  );
};
export default DropZone;
