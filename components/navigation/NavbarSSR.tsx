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
    if (
      session.user.profile.event_role == AuthRoles.Xorganizer ||
      session.user.profile.event_role == AuthRoles.xsubOrganizer
    ) {
      navAdditional = [
        ...NavRuleContent.navbarUserXOrganizerLoggedIn,
        ...NavRuleContent.navbarSpatialLoggedIn,
      ];
      navUser = [
        ...NavRuleContent.navbarUserXOrganizerLoggedIn,
        ...NavRuleContent.navbarUserAttendeeLoggedIn,
      ];
    }
    if (session.user.profile.event_role == AuthRoles.Xvolunteer) {
      navAdditional = [
        ...NavRuleContent.navbarUserXVolunteerLoggedIn,
        ...NavRuleContent.navbarSpatialLoggedIn,
      ];
      navUser = [
        ...NavRuleContent.navbarUserXVolunteerLoggedIn,
        ...NavRuleContent.navbarUserAttendeeLoggedIn,
      ];
    }
    if (session.user.profile.event_role == AuthRoles.volunteer) {
      navAdditional = [
        ...NavRuleContent.navbarUserVolunteerLoggedIn,
        ...NavRuleContent.navbarSpatialLoggedIn,
      ];
      navUser = [
        ...NavRuleContent.navbarUserXVolunteerLoggedIn,
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
