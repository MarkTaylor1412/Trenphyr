import { bottombarLinks } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { Link, useLocation } from 'react-router-dom'

const BottomBar = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`${isActive && "bg-primary-600 rounded-full"} flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              height={16}
              width={16}
              className={`${isActive && "invert-white"}`}
            />
          </Link>
        )
      })}
      <Link to={`/profile/${user.id}`} className="flex-center gap-3">
        <img
          src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
          alt="profile"
          className="h-7 w-7 rounded-full border border-primary-500"
        />
      </Link>
    </section>
  )
}

export default BottomBar