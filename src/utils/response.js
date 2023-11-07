"use strict";

/**
 * @description Function for success response structure
 * @param {string} message
 * @param {object} results
 * @returns {object}
 *
 */
export function successResponse(message, results) {
  return {
    success: true,
    message: message,
    ...results,
  };
}

/**
 * @description Function for error response structure
 * @param {string} message
 * @param {object} results
 * @returns {object}
 */
export function errorResponse(message, results) {
  return {
    success: false,
    message: message,
    ...results,
  };
}

/**
 * @description Function for validation response structure
 * @param {string} status
 * @param {string} message
 * @param {string} token
 * @param {object} user
 * @returns {object}
 */
export function authResponse(status, message, token, user) {
  return {
    success: status,
    message: message,
    token: token,
    userData: user,
  };
}

export function paginationResponse(page, limit, totalData) {
  let pageInt = parseInt(page);

  let response = {
    page: pageInt,
    next: pageInt + 1,
    prev: pageInt < 1 ? pageInt : pageInt - 1,
    limit: limit,
    totalPage: Math.ceil(totalData / limit),
    totalData: totalData,
  };

  return response;
}
