import {
  ArrowRightEndOnRectangleIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import {
  PageRoutesAdmin,
  PageRoutesDashboard,
  PageRoutesPublic,
} from "@/app/(misc)/PageRoutes";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <nav className="bg-neutral text-neutral-content">
      <div className="navbar max-w-screen-xl ml-auto mr-auto p-2">
        <div className="navbar-start">
          <Link href={PageRoutesPublic.Home} className="flex items-center">
            <Image
              src="/beetjamIconSmall.png"
              alt="beetjam icon"
              height="25"
              width="25"
            />
            <h1 className="text-primary text-xl font-bold ml-2">beetjam.</h1>
          </Link>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <Bars3Icon className="h-5 w-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
          {session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-9 rounded-full">
                  <Image
                    width="25"
                    height="25"
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href={PageRoutesPublic.SignOut}>Logout</Link>
                </li>
                <li>
                  <a className="justify-between">My Profile</a>
                </li>

                <li className="menu-title mt-2">
                  <span>Dashboard</span>
                </li>
                <li>
                  <Link href={PageRoutesDashboard.Dashboard}>Overview</Link>
                </li>

                {/* TODO TLB: Only show this based on role */}
                <li className="menu-title mt-2">
                  <span>Admin</span>
                </li>
                <li>
                  <Link href={PageRoutesAdmin.Blogs}>Blogs</Link>
                </li>
                <li>
                  <Link href={PageRoutesAdmin.Users}>Users</Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link href={PageRoutesPublic.SignIn}>
              <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
