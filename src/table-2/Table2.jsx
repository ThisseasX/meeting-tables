import React, { useEffect, useRef, useState } from 'react';
import rooms from '../rooms.json';
import classes from './styles.module.css';

// 13 time slots, from 8:00 to 20:00, inclusive
const HOURS = Array(13)
  .fill()
  .map((_, i) => i + 8);

const Table2 = () => {
  const [shouldRenderBookings, setShouldRenderBookings] = useState(false);
  const tableCellPlacements = useRef({});

  useEffect(() => {
    // Render bookings only after initial render, so the refs above have updated
    setShouldRenderBookings(true);
  }, []);

  // Get each cell's placement on the page
  const updateRef = (id) => (ref) => {
    if (!ref) return;
    const left = ref.offsetLeft;
    const top = ref.offsetTop;
    tableCellPlacements.current[id] = { left, top };
  };

  return (
    <div>
      <h2>Like Teams</h2>

      <div className={classes.tableContainer}>
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
                  <td
                    key={name}
                    className={classes.bookingCell}
                    ref={updateRef(`${hour}-${name}`)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {shouldRenderBookings &&
          rooms.map(({ name, bookings }) =>
            bookings.map(({ startHour, duration, _id }) => {
              const placementId = `${Math.floor(startHour)}-${name}`;
              const { left, top: topWithoutBorder } =
                tableCellPlacements.current?.[placementId] || {};

              const startsAtHalfHour = startHour % 1 === 0.5;
              const height = duration * 40 + 1;
              const top = topWithoutBorder - 0.5 + (startsAtHalfHour ? 20 : 0);

              return (
                <div
                  key={_id?.$oid}
                  className={classes.booking}
                  style={{ left, top, height }}
                >
                  Booked
                </div>
              );
            }),
          )}
      </div>
    </div>
  );
};

export default Table2;
