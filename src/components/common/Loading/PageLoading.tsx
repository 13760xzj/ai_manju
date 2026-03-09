import { useAppSelector } from '@/store/hooks';
import { Loading } from './index';

export function PageLoading() {
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const loadingText = useAppSelector((state) => state.ui.loadingText);

  if (!isLoading) {
    return null;
  }

  return <Loading fullScreen text={loadingText} size="large" />;
}
