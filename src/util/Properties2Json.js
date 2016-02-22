module.exports = function(jsonObj, propertyKey, propertyValue) {
	var childObj = {},
		keyPart,
		keyParts = propertyKey.split("."),
		lenParts = keyParts.length;

	for (var i = 0; i < lenParts; i++) {
		keyPart = keyParts[i];

		if (i === lenParts - 1) {
			if (i === 0) {
				jsonObj[keyPart] = propertyValue;
			} else {
				childObj[keyPart] = propertyValue;
			}
			break;
		}

		if (i === 0) {
			if (!jsonObj[keyPart]) jsonObj[keyPart] = {};
			childObj = jsonObj[keyPart];
		} else {
			if (!childObj[keyPart]) childObj[keyPart] = {};
			childObj = childObj[keyPart];
		}
	}
};
