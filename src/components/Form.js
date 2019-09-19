import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function FormikForm(props) {
    return (
        <Formik 
            render={props => {
                return(
                    <Form>
                        <div>
                            <Field name="name" type="text" placeholder="Name" />
                        </div>
                        <div>
                            <Field name="email" type="text" placeholder="Email" />
                        </div>
                        <div>
                            <Field name="password" type="text" placeholder="Password" />
                        </div>
                        <div>
                            <Field name="tos" type="checkbox" placeholder="Name" />
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                )
            }}
        />
    )
}