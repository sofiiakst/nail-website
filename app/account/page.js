import MyAppointments from "../components/MyApps";
import { auth } from "../lib/auth";
import { getAppsByMail } from "../lib/dataServices";

export default async function Page() {
  const session = await auth();
  const email = session.user.email;
  const apps = await getAppsByMail(email);
  return (
    <div>
      <MyAppointments apps={apps} />
    </div>
  );
}
