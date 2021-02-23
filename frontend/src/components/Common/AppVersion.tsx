import { Center, Code, useToast, VisuallyHidden } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo, useRef } from "react";

const AppVersion: FC = () => {
  const copyInput = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const router = useRouter();

  const copy = useCallback(() => {
    copyInput.current.select();
    copyInput.current.setSelectionRange(0, 99999);

    document.execCommand("copy");

    toast({
      title: "Client info copied!",
      description: "Your application and client information has been copied to your clipboard.",
      status: "info",
      duration: 4000,
      isClosable: true
    });
  }, []);

  const value = useMemo(() => {
    const _navigator: Record<string, unknown> = {};
    const _screen: Record<string, unknown> = {};
    for (const i in navigator) _navigator[i] = navigator[i as keyof Navigator];
    for (const i in screen) _screen[i] = screen[i as keyof Screen];
    return JSON.stringify({
      _navigator,
      _screen,
      _router: { ...router, components: undefined },
      _version: process.env.NEXT_PUBLIC_APP_VERSION,
      _user: {} // TODO implement getting the user from a hook
    });
  }, [router]);

  return (
    <Center>
      <Code colorScheme="black" variant="subtle" cursor="pointer" userSelect="none" onClick={copy}>
        App Version: {process.env.NEXT_PUBLIC_APP_VERSION}
      </Code>
      <VisuallyHidden>
        <input ref={copyInput} value={value} readOnly />
      </VisuallyHidden>
    </Center>
  );
};

export default AppVersion;
