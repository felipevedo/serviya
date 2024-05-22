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
      <form action="#" onSubmit={handleSubmit}>
        <div className="flex flex-col max-w-[600px] mx-auto">
          <input
            type="email"
            placeholder="Correo"
            name="username"
            required
          ></input>
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            required
          ></input>

          <button className="bg-orange-500 text-white" type="submit">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};
