import { NavLink, Outlet } from "react-router-dom";
import { useGetData } from "./hooks/useGetData";
import { API_URL } from "./utils/constants";

export const Layout = () => {
  const { isLoading: isLoadingLoginStatus, data } = useGetData(
    `${API_URL}/login/status`
  );
  const loginStatus = data[0];
  const underlineActive = ({ isActive }) => (isActive ? "underline" : "");

  return (
    <div>
      <header className="px-2 flex h-[60px] w-full items-center justify-between text-orange-500 font-bold">
        <div className="flex items-center">
          <div className="mr-3 w-10 h-10 bg-stone-600">
            {/* <img src="#" alt="ServiYa Logo" className="w-full" /> */}
          </div>

          <nav id="top-navbar" className="space-x-2">
            <NavLink to="/" className={underlineActive}>
              Inicio
            </NavLink>
            <NavLink to="/search" className={underlineActive}>
              Servicios
            </NavLink>
          </nav>
        </div>

        <div className="justify-self-end flex flex-col items-center">
          <h4 className="underline">Portal Profesionales</h4>
          <div className="space-x-2">
            {isLoadingLoginStatus ? (
              <NavLink to="/login" className={underlineActive}>
                Iniciar Sesión
              </NavLink>
            ) : !isLoadingLoginStatus && loginStatus?.isLoggedIn ? (
              <NavLink
                to={`/user/${loginStatus?.user?.id}`}
                className={underlineActive}
              >
                Perfil
              </NavLink>
            ) : (
              <NavLink to="/login" className={underlineActive}>
                Iniciar Sesión
              </NavLink>
            )}

            <NavLink to="/register" className={underlineActive}>
              Registrarse
            </NavLink>
          </div>
        </div>
      </header>

      <main style={{ height: "calc(100vh - 60px)" }}>
        <Outlet />
      </main>
    </div>
  );
};
