import React from "react";
import { Formik, Form as FormFormik, Field } from "formik";
import * as Yup from "yup";

import Button from "../Button";
import Input from "../FormElements/Input";
import Textarea from "../FormElements/Textarea";
import Colorpicker from "../FormElements/Colorpicker";

const Form = props => {
	const initialValues = {
		name: "",
		description: "",
		color: ""
	};

	const { data = initialValues, mutation, color = true, create } = props;

	let validationShape = {
		name: Yup.string().required("El nombre es requerido")
	};
	if (color) {
		validationShape.color = Yup.string().required("El color es requerido");
	}

	const validationSchema = Yup.object().shape(validationShape);

	return (
		<Formik
			onSubmit={(values, { resetForm }) => {
				const result = mutation({ variables: values });
				result.then(res => {
					if (res.data && create) {
						resetForm();
					}
				});
			}}
			initialValues={data}
			validationSchema={validationSchema}
			render={() => {
				return (
					<FormFormik>
						<Field
							name="name"
							label="Nombre"
							type="text"
							component={Input}
						/>
						{color && (
							<Field
								name="color"
								label="Color"
								type="color"
								component={Colorpicker}
							/>
						)}
						<Field
							name="description"
							label="Descripción"
							type="text"
							component={Textarea}
						/>
						<Button success filled text="Guardar" type="submit" />
					</FormFormik>
				);
			}}
		/>
	);
};

export default Form;
