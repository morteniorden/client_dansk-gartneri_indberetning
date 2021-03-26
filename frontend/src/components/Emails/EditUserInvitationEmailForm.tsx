import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
  Textarea
} from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { setAuthToken } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';

interface Props {}

const EditUserInvitatinoEmailForm: FC<Props> = ({}) => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);

  const handleSubmit = useCallback((e: React.FormEvent) => {}, []);

  return (
    <Editor
         initialValue="<p>This is the initial content of the editor</p>"
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
         onEditorChange={this.handleEditorChange}
       />
  );
};
export default EditUserInvitatinoEmailForm;
/*
<form onSubmit={handleSubmit}>
      <Heading>Afsnit 1</Heading>
      <FormControl id="h1">
        <FormLabel>Overskrift</FormLabel>
        <Input htmlFor="h1"></Input>
      </FormControl>
      <FormControl id="p1">
        <Textarea htmlFor="p1"></Textarea>
      </FormControl>
      <Heading>Afsnit 2</Heading>
      <FormControl id="h2">
        <FormLabel>Overskrift</FormLabel>
        <Input htmlFor="h2"></Input>
      </FormControl>
      <FormControl id="p2">
        <Textarea htmlFor="p2"></Textarea>
      </FormControl>
      <Heading>Afsnit 3</Heading>
      <FormControl id="h3">
        <FormLabel>Overskrift</FormLabel>
        <Input htmlFor="h3"></Input>
      </FormControl>
      <FormControl id="p3">
        <Textarea htmlFor="p3"></Textarea>
      </FormControl>
      <Button type="submit">Gem</Button>
    </form>
*/