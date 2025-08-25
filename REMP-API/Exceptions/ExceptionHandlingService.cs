﻿using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RealEstate.Exceptions;
using System.Net;
using System.Text.Json;

namespace RealEstate.Services
{
    public class ExceptionHandlingService
    {
        private readonly ILogger<ExceptionHandlingService> _logger;

        public ExceptionHandlingService(ILogger<ExceptionHandlingService> logger)
        {
            _logger = logger;
        }

        public async Task HandleExceptionAsync(HttpContext context)
        {
            var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();
            if (exceptionHandlerFeature == null) return;

            var exception = exceptionHandlerFeature.Error;
            _logger.LogError(exception, "Unhandled exception occurred.");

            context.Response.ContentType = "application/json";
            int statusCode = GetStatusCode(exception);

            var errorResponse = new ErrorResponse(
                statusCode,
                GetErrorMessage(exception),
                exception.GetType().Name,
                context.Request.Path
            );

            context.Response.StatusCode = statusCode;
            await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
        }

        private static int GetStatusCode(Exception exception)
        {
            return exception switch
            {
                ArgumentException => (int)HttpStatusCode.BadRequest,
                KeyNotFoundException => (int)HttpStatusCode.NotFound,
                UnauthorizedAccessException => (int)HttpStatusCode.Unauthorized,
                NotFoundException => (int)HttpStatusCode.NotFound,
                _ => (int)HttpStatusCode.InternalServerError
            };
        }

        private static string GetErrorMessage(Exception exception)
        {
            if (exception is ArgumentException)
                return "Invalid input provided.";
            else if (exception is KeyNotFoundException)
                return "Requested resource was not found.";
            else if (exception is UnauthorizedAccessException)
                return "You are not authorized to access this resource.";
            else
                return "An unexpected error occurred. Please try again later.";
        }
    }

    public record ErrorResponse(
        int StatusCode,
        string Message,
        string Exception,
        string Path
    );
}