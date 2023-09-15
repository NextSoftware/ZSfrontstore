import { CircularProgress } from "@mui/material";
import React from "react";
import styles from "../styles/Loading.module.scss"

const Loading = () => {
    return (
        <div className={styles.container}>
            <CircularProgress className={styles.container}/>
        </div>

    )
} 

export default Loading