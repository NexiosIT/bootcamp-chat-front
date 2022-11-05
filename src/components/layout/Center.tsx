import React, { ReactNode } from "react";
import styles from "./Center.module.css";

interface ICenter {
	children: ReactNode;
}

export const Center = ({ children }: ICenter) => <div className={styles.centerContainer}>{children}</div>;
