import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { signOutMutation } from "@/lib/react-query/queriesAndMutations"
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { link } from "fs";
import { INavLink } from "@/types";

const LeftSideBar = () => {
  const { mutate: signOut, isSuccess } = signOutMutation();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSuccess)
      navigate(0);
  }, [isSuccess])

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 justify-center items-center">
          <img
            src="/assets/images/logo.png"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive && "bg-primary-500 text-white"}`}
              >
                <NavLink to={link.route} className="flex gap-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${isActive && "invert-white"}`}
                  />
                  <div className={`group-hover:invert-white ${isActive && "invert-white"}`}>
                    {link.label}
                  </div>
                </NavLink>
              </li>
            )
          })}
        </ul>
        <div className="flex flex-col gap-6">
          <Link to={`/profile/${user.id}`} className="flex gap-4 items-center px-4">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt={user.username}
              height={24}
              width={24}
              className="rounded-full"
            />
            {user.username}
          </Link>

        </div>

      </div>

      <Button
        variant="ghost"
        className="button-ghost"
        onClick={() => signOut()}>
        <img src="/assets/icons/logout.svg" alt="signout" />
        <p className="small-medium lg:base-medium">Sign Out</p>
      </Button>
    </nav>
  )
}

export default LeftSideBar