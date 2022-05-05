import React from "react";
import styles from "./Layout.module.css";
// https://stackoverflow.com/questions/71788254/react-18-typescript-children-fc
type Props = {
  children?: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => (
  <div className={styles.layout}>{children}</div>
);

export default Layout;
