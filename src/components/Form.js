import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from "axios";

export default function FormikForm(props) {
    const initialValues = {
        name: "",
        email: "",
        password: "",
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            render={props => {
                return(
                    <Form>
                        <div>
                            <Field name="name" type="text" placeholder="Name" />
                            <ErrorMessage name='name' component='div' />
                        </div>
                        <div>
                            <Field name="email" type="text" placeholder="Email" />
                            <ErrorMessage name='email' component='div' />
                        </div>
                        <div>
                            <Field name="password" type="password" placeholder="Password" />
                            <ErrorMessage name='password' component='div' />
                        </div>
                        <div>
                            I agree to the Terms of Service
                            <Field name="ToS" type="checkbox"/>
                            <ErrorMessage name='ToS' component='div' />
                            {/* To-Do: This error isn't showing... */}
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                )
            }}
        />
    )
}

const onSubmit = (formValues, actions) => {
    const userToPost = {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
    };

    axios.post("https://reqres.in/api/users")
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            debugger
        })
};

const validationSchema = yup.object().shape({
    name: yup.string().required("Please enter a name."),
    email: yup.string().required("Please enter an email adresss."),
    password: yup.string().required("Please enter a password."),
    ToS: yup.bool().required("You cannot submit unless you have agrees to the Terms of Service."),
});