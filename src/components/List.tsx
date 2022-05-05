import { Button, PageHeader, Table } from "antd";
import React, { useEffect } from "react";
import { BookType } from "../type";
import Book from "./Book";
import Layout from "./Layout";
import styles from "./list.module.css";

export interface ListProps {
  books: BookType[] | null;
  loading: boolean;
  getBooks: () => void;
  error: Error | null;
  logout: () => void;
  goAdd: () => void;
  deleteBook: (bookId: number) => void;
}

const List: React.FC<ListProps> = ({
  books,
  loading,
  getBooks,
  error,
  logout,
  goAdd,
  deleteBook,
}) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);
  return (
    <Layout>
      <PageHeader
        title={<div>Book List</div>}
        extra={[
          <Button
            key="2"
            type="primary"
            onClick={goAdd}
            className={styles.button}
          >
            add Book
          </Button>,
          <Button
            key="1"
            type="primary"
            onClick={logout}
            className={styles.button}
          >
            Logout
          </Button>,
        ]}
      />
      <Table
        className={styles.table}
        dataSource={books || []}
        columns={[
          {
            title: "Book",
            dataIndex: "book",
            key: "book",
            render: (text, record) => (
              <Book {...record} deleteBook={deleteBook} />
            ),
          },
        ]}
        loading={books === null || loading}
        showHeader={false}
        rowKey="bookId"
        pagination={false}
      />
      {/* <Table dataSource={[]} columns={[{
        title:'book',
        dataIndex:'book',
        key:'book',
        render:()=>(<div>book</div>)
    }]}
    loading={books === null || loading}
    showHeader={false}
    rowKey="bookId"
    pagination={false}
    /> */}
    </Layout>
  );
};

export default List;
