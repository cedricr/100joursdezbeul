/**
 * chartjs-chart-geo
 * https://github.com/sgratzl/chartjs-chart-geo
 *
 * Copyright (c) 2019-2022 Samuel Gratzl <sam@sgratzl.com>
 */

import { createCanvas } from 'canvas';

import {
	Scale,
	LinearScale,
	LogarithmicScale,
	BarElement,
	Element,
	DatasetController,
	registry,
	Chart,
	PointElement
} from 'chart.js';
import {
	geoAzimuthalEqualArea,
	geoAzimuthalEquidistant,
	geoGnomonic,
	geoOrthographic,
	geoStereographic,
	geoEqualEarth,
	geoAlbers,
	geoAlbersUsa,
	geoConicConformal,
	geoConicEqualArea,
	geoConicEquidistant,
	geoEquirectangular,
	geoMercator,
	geoTransverseMercator,
	geoNaturalEarth1,
	geoPath,
	geoContains,
	geoGraticule10,
	geoGraticule
} from 'd3-geo';
export {
	geoAlbers,
	geoAlbersUsa,
	geoAzimuthalEqualArea,
	geoAzimuthalEquidistant,
	geoConicConformal,
	geoConicEqualArea,
	geoConicEquidistant,
	geoEqualEarth,
	geoEquirectangular,
	geoGnomonic,
	geoMercator,
	geoNaturalEarth1,
	geoOrthographic,
	geoStereographic,
	geoTransverseMercator
} from 'd3-geo';
import { merge, drawPoint, valueOrDefault, clipArea, unclipArea } from 'chart.js/helpers';
import {
	interpolateBlues,
	interpolateBrBG,
	interpolateBuGn,
	interpolateBuPu,
	interpolateCividis,
	interpolateCool,
	interpolateCubehelixDefault,
	interpolateGnBu,
	interpolateGreens,
	interpolateGreys,
	interpolateInferno,
	interpolateMagma,
	interpolateOrRd,
	interpolateOranges,
	interpolatePRGn,
	interpolatePiYG,
	interpolatePlasma,
	interpolatePuBu,
	interpolatePuBuGn,
	interpolatePuOr,
	interpolatePuRd,
	interpolatePurples,
	interpolateRainbow,
	interpolateRdBu,
	interpolateRdGy,
	interpolateRdPu,
	interpolateRdYlBu,
	interpolateRdYlGn,
	interpolateReds,
	interpolateSinebow,
	interpolateSpectral,
	interpolateTurbo,
	interpolateViridis,
	interpolateWarm,
	interpolateYlGn,
	interpolateYlGnBu,
	interpolateYlOrBr,
	interpolateYlOrRd
} from 'd3-scale-chromatic';
import * as topojsonClient from 'topojson-client';
export { topojsonClient as topojson };

const lookup$1 = {
	geoAzimuthalEqualArea,
	geoAzimuthalEquidistant,
	geoGnomonic,
	geoOrthographic,
	geoStereographic,
	geoEqualEarth,
	geoAlbers,
	geoAlbersUsa,
	geoConicConformal,
	geoConicEqualArea,
	geoConicEquidistant,
	geoEquirectangular,
	geoMercator,
	geoTransverseMercator,
	geoNaturalEarth1
};
Object.keys(lookup$1).forEach((key) => {
	lookup$1[`${key.charAt(3).toLowerCase()}${key.slice(4)}`] = lookup$1[key];
});
class ProjectionScale extends Scale {
	constructor(cfg) {
		super(cfg);
		this.outlineBounds = null;
		this.oldChartBounds = null;
		this.geoPath = geoPath();
	}
	init(options) {
		options.position = 'chartArea';
		super.init(options);
		if (typeof options.projection === 'function') {
			this.projection = options.projection;
		} else {
			this.projection = (lookup$1[options.projection] || lookup$1.albersUsa)();
		}
		this.geoPath.projection(this.projection);
		this.outlineBounds = null;
		this.oldChartBounds = null;
	}
	computeBounds(outline) {
		const bb = geoPath(this.projection.fitWidth(1000, outline)).bounds(outline);
		const bHeight = Math.ceil(bb[1][1] - bb[0][1]);
		const bWidth = Math.ceil(bb[1][0] - bb[0][0]);
		const t = this.projection.translate();
		this.outlineBounds = {
			width: bWidth,
			height: bHeight,
			aspectRatio: bWidth / bHeight,
			refScale: this.projection.scale(),
			refX: t[0],
			refY: t[1]
		};
	}
	updateBounds() {
		const area = this.chart.chartArea;
		const bb = this.outlineBounds;
		if (!bb) {
			return false;
		}
		const padding = this.options.padding;
		const paddingTop = typeof padding === 'number' ? padding : padding.top;
		const paddingLeft = typeof padding === 'number' ? padding : padding.left;
		const paddingBottom = typeof padding === 'number' ? padding : padding.bottom;
		const paddingRight = typeof padding === 'number' ? padding : padding.right;
		const chartWidth = area.right - area.left - paddingLeft - paddingRight;
		const chartHeight = area.bottom - area.top - paddingTop - paddingBottom;
		const bak = this.oldChartBounds;
		this.oldChartBounds = {
			chartWidth,
			chartHeight
		};
		const scale = Math.min(chartWidth / bb.width, chartHeight / bb.height);
		const viewWidth = bb.width * scale;
		const viewHeight = bb.height * scale;
		const x = (chartWidth - viewWidth) * 0.5 + area.left + paddingLeft;
		const y = (chartHeight - viewHeight) * 0.5 + area.top + paddingTop;
		const o = this.options;
		this.projection
			.scale(bb.refScale * scale * o.projectionScale)
			.translate([
				scale * bb.refX + x + o.projectionOffset[0],
				scale * bb.refY + y + o.projectionOffset[1]
			]);
		return (
			!bak ||
			bak.chartWidth !== this.oldChartBounds.chartWidth ||
			bak.chartHeight !== this.oldChartBounds.chartHeight
		);
	}
}
ProjectionScale.id = 'projection';
ProjectionScale.defaults = {
	projection: 'albersUsa',
	projectionScale: 1,
	projectionOffset: [0, 0],
	padding: 0
};
ProjectionScale.descriptors = {
	_scriptable: (name) => name !== 'projection',
	_indexable: (name) => name !== 'projectionOffset'
};

const baseDefaults = {
	position: 'chartArea',
	property: 'value',
	grid: {
		z: 1,
		drawOnChartArea: false
	},
	ticks: {
		z: 1
	},
	legend: {
		align: 'right',
		position: 'bottom-right',
		length: 100,
		width: 50,
		margin: 8,
		indicatorWidth: 10
	}
};
function computeLegendMargin(legend) {
	const { indicatorWidth, align: pos, margin } = legend;
	const left =
		(typeof margin === 'number' ? margin : margin.left) + (pos === 'right' ? indicatorWidth : 0);
	const top =
		(typeof margin === 'number' ? margin : margin.top) + (pos === 'bottom' ? indicatorWidth : 0);
	const right =
		(typeof margin === 'number' ? margin : margin.right) + (pos === 'left' ? indicatorWidth : 0);
	const bottom =
		(typeof margin === 'number' ? margin : margin.bottom) + (pos === 'top' ? indicatorWidth : 0);
	return { left, top, right, bottom };
}
function computeLegendPosition(chartArea, legend, width, height, legendSize) {
	const { indicatorWidth, align: axisPos, position: pos } = legend;
	const isHor = axisPos === 'top' || axisPos === 'bottom';
	const w = (axisPos === 'left' ? legendSize.w : width) + (isHor ? indicatorWidth : 0);
	const h = (axisPos === 'top' ? legendSize.h : height) + (!isHor ? indicatorWidth : 0);
	const margin = computeLegendMargin(legend);
	if (typeof pos === 'string') {
		switch (pos) {
			case 'top-left':
				return [margin.left, margin.top];
			case 'top':
				return [(chartArea.right - w) / 2, margin.top];
			case 'left':
				return [margin.left, (chartArea.bottom - h) / 2];
			case 'top-right':
				return [chartArea.right - w - margin.right, margin.top];
			case 'bottom-right':
				return [chartArea.right - w - margin.right, chartArea.bottom - h - margin.bottom];
			case 'bottom':
				return [(chartArea.right - w) / 2, chartArea.bottom - h - margin.bottom];
			case 'bottom-left':
				return [margin.left, chartArea.bottom - h - margin.bottom];
			default:
				return [chartArea.right - w - margin.right, (chartArea.bottom - h) / 2];
		}
	}
	return [pos.x, pos.y];
}
class LegendScale extends LinearScale {
	constructor() {
		super(...arguments);
		this.legendSize = { w: 0, h: 0 };
	}
	init(options) {
		options.position = 'chartArea';
		super.init(options);
		this.axis = 'r';
	}
	parse(raw, index) {
		if (raw && typeof raw[this.options.property] === 'number') {
			return raw[this.options.property];
		}
		return super.parse(raw, index);
	}
	isHorizontal() {
		return this.options.legend.align === 'top' || this.options.legend.align === 'bottom';
	}
	_getNormalizedValue(v) {
		if (v == null || Number.isNaN(v)) {
			return null;
		}
		return (v - this._startValue) / this._valueRange;
	}
	update(maxWidth, maxHeight, margins) {
		const ch = Math.min(maxHeight, this.bottom == null ? Number.POSITIVE_INFINITY : this.bottom);
		const cw = Math.min(maxWidth, this.right == null ? Number.POSITIVE_INFINITY : this.right);
		const l = this.options.legend;
		const isHor = this.isHorizontal();
		const factor = (v, full) => (v < 1 ? full * v : v);
		const w =
			Math.min(cw, factor(isHor ? l.length : l.width, cw)) - (!isHor ? l.indicatorWidth : 0);
		const h =
			Math.min(ch, factor(!isHor ? l.length : l.width, ch)) - (isHor ? l.indicatorWidth : 0);
		this.legendSize = { w, h };
		this.bottom = h;
		this.height = h;
		this.right = w;
		this.width = w;
		const bak = this.options.position;
		this.options.position = this.options.legend.align;
		const r = super.update(w, h, margins);
		this.options.position = bak;
		this.height = Math.min(h, this.height);
		this.width = Math.min(w, this.width);
		return r;
	}
	_computeLabelArea() {
		return undefined;
	}
	draw(chartArea) {
		if (!this._isVisible()) {
			return;
		}
		const pos = computeLegendPosition(
			chartArea,
			this.options.legend,
			this.width,
			this.height,
			this.legendSize
		);
		const { ctx } = this;
		ctx.save();
		ctx.translate(pos[0], pos[1]);
		const bak = this.options.position;
		this.options.position = this.options.legend.align;
		super.draw({
			...chartArea,
			bottom: this.height + 10,
			right: this.width
		});
		this.options.position = bak;
		const { indicatorWidth } = this.options.legend;
		switch (this.options.legend.align) {
			case 'left':
				ctx.translate(this.legendSize.w, 0);
				break;
			case 'top':
				ctx.translate(0, this.legendSize.h);
				break;
			case 'bottom':
				ctx.translate(0, -indicatorWidth);
				break;
			default:
				ctx.translate(-indicatorWidth, 0);
				break;
		}
		this._drawIndicator();
		ctx.restore();
	}
	//_drawIndicator() {}
}
class LogarithmicLegendScale extends LogarithmicScale {
	constructor() {
		super(...arguments);
		this.legendSize = { w: 0, h: 0 };
	}
	init(options) {
		LegendScale.prototype.init.call(this, options);
	}
	parse(raw, index) {
		return LegendScale.prototype.parse.call(this, raw, index);
	}
	isHorizontal() {
		return this.options.legend.align === 'top' || this.options.legend.align === 'bottom';
	}
	_getNormalizedValue(v) {
		if (v == null || Number.isNaN(v)) {
			return null;
		}
		return (Math.log10(v) - this._startValue) / this._valueRange;
	}
	update(maxWidth, maxHeight, margins) {
		return LegendScale.prototype.update.call(this, maxWidth, maxHeight, margins);
	}
	_computeLabelArea() {
		return undefined;
	}
	draw(chartArea) {
		return LegendScale.prototype.draw.call(this, chartArea);
	}
	//_drawIndicator() {}
}

const lookup = {
	interpolateBlues,
	interpolateBrBG,
	interpolateBuGn,
	interpolateBuPu,
	interpolateCividis,
	interpolateCool,
	interpolateCubehelixDefault,
	interpolateGnBu,
	interpolateGreens,
	interpolateGreys,
	interpolateInferno,
	interpolateMagma,
	interpolateOrRd,
	interpolateOranges,
	interpolatePRGn,
	interpolatePiYG,
	interpolatePlasma,
	interpolatePuBu,
	interpolatePuBuGn,
	interpolatePuOr,
	interpolatePuRd,
	interpolatePurples,
	interpolateRainbow,
	interpolateRdBu,
	interpolateRdGy,
	interpolateRdPu,
	interpolateRdYlBu,
	interpolateRdYlGn,
	interpolateReds,
	interpolateSinebow,
	interpolateSpectral,
	interpolateTurbo,
	interpolateViridis,
	interpolateWarm,
	interpolateYlGn,
	interpolateYlGnBu,
	interpolateYlOrBr,
	interpolateYlOrRd
};
Object.keys(lookup).forEach((key) => {
	lookup[`${key.charAt(11).toLowerCase()}${key.slice(12)}`] = lookup[key];
	lookup[key.slice(11)] = lookup[key];
});
function quantize(v, steps) {
	const perStep = 1 / steps;
	if (v <= perStep) {
		return 0;
	}
	if (v >= 1 - perStep) {
		return 1;
	}
	for (let acc = 0; acc < 1; acc += perStep) {
		if (v < acc) {
			return acc - perStep / 2;
		}
	}
	return v;
}
const colorScaleDefaults = {
	interpolate: 'blues',
	missing: 'transparent',
	quantize: 0
};
class ColorScale extends LegendScale {
	get interpolate() {
		const o = this.options;
		if (!o) {
			return (v) => `rgb(${v},${v},${v})`;
		}
		if (typeof o.interpolate === 'function') {
			return o.interpolate;
		}
		return lookup[o.interpolate] || lookup.blues;
	}
	getColorForValue(value) {
		const v = this._getNormalizedValue(value);
		if (v == null || Number.isNaN(v)) {
			return this.options.missing;
		}
		return this.getColor(v);
	}
	getColor(normalized) {
		let v = normalized;
		if (this.options.quantize > 0) {
			v = quantize(v, this.options.quantize);
		}
		return this.interpolate(v);
	}
	_drawIndicator() {
		const { indicatorWidth: indicatorSize } = this.options.legend;
		const reverse = this._reversePixels;
		if (this.isHorizontal()) {
			const w = this.width;
			if (this.options.quantize > 0) {
				const stepWidth = w / this.options.quantize;
				const offset = !reverse ? (i) => i : (i) => w - stepWidth - i;
				for (let i = 0; i < w; i += stepWidth) {
					const v = (i + stepWidth / 2) / w;
					this.ctx.fillStyle = this.getColor(v);
					this.ctx.fillRect(offset(i), 0, stepWidth, indicatorSize);
				}
			} else {
				const offset = !reverse ? (i) => i : (i) => w - 1 - i;
				for (let i = 0; i < w; i += 1) {
					this.ctx.fillStyle = this.getColor((i + 0.5) / w);
					this.ctx.fillRect(offset(i), 0, 1, indicatorSize);
				}
			}
		} else {
			const h = this.height;
			if (this.options.quantize > 0) {
				const stepWidth = h / this.options.quantize;
				const offset = !reverse ? (i) => i : (i) => h - stepWidth - i;
				for (let i = 0; i < h; i += stepWidth) {
					const v = (i + stepWidth / 2) / h;
					this.ctx.fillStyle = this.getColor(v);
					this.ctx.fillRect(0, offset(i), indicatorSize, stepWidth);
				}
			} else {
				const offset = !reverse ? (i) => i : (i) => h - 1 - i;
				for (let i = 0; i < h; i += 1) {
					this.ctx.fillStyle = this.getColor((i + 0.5) / h);
					this.ctx.fillRect(0, offset(i), indicatorSize, 1);
				}
			}
		}
	}
}
ColorScale.id = 'color';
ColorScale.defaults = merge({}, [LinearScale.defaults, baseDefaults, colorScaleDefaults]);
ColorScale.descriptors = {
	_scriptable: (name) => name !== 'interpolate',
	_indexable: false
};
class ColorLogarithmicScale extends LogarithmicLegendScale {
	constructor() {
		super(...arguments);
		this.interpolate = (v) => `rgb(${v},${v},${v})`;
	}
	init(options) {
		super.init(options);
		if (typeof options.interpolate === 'function') {
			this.interpolate = options.interpolate;
		} else {
			this.interpolate = lookup[options.interpolate] || lookup.blues;
		}
	}
	getColorForValue(value) {
		return ColorScale.prototype.getColorForValue.call(this, value);
	}
	getColor(normalized) {
		let v = normalized;
		if (this.options.quantize > 0) {
			v = quantize(v, this.options.quantize);
		}
		return this.interpolate(v);
	}
	_drawIndicator() {
		return ColorScale.prototype._drawIndicator.call(this);
	}
}
ColorLogarithmicScale.id = 'colorLogarithmic';
ColorLogarithmicScale.defaults = merge({}, [
	LogarithmicScale.defaults,
	baseDefaults,
	colorScaleDefaults
]);
ColorLogarithmicScale.descriptors = {
	_scriptable: (name) => name !== 'interpolate',
	_indexable: false
};

const scaleDefaults = {
	missing: 1,
	mode: 'area',
	range: [2, 20],
	legend: {
		align: 'bottom',
		length: 90,
		width: 70,
		indicatorWidth: 42
	}
};
class SizeScale extends LegendScale {
	constructor() {
		super(...arguments);
		this._model = null;
	}
	getSizeForValue(value) {
		const v = this._getNormalizedValue(value);
		if (v == null || Number.isNaN(v)) {
			return this.options.missing;
		}
		return this.getSizeImpl(v);
	}
	getSizeImpl(normalized) {
		const [r0, r1] = this.options.range;
		if (this.options.mode === 'area') {
			const a1 = r1 * r1 * Math.PI;
			const a0 = r0 * r0 * Math.PI;
			const range = a1 - a0;
			const a = normalized * range + a0;
			return Math.sqrt(a / Math.PI);
		}
		const range = r1 - r0;
		return normalized * range + r0;
	}
	_drawIndicator() {
		const { ctx } = this;
		const shift = this.options.legend.indicatorWidth / 2;
		const isHor = this.isHorizontal();
		const values = this.ticks;
		const labelItems = this.getLabelItems();
		const positions = labelItems
			? labelItems.map((el) => ({
					[isHor ? 'x' : 'y']: el.options.translation[isHor ? 0 : 1]
			  }))
			: values.map((_, i) => ({
					[isHor ? 'x' : 'y']: this.getPixelForTick(i)
			  }));
		(this._gridLineItems || []).forEach((item) => {
			ctx.save();
			ctx.strokeStyle = item.color;
			ctx.lineWidth = item.width;
			if (ctx.setLineDash) {
				ctx.setLineDash(item.borderDash);
				ctx.lineDashOffset = item.borderDashOffset;
			}
			ctx.beginPath();
			if (this.options.grid.drawTicks) {
				switch (this.options.legend.align) {
					case 'left':
						ctx.moveTo(0, item.ty1);
						ctx.lineTo(shift, item.ty2);
						break;
					case 'top':
						ctx.moveTo(item.tx1, 0);
						ctx.lineTo(item.tx2, shift);
						break;
					case 'bottom':
						ctx.moveTo(item.tx1, shift);
						ctx.lineTo(item.tx2, shift * 2);
						break;
					default:
						ctx.moveTo(shift, item.ty1);
						ctx.lineTo(shift * 2, item.ty2);
						break;
				}
			}
			ctx.stroke();
			ctx.restore();
		});
		if (this._model) {
			const props = this._model;
			ctx.strokeStyle = props.borderColor;
			ctx.lineWidth = props.borderWidth || 0;
			ctx.fillStyle = props.backgroundColor;
		} else {
			ctx.fillStyle = 'blue';
		}
		values.forEach((v, i) => {
			const pos = positions[i];
			const radius = this.getSizeForValue(v.value);
			const x = isHor ? pos.x : shift;
			const y = isHor ? shift : pos.y;
			const renderOptions = {
				pointStyle: 'circle',
				borderWidth: 0,
				...(this._model || {}),
				radius
			};
			drawPoint(ctx, renderOptions, x, y);
		});
	}
}
SizeScale.id = 'size';
SizeScale.defaults = merge({}, [LinearScale.defaults, baseDefaults, scaleDefaults]);
SizeScale.descriptors = {
	_scriptable: true,
	_indexable: (name) => name !== 'range'
};
class SizeLogarithmicScale extends LogarithmicLegendScale {
	constructor() {
		super(...arguments);
		this._model = null;
	}
	getSizeForValue(value) {
		const v = this._getNormalizedValue(value);
		if (v == null || Number.isNaN(v)) {
			return this.options.missing;
		}
		return this.getSizeImpl(v);
	}
	getSizeImpl(normalized) {
		return SizeScale.prototype.getSizeImpl.call(this, normalized);
	}
	_drawIndicator() {
		SizeScale.prototype._drawIndicator.call(this);
	}
}
SizeLogarithmicScale.id = 'sizeLogarithmic';
SizeLogarithmicScale.defaults = merge({}, [LogarithmicScale.defaults, baseDefaults, scaleDefaults]);

function growGeoBounds(bounds, amount) {
	return [
		[bounds[0][0] - amount, bounds[0][1] - amount],
		[bounds[1][0] + amount, bounds[1][1] + amount]
	];
}
class GeoFeature extends Element {
	constructor() {
		super(...arguments);
		this.cache = undefined;
	}
	inRange(mouseX, mouseY) {
		const bb = this.getBounds();
		const r =
			(Number.isNaN(mouseX) || (mouseX >= bb.x && mouseX <= bb.x2)) &&
			(Number.isNaN(mouseY) || (mouseY >= bb.y && mouseY <= bb.y2));
		const projection = this.projectionScale.geoPath.projection();
		if (
			r &&
			!Number.isNaN(mouseX) &&
			!Number.isNaN(mouseY) &&
			typeof projection.invert === 'function'
		) {
			const longLat = projection.invert([mouseX, mouseY]);
			return longLat != null && geoContains(this.feature, longLat);
		}
		return r;
	}
	inXRange(mouseX) {
		return this.inRange(mouseX, Number.NaN);
	}
	inYRange(mouseY) {
		return this.inRange(Number.NaN, mouseY);
	}
	getCenterPoint() {
		if (this.cache && this.cache.center) {
			return this.cache.center;
		}
		let center;
		if (this.center) {
			const p = this.projectionScale.projection([this.center.longitude, this.center.latitude]);
			center = {
				x: p[0],
				y: p[1]
			};
		} else {
			const centroid = this.projectionScale.geoPath.centroid(this.feature);
			center = {
				x: centroid[0],
				y: centroid[1]
			};
		}
		this.cache = { ...(this.cache || {}), center };
		return center;
	}
	getBounds() {
		if (this.cache && this.cache.bounds) {
			return this.cache.bounds;
		}
		const bb = growGeoBounds(
			this.projectionScale.geoPath.bounds(this.feature),
			this.options.borderWidth / 2
		);
		const bounds = {
			x: bb[0][0],
			x2: bb[1][0],
			y: bb[0][1],
			y2: bb[1][1],
			width: bb[1][0] - bb[0][0],
			height: bb[1][1] - bb[0][1]
		};
		this.cache = { ...(this.cache || {}), bounds };
		return bounds;
	}
	_drawInCache(doc) {
		const bounds = this.getBounds();
		if (!Number.isFinite(bounds.x)) {
			return;
		}
		const canvas = this.cache && this.cache.canvas ? this.cache.canvas : createCanvas();
		const x1 = Math.floor(bounds.x);
		const y1 = Math.floor(bounds.y);
		const x2 = Math.ceil(bounds.x + bounds.width);
		const y2 = Math.ceil(bounds.y + bounds.height);
		const pixelRatio = this.pixelRatio || 1;
		const width = Math.ceil(Math.max(x2 - x1, 1) * pixelRatio);
		const height = Math.ceil(Math.max(y2 - y1, 1) * pixelRatio);
		if (width <= 0 || height <= 0) {
			return;
		}
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext('2d');
		if (ctx) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.save();
			ctx.scale(pixelRatio, pixelRatio);
			ctx.translate(-x1, -y1);
			this._drawImpl(ctx);
			ctx.restore();
			this.cache = {
				...(this.cache || {}),
				canvas,
				canvasKey: this._optionsToKey()
			};
		}
	}
	_optionsToKey() {
		const { options } = this;
		return `${options.backgroundColor};${options.borderColor};${options.borderWidth};${this.pixelRatio}`;
	}
	_drawImpl(ctx) {
		const { feature } = this;
		const { options } = this;
		ctx.beginPath();
		this.projectionScale.geoPath.context(ctx)(feature);
		if (options.backgroundColor) {
			ctx.fillStyle = options.backgroundColor;
			ctx.fill();
		}
		if (options.borderColor) {
			ctx.strokeStyle = options.borderColor;
			ctx.lineWidth = options.borderWidth;
			ctx.stroke();
		}
	}
	draw(ctx) {
		const { feature } = this;
		if (!feature) {
			return;
		}
		if (!this.cache || this.cache.canvasKey !== this._optionsToKey()) {
			this._drawInCache(ctx.canvas.ownerDocument);
		}
		const bounds = this.getBounds();
		if (
			this.cache &&
			this.cache.canvas &&
			this.cache.canvas.width > 0 &&
			this.cache.canvas.height > 0
		) {
			const x1 = Math.floor(bounds.x);
			const y1 = Math.floor(bounds.y);
			const x2 = Math.ceil(bounds.x + bounds.width);
			const y2 = Math.ceil(bounds.y + bounds.height);
			const width = x2 - x1;
			const height = y2 - y1;
			if (width > 0 && height > 0) {
				ctx.drawImage(this.cache.canvas, x1, y1, x2 - x1, y2 - y1);
			}
		} else if (Number.isFinite(bounds.x)) {
			ctx.save();
			this._drawImpl(ctx);
			ctx.restore();
		}
	}
}
GeoFeature.id = 'geoFeature';
GeoFeature.defaults = {
	...BarElement.defaults,
	outlineBackgroundColor: null,
	outlineBorderWidth: 0,
	graticuleBorderColor: '#CCCCCC',
	graticuleBorderWidth: 0
};
GeoFeature.defaultRoutes = {
	outlineBorderColor: 'borderColor',
	...(BarElement.defaultRoutes || {})
};

const geoDefaults = {
	showOutline: false,
	showGraticule: false,
	clipMap: true
};
const geoOverrides = {
	scales: {
		projection: {
			axis: 'x',
			type: ProjectionScale.id,
			position: 'chartArea',
			display: false
		}
	}
};
function patchDatasetElementOptions(options) {
	const r = { ...options };
	Object.keys(options).forEach((key) => {
		let targetKey = key;
		if (key.startsWith('outline')) {
			const sub = key.slice('outline'.length);
			targetKey = sub[0].toLowerCase() + sub.slice(1);
		} else if (key.startsWith('hoverOutline')) {
			targetKey = `hover${key.slice('hoverOutline'.length)}`;
		} else {
			return;
		}
		delete r[key];
		r[targetKey] = options[key];
	});
	return r;
}
class GeoController extends DatasetController {
	getGeoDataset() {
		return super.getDataset();
	}
	getGeoOptions() {
		return this.chart.options;
	}
	getProjectionScale() {
		return this.getScaleForId('projection');
	}
	linkScales() {
		const dataset = this.getGeoDataset();
		const meta = this.getMeta();
		meta.xAxisID = 'projection';
		dataset.xAxisID = 'projection';
		meta.yAxisID = 'projection';
		dataset.yAxisID = 'projection';
		meta.xScale = this.getScaleForId('projection');
		meta.yScale = this.getScaleForId('projection');
		this.getProjectionScale().computeBounds(this.resolveOutline());
	}
	showOutline() {
		return valueOrDefault(this.getGeoDataset().showOutline, this.getGeoOptions().showOutline);
	}
	clipMap() {
		return valueOrDefault(this.getGeoDataset().clipMap, this.getGeoOptions().clipMap);
	}
	getGraticule() {
		return valueOrDefault(this.getGeoDataset().showGraticule, this.getGeoOptions().showGraticule);
	}
	update(mode) {
		super.update(mode);
		const meta = this.getMeta();
		const scale = this.getProjectionScale();
		const dirtyCache = scale.updateBounds();
		if (this.showOutline()) {
			const elem = meta.dataset;
			if (dirtyCache) {
				delete elem.cache;
			}
			elem.projectionScale = scale;
			elem.pixelRatio = this.chart.currentDevicePixelRatio;
			if (mode !== 'resize') {
				const options = patchDatasetElementOptions(this.resolveDatasetElementOptions(mode));
				const properties = {
					feature: this.resolveOutline(),
					options
				};
				this.updateElement(elem, undefined, properties, mode);
				if (this.getGraticule()) {
					meta.graticule = options;
				}
			}
		} else if (this.getGraticule() && mode !== 'resize') {
			meta.graticule = patchDatasetElementOptions(this.resolveDatasetElementOptions(mode));
		}
		this.updateElements(meta.data, 0, meta.data.length, mode);
		if (dirtyCache) {
			meta.data.forEach((elem) => delete elem.cache);
		}
	}
	resolveOutline() {
		const ds = this.getGeoDataset();
		const outline = ds.outline || { type: 'Sphere' };
		if (Array.isArray(outline)) {
			return {
				type: 'FeatureCollection',
				features: outline
			};
		}
		return outline;
	}
	showGraticule() {
		const g = this.getGraticule();
		const options = this.getMeta().graticule;
		if (!g || !options) {
			return;
		}
		const { ctx } = this.chart;
		const scale = this.getProjectionScale();
		const path = scale.geoPath.context(ctx);
		ctx.save();
		ctx.beginPath();
		if (typeof g === 'boolean') {
			if (g) {
				path(geoGraticule10());
			}
		} else {
			const geo = geoGraticule();
			if (g.stepMajor) {
				geo.stepMajor(g.stepMajor);
			}
			if (g.stepMinor) {
				geo.stepMinor(g.stepMinor);
			}
			path(geo());
		}
		ctx.strokeStyle = options.graticuleBorderColor;
		ctx.lineWidth = options.graticuleBorderWidth;
		ctx.stroke();
		ctx.restore();
	}
	draw() {
		const { chart } = this;
		const clipMap = this.clipMap();
		let enabled = false;
		if (clipMap === true || clipMap === 'outline' || clipMap === 'outline+graticule') {
			enabled = true;
			clipArea(chart.ctx, chart.chartArea);
		}
		if (this.showOutline() && this.getMeta().dataset) {
			this.getMeta().dataset.draw.call(this.getMeta().dataset, chart.ctx, chart.chartArea);
		}
		if (clipMap === true || clipMap === 'graticule' || clipMap === 'outline+graticule') {
			if (!enabled) {
				clipArea(chart.ctx, chart.chartArea);
			}
		} else if (enabled) {
			enabled = false;
			unclipArea(chart.ctx);
		}
		this.showGraticule();
		if (clipMap === true || clipMap === 'items') {
			if (!enabled) {
				clipArea(chart.ctx, chart.chartArea);
			}
		} else if (enabled) {
			enabled = false;
			unclipArea(chart.ctx);
		}
		this.getMeta().data.forEach((elem) => elem.draw.call(elem, chart.ctx, chart.chartArea));
		if (enabled) {
			enabled = false;
			unclipArea(chart.ctx);
		}
	}
}

function patchController(type, config, controller, elements = [], scales = []) {
	registry.addControllers(controller);
	if (Array.isArray(elements)) {
		registry.addElements(...elements);
	} else {
		registry.addElements(elements);
	}
	if (Array.isArray(scales)) {
		registry.addScales(...scales);
	} else {
		registry.addScales(scales);
	}
	const c = config;
	c.type = type;
	return c;
}

class ChoroplethController extends GeoController {
	initialize() {
		super.initialize();
		this.enableOptionSharing = true;
	}
	linkScales() {
		super.linkScales();
		const dataset = this.getGeoDataset();
		const meta = this.getMeta();
		meta.vAxisID = 'color';
		meta.rAxisID = 'color';
		dataset.vAxisID = 'color';
		dataset.rAxisID = 'color';
		meta.rScale = this.getScaleForId('color');
		meta.vScale = meta.rScale;
		meta.iScale = meta.xScale;
		meta.iAxisID = meta.xAxisID;
		dataset.iAxisID = meta.xAxisID;
	}
	_getOtherScale(scale) {
		return scale;
	}
	parse(start, count) {
		const rScale = this.getMeta().rScale;
		const { data } = this.getDataset();
		const meta = this._cachedMeta;
		for (let i = start; i < start + count; i += 1) {
			meta._parsed[i] = {
				[rScale.axis]: rScale.parse(data[i], i)
			};
		}
	}
	updateElements(elems, start, count, mode) {
		const firstOpts = this.resolveDataElementOptions(start, mode);
		const sharedOptions = this.getSharedOptions(firstOpts);
		const includeOptions = this.includeOptions(mode, sharedOptions);
		const scale = this.getProjectionScale();
		this.updateSharedOptions(sharedOptions, mode, firstOpts);
		for (let i = start; i < start + count; i += 1) {
			const elem = elems[i];
			elem.projectionScale = scale;
			elem.feature = this._data[i].feature;
			elem.center = this._data[i].center;
			elem.pixelRatio = this.chart.currentDevicePixelRatio;
			const center = elem.getCenterPoint();
			const properties = {
				x: center.x,
				y: center.y
			};
			if (includeOptions) {
				properties.options = sharedOptions || this.resolveDataElementOptions(i, mode);
			}
			this.updateElement(elem, i, properties, mode);
		}
	}
	indexToColor(index) {
		const rScale = this.getMeta().rScale;
		return rScale.getColorForValue(this.getParsed(index)[rScale.axis]);
	}
}
ChoroplethController.id = 'choropleth';
ChoroplethController.defaults = merge({}, [
	geoDefaults,
	{
		datasetElementType: GeoFeature.id,
		dataElementType: GeoFeature.id
	}
]);
ChoroplethController.overrides = merge({}, [
	geoOverrides,
	{
		plugins: {
			tooltip: {
				callbacks: {
					title() {
						return '';
					},
					label(item) {
						var _a, _b, _c, _d;
						if (item.formattedValue == null) {
							return (_b =
								(_a = item.chart.data) === null || _a === void 0 ? void 0 : _a.labels) === null ||
								_b === void 0
								? void 0
								: _b[item.dataIndex];
						}
						return `${
							(_d = (_c = item.chart.data) === null || _c === void 0 ? void 0 : _c.labels) ===
								null || _d === void 0
								? void 0
								: _d[item.dataIndex]
						}: ${item.formattedValue}`;
					}
				}
			},
			colors: {
				enabled: false
			}
		},
		scales: {
			color: {
				type: ColorScale.id,
				axis: 'x'
			}
		},
		elements: {
			geoFeature: {
				backgroundColor(context) {
					if (context.dataIndex == null) {
						return null;
					}
					const controller = context.chart.getDatasetMeta(context.datasetIndex).controller;
					return controller.indexToColor(context.dataIndex);
				}
			}
		}
	}
]);
class ChoroplethChart extends Chart {
	constructor(item, config) {
		super(
			item,
			patchController('choropleth', config, ChoroplethController, GeoFeature, [
				ColorScale,
				ProjectionScale
			])
		);
	}
}
ChoroplethChart.id = ChoroplethController.id;

class BubbleMapController extends GeoController {
	initialize() {
		super.initialize();
		this.enableOptionSharing = true;
	}
	linkScales() {
		super.linkScales();
		const dataset = this.getGeoDataset();
		const meta = this.getMeta();
		meta.vAxisID = 'size';
		meta.rAxisID = 'size';
		dataset.vAxisID = 'size';
		dataset.rAxisID = 'size';
		meta.rScale = this.getScaleForId('size');
		meta.vScale = meta.rScale;
		meta.iScale = meta.xScale;
		meta.iAxisID = meta.xAxisID;
		dataset.iAxisID = meta.xAxisID;
	}
	_getOtherScale(scale) {
		return scale;
	}
	parse(start, count) {
		const rScale = this.getMeta().rScale;
		const data = this.getDataset().data;
		const meta = this._cachedMeta;
		for (let i = start; i < start + count; i += 1) {
			const d = data[i];
			meta._parsed[i] = {
				x: d.longitude == null ? d.x : d.longitude,
				y: d.latitude == null ? d.y : d.latitude,
				[rScale.axis]: rScale.parse(d, i)
			};
		}
	}
	updateElements(elems, start, count, mode) {
		const reset = mode === 'reset';
		const firstOpts = this.resolveDataElementOptions(start, mode);
		const sharedOptions = this.getSharedOptions(firstOpts);
		const includeOptions = this.includeOptions(mode, sharedOptions);
		const scale = this.getProjectionScale();
		this.getMeta().rScale._model = firstOpts;
		this.updateSharedOptions(sharedOptions, mode, firstOpts);
		for (let i = start; i < start + count; i += 1) {
			const elem = elems[i];
			const parsed = this.getParsed(i);
			const projection = scale.projection([parsed.x, parsed.y]);
			const properties = {
				x: projection ? projection[0] : 0,
				y: projection ? projection[1] : 0,
				skip: Number.isNaN(parsed.x) || Number.isNaN(parsed.y)
			};
			if (includeOptions) {
				properties.options = sharedOptions || this.resolveDataElementOptions(i, mode);
				if (reset) {
					properties.options.radius = 0;
				}
			}
			this.updateElement(elem, i, properties, mode);
		}
	}
	indexToRadius(index) {
		const rScale = this.getMeta().rScale;
		return rScale.getSizeForValue(this.getParsed(index)[rScale.axis]);
	}
}
BubbleMapController.id = 'bubbleMap';
BubbleMapController.defaults = merge({}, [
	geoDefaults,
	{
		dataElementType: PointElement.id,
		datasetElementType: GeoFeature.id,
		showOutline: true,
		clipMap: 'outline+graticule'
	}
]);
BubbleMapController.overrides = merge({}, [
	geoOverrides,
	{
		plugins: {
			tooltip: {
				callbacks: {
					title() {
						return '';
					},
					label(item) {
						var _a, _b, _c, _d;
						if (item.formattedValue == null) {
							return (_b =
								(_a = item.chart.data) === null || _a === void 0 ? void 0 : _a.labels) === null ||
								_b === void 0
								? void 0
								: _b[item.dataIndex];
						}
						return `${
							(_d = (_c = item.chart.data) === null || _c === void 0 ? void 0 : _c.labels) ===
								null || _d === void 0
								? void 0
								: _d[item.dataIndex]
						}: ${item.formattedValue}`;
					}
				}
			}
		},
		scales: {
			size: {
				axis: 'x',
				type: SizeScale.id
			}
		},
		elements: {
			point: {
				radius(context) {
					if (context.dataIndex == null) {
						return null;
					}
					const controller = context.chart.getDatasetMeta(context.datasetIndex).controller;
					return controller.indexToRadius(context.dataIndex);
				},
				hoverRadius(context) {
					if (context.dataIndex == null) {
						return null;
					}
					const controller = context.chart.getDatasetMeta(context.datasetIndex).controller;
					return controller.indexToRadius(context.dataIndex) + 1;
				}
			}
		}
	}
]);
class BubbleMapChart extends Chart {
	constructor(item, config) {
		super(
			item,
			patchController('bubbleMap', config, BubbleMapController, GeoFeature, [
				SizeScale,
				ProjectionScale
			])
		);
	}
}
BubbleMapChart.id = BubbleMapController.id;

export {
	BubbleMapChart,
	BubbleMapController,
	ChoroplethChart,
	ChoroplethController,
	ColorLogarithmicScale,
	ColorScale,
	GeoController,
	GeoFeature,
	ProjectionScale,
	SizeLogarithmicScale,
	SizeScale
};
