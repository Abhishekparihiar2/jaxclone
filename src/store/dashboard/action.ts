import { Dispatch } from 'react'
import { Action } from 'redux'
import Api from '../../Api'
import { DashBoardWidget, BackgroundChecks } from './model';
import { ResponseError } from '../shared/model';
import { Loader } from '../loader/model';

export const updateDashboard = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    return async (dispatch: Dispatch<Action>)  => {
            dispatch(new Loader(true).action());
            Api.get('/api/v1/vehicles/status/list').then((response) => {
                dispatch(new Loader(false).action());
                // dispatch(setDashboardWidget(response.data.data))
                dispatch(new DashBoardWidget(response.data.data).action())
            }).catch((error) => {
                // dispatch(sendError(error.response.data.message))
                dispatch(new Loader(false).action());
                dispatch(new ResponseError(error.response.data.message).action())
            })
            Api.get('/api/v1/background-checks/list').then((response) => {
                dispatch(new Loader(false).action());
                dispatch(new BackgroundChecks(response.data).action())
            }).catch((error) => {
                // dispatch(sendError(error.response.data.message))
                dispatch(new Loader(false).action());
                dispatch(new ResponseError(error.response.data.message).action())
            })
    }
}
