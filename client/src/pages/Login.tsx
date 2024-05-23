import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import { SyntheticEvent } from "react";

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => (res.ok ? res.json() : {}))
      .then((json: Record<string, unknown>) => {
        if (typeof json?.id !== "undefined") {
          navigate(`/user/${json.id}`);
        }
      });
  };

  return (
    <div className="bg-stone-600 h-full p-2">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col max-w-[300px] mx-auto text-white space-y-4 pt-10">
          <div className="flex flex-col w-full">
            <label htmlFor="email">Correo:</label>
            <input
              id="email"
              type="email"
              placeholder="Correo"
              name="username"
              className="text-black"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              name="password"
              className="text-black"
              required
            />
          </div>

          <button
            className="bg-orange-500 text-white  py-2 font-bold"
            type="submit"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};
