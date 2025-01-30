const notAllowedFieldsToUpdateError = (res) => {
	return res
		.status(500)
		.send(
			"Invalid update: One or more editable fields are not allowed to be updated"
		);
};

export { notAllowedFieldsToUpdateError };
