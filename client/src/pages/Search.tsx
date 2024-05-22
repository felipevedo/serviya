import { useGetData } from "../hooks/useGetData";
import { API_URL } from "../utils/constants";

export const Search = () => {
  const { data: users, isLoading: isLoadingUsers } = useGetData(
    `${API_URL}/users`
  );
  const isLoading = isLoadingUsers;
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <div className="mb-5">
          <p>{user?.firstName}</p>
          <p>{user?.lastName}</p>
          <p>{user?.email}</p>
          <p>{user?.phone}</p>
          <p>{user?.profileDescription}</p>
        </div>
      ))}
    </div>
  );
};
