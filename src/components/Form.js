import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from "axios";

export default function FormikForm(props) {
    const [users, setUsers] = useState([]);
    
    const initialValues = {
        name: "",
        email: "",
        password: "",
    }

    const onSubmit = (formValues, actions) => {
        const userToPost = {
            name: formValues.name,
            email: formValues.email,
            password: formValues.password,
        };
    
        axios.post("https://reqres.in/api/users", userToPost)
            .then(response => {
                console.log(response.data);
                setUsers(users.concat([response.data]));
                actions.resetForm();
            })
            .catch(error => {
                debugger
            })
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            render={props => {
                return(
                    <>
                        <Form>
                            <div className="field">
                                <Field name="name" type="text" placeholder="Name" />
                                <ErrorMessage name='name' component='div' />
                            </div>
                            <div className="field">
                                <Field name="email" type="text" placeholder="Email" />
                                <ErrorMessage name='email' component='div' />
                            </div>
                            <div className="field">
                                <Field name="password" type="password" placeholder="Password" />
                                <ErrorMessage name='password' component='div' />
                            </div>
                            <div className="checkbox">
                                <span>I agree to the Terms of Service</span>
                                <Field name="ToS" type="checkbox"/>
                                <ErrorMessage name='ToS' component='div' />
                                {/* To-Do: This error isn't showing... */}
                            </div>
                            <button type="submit">Submit</button>
                        </Form>
                        <div>
                            {
                                users.map(user => (
                                    <div key={user.id}>
                                        <span>User: {user.name}. </span>
                                        <span>Email: {user.email}. </span>
                                        <span>Id: {user.id}. </span>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                    
                )
            }}
        />
    )
}

const validationSchema = yup.object().shape({
    name: yup.string().required("Please enter a name."),
    email: yup.string().required("Please enter an email adresss."),
    password: yup.string().required("Please enter a password."),
    ToS: yup.boolean().required("You cannot submit unless you have agrees to the Terms of Service."),
});