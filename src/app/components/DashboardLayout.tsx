import { Outlet, useLocation, Link } from "react-router";
import clsx from "clsx";
import svgPaths from "../../imports/svg-ynxqjjqcen";
// @ts-ignore
import romaLogo from "../../assets/reem-emad.jpg copy 1.svg";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../Redux/Services/authApi";
import { logout } from "../Redux/features/authSlice";

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center size-full">
      <div className="content-stretch flex items-center px-[12.8px] py-[10.8px] relative w-full">
        {children}
      </div>
    </div>
  );
}

function LinkBackgroundImageAndText({
  text,
  to,
  isActive,
}: {
  text: string;
  to: string;
  isActive: boolean;
}) {
  return (
    <Link to={to} className="block w-full">
      <div
        className={clsx("relative rounded-[10px] shrink-0 w-full", {
          "bg-gradient-to-r from-[rgb(253,238,247)] to-[rgb(251,229,241)]":
            isActive,
        })}
        style={isActive ? {} : undefined}
      >
        <div
          aria-hidden="true"
          className={clsx(
            "absolute border border-solid inset-0 pointer-events-none rounded-[10px]",
            {
              "border-[#f4cde4]": isActive,
              "border-[rgba(0,0,0,0)]": !isActive,
            },
          )}
        />
        <BackgroundImage>
          <div
            className={clsx(
              "flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[14px] whitespace-nowrap",
              {
                "text-[#d52685]": isActive,
                "text-[#464646]": !isActive,
              },
            )}
          >
            <p className="leading-[normal]">{text}</p>
          </div>
        </BackgroundImage>
      </div>
    </Link>
  );
}

export function DashboardLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch(e) {
      console.error(e);
    } finally {
      dispatch(logout());
    }
  };

  return (
    <div
      className="content-stretch flex flex-col items-start relative size-full"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1440 900\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(115.26 0 0 115.26 720 900)\\'><stop stop-color=\\'rgba(230,217,225,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(216,213,218,1)\\' offset=\\'0.62\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
      }}
    >
      <div className="min-h-[900px] relative shrink-0 w-full">
        <div className="flex flex-row justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex gap-[16px] items-start justify-center min-h-[inherit] p-[16px] relative size-full">
            {/* Sidebar */}
            <div className="bg-[#faf5f5] relative rounded-[20px] self-stretch shrink-0 w-[250px]">
              <div className="content-stretch flex flex-col items-start px-[18.8px] py-[24.8px] relative size-full">
                <div className="relative shrink-0 w-full">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[16px] relative w-full">
                    <div className="h-[80px] relative shrink-0 w-full flex items-center">
                      <div
                        aria-hidden="true"
                        className="absolute border-[#f4dfee] border-b-[0.8px] border-solid inset-0 pointer-events-none"
                      />
                      <img src={romaLogo} alt="Roma Logo" className="h-full max-h-[64px] w-auto object-contain object-left relative z-10" />
                    </div>
                  </div>
                </div>
                <div className="flex-[1_0_0] min-h-[236px] min-w-px relative w-full">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start min-h-[inherit] pb-[485.6px] relative size-full">
                    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col h-[40.8px] items-start relative shrink-0 w-full">
                        <LinkBackgroundImageAndText
                          text="Overview"
                          to="/"
                          isActive={location.pathname === "/"}
                        />
                      </div>
                      <div className="content-stretch flex flex-col h-[40.8px] items-start relative shrink-0 w-full">
                        <LinkBackgroundImageAndText
                          text="Orders"
                          to="/orders"
                          isActive={location.pathname === "/orders"}
                        />
                      </div>
                      <div className="content-stretch flex flex-col h-[40.8px] items-start relative shrink-0 w-full">
                        <LinkBackgroundImageAndText
                          text="Products"
                          to="/products"
                          isActive={location.pathname === "/products"}
                        />
                      </div>

                      <div className="content-stretch flex flex-col h-[40.8px] items-start relative shrink-0 w-full">
                        <LinkBackgroundImageAndText
                          text="Requests"
                          to="/requests"
                          isActive={location.pathname === "/requests"}
                        />
                      </div>
                      <div className="content-stretch flex flex-col h-[40.8px] items-start relative shrink-0 w-full">
                        <LinkBackgroundImageAndText
                          text="Settings"
                          to="/settings"
                          isActive={location.pathname === "/settings"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full mt-auto">
                  <button onClick={handleLogout} className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center pb-[8.8px] pl-[20px] w-full pt-[8px] relative hover:bg-white hover:rounded-xl cursor-pointer text-left transition-all">
                    <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#8e264f] text-[13.1px] whitespace-nowrap">
                      <p className="leading-[normal]">Logout</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-[#faf5f5] relative rounded-[20px] self-stretch flex-1">
              <div className="flex flex-col justify-start size-full overflow-y-auto">
                <div className="content-stretch flex flex-col gap-[12px] items-start justify-start p-[14.8px] relative size-full min-h-max">
                  {/* Welcome Top Bar */}
                  <div className="h-[59.2px] relative rounded-[14px] shrink-0 w-full">
                    <div
                      aria-hidden="true"
                      className="absolute border border-[#f2f2f2] bg-[#fffafd] border-solid inset-0 pointer-events-none rounded-[14px]"
                    />
                    <div className="flex flex-row items-center justify-between size-full px-[16px] relative">
                      <h2 className="text-[24px] font-semibold text-[#141414] m-0" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                        Welcome back
                      </h2>
                      <div className="flex items-center gap-3">
                        <div className="w-[36px] h-[36px] rounded-[18px] bg-gradient-to-tr from-[#f8d7e9] to-[#e9bdd7] border border-[#f4dfee] shrink-0" />
                      </div>
                    </div>
                  </div>

                  {/* Page Content */}
                  <div className="relative rounded-[14px] shrink-0 w-full flex-1">
                    <div
                      aria-hidden="true"
                      className="absolute border border-[#f2f2f2] border-solid inset-0 pointer-events-none rounded-[14px]"
                    />
                    <div className="flex flex-col justify-start size-full">
                      <Outlet />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
