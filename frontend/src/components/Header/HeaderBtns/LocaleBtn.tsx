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
import { FC } from "react";

const LocaleBtn: FC = props => {
  const router = useRouter();
  const { t, locale, localeNameMap, localeFlagMap } = useLocales();
  const currentFlag = <Image src={`${router.basePath}/${t("flagUrl")}`} w={4} />;

  return (
    <Menu>
      <MenuButton as={IconButton} isRound={true} size="sm" icon={currentFlag}></MenuButton>
      <MenuList minW="0">
        {localeFlagMap &&
          localeNameMap &&
          Object.entries(localeFlagMap).map(([id, flagUrl]) => (
            <MenuItem key={id}>
              <Link href={router.route} locale={id}>
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
