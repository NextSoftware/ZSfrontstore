import { Button, Link } from "@mui/material";
import styles from "../styles/Home.module.css";

export default function Home() { 
  return (
    <>
      <div className={styles.container}>
        <main className="main">
          <Link href="/categorias">
            <Button>Ir para categorias</Button>
          </Link>
          <Link href="/confirmcheck">
            <Button>CC REEEEEEE</Button>
          </Link>
        </main>
      </div>
    </>
  );
}
