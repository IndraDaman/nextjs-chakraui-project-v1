import { getSession } from 'next-auth/react';

import HomePageContent from '../components/home-page/home-page';

function HomePage() {
  return <HomePageContent />;
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
export default HomePage;