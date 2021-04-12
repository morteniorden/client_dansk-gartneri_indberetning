import {
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { useRouter } from "next/router";
import { VFC } from "react";

const LocaleBtn: VFC = () => {
  const router = useRouter();
  const { t, localeNameMap, localeFlagMap } = useLocales();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        isRound={true}
        size="sm"
        icon={<Image src={`${router.basePath}/${t("flagUrl")}`} w={4} />}
      />
      <MenuList minW="0">
        {localeFlagMap &&
          localeNameMap &&
          Object.entries(localeFlagMap).map(([id, flagUrl]) => (
            <MenuItem key={id}>
              <Link
                href={{
                  pathname: router.route,
                  query: router.query
                }}
                locale={id}
                passHref>
                <Flex>
                  <Text mr={3}>{localeNameMap[id]}</Text>
                  <Image src={`${router.basePath}/${flagUrl}`} w={4} />
                </Flex>
              </Link>
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};
export default LocaleBtn;
