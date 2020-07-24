export function resolveStringParam(anyValue: unknown): boolean {
	if (anyValue === 'false' || anyValue === false) {
		return false;
	}

	if (anyValue === 'true' || anyValue === true) {
		return true;
	}

	console.log(
		`Expected boolean-ish parameter. Observed value: ${anyValue}. Falling back to truthy check.`
	);
  
	return !!anyValue;
}
