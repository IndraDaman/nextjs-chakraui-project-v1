import { getSession } from 'next-auth/react';

import { hashPassword, verifyPassword } from '../../../helpers/auth';
import { existingUserDetail,changePassword } from '../../../helpers/db';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const id = session.user.id;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const obj = {
    email: session.user.email,
  };
  const user = await existingUserDetail(obj);

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password.' });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await changePassword(
    { id: id ,
    password: hashedPassword } 
  );
  console.log(result);
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;
