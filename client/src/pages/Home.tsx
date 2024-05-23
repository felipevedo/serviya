import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <div className="bg-stone-600 text-white h-[400px] flex flex-col space-y-5 items-center justify-center">
      <h1 className="text-2xl max-w-[60%] text-center">
        Encuentra al profesional perfecto para tu proyecto de construccion
      </h1>

      <NavLink to="/search" className="bg-orange-500 py-2 px-4 rounded">
        Buscar Profesionales
      </NavLink>
    </div>
  );
};
