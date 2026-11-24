import { ArgumentsHost, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { GlobalExceptionFilter } from "../global-exception.filter";

describe("GlobalExceptionFilter", () => {
  let filter: GlobalExceptionFilter;
  let mockResponse: { status: jest.Mock; json: jest.Mock };
  let mockHost: ArgumentsHost;
  let errorSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;

  const mockRequest = { method: "GET", url: "/test" };

  beforeEach(() => {
    filter = new GlobalExceptionFilter();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    } as ArgumentsHost;

    errorSpy = jest.spyOn(Logger.prototype, "error").mockImplementation();
    warnSpy = jest.spyOn(Logger.prototype, "warn").mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be defined", () => {
    expect(filter).toBeDefined();
  });

  describe("logging", () => {
    it("should log as error with the stack when the status is 500", () => {
      const exception = new HttpException("boom", HttpStatus.INTERNAL_SERVER_ERROR);

      filter.catch(exception, mockHost);

      expect(errorSpy).toHaveBeenCalledWith("[GET] /test - Status: 500", exception.stack);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it("should log as warn when the status is 499", () => {
      const exception = new HttpException("client error", 499);

      filter.catch(exception, mockHost);

      expect(warnSpy).toHaveBeenCalledWith("[GET] /test - Status: 499");
      expect(errorSpy).not.toHaveBeenCalled();
    });
  });

  describe("response", () => {
    it("should return the errors from the body when the exception carries an errors list", () => {
      const errors = [{ key: "auth.messages.errors.userNotFound" }];
      const exception = new HttpException({ errors }, HttpStatus.UNAUTHORIZED);

      filter.catch(exception, mockHost);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        errors,
        code: 401,
      });
    });

    it("should wrap the message in a default error when the HttpException message is a string", () => {
      const exception = new HttpException("Not found", HttpStatus.NOT_FOUND);

      filter.catch(exception, mockHost);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        errors: [{ key: "general.errors.defaultError", params: { message: "Not found" } }],
        code: 404,
      });
    });

    it("should return one default error per message when the HttpException message is an array", () => {
      const exception = new HttpException(
        { message: ["email must be an email", "password is too short"] },
        HttpStatus.BAD_REQUEST,
      );

      filter.catch(exception, mockHost);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        errors: [
          { key: "general.errors.defaultError", params: { message: "email must be an email" } },
          { key: "general.errors.defaultError", params: { message: "password is too short" } },
        ],
        code: 400,
      });
    });

    it("should return a generic 500 without exposing details when the exception is not an HttpException", () => {
      const exception = new Error("database exploded");

      filter.catch(exception, mockHost);

      expect(errorSpy).toHaveBeenCalledWith("[GET] /test - Status: 500", exception.stack);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        errors: [{ key: "general.errors.defaultError" }],
        code: 500,
      });
    });
  });
});
