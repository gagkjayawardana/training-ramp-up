import * as React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import "../utils/rampUpTable.css";

import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
//import { StudentData } from "../data/studentDetails";
import DropDownCell from "./DropDownCell";
import CommandCell from "./CommandCell";
import {
  insertStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} from "../data/services";
import { useState, useEffect } from "react";
const editField = "inEdit";

function RampUpTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const newItems = getStudent();
    setData(newItems);
  }, []);

  const add = (dataItem) => {
    dataItem.inEdit = true;
    const newData = insertStudent(dataItem);
    setData(newData);
  };

  const update = (dataItem) => {
    dataItem.inEdit = false;
    const newData = updateStudent(dataItem);
    setData(newData);
  };

  const remove = (dataItem) => {
    const newData = [...deleteStudent(dataItem)];
    setData(newData);
  };

  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem) => {
    const originalItem = getStudent().find(
      (e) => e.studentID === dataItem.studentID
    );
    const newData = data.map((item) =>
      item.studentID === originalItem.studentID ? originalItem : item
    );
    setData(newData);
  };

  const itemChange = (event) => {
    const newData = data.map((item) =>
      item.studentID === event.dataItem.studentID
        ? { ...item, [event.field || ""]: event.value }
        : item
    );
    setData(newData);
  };

  const addNew = () => {
    const newDataItem = {
      inEdit: true,
      discontinued: false,
    };
    setData([newDataItem, ...data]);
  };

  const enterEdit = (dataItem) => {
    setData(
      data.map((item) =>
        item.studentID === dataItem.studentID ? { ...item, inEdit: true } : item
      )
    );
  };

  const commands = (props) => (
    <CommandCell
      {...props}
      add={add}
      discard={discard}
      editField={editField}
      update={update}
      remove={remove}
      cancel={cancel}
      edit={enterEdit}
    />
  );
  return (
    <Grid
      style={{
        height: "420px",
      }}
      data={data}
      onItemChange={itemChange}
      editField={editField}
    >
      <GridToolbar>
        <button
          id="AddBtn"
          title="Add new"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={addNew}
        >
          Add new
        </button>
      </GridToolbar>
      <Column field="studentID" title="Id" width="150px" editable={false} />
      <Column field="studentName" title="Name" width="200px" />
      <Column
        field="studentGender"
        title="Gender"
        width="150px"
        cell={DropDownCell}
      />
      <Column field="studentAddress" title="Address" width="200px" />
      <Column
        field="studentMobile"
        title="Mobile"
        width="150px"
        type="number"
      />
      <Column
        field="studentDOB"
        title="Date of Birth"
        editor="date"
        format="{0:d}"
        width="150px"
      />
      <Column field="studentAge" title="Age" width="150px" editable={false} />
      <Column cell={commands} title="Command" width="193px" />
    </Grid>
  );
}

export default RampUpTable;
