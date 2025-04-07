
const Sorter = ({
    sortType,
    setSortType,
    isActive
}:{
    sortType: string,
    setSortType: any,
    isActive?: boolean
}) => {
    return <>
    {<span className="sorting-icon">
            {<i className={`fa fa-chevron-up ${sortType === 'ASC' && isActive ? 'active' : ''}`} aria-hidden="true" onClick = {()=> setSortType('DESC')}> </i>}
            {<i className={`fa fa-chevron-down ${sortType === 'DESC' && isActive ? 'active' : ''}`} aria-hidden="true" onClick = {()=> setSortType('ASC') }> </i>}
    </span>}</>
};

export default Sorter