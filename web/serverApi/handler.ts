import { useRouter } from 'vue-router';

export const handleJsonServerResponse = <T>(res: Response): Promise<T> => {
  handleServerResponse(res.status);

  return res.json() as Promise<T>;
};

export const handleTextServerResponse = (res: Response): Promise<String> => {
  handleServerResponse(res.status);

  return res.text();
};

const handleServerResponse = (status: number) => {};
