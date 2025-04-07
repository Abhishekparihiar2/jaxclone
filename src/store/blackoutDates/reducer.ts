
import { BlackoutDatesPage, BlackoutPagesPaylod } from './model';
import { PayloadAction } from '..';

const initialPage = new BlackoutDatesPage(null)

export const blackouts = (
    state: BlackoutDatesPage = initialPage,
    {type, payload}: PayloadAction<BlackoutPagesPaylod>
) => {
    switch(type) {
        case 'SET_BLACKOUT_DATES_LIST':
            return {
                ...state,
                blackoutDates: payload.blackoutDates,
                count: payload.count
            }
        case 'DELETE_BLACKOUT' :
            return {
                ...state,
                blackoutDates: state.blackoutDates.filter((data) => data.id !== payload.id)
            }    
        case "ADD_BLACKOUT" :
            return {
                ...state,
                blackoutDates: [...state.blackoutDates, {...payload.blackoutNewData}]
            } 
        case "EDIT_BLACKOUT" :
            console.log(payload)
            return {
                ...state,
                blackoutDates: state.blackoutDates.map((data) => {
                    if(data.id === payload.id) {
                        return {
                            ...payload.blackoutNewData
                        }
                    } else {
                        return {...data}
                    }
                })
            }        
        default:
            return state;   
    }
}