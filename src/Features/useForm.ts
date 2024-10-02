"use client";

import { useEffect, useState } from "react";
import apis from "./request";
import utils from "./utils";

let interval: NodeJS.Timeout;
const useForm = (formId: string) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setLoading] = useState(false);
  const [form, setForm] = useState<Form>();
  const [responses, setResponses] = useState<ResponseItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    syncForm();
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const syncForm = async () => {
    try {
      setLoading(true);
      const formData = await apis.getForm<Form>(formId);
      setForm(formData);
      if (formData) {
        const responses = await apis.getResponses<Response>(formId);
        setResponses(responses.items);
        setUsers(utils.getParsedResponses(formData.fields, responses.items));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const [isDrawing, setIsDrawing] = useState(false);
  const startDraw = () => {
    setIsDrawing(true);
    interval = setInterval(() => {
      setActiveIndex((e) => (e === users.length - 1 ? 0 : e + 1));
    }, 120);
  };
  const endDraw = () => {
    clearInterval(interval);
    setIsDrawing(false);
  };
  return {
    syncForm,
    form,
    responses,
    users,
    isLoading,
    isDrawing,
    startDraw,
    endDraw,
    activeIndex,
  };
};

export default useForm;

export type Form = {
  id: string;
  fields: [];
  title: string;
  theme: {
    href: string;
    background: {
      href: string;
    };
  };
};
export type Field = {
  id: string;
  type: "multiple_choice" | "short_text" | "contact_info";
  subfield_key?: "first_name" | "last_name" | "phone_number" | "email";
  properties: {
    fields: Field[];
  };
};

export type Response = {
  items: ResponseItem[];
};
export type ResponseItem = {
  answers: {
    field: Field;
    type: string;
    text?: string;
    phone_number?: string;
    email?: string;
  }[];
};

export type User = {
  phoneNumber?: string;
  email?: string;
  firstName: string;
  lastName: string;
};
