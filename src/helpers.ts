export enum Format {
  Json = 'json',
  Csv = 'csv',
}

export const createFileData = (format: Format, packets: any[]): string => {
  switch (format) {
    case Format.Json:
      return JSON.stringify(packets, null, 2);

    case Format.Csv:
      return '';
  }
};
