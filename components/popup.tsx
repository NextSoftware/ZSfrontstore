import React from "react";
import styles from "../styles/Popup.module.scss";
import CloseIcon from '@mui/icons-material/Close';
const Popup = (props: any) => {
  return (
    <div className={styles.popupbox}>
      <div className={styles.box}>
        <span className={styles.closeicon} onClick={props.buttonclose}><CloseIcon/></span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
