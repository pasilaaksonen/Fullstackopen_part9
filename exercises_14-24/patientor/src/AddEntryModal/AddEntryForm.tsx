import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField } from "./FormField";
import { HealthCheckEntry } from "../types";

export type EntryFormValues = Omit<HealthCheckEntry, "id" | "diagnosisCodes">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {


  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        type: "HealthCheck",
        description: "",
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.name = requiredError;
        }
        if (!values.specialist) {
          errors.ssn = requiredError;
        }
        if (!values.type) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.description) {
          errors.occupation = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Type"
              placeholder="Type"
              name="type"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="HealthCheckRating"
              placeholder="HealthCheckRating"
              name="healthCheckRating"
              component={NumberField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={onCancel}
                  style={{ float: "left" }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
