import { resolveStringParam } from './param.utils';

describe('param.utils', () => {
	describe('resolveStringParam', () => {
		it('should return boolean for string input', () => {
			expect(resolveStringParam('true')).toEqual(true);
			expect(resolveStringParam('false')).toEqual(false);
		});

		it('should return boolean for boolean input', () => {
			expect(resolveStringParam(true)).toEqual(true);
			expect(resolveStringParam(false)).toEqual(false);
		});

		it('should return null for truthy/false input', () => {
			expect(resolveStringParam('truthy')).toEqual(null);
			expect(resolveStringParam(null)).toEqual(null);
		});
	});
});
