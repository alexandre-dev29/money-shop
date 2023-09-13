import { Button } from '@nextui-org/button';
import { DbConnection, users } from 'db';
import { getServerSession } from 'next-auth';
export default async function Index() {
  const database = DbConnection.instance();
  const session = await getServerSession();
  console.log(session);
  return <Button color={'primary'}>Click me</Button>;
}
