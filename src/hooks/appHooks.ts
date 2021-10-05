import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDisatch, RootState } from '../Store';

export const useAppDispatch = () => useDispatch<AppDisatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;