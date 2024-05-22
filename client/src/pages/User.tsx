import { API_URL } from "../utils/constants";
import { useGetData } from "../hooks/useGetData";
import DropzoneComponent from "../components/DropzoneComponent";
import { SyntheticEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const User = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [dropzoneFile, setDropzoneFile] = useState<File | null>(null);
  const { data: professions, isLoading: isLoadingProfessions } = useGetData(
    `${API_URL}/professions`
  );
  const { data: areas, isLoading: isLoadingAreas } = useGetData(
    `${API_URL}/areas`
  );

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    fetch(`${API_URL}/users/${userId}`, {
      method: "PUT",
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

  if (isLoadingProfessions || isLoadingAreas) {
    return <div>Cargando...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-4 text-white">
        <div className="w-[450px] bg-stone-600 flex flex-col p-2">
          Imagen de perfil y otros
          <div>
            <DropzoneComponent setDropzoneFile={setDropzoneFile} />
          </div>
          <div>
            <h3 className="font-xxl text-orange-500">About</h3>
            <textarea
              className="text-black"
              name="profileDescription"
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col bg-stone-600 p-2">
          <div className="flex flex-col">
            <h3 className="font-xxl text-orange-500">Información personal</h3>
            <div className="flex space-x-2">
              <label>
                Nombre
                <input type="text" name="firstName" className="text-black" />
              </label>
              <label>
                Apellido
                <input type="text" name="lastName" className="text-black" />
              </label>
            </div>

            <div className="flex space-x-2">
              <label>
                Teléfono
                <input type="text" name="phone" className="text-black" />
              </label>
              <label>
                Profesión
                <select className="text-black" name="profession">
                  {professions?.map(({ ID_Profession, name }) => (
                    <option key={ID_Profession} value={ID_Profession}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Area donde trabaja:
              <select className="text-black" name="area">
                {areas?.map(({ ID_Area, name }) => (
                  <option key={ID_Area} value={ID_Area}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-5">
            <button className="text-orange-500 bg-white border border-orange-500 py-2 px-4 rounded">
              Cancelar
            </button>
            <button
              type="submit"
              className="text-white bg-orange-500 border border-orange-500 py-2 px-4 rounded"
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
