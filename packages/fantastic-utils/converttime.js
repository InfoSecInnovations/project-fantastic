/**
 * Convert time in days, hours, minutes, seconds format to milliseconds
 * @param {{d?: number, h?: number, m?: number, s?: number}} time 
 */
const convertTime = time => (time && (time.d || 0) * 1000 * 60 * 60 * 24 + (time.h || 0) * 1000 * 60 * 60 + (time.m || 0) * 1000 * 60 + (time.s ||0) * 1000) || 0

module.exports = convertTime