import { getSession } from 'next-auth/react';

import ChangePasswordFormContent from '../components/user/changepassword-form';

function ChangePasswordPage() {
  return <ChangePasswordFormContent />;
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
export default ChangePasswordPage;