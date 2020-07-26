export function resolveStringParam(anyValue: unknown): boolean | null {
	if (anyValue === 'false' || anyValue === false) {
		return false;
	}

	if (anyValue === 'true' || anyValue === true) {
		return true;
	}

	console.error(
		`Expected boolean-ish parameter. Observed value: ${anyValue}. Falling back to null.`
	);
  
	return null;
}
