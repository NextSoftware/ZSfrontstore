import axios from "axios";
import jwtDecode from "jwt-decode";
import * as React from "react";
import Header from "../../components/header";
import Loading from "../../components/loading";
import Cookies from "universal-cookie";
import UserDrawer from "../../components/user-drawer";
import { useRouter } from "next/router";

const drawerWidth = 240;

const userPic = "/assets/avatar.png";

interface Props {
  window?: () => Window;
}

export default function User(props: Props) {
  const [user, setUser] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const cookies = new Cookies();
  const userCookie = cookies.get("user");
  const router = useRouter();

  const getUser = async () => {
    if (userCookie == undefined) {
      router.push("/categorias");
    }
    const jwtUser: any = jwtDecode(await userCookie?.token);
    await axios
      .get(`/Customer/Email/${await jwtUser.email}`)
      .then(async (response) => setUser(await response.data))
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    getUser();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="background-wrapper">
      <Header />

      <div className="drawer-wrapper">
        <UserDrawer userData={user} />
      </div>
    </div>
  );
}
