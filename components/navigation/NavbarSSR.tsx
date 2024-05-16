import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import NavRuleContent from "@/public/assets/content/Navbar/content.json";

import Navbar from "./Navbar";
import { AuthRoles } from "@/lib/constants/auth";

const NavbarSSR = async () => {
  let navPermanent = NavRuleContent.navbarPermanent;
  let navAdditional = NavRuleContent.navbarSpatialNotLoggedIn;
  let navUser;

  const session = await getServerSession(authOptions);

  if (session) {
    navAdditional = NavRuleContent.navbarSpatialLoggedIn;
    navUser = NavRuleContent.navbarUserAttendeeLoggedIn;
    if (session.user.profile.role == AuthRoles.moderator) {
      navAdditional = [
        ...NavRuleContent.navbarUserModeratorLoggedIn,
        ...NavRuleContent.navbarSpatialLoggedIn,
      ];
      navUser = [
        ...NavRuleContent.navbarUserModeratorLoggedIn,
        ...NavRuleContent.navbarUserAttendeeLoggedIn,
      ];
    }
  }

  return (
    <Navbar
      session={session}
      navBarPermanent={navPermanent}
      navBarAdditional={navAdditional}
      navBarUser={navUser}
    />
  );
};

export default NavbarSSR;
