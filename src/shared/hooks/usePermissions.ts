import { useSelector } from "react-redux"
import { StoreInterface } from "../../store"

const usePermissions = (path?: string) => {
    let isPemitted = true;
    const access_dashboard = useSelector((state: StoreInterface) => state.login.permissions?.access_dashboard);
    const admin = useSelector((state: StoreInterface) => state.login.permissions?.admin);
    const access_rentals = useSelector((state: StoreInterface) => state.login.permissions?.access_rentals);
    const access_vehicles = useSelector((state: StoreInterface) => state.login.permissions?.access_vehicles);
    const access_customers = useSelector((state: StoreInterface) => state.login.permissions?.access_customers);
    const access_inspections = useSelector((state: StoreInterface) => state.login.permissions?.access_inspections);
    const access_background_checks = useSelector((state: StoreInterface) => state.login.permissions?.access_background_checks);
    const access_manage_employee = useSelector((state: StoreInterface) => state.login.permissions?.access_manage_employee);
    const access_revenue = useSelector((state: StoreInterface) => state.login.permissions?.access_revenue);
    const access_custom_settings = useSelector((state: StoreInterface) => state.login.permissions?.access_custom_settings);
    if(access_dashboard || access_rentals ||  access_vehicles || access_customers ||  access_inspections || access_background_checks ||  access_manage_employee || access_revenue || access_custom_settings || admin) {
            if(path === '/dashboard' && (!access_dashboard && !admin)){
                isPemitted = false;
            }
            if(path === '/rentals' && (!access_rentals && !admin)){
                isPemitted = false;
            }
            if(path === '/vehicles' && (!access_vehicles && !admin )){
                isPemitted = false;
            }
            if(path === '/customers' && (!access_customers && !admin)){
                isPemitted = false;
            }
            if((path === '/inspections' || path === '/tasks' )  && (!access_inspections && !admin)){
                isPemitted = false;
            }
            if(path === '/background-checks' && (!access_background_checks && !admin)){
                isPemitted = false;
            }
            if(path === '/manage-employee' && (!access_manage_employee && !admin)){
                isPemitted = false;
            }
            if(path === '/revenue' && (!access_revenue && !admin)){
                isPemitted = false;
            }
            if(path === '/customer-setting' && (!access_custom_settings && !admin)){
                isPemitted = false;
            }
        }
    
    return isPemitted;
}

export default usePermissions