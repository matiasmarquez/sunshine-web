import React from "react";
import styled from "styled-components";

import Label from "./Label";
import Error from "./Error";

const Input = props => {
	const {
		field: { name, onChange },
		form: { errors = null, touched },
		type,
		helpText,
		autocomplete,
		label
	} = props;

	let { value } = props.field;
	const error = errors && errors[name];

	if (value === null) {
		value = "";
	}

	return (
		<React.Fragment>
			<Label label={label} />
			<InputStyled
				name={name}
				value={value}
				type={type}
				onChange={onChange}
				autoComplete={autocomplete}
			/>
			{helpText && <HelpText>{helpText}</HelpText>}
			<Error text={error && touched[name] && error} />
		</React.Fragment>
	);
};

const InputStyled = styled.input`
	display: block;
	position: relative;
	width: 100%;
	font-size: 14px;
	font-family: "Open Sans", sans-serif;
	margin-bottom: 15px;
	color: inherit;
	padding: 10px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	transition: all 0.3s ease;
	outline: none;
	&:not([type="checkbox"]):focus {
		box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15);
		border: ${props => {
			return `1px solid rgb(${props.theme.primary})`;
		}};
	}
`;

const HelpText = styled.p`
	font-size: 11px;
	font-weight: 500;
	margin: 0;
	margin-top: 5px;
	position: relative;
	color: #a5a5a5;
	top: -13px;
`;

export default Input;
