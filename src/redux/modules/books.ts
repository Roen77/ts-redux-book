import { push } from "connected-react-router";
import { Action } from "redux";
import { createActions, handleActions } from "redux-actions";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import BookService from "../../services/BookService";
import { BookReqType, BookType } from "../../type";

export interface BooksState {
  books: BookType[] | null;
  loading: boolean;
  error: Error | null;
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};
const prefix = "my-books/books";

export const { pending, success, fail } = createActions(
  "PENDING",
  "SUCCESS",
  "FAIL",
  { prefix }
);

const reducer = handleActions<BooksState, BookType[]>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      books: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
);

export default reducer;

//saga

export const { getBooks, addBook, deleteBook } = createActions(
  "GET_BOOKS",
  "ADD_BOOK",
  "DELETE_BOOK",
  {
    prefix,
  }
);

function* getBooksSaga() {
  try {
    console.log("saga");
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const books: BookType[] = yield call(BookService.getBooks, token);
    yield put(success(books));
  } catch (error) {
    yield put(fail(new Error("error")));
  }
}
function* addBookSaga(action: Action<BookReqType>) {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const book: BookType = yield call(
      BookService.addBook,
      token,
      //@ts-ignore
      action.payload
    );
    const books: BookType[] = yield select((state) => state.books.books);
    console.log("books:", books, "book:", book);
    yield put(success([...books, book]));
    yield put(push("/"));
  } catch (error: any) {
    console.log("error", error);
    yield put(fail(new Error(error?.response?.data?.error || "error")));
  }
}
function* deleteBookSaga(action: Action<number>) {
  try {
    //@ts-ignore
    const bookId = action.payload;
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    yield call(BookService.deleteBook, token, bookId);
    const books: BookType[] = yield select((state) => state.books.books);
    console.log("books:", books);
    yield put(success(books.filter((book) => book.bookId !== bookId)));
    yield put(push("/"));
  } catch (error: any) {
    console.log("error", error);
    yield put(fail(new Error(error?.response?.data?.error || "error")));
  }
}
export function* booksSaga() {
  yield takeEvery(`${prefix}/GET_BOOKS`, getBooksSaga);
  yield takeEvery(`${prefix}/ADD_BOOK`, addBookSaga);
  yield takeEvery(`${prefix}/DELETE_BOOK`, deleteBookSaga);
}
