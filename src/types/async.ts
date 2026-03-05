export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const initialAsyncState = <T>(): AsyncState<T> => ({
  data: null,
  loading: false,
  error: null
});

export const asyncStateHandlers = {
  pending: <T>(state: AsyncState<T>): AsyncState<T> => ({
    ...state,
    loading: true,
    error: null
  }),
  fulfilled: <T>(state: AsyncState<T>, action: { payload: T }): AsyncState<T> => ({
    ...state,
    loading: false,
    data: action.payload,
    error: null
  }),
  rejected: <T>(state: AsyncState<T>, action: { error?: { message?: string } }): AsyncState<T> => ({
    ...state,
    loading: false,
    error: action.error?.message || '请求失败'
  })
};
