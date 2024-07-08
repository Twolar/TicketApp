import CreateUserForm from "./(components)/CreateUserForm";
import prisma from "@/lib/prisma";

const fetchUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const Home = async () => {
  const users = await fetchUsers();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold text-primary">Welcome to beetjam.</h1>
      <p className="py-6 text-lg">Create a new post!</p>
      <CreateUserForm />
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold">Users</h2>
        <ul className="mt-4 space-y-2">
          {users.map((user) => (
            <li key={user.id} className="border p-4 rounded">
              <p className="text-lg font-medium">Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Created At: {new Date(user.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
