import styled from "styled-components";
import ReactCalendar from "react-calendar";
import { darkBlue, lightBeige, lightBlue, textGrey } from "../../utils";

export const Calendar = styled(ReactCalendar)`
    background: #f5f5f5;
    font-family: "DM Sans";
    border: none;
    height: 300px;
    color: ${textGrey};

    abbr[title] {
        cursor: auto;
    }

    .react-calendar_tile.react-calendarmonth-viewdays_day {
        flex-basis: 36px !important;
        border-radius: 2px;
    }

    .react-calendar__tile.react-calendar__tile--now.react-calendar__month-view__days__day {
        border-radius: 50%;
        background: ${lightBlue};
        color: white;
        font-weight: bold;
        flex-basis: 36px !important;

        :hover {
            background: ${lightBlue};
        }
    }

    .react-calendar__navigation button[disabled] {
        background: ${lightBeige};
    }

    .react-calendar__tile.react-calendar__month-view__days__day:hover {
        background: ${lightBeige};
    }

    .react-calendar__tile {
        height: 36px !important;
        width: 36px !important;
        flex-basis: 36px !important;
        margin: 0 7px;
    }

    .react-calendar__month-view__days__day--weekend {
        color: ${textGrey};
    }

    & abbr {
        text-decoration: none;
        border-radius: 50%;
    }

    .react-calendar__navigation__label {
        color: ${darkBlue};
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 0.5px;
        background: ${lightBeige};
    }

    .react-calendar__tile.react-calendar__tile--active.react-calendar__month-view__days__day {
        background: ${lightBlue};
        color: white;
    }

    .react-calendar__month-view__days__day--neighboringMonth {
        color: ${textGrey};
        opacity: 40%;
    }

    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background: ${lightBeige};
    }
`;
