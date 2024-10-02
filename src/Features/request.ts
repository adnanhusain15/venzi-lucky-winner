import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const getForm = async <T>(formId: string): Promise<T> => {
  const response = await axios.request<T>({ url: `api/form/${formId}` });
  return response.data;
};
const getResponses = async <T>(formId: string): Promise<T> => {
  const response = await axios.request<T>({
    url: `api/form/${formId}/responses`,
    params: {
      page_size: 1000,
    },
  });
  return response.data;
};

const apis = {
  getForm,
  getResponses,
};
export default apis;
