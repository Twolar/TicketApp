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
      <p className="py-6 text-lg">🚂 A place to find new chu chu chuuunes 🚂</p>
    </div>
  );
};

export default Home;
