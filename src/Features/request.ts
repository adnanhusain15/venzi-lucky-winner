import axios from "axios";

const getForm = async <T>(formId: string): Promise<T> => {
  const response = await axios.request<T>({ url: `/api/form/${formId}` });
  return response.data;
};

const getResponses = async <T>(formId: string): Promise<T> => {
  const response = await axios.request<T>({
    url: `/api/form/${formId}/responses`,
  });
  return response.data;
};

const apis = {
  getForm,
  getResponses,
};
export default apis;
