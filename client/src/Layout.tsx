import { NavLink, Outlet, useLocation } from "react-router-dom";
import { API_URL } from "./utils/constants";
import { useEffect, useState } from "react";

export const Layout = () => {
  const location = useLocation();
  const [loginStatus, setLoginStatus] = useState();
  useEffect(() => {
    fetch(`${API_URL}/login/status`, { credentials: "include" })
      .then((res) => res.json())
      .then((json) => setLoginStatus(json.data[0]));
  }, [location]);

  const underlineActive = ({ isActive }) => (isActive ? "underline" : "");

  const handleLogout = () => {
    fetch(`${API_URL}/logout`, { method: "POST", credentials: "include" }).then(
      (res) => {
        console.log("logout res", res);
        window.location.reload();
      }
    );
  };

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
            {loginStatus?.isLoggedIn ? (
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

            {loginStatus?.isLoggedIn ? (
              <button onClick={handleLogout}>Cerrar Sesión</button>
            ) : (
              <NavLink to="/register" className={underlineActive}>
                Registrarse
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main style={{ height: "calc(100vh - 60px)" }}>
        <Outlet />
      </main>
    </div>
  );
};
