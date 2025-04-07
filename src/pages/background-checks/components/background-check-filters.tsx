import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { BackgroundChecksStatus } from "../../../shared/models";
import { backgroundCheckFilter } from "../background-checks";

const BackgroundCheckFilter = (
    {
        filterError,
        pageSize,
        form,
        setForm,
        setFilterError,
        setPageNumber,
        searchBackgroundChecks,
        handleDateChange
    }: {
        filterError: { [key: string]: string } | null;
        pageSize: number;
        form: backgroundCheckFilter;
        setForm: React.Dispatch<React.SetStateAction<backgroundCheckFilter>>;
        setPageNumber: React.Dispatch<React.SetStateAction<number>>;
        setFilterError: React.Dispatch<React.SetStateAction<{ [key: string]: string } | null>>;
        searchBackgroundChecks: (page: number, size: number) => void;
        handleDateChange: (s: Date | null, e: Date | null) => void;
    }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [isFilterReset, setIsFilterReset] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const changeDate = async ([start, end]: [
        start: Date | null,
        end: Date | null
    ]) => {
        if (end) {
            setFilterError(null);
        }
        setStartDate(start);
        setEndDate(end);
    };

    const resetFilter = () => {
        setForm({
            firstName: '',
            lastName: '',
            dlNumber: '',
            status: '',
            endDateFilter: null,
            startDateFilter: null
        });
        setStartDate(null);
        setEndDate(null);
        setFilterError(null);
        setIsFilterReset(true);
    }

    useEffect(() => {
        setPageNumber(0);
        isFilterReset && searchBackgroundChecks(0, pageSize);
        setIsFilterReset(false);
        // eslint-disable-next-line
    }, [isFilterReset]);

    useEffect(() => {
        handleDateChange(startDate, endDate);
        // eslint-disable-next-line
    }, [startDate, endDate]);

    return (
        <section className="card mb20">
            <header className="card-header">
                <div className="card-head-actions">
                    <span className="btn arrow-circle-up" onClick={() => setShowFilter(!showFilter)}>
                        <i className={`fa ${showFilter ? 'fa-chevron-up' : 'fa-chevron-down'}`} aria-hidden="true"></i>
                    </span>
                </div>
            </header>
            {showFilter && <div className="card-body">
                <div className="row row-column-5">
                    <div className="col-lg-3 col-md-4">
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                placeholder=""
                                value={form.firstName}
                                onChange={e => setForm({ ...form, firstName: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                className="form-control"
                                placeholder=""
                                value={form.lastName}
                                onChange={e => setForm({ ...form, lastName: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <div className="form-group">
                        <label className="date-label">Registered On
                            <div className="calendar-input">
                                <DatePicker
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    dateFormat="MM-dd-yyyy"
                                    className="form-control"
                                    showYearDropdown
                                    showMonthDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={ 100 }
                                    useShortMonthInDropdown
                      
                                    onChange={(dates) => changeDate(dates)}
                                />
                                <span className="btn calendar-btn">
                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                </span>
                                <span style={{ color: "red", fontSize: '10px' }}>
                                    {filterError && filterError['date']
                                        ? filterError['date'] : ""}
                                </span>
                                </div>
                                </label>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <div className="form-group">
                            <label>DL Number</label>
                            <input
                                type="text"
                                name="dlNumber"
                                className="form-control"
                                placeholder=""
                                value={form.dlNumber}
                                onChange={e => setForm({ ...form, dlNumber: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                className="form-control"
                                name="status"
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                            >
                                <option value="" selected={form.status === ''}>All</option>
                                {Object.keys(BackgroundChecksStatus).map((key: string) => {
                                    return (
                                        <>
                                            <option value={key} selected={form.status === key}>
                                                {(BackgroundChecksStatus as any)[key]}
                                            </option>
                                        </>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-action text-right mt-2 mb-2">
                            <button
                                className="btn btn-orange mr-1"
                                type="submit"
                                onClick={() => searchBackgroundChecks(0, pageSize)}
                            >
                                Filter
                            </button>
                            <button className="btn btn-orange" type="submit" onClick={() => resetFilter()}>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </section>
    );
};

export default BackgroundCheckFilter;
