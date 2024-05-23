import { UserCard } from "../components/UserCard";
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
    <div className="p-8">
      {users.map((user) => (
        <UserCard key={user?.ID_User} user={user} />
      ))}
    </div>
  );
};
