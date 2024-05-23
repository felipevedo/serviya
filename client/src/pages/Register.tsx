import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import { SyntheticEvent } from "react";

export const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      <h2 className="text-orange-500 w-fit mx-auto mt-20 mb-5">
        ¡Unete a nuestra red de profesionales!
      </h2>

      <form action="#" onSubmit={handleSubmit}>
        <div className="flex flex-col max-w-[600px] mx-auto text-white space-y-4">
          <div className="flex space-x-4 w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="firstName">Nombre:</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                className="text-black"
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="lastName">Apellido:</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                className="text-black"
              />
            </div>
          </div>

          <div className="flex space-x-4 w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="email">Correo:</label>
              <input
                id="email"
                type="email"
                name="email"
                className="text-black"
                required
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="password">Contraseña:</label>
              <input
                id="password"
                type="password"
                name="password"
                className="text-black"
                required
              />
            </div>
          </div>

          <button
            className="bg-orange-500 text-white rounded py-2 font-bold"
            type="submit"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};
