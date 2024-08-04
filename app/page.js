import prisma from "@/lib/prisma";
import PageTitle from "./(components)/PageTitle";

const fetchUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const Home = async () => {
  const users = await fetchUsers();

  return (
    <div className="flex flex-col items-center">
      <PageTitle
        headingLevel="h2"
        title="Welcome to beetjam."
        subtitle="🚂 A place to find new chu chu chuuunes 💦"
      />
    </div>
  );
};

export default Home;
