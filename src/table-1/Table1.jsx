import React from 'react';
import rooms from '../rooms.json';
import classes from './styles.module.css';

// 13 time slots, from 8:00 to 20:00, inclusive
const HOURS = Array(13)
  .fill()
  .map((_, i) => i + 8);

const ROOM_BOOKINGS = HOURS.reduce(
  // For all hours above...
  (hoursWithRooms, hour) => ({
    ...hoursWithRooms,
    [hour]: {
      // ...loop through all rooms...
      ...rooms.reduce(
        (roomsPerHour, room) => ({
          ...roomsPerHour,
          // ...and keep only the bookings that overlap with the current hour.
          [room.name]: room.bookings.filter(({ startHour, duration }) => {
            const endHour = startHour + duration;
            return Math.floor(startHour) <= hour && hour < endHour;
          }),
        }),
        {},
      ),
    },
  }),
  {},
);

const Table1 = () => (
  <div>
    <h2>Like existing</h2>

    <table>
      <thead>
        <tr>
          <th>Time</th>

          {rooms.map(({ name }) => (
            <th key={name}>{name}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {HOURS.map((hour) => (
          <tr key={hour}>
            <td>{hour}</td>

            {rooms.map(({ name }) => (
              <td key={name} className={classes.bookingCell}>
                <div className={classes.bookingContainer}>
                  {/* Get the bookings for this cell */}
                  {ROOM_BOOKINGS?.[hour]?.[name].map(
                    ({ startHour, duration, _id }) => {
                      const endHour = startHour + duration;
                      const isHalf = endHour - hour === 0.5;

                      return (
                        <div
                          key={_id?.$oid}
                          className={`${classes.booking} ${
                            isHalf ? classes.bookingHalf : ''
                          }`}
                        >
                          Booked
                        </div>
                      );
                    },
                  )}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table1;
