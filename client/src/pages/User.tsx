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

  const { isLoading: isLoadingUser, data: user } = useGetData(
    `${API_URL}/users/${userId}`
  );

  const defaultFile = user?.profileImg
    ? ({ preview: `${API_URL}${user?.profileImg}` } as File)
    : null;

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (dropzoneFile) {
      const profileImgFormData = new FormData();
      profileImgFormData.set("file", dropzoneFile);

      fetch(`${API_URL}/users/${userId}/profileImg`, {
        method: "POST",
        credentials: "include",
        body: profileImgFormData,
      });
    }

    fetch(`${API_URL}/users/${userId}`, {
      method: "PUT",
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

  const [useDefaultProfession, setUseDefaultProfession] = useState(true);
  const [useDefaultArea, setUseDefaultArea] = useState(true);

  if (isLoadingProfessions || isLoadingAreas || isLoadingUser) {
    return <div>Cargando...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-4 text-white">
        {/* Foto de perfil y descripcion */}
        <div className="w-[450px] bg-stone-600 flex flex-col items-center p-8">
          <DropzoneComponent
            setDropzoneFile={setDropzoneFile}
            defaultFile={defaultFile}
          />
          <div className="w-full">
            <h3 className="text-xl text-orange-500 py-4">About</h3>
            <textarea
              className="text-black w-full"
              name="profileDescription"
              placeholder={user?.profileDescription || ""}
              rows={4}
            ></textarea>
          </div>
        </div>

        <div className="bg-stone-600 w-full">
          <div className="flex flex-col p-8 items-start">
            {/* Información personal */}
            <div className="flex flex-col w-full">
              <h3 className="text-xl text-orange-500 py-4">
                Información Personal
              </h3>
              <div className="flex space-x-4 w-full">
                <div className="flex flex-col w-full">
                  <label htmlFor="firstName">Nombre:</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    className="text-black"
                    placeholder={user?.firstName || ""}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="lastName">Apellido:</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    className="text-black"
                    placeholder={user?.lastName || ""}
                  />
                </div>
              </div>

              <div className="flex space-x-4 w-full">
                <div className="flex flex-col w-full">
                  <label htmlFor="phone">Teléfono:</label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    className="text-black"
                    placeholder={user?.phone || ""}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="ID_Profession">Profesión:</label>
                  <select
                    id="ID_Profession"
                    className="text-black block w-full"
                    name="ID_Profession"
                    value={
                      useDefaultProfession
                        ? user?.ID_Profession || ""
                        : undefined
                    }
                    onChange={() => {
                      setUseDefaultProfession(false);
                    }}
                  >
                    {professions?.map(({ ID_Profession, name }) => (
                      <option key={ID_Profession} value={ID_Profession}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Información Profesional */}
            <div className="flex flex-col mt-5 w-full">
              <h3 className="text-xl text-orange-500 py-4">
                Información Profesional
              </h3>
              <div className="flex space-x-4 w-full">
                <div className="flex flex-col w-full">
                  <label htmlFor="pricePerHour">Precio por hora:</label>
                  <input
                    id="pricePerHour"
                    type="number"
                    name="pricePerHour"
                    className="text-black"
                    placeholder={user?.pricePerHour || ""}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="yearsOfExperience">Años de experiencia</label>
                  <input
                    id="yearsOfExperience"
                    type="number"
                    name="yearsOfExperience"
                    className="text-black"
                    placeholder={user?.yearsOfExperience || ""}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-4 w-full">
              <label htmlFor="ID_Area">Municipio donde prestas servicio:</label>
              <select
                id="ID_Area"
                className="text-black w-full"
                name="ID_Area"
                value={useDefaultArea ? user?.ID_Area || "" : undefined}
                onChange={() => {
                  setUseDefaultArea(false);
                }}
              >
                {areas?.map(({ ID_Area, name }) => (
                  <option key={ID_Area} value={ID_Area}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex self-end space-x-4 pt-10">
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
      </div>
    </form>
  );
};
