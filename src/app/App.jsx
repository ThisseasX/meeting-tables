import React from 'react';
import Table1 from '../table-1/Table1';
import Table2 from '../table-2/Table2';
import classes from './styles.module.css';

const App = () => (
  <div className={classes.app}>
    <Table1 />
    <Table2 />
  </div>
);

export default App;
