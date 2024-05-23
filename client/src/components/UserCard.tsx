import { API_URL } from "../utils/constants";
import { StarIcon } from "./StarIcon";

export const UserCard = ({ user }) => {
  return (
    <div className="my-5 flex p-4 bg-stone-600 text-white items-center justify-between">
      <div className="flex space-x-8 w-[250px]">
        <div className="rounded-full w-[80px] h-[80px] overflow-clip bg-orange-600">
          <img
            className="object-cover w-[80px] h-[80px]"
            src={`${API_URL}${user?.profileImg}`}
            alt={user?.firstName}
          />
        </div>

        <div className="text-xl">
          <p>{user?.firstName}</p>
          <p>{user?.lastName}</p>
        </div>
      </div>

      <div className="flex text-yellow-500 space-x-1">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>

      <div className="flex space-x-6 text-sm">
        <div className="flex flex-col ">
          <p>
            <span className="font-bold">Correo:</span> {user?.email}
          </p>
          <p>
            <span className="font-bold">Telefono:</span> {user?.phone}
          </p>
          <p>
            <span className="font-bold">Precio por hora:</span>{" "}
            {user?.pricePerHour}
          </p>
          <p>
            <span className="font-bold">Años de experiencia:</span>{" "}
            {user?.yearsOfExperience}
          </p>
        </div>
        <div className="flex flex-col w-[200px]">
          <p>{user?.profileDescription}</p>
        </div>
      </div>
    </div>
  );
};
