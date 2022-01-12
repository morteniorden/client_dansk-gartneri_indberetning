import { Button, ButtonGroup } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { FC, useContext } from "react";
import { RoleEnum } from "services/backend/nswagts";

const Navbar: FC = () => {
  const { t } = useLocales();
  const { activeUser } = useContext(AuthContext);

  return (
    <>
      {activeUser && (
        <ButtonGroup spacing={5}>
          {activeUser.role == RoleEnum.Admin ? (
            <>
              <Link href="/accounts" passHref>
                <Button variant="link" textColor="white">
                  Kunder
                </Button>
              </Link>
              <Link href="/admins" passHref>
                <Button variant="link" textColor="white">
                  Admins
                </Button>
              </Link>
              <Link href="/statementinfo" passHref>
                <Button variant="link" textColor="white">
                  Skemaer
                </Button>
              </Link>
              <Link href="/editemails" passHref>
                <Button variant="link" textColor="white">
                  Emails
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/mystatements" passHref>
                <Button variant="link" textColor="white">
                  Indberetninger
                </Button>
              </Link>
            </>
          )}
        </ButtonGroup>
      )}
    </>
  );
};
export default Navbar;
