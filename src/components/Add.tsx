import { ForkOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  PageHeader,
  InputRef,
  message as messageDialog,
} from "antd";
import React, { useRef } from "react";
import Layout from "./Layout";
import styles from "./add.module.css";
import { TextAreaRef } from "antd/lib/input/TextArea";
import { BookReqType } from "../type";

const { TextArea } = Input;

interface Props {
  loading: boolean;
  back: () => void;
  logout: () => void;
  add: (book: BookReqType) => void;
}

function Add({ loading, back, logout, add }: Props) {
  const titleRef = useRef<InputRef>(null);
  const messageRef = useRef<TextAreaRef>(null);
  const authorRef = useRef<InputRef>(null);
  const urlRef = useRef<InputRef>(null);
  const click = () => {
    const title = titleRef.current?.input?.value;
    const message = messageRef.current?.resizableTextArea?.props
      .value as string;
    const author = authorRef.current?.input?.value;
    const url = urlRef.current?.input?.value;

    if (
      title === undefined ||
      message === undefined ||
      author === undefined ||
      url === undefined
    ) {
      messageDialog.error("please fill out inputs");
      return;
    }
    console.log(title, message, author, url, "??", typeof message);

    add({
      title,
      message,
      author,
      url,
    });
  };
  return (
    <Layout>
      <PageHeader
        onBack={back}
        title={
          <div>
            <ForkOutlined />
            Add Book
          </div>
        }
        subTitle="Add your book"
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={logout}
            className={styles.button_logout}
          >
            logout
          </Button>,
        ]}
      />
      <div className={styles.add}>
        <div className={styles.input_title}>
          Title<span className={styles.required}>*</span>
        </div>
        <div className={styles.input_area}>
          <Input placeholder="title" className={styles.input} ref={titleRef} />
        </div>
        <div className={styles.input_comment}>
          Comment<span className={styles.required}>*</span>
        </div>
        <div className={styles.input_area}>
          <TextArea
            rows={4}
            placeholder="Comment"
            className={styles.input}
            ref={messageRef}
          />
        </div>
        <div className={styles.input_author}>
          Author<span className={styles.required}>*</span>
        </div>
        <div>
          <Input
            placeholder="Author"
            className={styles.input}
            ref={authorRef}
          />
        </div>
        <div className={styles.input_url}>
          url<span className={styles.required}>*</span>
        </div>
        <div className={styles.input_area}>
          <Input placeholder="url" className={styles.input} ref={urlRef} />
        </div>
        <div className={styles.button_area}>
          <Button
            size="large"
            loading={loading}
            onClick={click}
            className={styles.button}
          >
            Add
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default Add;
