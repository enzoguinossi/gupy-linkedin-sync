export enum ExitCode {
  SUCCESS = 0,
  UNEXPECTED = 1,
  CLI = 10,
  HTTP = 20,
}

export class CliError extends Error {
  readonly exitCode = ExitCode.CLI;
}

export class HttpError extends Error {
  readonly exitCode = ExitCode.HTTP;

  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
  }
}

export function isKnownError(
  err: unknown
): err is CliError | HttpError {
  return (
    err instanceof CliError ||
    err instanceof HttpError
  );
}
